'use client'

import Link from "next/link"
import Image from "next/image"

interface Props {    // typescripts wants to know what will be the types of props so u should declare at very first
    title: string
    image: string
}

const EventsCard = ({ title, image }: Props) => {
    return (
        <Link href={'/events'} id="event-card">
            <Image src={image} alt={title} width={410} height={300} className="poster" />

            <p className="title">{title}</p>
        </Link>
    )
}

export default EventsCard