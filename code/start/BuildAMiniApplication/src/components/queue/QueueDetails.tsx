import { Check, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QueueStatusBadge } from "@/components/queue/QueueStatusBadge";
import type { QueueItem, QueueStatus } from "@/types/queue";

export function QueueDetails({ item, onEdit, onStatusChange, onComplete, onDelete }: { item?: QueueItem; onEdit: () => void; onStatusChange: (status: QueueStatus) => void; onComplete: () => void; onDelete: () => void }) {
        if (!item) return <div className="flex min-h-72 items-center justify-center rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">Select an order to see its details.</div>;

        return (
                <article className="rounded-lg border bg-card p-5 md:p-7">
                        <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm uppercase tracking-wider text-primary">Order detail</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">{item.title}</h2></div><QueueStatusBadge status={item.status} /></div>
                        <div className="mt-8 space-y-6"><div><h3 className="text-sm font-medium">Description</h3><p className="mt-2 leading-7 text-muted-foreground">{item.description}</p></div><div className="grid gap-4 border-y py-4 text-sm sm:grid-cols-2"><div><p className="text-muted-foreground">Added</p><p className="mt-1 font-medium">{item.createdAt}</p></div><div><p className="text-muted-foreground">Completed</p><p className="mt-1 font-medium">{item.completedAt ?? "Not yet"}</p></div></div></div>
                        <div className="mt-8 flex flex-wrap gap-2"><Button type="button" variant="outline" onClick={onEdit}><Pencil />Edit</Button>{item.status !== "completed" && <><Button type="button" variant="secondary" onClick={() => onStatusChange(item.status === "queued" ? "in-progress" : "queued")}>{item.status === "queued" ? "Start work" : "Return to queue"}</Button><Button type="button" onClick={onComplete}><Check />Mark complete</Button></>}<Button type="button" variant="destructive" className="ml-auto" onClick={onDelete}><Trash2 />Delete</Button></div>
                </article>
        );
}
