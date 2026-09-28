import { http, HttpResponse } from "msw";

import { queueSeed } from "@/data/queue-seed";
import type { Worker } from "@/types/auth";
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

function queueId(request: Request) {
        return new URL(request.url).pathname.split("/")[3] ?? "";
}

export const handlers = [
        http.post(/\/api\/auth\/login$/, async ({ request }) => {
                const { email, password } = (await request.json()) as { email: string; password: string };
                if (email.trim().toLowerCase() !== "worker@workshop.local" || password !== "workshop") {
                        return HttpResponse.json({ message: "Invalid worker credentials" }, { status: 401 });
                }

                const worker: Worker = { email: "worker@workshop.local", name: "Workshop worker" };
                return HttpResponse.json(worker);
        }),
        http.get(/\/api\/queue$/, ({ request }) => {
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
        http.post(/\/api\/queue$/, async ({ request }) => {
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
        http.patch(/\/api\/queue\/[^/]+\/status$/, async ({ request }) => {
                const item = findQueueItem(queueId(request));
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
        http.patch(/\/api\/queue\/[^/]+$/, async ({ request }) => {
                const item = findQueueItem(queueId(request));
                if (!item) return missingQueueItem();

                const input = (await request.json()) as QueueInput;
                const updated = { ...item, ...input };
                queueItems = queueItems.map((queueItem) => (queueItem.id === item.id ? updated : queueItem));
                saveQueue(queueItems);
                return HttpResponse.json(updated);
        }),
        http.delete(/\/api\/queue\/[^/]+$/, ({ request }) => {
                const id = queueId(request);
                if (!findQueueItem(id)) return missingQueueItem();

                queueItems = queueItems.filter((item) => item.id !== id);
                saveQueue(queueItems);
                return new HttpResponse(null, { status: 204 });
        }),
];
