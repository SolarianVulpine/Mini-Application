import { describe, expect, it } from "vitest";

import { createQueueItem, deleteQueueItem, fetchQueue, updateQueueStatus } from "@/api/queue-api";

describe("queue API", () => {
        it("supports paginated queue responses", async () => {
                const firstPage = await fetchQueue(1, 2);
                const secondPage = await fetchQueue(2, 2);

                expect(firstPage.items).toHaveLength(2);
                expect(secondPage.items).toHaveLength(2);
                expect(firstPage.hasNextPage).toBe(true);
                expect(secondPage.hasNextPage).toBe(false);
                expect(firstPage.items[0]?.id).not.toBe(secondPage.items[0]?.id);
        });

        it("serves the queue lifecycle through MSW", async () => {
                const initialQueue = await fetchQueue();
                expect(initialQueue.items).toHaveLength(4);

                const created = await createQueueItem({
                        title: "Test order",
                        description: "Created through the mocked API.",
                });
                expect(created.status).toBe("queued");

                const updated = await updateQueueStatus(created.id, "completed");
                expect(updated.status).toBe("completed");
                expect(updated.completedAt).toBeDefined();

                await deleteQueueItem(created.id);
                const finalQueue = await fetchQueue();
                expect(finalQueue.total).toBe(initialQueue.total);
                expect(finalQueue.items.some((item) => item.id === created.id)).toBe(false);
        });
});