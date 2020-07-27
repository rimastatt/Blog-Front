import React, { useEffect, useState } from "react"
import articlesApi from '../../api/articlesApi';
import { Formik, Form, Field } from 'formik';
import '../../validation';
import * as Yup from 'yup';
import ErrorMessageTranslated from "../../components/ErrorMessageTranslated/ErrorMessageTranslated";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom"

export default () => {
    const [file, setFile] = useState({});
    const [previewImg, setPreviewImg] = useState()
    const { id } = useParams();
    const [article, setArticle] = useState([])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        const currentFile = e.target.files[0];
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            setPreviewImg(reader.result);
        }, false)
        reader.readAsDataURL(currentFile)
    }

    useEffect(() => {
        articlesApi.fetchArticleById(id).then(resp => setArticle(resp.data));
    }, [id])

    const initialState = {
        id: article.id,
        title: article.title,
        theme: article.themeLocation,
        description: article.description,
        text: article.text,
        tag: article.tag,
        date: article.date,
        file: article.picture
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
            initialValues={initialState}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                articlesApi.updateArticle(values, file);
                resetForm({ values: '' });
            }}
        >
            {(props) => (
                <Form>
                    <div class="page-content">
                        <div class="form-v4-content">
                            <div className="form-left" style={{ backgroundImage: "url(" + previewImg + ")" }} />
                            <div class="form-detail" id="myform">
                                <h2>Update Article</h2>
                                <div class="form-row">
                                    <label for="id">{t("id")}</label>
                                    <Field className="input-hint input-text" name="id" type="text" placeholder={t("id")} />
                                    <ErrorMessageTranslated className="errorz" name="id" />
                                </div>
                                <div class="form-row">
                                    <label for="theme">{t("theme")}</label>
                                    <Field className="input-hint input-text" name="theme" type="text" placeholder={t("theme")} />
                                    <ErrorMessageTranslated className="errorz" name="theme" />
                                </div>
                                <div class="form-row">
                                    <label for="title">{t("title")}</label>
                                    <Field className="input-hint input-text" name="title" type="text" placeholder={t("title")} />
                                    <ErrorMessageTranslated className="errorz" name="title" />
                                </div>
                                <div class="form-row">
                                    <label for="description">{t("description")}</label>
                                    <Field className="input-hint input-text" name="description" type="text" placeholder={t("description")} />
                                    <ErrorMessageTranslated className="errorz" name="description" />
                                </div>
                                <div class="form-group">
                                    <div class="form-row form-row-1 ">
                                        <label for="text">{t("text")}</label>
                                        <Field className="input-hint input-text" name="text" type="text" placeholder={t("text")} />
                                        <ErrorMessageTranslated className="errorz" name="text" />
                                    </div>
                                    <div class="form-row form-row-1">
                                        <label for="tag">{t("tag")}</label>
                                        <Field className="input-hint input-text" name="tag" type="text" placeholder={t("tag")} />
                                        <ErrorMessageTranslated className="errorz" name="tag" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="file">{t("file")}</label>
                                    <Field name="files" type="file" onChange={handleFileChange} />
                                </div>
                                <div class="form-row-last">
                                    <input type="submit"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>

    )
}