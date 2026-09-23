import { queueSeed } from "@/data/queue-seed";
import type { QueueInput, QueueItem, QueueResponse, QueueStatus } from "@/types/queue";

const queueStorageKey = "workshop-queue";

function isQueueItem(value: unknown): value is QueueItem {
        if (!value || typeof value !== "object") return false;

        const item = value as Partial<QueueItem>;
        return (
                typeof item.id === "string" &&
                typeof item.title === "string" &&
                typeof item.description === "string" &&
                typeof item.createdAt === "string" &&
                (item.status === "queued" || item.status === "in-progress" || item.status === "completed")
        );
}

function readQueue(): QueueItem[] {
        if (typeof window === "undefined") return [...queueSeed];

        try {
                const stored = JSON.parse(window.localStorage.getItem(queueStorageKey) ?? "null");
                return Array.isArray(stored) && stored.every(isQueueItem) ? stored : [...queueSeed];
        } catch {
                return [...queueSeed];
        }
}

function saveQueue(items: QueueItem[]) {
        if (typeof window !== "undefined") {
                window.localStorage.setItem(queueStorageKey, JSON.stringify(items));
        }
}

let queueItems = readQueue();

export async function fetchQueue(page = 1, pageSize = 6): Promise<QueueResponse> {
        const start = (page - 1) * pageSize;
        const items = queueItems.slice(start, start + pageSize);

        return {
                items,
                page,
                pageSize,
                total: queueItems.length,
                hasNextPage: start + pageSize < queueItems.length,
        };
}

export async function createQueueItem(input: QueueInput): Promise<QueueItem> {
        const item: QueueItem = {
                ...input,
                id: `order-${Date.now()}`,
                status: "queued",
                createdAt: new Date().toISOString().slice(0, 10),
        };
        queueItems = [item, ...queueItems];
        saveQueue(queueItems);
        return item;
}

export async function updateQueueItem(id: string, input: QueueInput): Promise<QueueItem> {
        const existing = queueItems.find((item) => item.id === id);
        if (!existing) throw new Error("Queue item not found");

        const updated = { ...existing, ...input };
        queueItems = queueItems.map((item) => (item.id === id ? updated : item));
        saveQueue(queueItems);
        return updated;
}

export async function updateQueueStatus(id: string, status: QueueStatus): Promise<QueueItem> {
        const existing = queueItems.find((item) => item.id === id);
        if (!existing) throw new Error("Queue item not found");

        const updated = {
                ...existing,
                status,
                completedAt: status === "completed" ? new Date().toISOString().slice(0, 10) : undefined,
        };
        queueItems = queueItems.map((item) => (item.id === id ? updated : item));
        saveQueue(queueItems);
        return updated;
}

export async function deleteQueueItem(id: string): Promise<void> {
        queueItems = queueItems.filter((item) => item.id !== id);
        saveQueue(queueItems);
}
