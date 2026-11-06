import { useEffect, useRef } from 'react'
import useScrollLock from '../../hooks/useScrollLock'
import Icon from './Icon'
import './Modal.css'

/**
 * Accessible modal built on the native <dialog> element:
 * focus is trapped and restored by the browser, Escape closes it,
 * and clicking the backdrop closes it.
 */
export default function Modal({ open, onClose, titleId, size = 'large', children }) {
  const dialogRef = useRef(null)
  const pointerDownOnBackdrop = useRef(false)

  useScrollLock(open)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={`modal modal--${size}`}
      aria-labelledby={titleId}
      onClose={onClose}
      onPointerDown={(event) => {
        pointerDownOnBackdrop.current = event.target === event.currentTarget
      }}
      onClick={(event) => {
        if (pointerDownOnBackdrop.current && event.target === event.currentTarget) onClose()
      }}
    >
      {open && (
        <>
          <button type="button" className="modal__close" onClick={onClose}>
            <Icon name="close" size={20} label="Close dialog" />
          </button>
          <div className="modal__panel">{children}</div>
        </>
      )}
    </dialog>
  )
}
