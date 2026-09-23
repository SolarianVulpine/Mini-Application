import { useEffect, useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { QueueInput, QueueItem } from "@/types/queue";

export function QueueForm({ item, onSubmit, onCancel, submitLabel }: { item?: QueueItem; onSubmit: (input: QueueInput) => void; onCancel: () => void; submitLabel: string }) {
        const [title, setTitle] = useState(item?.title ?? "");
        const [description, setDescription] = useState(item?.description ?? "");

        useEffect(() => { setTitle(item?.title ?? ""); setDescription(item?.description ?? ""); }, [item]);

        function handleSubmit(event: FormEvent<HTMLFormElement>) {
                event.preventDefault();
                onSubmit({ title: title.trim(), description: description.trim() });
        }

        return (
                <form className="space-y-4 rounded-lg border bg-card p-5" onSubmit={handleSubmit}>
                        <div><p className="font-medium">{item ? "Edit order" : "Add a new order"}</p><p className="text-sm text-muted-foreground">Leave a clear note for the next pair of hands.</p></div>
                        <div className="space-y-2"><Label htmlFor="queue-title">Title</Label><Input id="queue-title" value={title} onChange={(event) => setTitle(event.target.value)} required /></div>
                        <div className="space-y-2"><Label htmlFor="queue-description">Description</Label><Textarea id="queue-description" value={description} onChange={(event) => setDescription(event.target.value)} required /></div>
                        <div className="flex flex-wrap justify-end gap-2"><Button type="button" variant="ghost" onClick={onCancel}><X />Cancel</Button><Button type="submit"><Check />{submitLabel}</Button></div>
                </form>
        );
}
