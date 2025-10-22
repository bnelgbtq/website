"use client";

import { useEffect, useState } from "react";
import "./eventCard.css";
import EventCard from "./EventCard";


export default function LatestEventCard() {
    const [events, setEvents] = useState({ events: [] });

    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(setEvents)
            .catch(e => console.error('could not fetch events', e))
    }, []);

    const latestEvent = events.events[0];

    return <EventCard event={latestEvent} />
}