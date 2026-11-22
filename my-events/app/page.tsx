import EventsCard from '@/components/EventsCard'
import ExploreBtn from '@/components/ExploreBtn'
import { getAllEvents } from '@/lib/actions/events.actions'

// Always read fresh data from the DB at request time (not at build time).
export const dynamic = 'force-dynamic'

const page = async () => {

  const events = await getAllEvents()

  return (
    <section>

      <h1 className='text-center'>The Hub for Every Dev <br /> Event You Mustn&apos;t Miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups and Conferences, All in One Place</p>
      <ExploreBtn />

      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>

        {events.length > 0 ? (
          <ul className='events'>
            {events.map((event) => (
              <li key={event.slug}>
                <EventsCard
                  title={event.title}
                  image={event.image}
                  slug={event.slug}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center'>No events available right now. Check back soon!</p>
        )}
      </div>
    </section>

  )
}

export default page
