/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/v1/analysis": {
    /** Get Analysis All */
    get: operations["get_analysis_all_v1_analysis_get"];
  };
  "/v1/analysis/page/{page}": {
    /** Get Analysis By Page */
    get: operations["get_analysis_by_page_v1_analysis_page__page__get"];
  };
  "/v1/shortest-paths/{source}/{target}": {
    /** Get Shortest Paths */
    get: operations["get_shortest_paths_v1_shortest_paths__source___target__get"];
  };
  "/v1/successors/{source_id}": {
    /** Get Successors */
    get: operations["get_successors_v1_successors__source_id__get"];
  };
  "/v1/predecessors/{target_id}": {
    /** Get Predecessors */
    get: operations["get_predecessors_v1_predecessors__target_id__get"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** AnalysisItem */
    AnalysisItem: {
      /** Id */
      id: number;
      /** Name */
      name: string;
      /** Url */
      url: string;
      /** Links */
      links: string;
      /** Outgoing Count */
      outgoing_count: number;
      /** Outgoing Count In6Degrees */
      outgoing_count_in6degrees: number;
      /** Outgoing Average Distance */
      outgoing_average_distance: number;
      /** Incoming Count */
      incoming_count: number;
      /** Incoming Count In6Degrees */
      incoming_count_in6degrees: number;
      /** Incoming Average Distance */
      incoming_average_distance: number;
    };
    /** BlogBrief */
    BlogBrief: {
      /** Id */
      id: number;
      /** Name */
      name: string;
      /** Url */
      url: string;
    };
    /** BuildInfo */
    BuildInfo: {
      /** Build Time */
      build_time: string;
      /** Members */
      members: number;
      /** Connections */
      connections: number;
      /** Average Connections */
      average_connections: number;
    };
    /** GetAnalysisAllResponse */
    GetAnalysisAllResponse: {
      build_info: components["schemas"]["BuildInfo"];
      /** Total */
      total: number;
      /** Items */
      items: components["schemas"]["AnalysisItem"][];
    };
    /** GetAnalysisByPageResponse */
    GetAnalysisByPageResponse: {
      build_info: components["schemas"]["BuildInfo"];
      /** Total Items */
      total_items: number;
      /** Total Page */
      total_page: number;
      /** Page */
      page: number;
      /** Items */
      items: components["schemas"]["AnalysisItem"][];
    };
    /** GetPredecessorsResponse */
    GetPredecessorsResponse: {
      /** Target Id */
      target_id: number;
      /** Nodes */
      nodes: components["schemas"]["BlogBrief"][];
    };
    /** GetShortestPathsNotFoundResponse */
    GetShortestPathsNotFoundResponse: {
      /** Detail */
      detail: string;
    };
    /** GetShortestPathsResponse */
    GetShortestPathsResponse: {
      /** Source Id */
      source_id: number;
      /** Target Id */
      target_id: number;
      /** Distance */
      distance: number;
      /** Nodes */
      nodes: components["schemas"]["BlogBrief"][];
      /** Paths */
      paths: number[][];
    };
    /** GetSuccessorsResponse */
    GetSuccessorsResponse: {
      /** Source Id */
      source_id: number;
      /** Nodes */
      nodes: components["schemas"]["BlogBrief"][];
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** Get Analysis All */
  get_analysis_all_v1_analysis_get: {
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["GetAnalysisAllResponse"];
        };
      };
    };
  };
  /** Get Analysis By Page */
  get_analysis_by_page_v1_analysis_page__page__get: {
    parameters: {
      query?: {
        q?: string | null;
      };
      path: {
        page: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["GetAnalysisByPageResponse"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Shortest Paths */
  get_shortest_paths_v1_shortest_paths__source___target__get: {
    parameters: {
      path: {
        source: string;
        target: string;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["GetShortestPathsResponse"];
        };
      };
      /** @description Not Found */
      404: {
        content: {
          "application/json": components["schemas"]["GetShortestPathsNotFoundResponse"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Successors */
  get_successors_v1_successors__source_id__get: {
    parameters: {
      path: {
        source_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["GetSuccessorsResponse"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  /** Get Predecessors */
  get_predecessors_v1_predecessors__target_id__get: {
    parameters: {
      path: {
        target_id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["GetPredecessorsResponse"];
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}
