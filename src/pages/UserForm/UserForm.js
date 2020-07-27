import React, { useState, resetForm } from 'react';
import userApi from '../../api/userApi';
import { Formik, Form, Field, } from 'formik';
import './UserForm.css';
import * as Yup from 'yup';
import '../../validation';
import { useTranslation } from "react-i18next";
import ErrorMessageTranslated from "../../components/ErrorMessageTranslated/ErrorMessageTranslated";


export default () => {

    const initialState = {
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
    }

    const { t } = useTranslation("login-form")

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .label("login-form:username")
            .required(),
        password: Yup.string()
            .label("login-form:password")
            .required(),
        confirmPassword: Yup.string()
            .label("login-form:confirmPassword")
            .required(),
        firstName: Yup.string()
            .label("login-form:firstName")
            .required(),
        lastName: Yup.string()
            .label("login-form:lastName")
            .required(),
        email: Yup.string()
            .label("login-form:email")
            .required()

    })

    return (
        <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                userApi.createUser(values);
                resetForm({ values: '' })
            }}
        >
            {(props) => (
                <Form>
                    <div class="page-content">
                        <div class="form-v4-content">
                            <div class="form-left">
                                <h2>{t("policy")}</h2>
                                <p class="text-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Diam volutpat commodo.</p>
                                <p class="text-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Diam volutpat commodo.</p>
                                <p class="text-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Diam volutpat commodo.</p>
                                <p class="text-2"><span>Eu ultrices:</span> Vitae auctor eu augue ut. Malesuada nunc vel risus commodo viverra. Praesent elementum facilisis leo vel.</p>
                            </div>
                            <div class="form-detail" id="myform">
                                <h2>{t("register")}</h2>
                                <div class="form-group">
                                    <div class="form-row form-row-1">
                                        <label for="first_name">{t("firstName")}</label>
                                        <Field className="input-hint input-text" name="firstName" type="text" id="first_name" placeholder={t("firstName")} />
                                        <ErrorMessageTranslated className="errorz" name="firstName" />
                                    </div>
                                    <div class="form-row form-row-1">
                                        <label for="last_name">{t("lastName")}</label>
                                        <Field id="last_name" className="input-hint input-text" name="lastName" type="text" placeholder={t("lastName")} />
                                        <ErrorMessageTranslated className="errorz" name="lastName" />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <label for="your_email">{t("email")}</label>
                                    <Field id="your_email" className="input-hint input-text" name="email" type="email" placeholder={t("email")} />
                                    <ErrorMessageTranslated className="errorz" name="email" />
                                </div>
                                <div class="form-row">
                                    <label for="your_email">{t("username")}</label>
                                    <Field className="input-hint input-text" name="username" type="text" placeholder={t("username")} />
                                    <ErrorMessageTranslated className="errorz" name="username" />
                                </div>
                                <div class="form-group">
                                    <div class="form-row form-row-1 ">
                                        <label for="password">{t("password")}</label>
                                        <Field id="password" className="input-hint input-text" name="password" type="password" placeholder={t("password")} />
                                        <ErrorMessageTranslated className="errorz" name="password" />
                                    </div>
                                    <div class="form-row form-row-1">
                                        <label for="comfirm-password">{t("confirmPassword")}</label>
                                        <Field id="comfirm_password" className="input-hint input-text" name="confirmPassword" type="password" placeholder={t("confirmPassword")} />
                                        <ErrorMessageTranslated className="errorz" name="confirmPassword" />
                                    </div>
                                </div>
                                <div class="form-row-last">
                                    <input className="register" type="submit" value="Register" name="Register"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
