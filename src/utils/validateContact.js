export const contactLimits = {
  nameMin: 2,
  nameMax: 80,
  subjectMax: 120,
  messageMin: 20,
  messageMax: 2000,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Returns one error message per invalid field; an empty object means valid. */
export function validateContact(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < contactLimits.nameMin) errors.name = 'Your name looks too short.'
  else if (name.length > contactLimits.nameMax)
    errors.name = `Please keep your name under ${contactLimits.nameMax} characters.`

  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address, like name@example.com.'

  if (subject.length > contactLimits.subjectMax)
    errors.subject = `Please keep the subject under ${contactLimits.subjectMax} characters.`

  if (!message) errors.message = 'Please write a message.'
  else if (message.length < contactLimits.messageMin)
    errors.message = `Please write at least ${contactLimits.messageMin} characters so I have some context.`
  else if (message.length > contactLimits.messageMax)
    errors.message = `Please keep your message under ${contactLimits.messageMax} characters.`

  return errors
}
