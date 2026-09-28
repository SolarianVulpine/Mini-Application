import { describe, expect, it } from "vitest";

import { authenticateWorker } from "@/api/auth-api";

describe("auth API", () => {
        it("authenticates a worker through MSW", async () => {
                await expect(authenticateWorker("worker@workshop.local", "workshop")).resolves.toEqual({
                        email: "worker@workshop.local",
                        name: "Workshop worker",
                });
        });

        it("rejects invalid worker credentials", async () => {
                await expect(authenticateWorker("worker@workshop.local", "wrong-password")).rejects.toThrow();
        });
});