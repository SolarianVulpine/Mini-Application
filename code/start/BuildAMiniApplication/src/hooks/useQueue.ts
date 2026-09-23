import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createQueueItem, deleteQueueItem, fetchQueue, updateQueueItem, updateQueueStatus } from "@/api/queue-api";
import type { QueueInput, QueueStatus } from "@/types/queue";

export function useQueue(page = 1) {
        const queryClient = useQueryClient();
        const queryKey = ["queue", page];
        const refresh = () => queryClient.invalidateQueries({ queryKey: ["queue"] });

        const query = useQuery({ queryKey, queryFn: () => fetchQueue(page) });
        const create = useMutation({ mutationFn: createQueueItem, onSuccess: refresh });
        const update = useMutation({ mutationFn: ({ id, input }: { id: string; input: QueueInput }) => updateQueueItem(id, input), onSuccess: refresh });
        const updateStatus = useMutation({ mutationFn: ({ id, status }: { id: string; status: QueueStatus }) => updateQueueStatus(id, status), onSuccess: refresh });
        const remove = useMutation({ mutationFn: deleteQueueItem, onSuccess: refresh });

        return { ...query, create, update, updateStatus, remove };
}
