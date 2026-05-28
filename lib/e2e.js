/**
 * End-to-End Encryption — PBKDF2 + AES-GCM (Web Crypto API)
 *
 * Flow:
 *  1. On login: derive a CryptoKey from password using PBKDF2
 *  2. On send:  encrypt plaintext → store ciphertext in DB
 *  3. On receive: decrypt ciphertext using same derived key
 *
 * Keys NEVER leave the browser. The server only ever sees ciphertext.
 * Session key is kept in memory (sessionStorage) per tab.
 */

const PBKDF2_ITERATIONS = 310_000
const KEY_USAGE = ['encrypt', 'decrypt']
const ALGO = { name: 'AES-GCM', length: 256 }

// ── Key derivation ───────────────────────────────────────────────────────────

export async function deriveKey(password, saltHex) {
  const enc = new TextEncoder()
  const salt = hexToBytes(saltHex)

  const baseKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  )

  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    baseKey,
    ALGO,
    false,
    KEY_USAGE
  )
}

// ── Encrypt ──────────────────────────────────────────────────────────────────

export async function encryptMessage(key, plaintext) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const enc = new TextEncoder()
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  )
  // Pack as: iv_hex:ciphertext_hex
  return `${bytesToHex(iv)}:${bytesToHex(new Uint8Array(cipherBuf))}`
}

// ── Decrypt ──────────────────────────────────────────────────────────────────

export async function decryptMessage(key, ciphertext) {
  try {
    const [ivHex, dataHex] = ciphertext.split(':')
    if (!ivHex || !dataHex) return ciphertext // not encrypted (legacy / system)

    const iv = hexToBytes(ivHex)
    const data = hexToBytes(dataHex)

    const plainBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data)
    return new TextDecoder().decode(plainBuf)
  } catch {
    return '🔒 Unable to decrypt (wrong key or unencrypted)'
  }
}

// ── Session key cache (memory only) ─────────────────────────────────────────

let _sessionKey = null

export function setSessionKey(key) { _sessionKey = key }
export function getSessionKey() { return _sessionKey }
export function clearSessionKey() { _sessionKey = null }

// ── Helpers ──────────────────────────────────────────────────────────────────

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
  }
  return bytes
}

// Generate a deterministic salt from userId (public, stored in DB)
export function userSalt(userId) {
  // 32-byte hex salt derived from userId — constant per user so key is reproducible
  const padded = userId.toString().padEnd(64, '0').slice(0, 64)
  return padded
}
