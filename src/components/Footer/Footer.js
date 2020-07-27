import React from "react";
import './Footer.css';
import { useTranslation } from "react-i18next";


export default () => {

    const { t } = useTranslation("footer")
    const { i18n } = useTranslation()
    const changeLanguage = lang => e => {
        e.preventDefault()
        i18n.changeLanguage(lang)
    }

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h1 className="blue"><span className="yellow">Happy</span>Vacation</h1>
                    <p id="number">{t("officialNr")} - 123456789</p>
                    <p>{t("email")} - HappyVacation@gmail.com</p>
                    <div className="lang-block">
                        <span>{t("lang")}: </span>
                        <a href="#" onClick={changeLanguage('lt')} className="lang">LT</a>
                        &nbsp;
                        <a href="#" onClick={changeLanguage('en')} className="lang">EN</a>
                    </div>
                </div>
                <div className="footer-section links">
                    <p className="footer-section-header">{t("additionalInfo")}</p>
                    <ul className="footer-ul">
                        <li className="more-li">{t("aboutUs")}</li>
                        <li className="more-li">{t("gallery")}</li>
                        <li className="more-li">{t("offices")}</li>
                        <li className="more-li">{t("career")}</li>
                    </ul>
                </div>
                <div className="footer-section contact-form">
                    <p className="footer-section-header">{t("officialWebs")}</p>
                    <ul className="footer-ul">
                        <li className="more-li">Facebook - Facebook.com/HappyVacation</li>
                        <li className="more-li">Instagram - Instagram/HappyVacation</li>
                        <li className="more-li">Twitter - Twitter/HappyVacation</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; {t("copyrights")} 2020 | Rimantas Tatoris
        </div>
        </footer>
    )
}