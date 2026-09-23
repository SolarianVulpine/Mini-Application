export type QueueStatus = "queued" | "in-progress" | "completed";

export type QueueItem = {
        id: string;
        title: string;
        description: string;
        status: QueueStatus;
        createdAt: string;
        completedAt?: string;
};

export type QueueInput = Pick<QueueItem, "title" | "description">;

export type QueueResponse = {
        items: QueueItem[];
        page: number;
        pageSize: number;
        total: number;
        hasNextPage: boolean;
};
