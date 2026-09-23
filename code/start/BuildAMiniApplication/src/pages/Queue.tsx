import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { DeleteQueueDialog } from "@/components/queue/DeleteQueueDialog";
import { QueueDetails } from "@/components/queue/QueueDetails";
import { QueueForm } from "@/components/queue/QueueForm";
import { QueueList } from "@/components/queue/QueueList";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useQueue } from "@/hooks/useQueue";
import type { QueueInput } from "@/types/queue";

const emptyItems: never[] = [];

export default function Queue() {
        const [page, setPage] = useState(1);
        const [selectedId, setSelectedId] = useState<string>();
        const [editing, setEditing] = useState(false);
        const [adding, setAdding] = useState(false);
        const [deleting, setDeleting] = useState(false);
        const { data, isLoading, isError, refetch, create, update, updateStatus, remove } = useQueue(page);
        const items = data?.items ?? emptyItems;
        const selected = items.find((item) => item.id === selectedId) ?? items[0];

        useEffect(() => {
                if (!selectedId && items[0]) setSelectedId(items[0].id);
        }, [items, selectedId]);

        function submitCreate(input: QueueInput) {
                create.mutate(input, { onSuccess: () => { setAdding(false); setPage(1); } });
        }

        function submitUpdate(input: QueueInput) {
                if (selected) update.mutate({ id: selected.id, input }, { onSuccess: () => setEditing(false) });
        }

        function deleteSelected() {
                if (selected) remove.mutate(selected.id, { onSuccess: () => { setDeleting(false); setSelectedId(undefined); } });
        }

        return (
                <div className="flex min-h-[calc(100vh-8rem)] flex-col gap-8">
                        <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-medium uppercase tracking-wider text-primary">The workshop queue</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Keep the good work moving.</h1><p className="mt-2 max-w-xl text-muted-foreground">Review each custom order, leave a better note, and mark the work complete when it is ready to leave the bench.</p></div><Button type="button" onClick={() => { setAdding(true); setEditing(false); }}><Plus />Add new order</Button></header>
                        {adding && <QueueForm onSubmit={submitCreate} onCancel={() => setAdding(false)} submitLabel="Add to queue" />}
                        {isLoading && <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">Reading the workshop ledger...</div>}
                        {isError && <div className="rounded-lg border border-destructive/40 p-8 text-center"><p className="text-sm text-destructive">The queue could not be read.</p><Button type="button" variant="outline" className="mt-4" onClick={() => void refetch()}>Try again</Button></div>}
                        {!isLoading && !isError && <><div className="grid gap-6 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.5fr)]"><QueueList items={items} selectedId={selected?.id} onSelect={(id) => { setSelectedId(id); setEditing(false); setDeleting(false); }} /><div className="space-y-4">{editing && selected ? <QueueForm item={selected} onSubmit={submitUpdate} onCancel={() => setEditing(false)} submitLabel="Save changes" /> : deleting && selected ? <DeleteQueueDialog item={selected} onCancel={() => setDeleting(false)} onConfirm={deleteSelected} /> : <QueueDetails item={selected} onEdit={() => setEditing(true)} onStatusChange={(status) => selected && updateStatus.mutate({ id: selected.id, status })} onComplete={() => selected && updateStatus.mutate({ id: selected.id, status: "completed" })} onDelete={() => setDeleting(true)} />}</div></div><div className="flex justify-end gap-2"><Button type="button" variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((current) => current - 1)}><ChevronLeft />Previous</Button><span className="flex items-center px-2 text-sm text-muted-foreground">Page {page}</span><Button type="button" variant="outline" size="sm" disabled={!data?.hasNextPage} onClick={() => setPage((current) => current + 1)}>Next<ChevronRight /></Button></div></>}
                        <Footer />
                </div>
        );
}
