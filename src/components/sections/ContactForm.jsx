import { useId, useRef, useState } from 'react'
import { site } from '../../data/site'
import { buildMailtoLink, isContactEndpointConfigured, sendContactMessage } from '../../services/contactService'
import { contactLimits, validateContact } from '../../utils/validateContact'
import Icon from '../ui/Icon'

const EMPTY_VALUES = { name: '', email: '', subject: '', message: '', website: '' }
const FIELD_ORDER = ['name', 'email', 'subject', 'message']

/**
 * Delivery modes, decided by configuration — never faked:
 *   'endpoint' → POSTs to VITE_CONTACT_ENDPOINT
 *   'mailto'   → opens the visitor's email app with the message pre-filled
 *   'none'     → no endpoint and no email configured; form is disabled
 */
const deliveryMode = isContactEndpointConfigured ? 'endpoint' : site.email ? 'mailto' : 'none'

export default function ContactForm() {
  const formId = useId()
  const formRef = useRef(null)
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | handoff | error
  const [submittedEmail, setSubmittedEmail] = useState('')

  const fieldId = (name) => `${formId}-${name}`
  const unavailable = deliveryMode === 'none'
  const submitting = status === 'submitting'

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    if (touched[name]) setErrors(validateContact(nextValues))
    if (status === 'error' || status === 'success' || status === 'handoff') setStatus('idle')
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((previous) => ({ ...previous, [name]: true }))
    setErrors(validateContact(values))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (unavailable || submitting) return

    const validationErrors = validateContact(values)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    const firstInvalid = FIELD_ORDER.find((name) => validationErrors[name])
    if (firstInvalid) {
      formRef.current?.elements.namedItem(firstInvalid)?.focus()
      return
    }

    // Honeypot: real visitors never see or fill the "website" field.
    if (values.website) {
      setStatus('success')
      return
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    }

    if (deliveryMode === 'mailto') {
      window.location.href = buildMailtoLink(site.email, payload)
      setSubmittedEmail(payload.email)
      setStatus('handoff')
      return
    }

    setStatus('submitting')
    try {
      await sendContactMessage(payload)
      setSubmittedEmail(payload.email)
      setValues(EMPTY_VALUES)
      setTouched({})
      setErrors({})
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const showError = (name) => touched[name] && errors[name]

  const fieldProps = (name) => ({
    id: fieldId(name),
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': showError(name) ? true : undefined,
    'aria-describedby': showError(name) ? `${fieldId(name)}-error` : undefined,
  })

  const renderError = (name) =>
    showError(name) ? (
      <p id={`${fieldId(name)}-error`} className="field__error">
        <Icon name="alert" size={14} />
        {errors[name]}
      </p>
    ) : null

  const messageLength = values.message.trim().length

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate aria-describedby={`${formId}-mode`}>
      <DeliveryNotice id={`${formId}-mode`} />

      <fieldset className="contact-form__fields" disabled={unavailable} aria-busy={submitting || undefined}>
        <legend className="visually-hidden">Send a message</legend>

        <div className="contact-form__row">
          <div className="field">
            <label htmlFor={fieldId('name')}>
              Name <span aria-hidden="true">*</span>
            </label>
            <input type="text" autoComplete="name" required maxLength={contactLimits.nameMax + 20} {...fieldProps('name')} />
            {renderError('name')}
          </div>

          <div className="field">
            <label htmlFor={fieldId('email')}>
              Email <span aria-hidden="true">*</span>
            </label>
            <input type="email" autoComplete="email" inputMode="email" required {...fieldProps('email')} />
            {renderError('email')}
          </div>
        </div>

        <div className="field">
          <label htmlFor={fieldId('subject')}>
            Subject <span className="field__optional">(optional)</span>
          </label>
          <input type="text" maxLength={contactLimits.subjectMax + 20} {...fieldProps('subject')} />
          {renderError('subject')}
        </div>

        <div className="field">
          <div className="field__label-row">
            <label htmlFor={fieldId('message')}>
              Message <span aria-hidden="true">*</span>
            </label>
            <span
              className={`field__counter${messageLength > contactLimits.messageMax ? ' is-over' : ''}`}
              aria-hidden="true"
            >
              {messageLength} / {contactLimits.messageMax}
            </span>
          </div>
          <textarea rows={6} required {...fieldProps('message')} />
          {renderError('message')}
        </div>

        {/* Honeypot field for spam bots — hidden from people and assistive tech. */}
        <div className="contact-form__trap" aria-hidden="true">
          <label htmlFor={fieldId('website')}>Website</label>
          <input
            id={fieldId('website')}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={handleChange}
          />
        </div>

        <div className="contact-form__footer">
          <button type="submit" className="btn btn--primary" aria-disabled={submitting || undefined}>
            {submitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Sending…
              </>
            ) : deliveryMode === 'mailto' ? (
              <>
                Open in email app
                <Icon name="arrow-up-right" size={16} />
              </>
            ) : (
              <>
                Send message
                <Icon name="arrow-right" size={16} />
              </>
            )}
          </button>
          <p className="contact-form__required">
            <span aria-hidden="true">*</span> Required
          </p>
        </div>
      </fieldset>

      <div className="contact-form__status" role="status" aria-live="polite">
        {status === 'success' && (
          <p className="form-alert form-alert--success">
            <Icon name="check" size={16} />
            <span>
              Thanks — your message was sent.
              {submittedEmail && ` I'll reply to ${submittedEmail}.`}
            </span>
          </p>
        )}
        {status === 'handoff' && (
          <p className="form-alert form-alert--info">
            <Icon name="info" size={16} />
            <span>
              Your email app should open with the message ready to send. If nothing happened, email me directly at{' '}
              <a className="text-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </span>
          </p>
        )}
        {status === 'error' && (
          <p className="form-alert form-alert--error" role="alert">
            <Icon name="alert" size={16} />
            <span>
              Your message couldn&apos;t be sent. Please check your connection and try again
              {site.email ? (
                <>
                  , or email me at{' '}
                  <a className="text-link" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </>
              ) : null}
              .
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

function DeliveryNotice({ id }) {
  if (deliveryMode === 'endpoint') return <p id={id} hidden />

  if (deliveryMode === 'mailto') {
    return (
      <p id={id} className="form-alert form-alert--info">
        <Icon name="info" size={16} />
        <span>Sending opens your email app with this message filled in, ready to send.</span>
      </p>
    )
  }

  return (
    <div id={id} className="form-alert form-alert--info">
      <Icon name="info" size={16} />
      <span>
        The contact form is currently unavailable.
      </span>
    </div>
  )
}
