import { notFound } from "next/navigation"
import BookingEvent from "../../../components/BookingEvent"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetailsItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => {
  return (
    <div className="flex-row-gap-2 items-center">
      <img src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  )
}

const EventAgenda = ({ agenda }: { agenda: string[] }) => {
  return (
    <div className="agenda">
     {/* <h2>Agenda</h2> */}
      <ul>
        {agenda.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

const EventsTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {/* <h2>Tags</h2> */}
     {tags.map((tag, index) => (
       <p key={index} className="pill">{tag}</p>
     ))}
    </div>
  )
}

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = await params
  const requestUrl = await fetch(`${BASE_URL}/api/events/${slug}`)
  const { event } = await requestUrl.json()

  if (!event) return notFound()

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>

      <div className="details">
        {/* left side */}
        <div className="content">
          <img src={event.image} alt={event.title} width={800} height={800} className="banner" />
        
        <section className="flex-col-gap-2">
          <h2>overview</h2>
          <p>{event.overview}</p>
        </section>

        <section className="flex-col-gap-2">
          <h2>Event Detail</h2>
          <EventDetailsItem icon="/icons/calendar.svg" alt="calendar" label={event.date} />
          <EventDetailsItem icon="/icons/clock.svg" alt="clock" label={event.time} />
          <EventDetailsItem icon="/icons/pin.svg" alt="pin" label={event.location} />
          <EventDetailsItem icon="/icons/mode.svg" alt="mode" label={event.mode} />
          <EventDetailsItem icon="/icons/audience.svg" alt="audience" label={event.audience} />

        </section>

        {/* <section className="flex-col-gap-2"> */}
          <h2>Event Agenda</h2>
          <EventAgenda agenda={event.agenda} />
        {/* </section> */}

        <section className="flex-col-gap-2">
          <h2>Event Sponsors</h2>
          <p>{event.organizer}</p>
        </section>

        <section className="flex-col-gap-2">  
          <h2>Event Tags</h2>
          <EventsTags tags={event.tags} />
          {/* <p className="pill">{event.tags}</p> */}
        </section>

        </div>

        {/* right side */}
        <aside className="booking">
          <p className="text-lg font-semibold mb-2">Book Event</p>
          <div className= "signup-card">
            {
              event.bookings > 0 ? (
              <p className="text-sm">
                Join {event.bookings} people who have already booked this event
              </p>
              ) : (
              <p className="text-sm">
                Be the first to book this event
              </p>
            )}

            <BookingEvent />
          </div>
        </aside>

      </div>


    </section>
  )
}

export default EventDetailsPage