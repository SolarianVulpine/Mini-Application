import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse, delay } from "msw";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { queueSeed } from "@/data/queue-seed";
import Queue from "@/pages/Queue";
import { server } from "@/test/setup";

function renderQueue() {
        const queryClient = new QueryClient({
                defaultOptions: {
                        queries: { retry: false },
                },
        });

        return render(
                <MemoryRouter>
                        <QueryClientProvider client={queryClient}>
                                <Queue />
                        </QueryClientProvider>
                </MemoryRouter>,
        );
}

describe("Queue page", () => {
        it("shows a loading state while the queue request is pending", async () => {
                server.use(
                        http.get(/\/api\/queue$/, async () => {
                                await delay(50);
                                return HttpResponse.json({
                                        items: queueSeed,
                                        page: 1,
                                        pageSize: 6,
                                        total: queueSeed.length,
                                        hasNextPage: false,
                                });
                        }),
                );

                renderQueue();

                expect(screen.getByText("Reading the workshop ledger...")).toBeInTheDocument();
                expect(await screen.findByRole("heading", { name: "Star-glass compass" })).toBeInTheDocument();
        });

        it("shows an error and retries the request", async () => {
                const user = userEvent.setup();
                let attempts = 0;
                server.use(
                        http.get(/\/api\/queue$/, () => {
                                attempts += 1;
                                if (attempts === 1) return HttpResponse.json({ message: "Temporary failure" }, { status: 500 });

                                return HttpResponse.json({
                                        items: queueSeed,
                                        page: 1,
                                        pageSize: 6,
                                        total: queueSeed.length,
                                        hasNextPage: false,
                                });
                        }),
                );

                renderQueue();

                expect(await screen.findByText("The queue could not be read.")).toBeInTheDocument();
                await user.click(screen.getByRole("button", { name: "Try again" }));

                await waitFor(() => expect(screen.getByRole("heading", { name: "Star-glass compass" })).toBeInTheDocument());
                expect(attempts).toBe(2);
        });
});