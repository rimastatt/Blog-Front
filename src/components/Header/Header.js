import React, { useContext } from "react";
import "./Header.css";
import { Link } from 'react-router-dom';
import { setCredentials } from "../../api";
import { UserContext } from "../../App";
import { useTranslation } from "react-i18next";
import IsAdminRender from "../Secured/IsAdminRender";

export default () => {

    const {logout, loggedIn } = useContext(UserContext);

    const { t } = useTranslation("header");

    const logoutClick = (e) => {
        e.preventDefault();
        setCredentials(null);
        logout();
    }

    const loggedInBlock = loggedIn() ? (
        <>
            <li>
                <Link to="/login" onClick={logoutClick} className="navbar_li_a">{t("logout")}<i className="fa fa-chevron-down" id="drop-down-icon"></i></Link>
                <ul>
                    <li className="dropdown-li"><Link to="/userInfo" className="navbar_li_a drop_link" id="user-info">{t("userInfo")}</Link></li>
                </ul>
            </li>
        </>
    ) :
        <>
            <li>
                <Link to="/login" className="navbar_li_a">{t("login")}<i className="fa fa-chevron-down" id="drop-down-icon"></i></Link>
                <ul>
                    <li className="dropdown-li"><Link to="/user/new" className="navbar_li_a drop_link">{t("newAccount")}</Link></li>
                </ul>
            </li>
        </>
    return (
        <header>
            <div className="logo">
                <h1 className="logo-text" id="color-yellow"><span id="color-blue">Happy</span>Vacation</h1>
            </div>
            <ul className="nav">
                <li><Link to="/themes" className="navbar_li_a">{t("themes")}</Link></li>
                <li><Link to="/articles" className="navbar_li_a">{t("articles")}</Link></li>
                <li><Link to="/trips" className="navbar_li_a">{t("trips")}</Link></li>
                <IsAdminRender>
                    <li><Link to="/articles/article" className="navbar_li_a">{t("createArticle")}</Link></li>
                </IsAdminRender>
                {loggedInBlock}
            </ul>
        </header>
    )
}