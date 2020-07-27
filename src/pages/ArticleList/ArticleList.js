import React, { useEffect, useState } from "react";
import articleApi from '../../api/articlesApi'
import './ArticleList.css'
import { Link, useParams } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import IsAdminRender from "../../components/Secured/IsAdminRender";


export default () => {
    const { t } = useTranslation("article-list")
    const { themeId } = useParams();
    const [articles, setArticles] = useState([]);
    const [filter, setFilter] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const deleteArticle = (id) => {
        articleApi.deleteArticle(id)
            .then(response => {
                if (response.data != null) {
                    alert("deleted successfully!")
                }
            })
    };

    const articleList = articles.map(article => {
        if (article.title.toLowerCase().includes(filter.toLocaleLowerCase()) || article.title.toLowerCase().includes(filter.toLowerCase()))
            return (
                <div className="post" key={article.id}>
                    {article.fileName &&
                        <img
                            src={`http://localhost:8081/files/${article.fileName}`}
                            alt="Very beautiful product"
                            className="post-image"
                        />
                    }
                    <div className="post-preview">
                        <h2 className="preview-title"><a>{article.title}</a></h2>
                        <p className="preview-text">{article.description}</p>
                        <i className="fa fa-calendar">&nbsp;{article.date}</i>
                        <IsAdminRender>
                            <button onClick={deleteArticle.bind(this, article.id)} className="btn-delete">Delete</button>
                            <Link to={`/articles/article/update/` + article.id} className="btn-update">Update</Link>
                        </IsAdminRender>
                        <Link to={`/articles/article/` + article.id} className="btn read-more">{t("readMore")}</Link>
                    </div>
                </div>
            )
    })

    useEffect(() => {
        articleApi.fetchArticles(page, rowsPerPage)
            .then(response => setArticles(response.data))
    }, [page, rowsPerPage])

    useEffect(() => {
        articleApi.fetchArticlesByThemeId(themeId, page, rowsPerPage)
            .then(response => setArticles(response.data))
    }, [themeId, page, rowsPerPage])
    
    return (
        <div className="content clearfix">
            <h1 className="post-title">{t("title")}</h1>
            <div className="main-content">
                {articleList}
                <Pagination count={Math.ceil(articles.length/2)} page={page} onChange={handleChangePage} />
            </div>
            <div className="sidebar">
                <div className="sections search">
                    <h2 className="section-title">{t("search")}</h2>
                    <div><TextField id="standard-basic" onChange={handleSearchChange} /></div>
                </div>
            </div>
        </div>
    )
}