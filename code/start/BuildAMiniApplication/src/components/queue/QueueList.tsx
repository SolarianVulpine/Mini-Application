import { QueueListItem } from "@/components/queue/QueueListItem";
import type { QueueItem } from "@/types/queue";

export function QueueList({ items, selectedId, onSelect }: { items: QueueItem[]; selectedId?: string; onSelect: (id: string) => void }) {
        return (
                <div className="overflow-hidden rounded-lg border bg-card">
                        <div className="border-b px-4 py-3"><p className="text-sm font-medium">Current orders</p><p className="text-xs text-muted-foreground">Select an order to inspect the work.</p></div>
                        {items.length ? items.map((item) => <QueueListItem key={item.id} item={item} selected={item.id === selectedId} onSelect={() => onSelect(item.id)} />) : <p className="p-6 text-sm text-muted-foreground">The queue is clear for now.</p>}
                </div>
        );
}
