import React from 'react';
import { Trans, useTranslation } from "react-i18next";

function About() {
    const { t } = useTranslation();
    return (
        <>
            <p>
                <Trans i18nKey="About.Description">
                    A simple and open-source web app that presents links between <a href="https://www.travellings.cn/" target="_blank">Travellings</a> members.
                </Trans>
            </p>
            <h4>{t("About.Author")}</h4>
            <ul>
                <li><a href="https://alampy.com/?utm_source=travellings-graph" target='_blank'>ArcticLampyrid</a></li>
            </ul>
        </>
    )
}

export default About
