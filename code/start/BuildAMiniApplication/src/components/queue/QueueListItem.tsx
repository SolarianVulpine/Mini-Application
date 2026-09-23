import { ChevronRight } from "lucide-react";

import { QueueStatusBadge } from "@/components/queue/QueueStatusBadge";
import type { QueueItem } from "@/types/queue";

export function QueueListItem({ item, selected, onSelect }: { item: QueueItem; selected: boolean; onSelect: () => void }) {
        return (
                <button type="button" onClick={onSelect} className={`flex w-full items-center justify-between gap-4 border-b p-4 text-left transition-colors hover:bg-muted/60 ${selected ? "bg-muted" : ""}`}>
                        <span className="min-w-0"><span className="block truncate font-medium">{item.title}</span><span className="mt-1 block text-xs text-muted-foreground">Added {item.createdAt}</span></span>
                        <span className="flex shrink-0 items-center gap-2"><QueueStatusBadge status={item.status} /><ChevronRight className="size-4 text-muted-foreground" /></span>
                </button>
        );
}
