import type { QueueItem } from "@/types/queue";

export const queueSeed: QueueItem[] = [
        {
                id: "order-101",
                title: "Star-glass compass",
                description: "A brass travel compass with a hand-cut star-glass face.",
                status: "in-progress",
                createdAt: "2026-09-18",
        },
        {
                id: "order-102",
                title: "Workshop field journal",
                description: "Bound reclaimed leather with thick paper for field notes.",
                status: "queued",
                createdAt: "2026-09-19",
        },
        {
                id: "order-103",
                title: "Copper weather vane",
                description: "A small hand-hammered vane for the roof of a garden shed.",
                status: "queued",
                createdAt: "2026-09-20",
        },
        {
                id: "order-104",
                title: "Traveler's lantern",
                description: "A warm, compact lantern with a smoked glass cover.",
                status: "completed",
                createdAt: "2026-09-12",
                completedAt: "2026-09-17",
        },
];
