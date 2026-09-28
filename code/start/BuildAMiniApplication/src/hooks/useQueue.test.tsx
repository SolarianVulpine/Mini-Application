import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse, delay } from "msw";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";

import { queueSeed } from "@/data/queue-seed";
import { useQueue } from "@/hooks/useQueue";
import { server } from "@/test/setup";

function createWrapper() {
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

        return function QueryWrapper({ children }: { children: ReactNode }) {
                return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
        };
}

describe("useQueue", () => {
        it("keeps the previous page visible while the next page loads", async () => {
                server.use(
                        http.get(/\/api\/queue$/, async ({ request }) => {
                                const page = Number(new URL(request.url).searchParams.get("page") ?? 1);
                                if (page === 2) await delay(50);

                                const items = queueSeed.slice((page - 1) * 2, page * 2);
                                return HttpResponse.json({
                                        items,
                                        page,
                                        pageSize: 2,
                                        total: queueSeed.length,
                                        hasNextPage: page === 1,
                                });
                        }),
                );

                const { result, rerender } = renderHook(({ page }) => useQueue(page), {
                        initialProps: { page: 1 },
                        wrapper: createWrapper(),
                });

                await waitFor(() => expect(result.current.data?.page).toBe(1));
                expect(result.current.data?.items[0]?.id).toBe("order-101");

                rerender({ page: 2 });

                expect(result.current.isPlaceholderData).toBe(true);
                expect(result.current.isFetching).toBe(true);
                expect(result.current.data?.page).toBe(1);
                expect(result.current.data?.items[0]?.id).toBe("order-101");

                await waitFor(() => expect(result.current.data?.page).toBe(2));
                expect(result.current.data?.items[0]?.id).toBe("order-103");
        });
});