'use client'
import { useState } from 'react'
import { createBooking } from '@/lib/actions/events.actions'

const BookingEvent = ({ eventId }) => {

  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    // Prevent the browser's default form submit, which reloads the whole page.
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await createBooking(eventId, email)

    setLoading(false)
    if (result.success) setSubmitted(true)
    else setError(result.message || "Something went wrong")
  }

  return (
    <div id='book-event'>
      {
        submitted ? (
          <p className="text-sm">Thank you for booking this event</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              placeholder='Enter the Email'
              />
              </div>
            <button type="submit" className='button-sumbit' disabled={loading}>
              {loading ? 'Booking...' : 'Book Event'}
            </button>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </form>
         )}
    </div>
  )
}

export default BookingEvent
