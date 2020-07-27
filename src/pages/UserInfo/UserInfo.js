import userApi from '../../api/userApi'
import bookingApi from '../../api/bookingApi'
import React, { useEffect, useState } from "react";
import "./UserInfo.css"
import { useTranslation } from 'react-i18next';

export default () => {
    const { t } = useTranslation("booking")
    const [userInfo, setUserInfo] = useState([]);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        userApi.getUser()
            .then(response => setUserInfo(response.data))
    }, [])

    useEffect(() => {
        bookingApi.getBookingsByUserId()
            .then(response => setBookings(response.data))
    }, [])

    const bookingBlock = bookings.length > 0 ? (
        <div className="container-data">
            <ul className="responsive-table">
                <li class="table-header data-li">
                    <div class="col col-1 names">{t("location")}</div>
                    <div class="col col-2 names">{t("checkIn")}</div>
                    <div class="col col-3 names">{t("checkOut")}</div>
                    <div class="col col-4 names">{t("adults")}/</div>
                    <div class="col col-5 names">{t("children")}</div>
                    <div class="col col-6 names">{t("price")}</div>
                </li>
                {bookings.map(booking => {
                    return (<li className="table-row data-li">
                        <div className="col col-1" data-label="Location">{booking.location}</div>
                        <div className="col col-2" data-label="Check-in date">{booking.checkInDate}</div>
                        <div className="col col-3" data-label="Check-out date">{booking.checkOutDate}</div>
                        <div className="col col-4" data-label="Adults">{booking.numberOfAdults}</div>
                        <div className="col col-5" data-label="Children">{booking.numberOfChildren}</div>
                        <div className="col col-6" data-label="Price">{booking.totalPrice}$</div>
                    </li>)
                })}
            </ul>
        </div>
    ) : <>
        </>

    return (
        <div>
            <h1 className="post-title">{t("accinfo")}</h1>
            <div className="acc-info">
                <p className="user-data">{t("firstName")} - <span className="user-data-span">{userInfo.firstName}</span></p>
                <p className="user-data">{t("lastName")} - <span className="user-data-span">{userInfo.lastName}</span></p>
                <p className="user-data">{t("username")} - <span className="user-data-span">{userInfo.username}</span></p>
                <p className="user-data">{t("email")} - <span className="user-data-span">{userInfo.email}</span></p>
            </div>
            <h2 id="bkng-info">{t("bookinginfo")}</h2>
            {bookingBlock}
        </div>
    )
}