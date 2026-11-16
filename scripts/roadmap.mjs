// Saves the LuxEngine project board (github.com/orgs/starbounded-dev/projects/3)
// to lib/roadmap.json, the /lux roadmap's fallback when GitHub is unavailable.
//
// The site reads the project through GraphQL with a server-side token. Run
// `npm run roadmap:sync` occasionally to keep its committed fallback useful.
//
// Token: GITHUB_TOKEN if set, otherwise `gh auth token`. It needs the
// read:project (or project) scope.
import { writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ORG = "starbounded-dev";
const PROJECT = 3;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "lib/roadmap.json");

function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  const gh = spawnSync("gh", ["auth", "token"], { encoding: "utf8" });
  if (gh.status === 0 && gh.stdout.trim()) return gh.stdout.trim();
  console.error(
    "No token. Set GITHUB_TOKEN, or sign in with `gh auth login` and run `gh auth refresh -s read:project`.",
  );
  process.exit(1);
}

const query = `
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

async function page(auth, after) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
      "User-Agent": "starbounded-site-roadmap-sync",
    },
    body: JSON.stringify({
      query,
      variables: { org: ORG, number: PROJECT, after },
    }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) {
    console.error(JSON.stringify(json.errors ?? json, null, 2));
    process.exit(1);
  }
  return json.data.organization.projectV2;
}

const auth = token();
const items = [];
let project;
let after = null;
do {
  project = await page(auth, after);
  items.push(...project.items.nodes);
  after = project.items.pageInfo.hasNextPage
    ? project.items.pageInfo.endCursor
    : null;
} while (after);

const normalized = items
  .map((node) => {
    const fields = Object.fromEntries(
      node.fieldValues.nodes
        .filter((v) => v.field)
        .map((v) => [v.field.name.toLowerCase(), v.name]),
    );
    const c = node.content ?? {};
    const kind =
      c.__typename === "PullRequest"
        ? "pr"
        : c.__typename === "Issue"
          ? "issue"
          : "draft";
    return {
      kind,
      number: c.number ?? null,
      title: c.title ?? "",
      url: c.url ?? null,
      status: fields.status ?? "Todo",
      priority: fields.priority ?? null,
      size: fields.size ?? null,
      milestone: c.milestone?.title ?? null,
      parent: c.parent?.number ?? null,
      subIssues: c.subIssuesSummary?.total
        ? { total: c.subIssuesSummary.total, done: c.subIssuesSummary.completed }
        : null,
      closedAt: c.mergedAt ?? c.closedAt ?? null,
    };
  })
  .sort(
    (a, b) =>
      (a.kind === b.kind ? 0 : a.kind === "issue" ? -1 : 1) ||
      (a.number ?? 0) - (b.number ?? 0),
  );

writeFileSync(
  out,
  JSON.stringify(
    {
      board: { title: project.title, url: project.url },
      syncedAt: new Date().toISOString(),
      items: normalized,
    },
    null,
    2,
  ) + "\n",
);
const count = (s) => normalized.filter((i) => i.status === s).length;
console.log(
  `Saved ${normalized.length} items to lib/roadmap.json: ${count("Done")} done, ${count("In Progress")} in progress, ${count("Todo")} todo.`,
);
