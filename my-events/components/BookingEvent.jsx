'use client'
import { useState } from 'react'

const BookingEvent = () => {

  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <div id='book-event'>
      {
        submitted ? (
          <p className="text-sm">Thank you for booking this event</p>
        ) : (
          <form>
            <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email' 
              placeholder='Enter the Email'
              />
              </div>
            <button type="submit" className='button-sumbit' onClick={() => setSubmitted(true)}>Book Event</button>
          </form>
         )}
    </div>
  )
}

export default BookingEvent