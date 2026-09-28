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

        it("supports create, edit, status, completion, and acknowledged delete flows", async () => {
                const user = userEvent.setup();
                renderQueue();

                await screen.findByRole("heading", { name: "Star-glass compass" });

                await user.click(screen.getByRole("button", { name: "Add new order" }));
                await user.type(screen.getByLabelText("Title"), "Workflow test order");
                await user.type(screen.getByLabelText("Description"), "Created for the queue workflow test.");
                await user.click(screen.getByRole("button", { name: "Add to queue" }));

                const createdOrder = await screen.findByRole("button", { name: /Workflow test order/ });
                await user.click(createdOrder);
                expect(await screen.findByRole("heading", { name: "Workflow test order" })).toBeInTheDocument();

                await user.click(screen.getByRole("button", { name: "Edit" }));
                const titleInput = screen.getByLabelText("Title");
                await user.clear(titleInput);
                await user.type(titleInput, "Updated workflow order");
                await user.click(screen.getByRole("button", { name: "Save changes" }));
                expect(await screen.findByRole("heading", { name: "Updated workflow order" })).toBeInTheDocument();

                await user.click(screen.getByRole("button", { name: "Start work" }));
                expect(await screen.findByRole("button", { name: "Return to queue" })).toBeInTheDocument();

                await user.click(screen.getByRole("button", { name: "Mark complete" }));
                await waitFor(() => expect(screen.queryByRole("button", { name: "Mark complete" })).not.toBeInTheDocument());
                expect(screen.getAllByText("Completed").length).toBeGreaterThan(0);

                await user.click(screen.getByRole("button", { name: "Delete" }));
                const deleteButton = screen.getByRole("button", { name: "Delete permanently" });
                expect(deleteButton).toBeDisabled();
                await user.click(screen.getByRole("checkbox", { name: /I understand/ }));
                expect(deleteButton).toBeEnabled();
                await user.click(deleteButton);

                await waitFor(() => expect(screen.queryByRole("heading", { name: "Updated workflow order" })).not.toBeInTheDocument());
        });
});