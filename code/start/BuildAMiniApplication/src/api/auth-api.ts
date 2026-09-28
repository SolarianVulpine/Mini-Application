import type { Worker } from "@/types/auth";

const authEndpoint = typeof window === "undefined" ? "http://localhost/api/auth/login" : "/api/auth/login";

export async function authenticateWorker(email: string, password: string): Promise<Worker> {
	const response = await fetch(authEndpoint, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || `Authentication failed with status ${response.status}`);
	}

	return response.json() as Promise<Worker>;
}
