import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { QueueItem } from "@/types/queue";

export function DeleteQueueDialog({ item, onCancel, onConfirm }: { item: QueueItem; onCancel: () => void; onConfirm: () => void }) {
        const [acknowledged, setAcknowledged] = useState(false);

        return (
                <div className="space-y-4 rounded-lg border border-destructive/40 bg-destructive/5 p-5" role="alertdialog" aria-labelledby="delete-title">
                        <div className="flex gap-3"><AlertTriangle className="mt-0.5 shrink-0 text-destructive" /><div><h3 id="delete-title" className="font-medium">Delete {item.title}?</h3><p className="mt-1 text-sm text-muted-foreground">This action cannot be reversed and will remove the order from the workshop queue.</p></div></div>
                        <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1" />I understand that this action cannot be reversed.</label>
                        <div className="flex justify-end gap-2"><Button type="button" variant="ghost" onClick={onCancel}>Keep order</Button><Button type="button" variant="destructive" disabled={!acknowledged} onClick={onConfirm}><Trash2 />Delete permanently</Button></div>
                </div>
        );
}
