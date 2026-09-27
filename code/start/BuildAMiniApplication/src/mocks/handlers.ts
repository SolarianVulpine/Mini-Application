import { http, HttpResponse } from "msw";

import { queueSeed } from "@/data/queue-seed";
import type { QueueInput, QueueItem, QueueStatus } from "@/types/queue";

const queueStorageKey = "workshop-queue";

function readQueue(): QueueItem[] {
        if (typeof window === "undefined") return [...queueSeed];

        try {
                const stored = JSON.parse(window.localStorage.getItem(queueStorageKey) ?? "null");
                return Array.isArray(stored) ? stored : [...queueSeed];
        } catch {
                return [...queueSeed];
        }
}

function saveQueue(items: QueueItem[]) {
        if (typeof window !== "undefined") window.localStorage.setItem(queueStorageKey, JSON.stringify(items));
}

let queueItems = readQueue();

function findQueueItem(id: string) {
        return queueItems.find((item) => item.id === id);
}

function missingQueueItem() {
        return HttpResponse.json({ message: "Queue item not found" }, { status: 404 });
}

export const handlers = [
        http.get("/api/queue", ({ request }) => {
                const url = new URL(request.url);
                const page = Number(url.searchParams.get("page") ?? 1);
                const pageSize = Number(url.searchParams.get("pageSize") ?? 6);
                const start = (page - 1) * pageSize;

                return HttpResponse.json({
                        items: queueItems.slice(start, start + pageSize),
                        page,
                        pageSize,
                        total: queueItems.length,
                        hasNextPage: start + pageSize < queueItems.length,
                });
        }),
        http.post("/api/queue", async ({ request }) => {
                const input = (await request.json()) as QueueInput;
                const item: QueueItem = {
                        ...input,
                        id: `order-${Date.now()}`,
                        status: "queued",
                        createdAt: new Date().toISOString().slice(0, 10),
                };
                queueItems = [item, ...queueItems];
                saveQueue(queueItems);
                return HttpResponse.json(item, { status: 201 });
        }),
        http.patch("/api/queue/:id/status", async ({ params, request }) => {
                const item = findQueueItem(String(params.id));
                if (!item) return missingQueueItem();

                const { status } = (await request.json()) as { status: QueueStatus };
                const updated = {
                        ...item,
                        status,
                        completedAt: status === "completed" ? new Date().toISOString().slice(0, 10) : undefined,
                };
                queueItems = queueItems.map((queueItem) => (queueItem.id === item.id ? updated : queueItem));
                saveQueue(queueItems);
                return HttpResponse.json(updated);
        }),
        http.patch("/api/queue/:id", async ({ params, request }) => {
                const item = findQueueItem(String(params.id));
                if (!item) return missingQueueItem();

                const input = (await request.json()) as QueueInput;
                const updated = { ...item, ...input };
                queueItems = queueItems.map((queueItem) => (queueItem.id === item.id ? updated : queueItem));
                saveQueue(queueItems);
                return HttpResponse.json(updated);
        }),
        http.delete("/api/queue/:id", ({ params }) => {
                if (!findQueueItem(String(params.id))) return missingQueueItem();

                queueItems = queueItems.filter((item) => item.id !== params.id);
                saveQueue(queueItems);
                return new HttpResponse(null, { status: 204 });
        }),
];
