import * as React from "react";
import * as ReactDOM from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import translation_en from '../locales/translation-en.json';
import translation_zh_CN from '../locales/translation-zh-CN.json';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import About from "./routes/about";
import Summary, { loader as summaryLoader } from "./routes/summary";
import FindPaths, { loader as findPathsLoader, action as findPathsAction } from "./routes/find_paths";
import ErrorPage from "./error-page";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        supportedLngs: ['en', 'zh-CN'],
        detection: {
            caches: [],
        },
        resources: {
            en: {
                translation: translation_en
            },
            "zh-CN": {
                translation: translation_zh_CN
            },
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/",
                element: <Summary />,
                loader: summaryLoader,
            },
            {
                path: "/summary",
                element: <Summary />,
                loader: summaryLoader,
            },
            {
                path: "/summary/:page",
                element: <Summary />,
                loader: summaryLoader,
            },
            {
                path: "/find-paths",
                element: <FindPaths />,
                action: findPathsAction,
            },
            {
                path: "/find-paths/:source/:target",
                element: <FindPaths />,
                loader: findPathsLoader,
                action: findPathsAction,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
