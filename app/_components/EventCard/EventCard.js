"use client";

import { useState } from "react";
import "./eventCard.css";
import ImageLoader from "../ImageLoader/ImageLoader";

export default function EventCard({ event = {} }) {
  const { name = '', url = '#', venue = '' } = event;
  const image = event.bannerImage?.url || '';
  const imageId = image.split('/').pop();
  const responsiveImage = imageId ? `https://cdn.filestackcontent.com/cache=expiry:max/resize=width:1280/output=format:webp,quality:20/compress/${imageId}` : null
  const date = new Date(event?.startDate || Date.now());

  return <div className="event-card">
    <div class="event-card__img"><ImageLoader src={responsiveImage} alt="" width="2500" height="1250" /></div>
    <div className="event-card__content">

      <div className="event-card__date">
        <div className="event-card__date-day">
          {date.getDate()}
        </div>
        <div className="event-card__date-month">
          {date.toLocaleString('default', { month: 'short' })}
        </div>
      </div>
      <div>
        <h2>
          <div className="event-card__badge">
            {date > Date.now() ? 'Next event' : 'Last event'}
          </div>
          {name}</h2>
        <div className="event-card__location">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <div className="event-card__location-name">
            {venue}
          </div>

        </div>
        {url &&
          <a href={url} className="bespoke event-card__link">
            <span className="sr-only">Join us</span>
          </a>}
      </div>
    </div>
  </div >
}