import backend from "../api/backend"
import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import './find_paths.css';
import React from "react";
import { components } from "../api/types";
import { useTranslation } from "react-i18next";

export async function loader({ params }) {
    return await backend.GET('/v1/shortest-paths/{source}/{target}', {
        params: {
            path: {
                source: params.source,
                target: params.target
            }
        }
    })
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const map = Object.fromEntries(formData);
    return redirect(`/find-paths/${map.source}/${map.target}`);
}

function FindPaths() {
    const { t } = useTranslation();
    const response = useLoaderData() as {
        data?: components["schemas"]["GetShortestPathsResponse"],
        error?: {
            detail?: any
        }
    } | undefined;
    let queried: React.JSX.Element | null = null;
    if (response?.data) {
        const node_map = new Map<number, components["schemas"]["BlogBrief"]>();
        response.data.nodes.forEach(node => {
            node_map.set(node.id, node);
        });
        const possible_paths = response.data.paths.map(path => {
            const items = path.map(node_id => node_map.get(node_id)).map(node => <li><a href={node?.url} target="_blank">{node?.name}</a></li>);
            return <li><ol className="link-paths">{items}</ol></li>;
        });
        const source_node = node_map.get(response.data.source_id);
        const target_node = node_map.get(response.data.target_id);
        queried = (
            <>
                <hr />
                <h2>{t("FindPaths.Brief")}</h2>
                <p>
                    {t("FindPaths.Brief.From")}<a href={source_node?.url} target="_blank">{source_node?.name}</a><br />
                    {t("FindPaths.Brief.To")}<a href={target_node?.url} target="_blank">{target_node?.name}</a><br />
                    {t("FindPaths.Brief.MinimumDistance")}<span>{response.data.distance == -1 && "+∞" || response.data.distance}</span>
                </p>
                {
                    response.data.distance != -1 &&
                    (<><h2>{t("FindPaths.PossiblePaths")}</h2><ul>{possible_paths}</ul></>)
                }
            </>
        )
    } else if (response?.error) {
        return (
            <>
                <p>{JSON.stringify(response.error)}</p>
            </>
        )
    }
    return (
        <>
            <div id="query-shortest-paths-container">
                <Form method="POST" id="query-shortest-paths">
                    <label>{t("FindPaths.Source")}</label>
                    <input type="text" name="source" />
                    <label>{t("FindPaths.Target")}</label>
                    <input type="text" name="target" />
                    <div className="form-operation-area">
                        <button type="submit">{t("FindPaths.Submit")}</button>
                    </div>
                </Form>
            </div>
            {queried}
        </>
    )
}

export default FindPaths
