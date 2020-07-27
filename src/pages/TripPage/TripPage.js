import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import tripsApi from "../../api/tripsApi";
import './TripPage.css';
import { useTranslation } from 'react-i18next';


export default () => {
    const { t } = useTranslation("trip-list")
    const { articleId } = useParams();
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        tripsApi.fetchTripsByArticleId(articleId)
            .then(response => setTrips(response.data))
    }, [articleId])

    return (
        <div>
            {trips.map(trip => (
                <div key={trip.id}>
                    <div className="image-cont">
                        {trip.fileName &&
                            <img className="page-imagez"
                                src={`http://localhost:8081/files/${trip.fileName}`}
                                alt="Very beautiful article"
                            />
                        }
                        <div>
                            <div class="destination-text">
                                <h3 id="trip-name">{trip.location}</h3>
                                <p id="trip-subname">Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="trip-description-header">About Trip</p>
                        <p className="trip-description">{trip.description}</p>
                        <p className="trip-description">{trip.description}{trip.description}</p>
                        <p className="trip-description">{trip.description}</p>
                        <p className="price">Price - {trip.price}</p>
                        <p className="days">Number of days - {trip.days}</p>
                    </div>
                </div>))}
            <Link to ="/booking"><a to='#' className="book-button" id="book-button-id">Book Now!</a></Link>
        </div>

    );
}