import { Badge } from "@/components/ui/badge";
import type { QueueStatus } from "@/types/queue";

const labels: Record<QueueStatus, string> = {
        queued: "Queued",
        "in-progress": "In progress",
        completed: "Completed",
};

export function QueueStatusBadge({ status }: { status: QueueStatus }) {
        return <Badge variant={status === "completed" ? "secondary" : "outline"}>{labels[status]}</Badge>;
}
