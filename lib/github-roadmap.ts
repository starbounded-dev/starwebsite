import { buildRoadmap, fallbackRoadmap, type BoardItem, type BoardStatus, type RoadmapData, type RoadmapSnapshot } from "./roadmap";

const ORG = "starbounded-dev";
const PROJECT = 3;
const REFRESH_SECONDS = 300;

// The same Project V2 fields used by the manual backup-snapshot script.
const QUERY = `
query($org: String!, $number: Int!, $after: String) {
  organization(login: $org) {
    projectV2(number: $number) {
      title
      url
      items(first: 100, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes {
          fieldValues(first: 20) {
            nodes {
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field { ... on ProjectV2SingleSelectField { name } }
              }
            }
          }
          content {
            __typename
            ... on DraftIssue { title }
            ... on Issue {
              number title url state closedAt
              milestone { title }
              parent { number }
              subIssuesSummary { total completed }
            }
            ... on PullRequest { number title url state mergedAt }
          }
        }
      }
    }
  }
}`;

type ProjectItem = {
  fieldValues: {
    nodes: ({ name?: string; field?: { name: string } | null } | null)[];
  };
  content: {
    __typename: "Issue" | "PullRequest" | "DraftIssue";
    number?: number;
    title: string;
    url?: string;
    closedAt?: string | null;
    mergedAt?: string | null;
    milestone?: { title: string } | null;
    parent?: { number: number } | null;
    subIssuesSummary?: { total: number; completed: number } | null;
  } | null;
};

type ProjectPage = {
  title: string;
  url: string;
  items: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: ProjectItem[];
  };
};

type GraphqlResponse = {
  data?: { organization?: { projectV2?: ProjectPage | null } | null };
  errors?: { message: string }[];
};

type RoadmapFetch = (
  url: string,
  init: RequestInit & { next?: { revalidate: number } },
) => Promise<Response>;

function normalize(node: ProjectItem): BoardItem {
  const fields = Object.fromEntries(
    node.fieldValues.nodes.flatMap((value) =>
      value?.field?.name && value.name
        ? [[value.field.name.toLowerCase(), value.name]]
        : [],
    ),
  );
  const status = (fields.status ?? "Todo") as BoardStatus;
  if (status !== "Todo" && status !== "In Progress" && status !== "Done") {
    throw new Error("GitHub project item has no recognized status");
  }

  const content = node.content;
  if (!content?.title) throw new Error("GitHub project item has no title");
  const kind =
    content.__typename === "PullRequest"
      ? "pr"
      : content.__typename === "Issue"
        ? "issue"
        : "draft";

  return {
    kind,
    number: content.number ?? null,
    title: content.title,
    url: content.url ?? null,
    status,
    priority: fields.priority ?? null,
    size: fields.size ?? null,
    milestone: content.milestone?.title ?? null,
    parent: content.parent?.number ?? null,
    subIssues: content.subIssuesSummary?.total
      ? {
          total: content.subIssuesSummary.total,
          done: content.subIssuesSummary.completed,
        }
      : null,
    closedAt: content.mergedAt ?? content.closedAt ?? null,
  };
}

export async function fetchProjectRoadmap(
  token: string,
  request: RoadmapFetch = fetch,
): Promise<RoadmapSnapshot> {
  const items: BoardItem[] = [];
  let after: string | null = null;
  let board: RoadmapSnapshot["board"] | null = null;

  for (let page = 0; page < 10; page++) {
    const response = await request("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "starbounded-website-roadmap",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { org: ORG, number: PROJECT, after },
      }),
      next: { revalidate: REFRESH_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`GitHub GraphQL returned ${response.status}`);

    const result = (await response.json()) as GraphqlResponse;
    const project = result.data?.organization?.projectV2;
    if (result.errors?.length || !project?.items?.nodes || !project.items.pageInfo) {
      throw new Error("GitHub Project data is unavailable");
    }
    board = { title: project.title, url: project.url };
    items.push(...project.items.nodes.map(normalize));

    if (!project.items.pageInfo.hasNextPage) {
      return { board, syncedAt: new Date().toISOString(), items };
    }
    after = project.items.pageInfo.endCursor;
    if (!after) throw new Error("GitHub Project pagination cursor is missing");
  }

  throw new Error("GitHub Project exceeded the pagination limit");
}

export async function loadRoadmap(
  token = process.env.GITHUB_TOKEN,
  request: RoadmapFetch = fetch,
): Promise<{ data: RoadmapData; source: "github" | "saved" }> {
  if (!token) return { data: fallbackRoadmap, source: "saved" };
  try {
    return { data: buildRoadmap(await fetchProjectRoadmap(token, request)), source: "github" };
  } catch (error) {
    console.error("Could not refresh LuxEngine roadmap from GitHub:", error);
    return { data: fallbackRoadmap, source: "saved" };
  }
}
