/// <reference types="vite/client" />

import createClient from "openapi-fetch";
import type { paths } from "./types";

const backendBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8471";
const backend = createClient<paths>({ baseUrl: backendBaseUrl });
export default backend;
