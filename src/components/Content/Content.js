import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ArticleList from "../../pages/ArticleList/ArticleList";
import UserForm from "../../pages/UserForm/UserForm";
import ThemeList from "../../pages/ThemeList/ThemeList"
import ArticlePage from "../../pages/ArticlePage/ArticlePage";
import ArticleForm from "../../pages/ArticleForm/ArticleForm";
import TripList from "../../pages/TripList/TripList";
import TripPage from "../../pages/TripPage/TripPage";
import Login from "../../pages/Login/Login"
import UserInfo from "../../pages/UserInfo/UserInfo"
import BookingForm from "../../pages/BookingForm/BookingForm"
import UpdateArticleForm from "../../pages/UpdateArticleForm/UpdateArticleForm"

import PrivateRoute from "../PrivateRoute/PrivateRoute";


export default () => (
    <Switch>
        <Redirect exact from="/" to="/themes" />
        <Route path="/login">
            <Login/>
        </Route>
        <Route path="/themes">
            <ThemeList />
        </Route>
        <Route exact path="/trips/trip/:articleId" >
            <TripPage/>
        </Route>
        <Route exact path="/trips">
            <TripList/>
        </Route>
        <PrivateRoute exact path="/articles/article/update/:id" role="ADMIN">
            <UpdateArticleForm/>
        </PrivateRoute>
        <Route exact path="/articles/article/:id">
            <ArticlePage />
        </Route>
        <PrivateRoute exact path="/articles/article" role="ADMIN">
            <ArticleForm />
        </PrivateRoute>
        <Route exact path="/articles/:themeId">
            <ArticleList/>
        </Route>
        <Route exact path="/articles">
            <ArticleList/>
        </Route>
        <Route exact path="/user/new">
            <UserForm />
        </Route>
        <PrivateRoute exact path="/userInfo">
            <UserInfo />
        </PrivateRoute>
        <Route exact path="/booking">
            <BookingForm/>
        </Route>
        <Route>
            <h1>Page not found!</h1>
        </Route>
    </Switch>
)