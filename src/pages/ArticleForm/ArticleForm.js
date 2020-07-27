import React, { useEffect, useState } from "react";
import articlesApi from '../../api/articlesApi';
import { Formik, Form, Field } from 'formik';
import '../../validation';
import * as Yup from 'yup';
import themeApi from "../../api/themeApi";
import ErrorMessageTranslated from "../../components/ErrorMessageTranslated/ErrorMessageTranslated";
import { useTranslation } from "react-i18next";
import Select from "react-select";


export default () => {
    const [file, setFile] = useState({});
    const [previewImg, setPreviewImg] = useState()

    const [selectedTitle, setSelectedTitle] = useState("");

    const [themes, setThemes] = useState([]);
    const titleOptions = themes.map(theme => ({
        label: theme.name,
        value: theme.name,
    }))

    const handleNameChange = (values) => {
        setSelectedTitle(values);
    };

    useEffect(() => {
        themeApi.fetchThemes()
            .then(response => setThemes(response.data))
    }, [])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const currentFile = e.target.files[0];
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            setPreviewImg(reader.result);
        }, false)
        reader.readAsDataURL(currentFile)
    }

    const initialState = {
        title: '',
        theme: selectedTitle.value,
        description: '',
        text: '',
        tag: '',
        file: ''
    }

    const { t } = useTranslation("article-form")

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .label("article-form:title")
            .required(),
        description: Yup.string()
            .label("article-form:description")
            .required(),
        theme: Yup.string()
            .label("article-form:theme")
            .required(),
        text: Yup.string()
            .label("article-form:text")
            .required(),
        tag: Yup.string()
            .label("article-form:tag")
            .required(),
    })

    return (
        <Formik
            enableReinitialize
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                articlesApi.createArticle(values, file);
                resetForm({ values: '' });
            }}
        >
            {(props) => (
                <Form>
                    <div class="page-content">

                        <div class="form-v4-content">

                            <div className="form-left" style={{ backgroundImage: "url(" + previewImg + ")" }} />
                            <div class="form-detail" id="myform">
                                <h2>Create an Article</h2>
                                <div class="form-row">
                                    <label for="your_email">{t("theme")}</label>
                                    <Select className="input-hint input-text"
                                        name="theme"
                                        value={selectedTitle}
                                        onChange={handleNameChange}
                                        options={titleOptions}
                                        placeholder={t("theme")} />
                                    <ErrorMessageTranslated className="errorz" name="theme" />
                                </div>
                                <div class="form-row">
                                    <label for="your_email">{t("title")}</label>
                                    <Field className="input-hint input-text" name="title" type="text" placeholder={t("title")} />
                                    <ErrorMessageTranslated className="errorz" name="title" />
                                </div>
                                <div class="form-row">
                                    <label for="your_email">{t("description")}</label>
                                    <Field className="input-hint input-text" name="description" type="text" placeholder={t("description")} />
                                    <ErrorMessageTranslated className="errorz" name="description" />
                                </div>
                                <div class="form-group">
                                    <div class="form-row form-row-1 ">
                                        <label for="password">{t("text")}</label>
                                        <Field className="input-hint input-text" name="text" type="text" placeholder={t("text")} />
                                        <ErrorMessageTranslated className="errorz" name="text" />
                                    </div>
                                    <div class="form-row form-row-1">
                                        <label for="comfirm-password">{t("tag")}</label>
                                        <Field className="input-hint input-text" name="tag" type="text" placeholder={t("tag")} />
                                        <ErrorMessageTranslated className="errorz" name="tag" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="file">{t("file")}</label>
                                    <Field name="files" type="file" onChange={handleFileChange} />
                                </div>
                                <div class="form-row-last">
                                    <input type="submit" value="Create"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>

    )
}