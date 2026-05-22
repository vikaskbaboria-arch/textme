'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import styles from './EmojiPickerPopup.module.css'

// Dynamically import to avoid SSR issues
const Picker = dynamic(
  () => import('emoji-picker-react').then(mod => mod.default),
  { ssr: false, loading: () => <div className={styles.loading}><span className="spinner" /></div> }
)

export default function EmojiPickerPopup({ onSelect, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    setTimeout(() => document.addEventListener('mousedown', handleClick), 0)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <div className={styles.popup} ref={ref}>
      <Picker
        onEmojiClick={(emojiData) => {
          onSelect(emojiData.emoji)
          onClose()
        }}
        theme="dark"
        skinTonesDisabled
        searchPlaceholder="Search emoji…"
        previewConfig={{ showPreview: false }}
        height={380}
        width={320}
        lazyLoadEmojis
      />
    </div>
  )
}
