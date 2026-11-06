/**
 * Contact form delivery.
 *
 * The form only sends messages when VITE_CONTACT_ENDPOINT is set (see
 * .env.example). Any service that accepts a JSON POST works — for example a
 * Formspree form endpoint (https://formspree.io/f/xxxxxxx), or your own API.
 *
 * Payload sent: { name, email, subject, message }
 * A 2xx response is treated as success; anything else is an error.
 */

const ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT ?? '').trim()
const TIMEOUT_MS = 15000

export const isContactEndpointConfigured = ENDPOINT.length > 0

export async function sendContactMessage(payload) {
  if (!isContactEndpointConfigured) {
    throw new Error('The contact endpoint is not configured.')
  }

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`The message service responded with status ${response.status}.`)
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The request timed out.', { cause: error })
    }
    throw error
  } finally {
    window.clearTimeout(timer)
  }
}

/** Builds a mailto: link so visitors can send the message from their own email app. */
export function buildMailtoLink(to, { name, email, subject, message }) {
  const params = new URLSearchParams({
    subject: subject || `Portfolio inquiry from ${name}`,
    body: `${message}\n\n— ${name} (${email})`,
  })
  // URLSearchParams encodes spaces as "+", which some mail clients show literally.
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`
}
