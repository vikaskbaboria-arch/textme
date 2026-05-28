'use client'
import { useState, useRef, useEffect } from 'react'
import styles from './VoiceRecorder.module.css'

export default function VoiceRecorder({ onSend, onCancel }) {
  const [state, setState] = useState('idle') // idle | recording | preview
  const [duration, setDuration] = useState(0)
  const [audioUrl, setAudioUrl] = useState(null)
  const [audioBlob, setAudioBlob] = useState(null)
  const mediaRecorder = useRef(null)
  const chunks = useRef([])
  const timerRef = useRef(null)
  const streamRef = useRef(null)
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    return () => {
      stopTimer()
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    }
  }, [])

  function startTimer() {
    setDuration(0)
    timerRef.current = setInterval(() => setDuration(d => d + 1), 1000)
  }

  function stopTimer() {
    clearInterval(timerRef.current)
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mr = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorder.current = mr
      chunks.current = []

      mr.ondataavailable = e => { if (e.data.size > 0) chunks.current.push(e.data) }
      mr.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioBlob(blob)
        setAudioUrl(url)
        setState('preview')
        stream.getTracks().forEach(t => t.stop())
      }

      mr.start()
      setState('recording')
      startTimer()
    } catch (err) {
      console.error('Mic error:', err)
      onCancel()
    }
  }

  function stopRecording() {
    stopTimer()
    if (mediaRecorder.current?.state !== 'inactive') {
      mediaRecorder.current.stop()
    }
  }

  function cancelRecording() {
    stopTimer()
    if (mediaRecorder.current?.state !== 'inactive') mediaRecorder.current.stop()
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    onCancel()
  }

  async function sendVoice() {
    if (!audioBlob) return

    // Upload to Cloudinary
    const formData = new FormData()
    formData.append('file', audioBlob, 'voice.webm')
    formData.append('folder', 'textme/voice')

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      onSend({ audioUrl: data.url, audioDuration: duration })
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    } catch (err) {
      console.error(err)
    }
  }

  function togglePlay() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  function fmt(s) {
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  }

  return (
    <div className={styles.recorder}>
      {state === 'idle' && (
        <button className={styles.micBtn} onClick={startRecording} title="Record voice message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
            <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>
          </svg>
        </button>
      )}

      {state === 'recording' && (
        <div className={styles.recordingBar}>
          <button className={styles.cancelBtn} onClick={cancelRecording} title="Cancel">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div className={styles.recordingPulse}>
            <span className={styles.recDot} />
            <span className={styles.recDuration}>{fmt(duration)}</span>
          </div>
          <button className={styles.stopBtn} onClick={stopRecording} title="Stop & preview">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
          </button>
        </div>
      )}

      {state === 'preview' && (
        <div className={styles.previewBar}>
          <button className={styles.cancelBtn} onClick={cancelRecording}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <button className={styles.playBtn} onClick={togglePlay}>
            {playing
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            }
          </button>

          <div className={styles.waveform}>
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className={styles.bar} style={{ height: `${Math.random() * 14 + 4}px` }} />
            ))}
          </div>

          <span className={styles.previewDuration}>{fmt(duration)}</span>

          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setPlaying(false)}
          />

          <button className={styles.sendVoiceBtn} onClick={sendVoice} title="Send voice message">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
