import React, { useEffect, useState } from "react";
import bookingApi from '../../api/bookingApi'
import tripsApi from "../../api/tripsApi";
import { Formik, Form, Field } from 'formik';
import Select from "react-select";
import './BookingForm.css'
import * as Yup from 'yup';
import ErrorMessageTranslated from "../../components/ErrorMessageTranslated/ErrorMessageTranslated";
import { useTranslation } from "react-i18next";

export default () => {

    const { t } = useTranslation("booking")
    const travelClasses = ["First Class", "Business Class", "Economy Class"]
    const travelClassesList = [];
    travelClasses.forEach(function (element) {
        travelClassesList.push({ label: element, value: element })
    });

    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedTravelClass, setSelectedTravelClass] = useState("");

    const initialState = {
        email: "",
        checkOutDate: "",
        checkInDate: "",
        adults: "",
        children: "",
        totalPrice: "",
        location: selectedLocation.value,
        travelClass: selectedTravelClass.value
    }

    const handleLocationChange = (values) => {
        setSelectedLocation(values);
    };

    const handleTravelClassChange = (values) => {
        setSelectedTravelClass(values);
    };

    const [trips, setTrips] = useState([]);

    const locationOptions = trips.map(trip => ({
        label: trip.location,
        value: trip.location,
    }))

    const validationSchema = Yup.object().shape({

        checkInDate: Yup.date()
            .required(),
        checkOutDate: Yup.date()
            .min(Yup.ref('checkInDate'), "Invalid check-out date!")
            .required(),
        adults: Yup.number()
            .label("booking-form:adults")
            .typeError("Use numbers only!")
            .max(9)
            .required(),
        children: Yup.number()
            .label("booking-form:children")
            .typeError("Use numbers only!")
            .max(9)
            .required(),
        location: Yup.string()
            .required(),
        travelClass: Yup.string()
            .required()
    })

    useEffect(() => {
        tripsApi.fetchTrips()
            .then(response => setTrips(response.data))
    }, [])

    return (
        <Formik
            initialValues={initialState}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values) => {
                bookingApi.createBooking(values);
            }}
        >
            {() => (
                <Form>
                    <div class="page-content">
                        <div class="form-v4-content">
                            <div className="form-left" style={{ backgroundImage: 'url(https://www.4medapproved.com/hitanswers/wp-content/uploads/2013/02/clouds.jpg)' } }  />
                            <div class="form-detail" id="myform">
                                <h2>{t("book-trip")}</h2>
                                <div class="form-row">
                                    <label for="location">{t("location")}</label>
                                    <Select className="input-hint input-text"
                                        name="location"
                                        value={selectedLocation}
                                        onChange={handleLocationChange}
                                        options={locationOptions}
                                        placeholder="Select location" />
                                    <ErrorMessageTranslated className="errorz" name="location" />
                                </div>
                                <div class="form-group">
                                    <div class="form-row form-row-1 ">
                                        <label for="travelClass">{t("travelClass")}</label>
                                        <Select className="input-hint input-text" name="travelClass"
                                            value={selectedTravelClass}
                                            onChange={handleTravelClassChange}
                                            options={travelClassesList}
                                            placeholder="Select class" />
                                        <ErrorMessageTranslated className="errorz" name="travelClass" />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <label for="checkInDate">{t("checkIn")}</label>
                                    <Field className="input-hint input-text" type="date" name="checkInDate" placeholder={t("checkIn")} autocomplete="off" />
                                    <ErrorMessageTranslated className="errorz" name="checkInDate" />
                                </div>
                                <div class="form-row">
                                    <label for="checkOutDate">{t("checkOut")}</label>
                                    <Field className="input-hint input-text" type="date" name="checkOutDate" placeholder={t("checkOut")} autocomplete="off" />
                                    <ErrorMessageTranslated className="errorz" name="checkOutDate" />
                                </div>
                                <div class="form-group">
                                    <div class="form-row form-row-1 ">
                                        <label for="children">{t("children")}</label>
                                        <Field className="input-hint input-text" name="children" type="text" placeholder={t("children")} autocomplete="off" />
                                        <ErrorMessageTranslated className="errorz" name="children" />
                                    </div>
                                    <div class="form-row form-row-1">
                                        <label for="adults">{t("adults")}</label>
                                        <Field className="input-hint input-text" name="adults" type="text" placeholder={t("adults")} autocomplete="off" />
                                        <ErrorMessageTranslated className="errorz" name="adults" />
                                    </div>
                                </div>
                            
                                <div class="form-row">
                                    <label for="email">{t("email")}</label>
                                    <Field className="input-hint input-text" type="email" name="email" placeholder={t("email")} autocomplete="off" />
                                    <ErrorMessageTranslated className="errorz" name="email" />
                                </div>
                                <div class="form-row-last">
                                    <input type="submit" value={t("book")}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )
            }
        </Formik>
    )
}