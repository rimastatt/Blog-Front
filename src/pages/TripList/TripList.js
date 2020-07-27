import React, { useEffect, useState } from "react"
import tripsApi from "../../api/tripsApi";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import "./TripList.css"

export default () => {
    const [trips, setTrips] = useState([]);
    const { t } = useTranslation("article-list")

    useEffect(() => {
        tripsApi.fetchTrips()
            .then(response => setTrips(response.data))
    }, [])

    return (
        <div className="content clearfix">
            <h1 className="title">{t("title")}</h1>
            <div className="main-content">
                {trips.map(trip => (
                    <div className="post" key={trip.id}>
                        {trip.fileName &&
                            <img
                                src={`http://localhost:8081/files/${trip.fileName}`}
                                alt="Trip image"
                                className="post-image"
                            />
                        }
                        <div className="preview">
                            <h2 className="preview-title"><a>{trip.location}</a></h2>
                            <p id = "totalprice"className="preview-text">Total price - {trip.price}</p>
                            <p className="preview-text minimum margins">{trip.description}</p>
                            <i className="fa fa-calendar">&nbsp;Number of days {trip.days}</i>
                            <Link to={`/trips/trip/` + trip.articleId} className="btn read-more">{t("readMore")}</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )};