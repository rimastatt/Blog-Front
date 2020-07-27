import HTTP from '.'

export default {
    fetchArticles(pageNumber, pageSize) {
        return HTTP.get(`/articles?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    },
    fetchArticleById(id) {
        return HTTP.get(`articles/article/${id}`)
    },

    fetchArticlesByThemeId(themeId, pageNumber, pageSize) {
        return HTTP.get(`/articles/${themeId}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    },
    createArticle(article, file) {
        let data = new FormData();
        data.append("file", file);
        data.append("text", article.text);
        data.append("description", article.description);
        data.append("tag", article.tag);
        data.append("theme", article.theme);
        data.append("title", article.title);
        data.append("picture", article.picture);
        return HTTP.post('/articles/article/new', data)
    },

    updateArticle(article, file) {
        let data = new FormData();
        data.append("file", file);
        data.append("text", article.text);
        data.append("description", article.description);
        data.append("tag", article.tag);
        data.append("theme", article.theme);
        data.append("title", article.title);
        data.append("picture", article.picture);
        data.append("date", article.date)
        data.append("id", article.id);
        return HTTP.post('/articles/article/update', data)
    },
    deleteArticle(id) {
        return HTTP.delete(`articles/article/${id}/delete`)
    },
    submitComment(comment, id) {
        return HTTP.post(`articles/article/${id}`, comment, id)
    },
    getAllCommentsByArticleId(id) {
        return HTTP.get(`articles/article/${id}/comments`)
    }
}