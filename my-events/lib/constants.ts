export interface EventItem {
  title: string
  image: string
  slug: string
  date: string
  time: string
  location: string
}

export const events: EventItem[] = [
  {
    title: 'React Summit 2026',
    image: '/images/event1.png',
    slug: 'react-summit-2026',
    date: 'June 18, 2026',
    time: '9:00 AM - 6:00 PM',
    location: 'Amsterdam, Netherlands',
  },
  {
    title: 'Google I/O Extended Night',
    image: '/images/event2.png',
    slug: 'google-io-extended-night',
    date: 'May 14, 2026',
    time: '6:30 PM - 9:30 PM',
    location: 'San Francisco, CA',
  },
  {
    title: 'AWS Builders Meetup',
    image: '/images/event3.png',
    slug: 'aws-builders-meetup',
    date: 'July 9, 2026',
    time: '5:00 PM - 8:00 PM',
    location: 'Seattle, WA',
  },
  {
    title: 'Hack the North Hackathon',
    image: '/images/event4.png',
    slug: 'hack-the-north-hackathon',
    date: 'September 11, 2026',
    time: 'All Weekend',
    location: 'Waterloo, Canada',
  },
  {
    title: 'DevOpsDays London',
    image: '/images/event5.png',
    slug: 'devopsdays-london',
    date: 'October 6, 2026',
    time: '10:00 AM - 5:00 PM',
    location: 'London, UK',
  },
  {
    title: 'Node.js Community Meetup',
    image: '/images/event6.png',
    slug: 'nodejs-community-meetup',
    date: 'April 28, 2026',
    time: '7:00 PM - 9:00 PM',
    location: 'Berlin, Germany',
  },
]