import backend from "../api/backend"
import { Link, useLoaderData } from "react-router-dom";
import './summary.css';
import React from "react";
import { components } from "../api/types";
import { useTranslation } from "react-i18next";

export async function loader({ params }) {
    return await backend.GET('/v1/analysis/page/{page}', {
        params: {
            path: {
                page: params.page || 1
            }
        }
    })
}

function Summary() {
    const { t } = useTranslation();
    const pageData = useLoaderData() as {
        data?: components["schemas"]["GetAnalysisByPageResponse"],
        error?: {
            detail?: any
        }
    };
    if (!pageData?.data) {
        let error_detail: React.JSX.Element | null = null;
        if (pageData?.error) {
            error_detail = <p>{JSON.stringify(pageData.error)}</p>
        }
        return (
            <>
                <p>Failed to load data.</p>
                {error_detail}
            </>
        )
    }
    const pageCount = pageData.data.total_page;
    const pageIndex = pageData.data.page;
    const pageContent = pageData.data.items;
    return (
        <>
            <div className="content">
                <table className="contentTable">
                    <tr>
                        <th rowSpan={2}>ID</th>
                        <th rowSpan={2}>{t("Summary.Site")}</th>
                        <th colSpan={3}>{t("Summary.Outgoing")}</th>
                        <th colSpan={3}>{t("Summary.Incoming")}</th>
                    </tr>
                    <tr>
                        <th>{t("Summary.Total")}</th>
                        <th>{t("Summary.AvgDistance")}</th>
                        <th>{t("Summary.6Degrees")}</th>
                        <th>{t("Summary.Total")}</th>
                        <th>{t("Summary.AvgDistance")}</th>
                        <th>{t("Summary.6Degrees")}</th>
                    </tr>
                    {pageContent.map(item => (
                        <tr key={item.id}>
                            <td className="col-id">{item.id}</td>
                            <td className="col-site"><a className="site-url" href={item.url} target="_blank">{item.name}</a>{
                                item.links &&
                                <a href={item.links} className="links-page" target="_blank">{t("Summary.ViewLinks")}</a> ||
                                <span className="links-page">{t("Summary.NoLinks")}</span>
                            }</td>
                            <td className="col-outgoing-total">{item.outgoing_count}</td>
                            <td className="col-outgoing-avg-distance">{item.outgoing_average_distance.toLocaleString(undefined, { maximumFractionDigits: 4, minimumFractionDigits: 4 })}</td>
                            <td className="col-outgoing-6degrees">{item.outgoing_count_in6degrees}</td>
                            <td className="col-incoming-total">{item.incoming_count}</td>
                            <td className="col-incoming-avg-distance">{item.incoming_average_distance.toLocaleString(undefined, { maximumFractionDigits: 4, minimumFractionDigits: 4 })}</td>
                            <td className="col-incoming-6degrees">{item.incoming_count_in6degrees}</td>
                        </tr>
                    ))}
                </table>
            </div>
            <div className="pagination">
                {pageIndex > 1 &&
                    <Link className="pagination-page-num" to={`/summary/1`}>1</Link>
                }
                {pageIndex > 4 &&
                    <span className="pagination-page-ellipsis">...</span>
                }
                {pageIndex > 3 &&
                    <Link className="pagination-page-num" to={`/summary/${pageIndex - 2}`}>{pageIndex - 2}</Link>
                }
                {pageIndex > 2 &&
                    <Link className="pagination-page-num" to={`/summary/${pageIndex - 1}`}>{pageIndex - 1}</Link>
                }
                <Link className="pagination-page-num pagination-page-current" to={`/summary/${pageIndex}`}>{pageIndex}</Link>
                {pageIndex < pageCount - 1 &&
                    <Link className="pagination-page-num" to={`/summary/${pageIndex + 1}`}>{pageIndex + 1}</Link>
                }
                {pageIndex < pageCount - 2 &&
                    <Link className="pagination-page-num" to={`/summary/${pageIndex + 2}`}>{pageIndex + 2}</Link>
                }
                {pageIndex < pageCount - 3 &&
                    <span className="pagination-page-ellipsis">...</span>
                }
                {pageIndex < pageCount &&
                    <Link className="pagination-page-num" to={`/summary/${pageCount}`}>{pageCount}</Link>
                }
            </div>
            <div className="pagination">
                {pageIndex > 1 &&
                    <Link className="pagination-page-previous" to={`/summary/${pageIndex - 1}`}>{t("Pagination.Previous")}</Link> ||
                    <span className="pagination-page-previous">{t("Pagination.Previous")}</span>
                }

                {pageIndex < pageCount &&
                    <Link className="pagination-page-next" to={`/summary/${pageIndex + 1}`}>{t("Pagination.Next")}</Link> ||
                    <span className="pagination-page-next" >{t("Pagination.Next")}</span>
                }
            </div>
        </>
    )
}

export default Summary
