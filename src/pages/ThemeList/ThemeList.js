import React, { useEffect, useState } from "react";
import themeApi from "../../api/themeApi";
import './ThemeList.css'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default () => {
    const {t} = useTranslation("themelist")
    const [themes, setThemes] = useState([]);
    useEffect(() => {
        themeApi.fetchThemes()
            .then(response => setThemes(response.data))
    }, [])

    return (
        <div id="main">
            <h1 className="title">{t("welcome")}</h1>
            <div className="inner">
                <div className="thumbnails">
                    {themes.map(theme => (
                        <div className="box" key={theme.id}>
                            <span className="image fit"><img src={theme.picture}></img></span>
                            <div className="inner">
                                <h3 className="theme-name">{theme.name}</h3>
                                <p className="theme-description">{theme.description}</p>
                                <Link to={`articles/` + theme.id} className="theme-button">{t("readMore")}</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
