import type { QueueInput, QueueItem, QueueResponse, QueueStatus } from "@/types/queue";

const queueEndpoint = typeof window === "undefined" ? "http://localhost/api/queue" : "/api/queue";

async function request<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
        const response = await fetch(input, init);
        if (!response.ok) {
                const message = await response.text();
                throw new Error(message || `Queue request failed with status ${response.status}`);
        }
        if (response.status === 204) return undefined as T;
        return response.json() as Promise<T>;
}

export async function fetchQueue(page = 1, pageSize = 6): Promise<QueueResponse> {
        const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
        return request<QueueResponse>(`${queueEndpoint}?${params}`);
}

export async function createQueueItem(input: QueueInput): Promise<QueueItem> {
        return request<QueueItem>(queueEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
        });
}

export async function updateQueueItem(id: string, input: QueueInput): Promise<QueueItem> {
        return request<QueueItem>(`${queueEndpoint}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
        });
}

export async function updateQueueStatus(id: string, status: QueueStatus): Promise<QueueItem> {
        return request<QueueItem>(`${queueEndpoint}/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
        });
}

export async function deleteQueueItem(id: string): Promise<void> {
        await request<void>(`${queueEndpoint}/${id}`, { method: "DELETE" });
}
