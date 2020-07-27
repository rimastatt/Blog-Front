import React, { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../../App";
import articlesApi from "../../api/articlesApi"
import { Formik, Form, Field, } from 'formik';
import './ArticlePage.css'
import { useTranslation } from "react-i18next";

export default () => {

    const { t } = useTranslation("article-page")

    const { loggedIn } = useContext(UserContext);
    const { id } = useParams();
    const [article, setArticle] = useState([])
    const [comments, setComments] = useState([])
    const initialState = {
        message: ""
    }

    const loadComments = (() => {
        articlesApi.getAllCommentsByArticleId(id).then(resp => setComments(resp.data))
    }, [id])

    const writeCommentBlock = loggedIn() ? (
        <>
            <div className="comment-form">
                <h1 id="comment-section-name">{t("leaveComment")}</h1>
                <Form className="comments">
                    <div className="comment-input-area">
                        <div className="single_input">
                            <Field component="textarea" className="comment-textarea" name="message" type="text" placeholder="Message" ></Field>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="comment-button">
                            <input className="submit-comment-button" type="submit" value="submit" onClick={loadComments}></input>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    ) :
        <>
            <p id="no-comment-section">{t("plzlogin")}&nbsp;<Link to="/login">{t("login")}</Link></p>
        </>

    const commentBlock = comments.length > 0 ? (
        <div className="outer-comment-block">
            {comments.map(comment => {
                return (
                    <div className="comment-block">
                        <span id="comment-name">{comment.userName}</span>
                     &nbsp;
                        <span id="comment-date">{comment.date}</span>
                        <p id="comment-body">{comment.message}</p>
                    </div>
                )
            })}
        </div>
    ) : <>
        </>

    useEffect(() => {
        articlesApi.fetchArticleById(id).then(resp => setArticle(resp.data));
    }, [id])

    useEffect(() => {
        articlesApi.getAllCommentsByArticleId(id).then(resp => setComments(resp.data))
    }, [id])

    return (
        <div>
            <div>
                <div className="row">
                    <div className="column">
                        <div className="image-containeris">
                            {article.fileName &&
                                <img className="page-image"
                                    src={`http://localhost:8081/files/${article.fileName}`}
                                    alt="Very beautiful article"
                                />
                            }
                        </div>
                    </div>
                    <div className="column">
                        <h1 className="page-title">{article.title}</h1>
                        <p className="page-text">{article.text}</p>
                        <p className="page-tag">{article.tag}</p>
                        <p className="page-date">{article.date}</p>
                    </div>
                </div>
                <Link to={`/trips/trip/` + article.id} className="purchase-button">{t("continue")}</Link>
            </div>
            <Formik
                initialValues={initialState}
                onSubmit={(values, { resetForm }) => {
                    articlesApi.submitComment(values, id);
                    resetForm({ values: '' })
                    articlesApi.getAllCommentsByArticleId(id).then(resp => setComments(resp.data))
                }}
            >
                {writeCommentBlock}
            </Formik>
            {commentBlock}
        </div>
    )
};