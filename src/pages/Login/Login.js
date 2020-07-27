import React, { useContext } from "react";
import { Field, Form, Formik } from "formik";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { setCredentials } from "../../api";
import { UserContext } from "../../App";
import userApi from "../../api/userApi";
import { useHistory } from "react-router-dom"
import { Button } from '@material-ui/core'
import "./Login.css"
import { blue} from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import ErrorMessageTranslated from "../../components/ErrorMessageTranslated/ErrorMessageTranslated";
import * as Yup from 'yup';

const purpleTheme = createMuiTheme({ palette: { primary: blue } })

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .label("common:username")
        .required(),
    password: Yup.string()
        .label("common:password")
        .required()
})

export default () => {
    const { t } = useTranslation("login")
    const { login } = useContext(UserContext)
    const history = useHistory();

    const onSubmit = (values, { resetForm }) => {
        setCredentials(values)
        resetForm({ values: '' });
        userApi.getUser()
            .then(({ data }) => {
                login(data)
                history.push("/")
            })
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {(props) => (
                <Form>
                    <h1 className="welcome1"><span className="welcome2">{t("welcome")}</span>{t("welcome2")}</h1>
                    <div className="login-page">
                        <div className="form">

                            <div>
                                <span className="log-hint">Username</span>
                                <Field className="input-field" name="username" type="text" placeholder={t("username")} />
                                <ErrorMessageTranslated className="error" name="username" />
                            </div>
                            <div>
                                <span className="log-hint">Password</span>
                                <Field className="input-field" name="password" type="password" placeholder={t("password")} />
                                <ErrorMessageTranslated className="error" name="password" />
                            </div>
                            <p >{t("notRegistered")}<Link to="/user/new" className="message">{t("createAcc")}</Link></p>
                            <div className="login-button">
                                <MuiThemeProvider theme={purpleTheme}>
                                    <Button variant="contained" color="primary" type="submit">{t("login")}</Button>
                                </MuiThemeProvider>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}