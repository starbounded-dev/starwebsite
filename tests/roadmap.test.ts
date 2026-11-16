import assert from "node:assert/strict";
import { test } from "node:test";
import { fetchProjectRoadmap, loadRoadmap } from "../lib/github-roadmap";

const item = (status: string) => ({
  fieldValues: {
    nodes: [{ name: status, field: { name: "Status" } }, { name: "P0", field: { name: "Priority" } }],
  },
  content: {
    __typename: "Issue",
    number: 38,
    title: "2027.1 M2: Skeletal animation",
    url: "https://github.com/starbounded-dev/LuxEngine/issues/38",
    milestone: { title: "2027.1" },
    subIssuesSummary: { total: 7, completed: 2 },
  },
});

const page = (nodes: unknown[], hasNextPage = false, endCursor: string | null = null) =>
  new Response(
    JSON.stringify({
      data: {
        organization: {
          projectV2: {
            title: "LuxEngine Project Roadmap",
            url: "https://github.com/orgs/starbounded-dev/projects/3",
            items: { nodes, pageInfo: { hasNextPage, endCursor } },
          },
        },
      },
    }),
    { status: 200 },
  );

test("live project status and sub-issue progress replace the saved board", async () => {
  const requests: (string | null)[] = [];
  const request = async (_url: string, init: RequestInit) => {
    const after = JSON.parse(String(init.body)).variables.after as string | null;
    requests.push(after);
    return after === null
      ? page([item("Done")], true, "next-page")
      : page([{ ...item("Todo"), content: { __typename: "DraftIssue", title: "Future idea" } }]);
  };

  const result = await loadRoadmap("test-token", request);
  assert.equal(result.source, "github");
  assert.deepEqual(requests, [null, "next-page"]);
  assert.equal(result.data.columns.mustTodo.length, 0);
  assert.equal(result.data.columns.shipped[0].number, 38);
  assert.deepEqual(result.data.columns.shipped[0].progress, { total: 7, done: 2 });
  assert.equal(result.data.releaseCounts.issues, 1);
});

test("an unavailable GitHub project uses the committed board copy", async () => {
  const offline = async () => {
    throw new Error("network down");
  };
  const result = await loadRoadmap("test-token", offline);
  assert.equal(result.source, "saved");
  assert.ok(result.data.columns.mustTodo.length > 0);

  const noToken = await loadRoadmap("", offline);
  assert.equal(noToken.source, "saved");
});

test("a later page failure never publishes a partial live board", async () => {
  let calls = 0;
  const request = async () => {
    calls++;
    return calls === 1 ? page([item("Done")], true, "next-page") : new Response("unavailable", { status: 503 });
  };
  const result = await loadRoadmap("test-token", request);
  assert.equal(calls, 2);
  assert.equal(result.source, "saved");
});

test("GraphQL rejects a project item without a known board status", async () => {
  await assert.rejects(
    fetchProjectRoadmap("test-token", async () => page([item("Blocked")])),
    /recognized status/,
  );
});

test("a board item with no status field defaults to Todo", async () => {
  const unassigned = { ...item("Todo"), fieldValues: { nodes: [null] } };
  const result = await fetchProjectRoadmap("test-token", async () => page([unassigned]));
  assert.equal(result.items[0].status, "Todo");
});
