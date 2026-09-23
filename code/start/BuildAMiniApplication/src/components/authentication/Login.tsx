import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole } from "lucide-react";

import workshopImage from "@/assets/workshop.jpg";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login() {
        const login = useAuthStore((state) => state.login);
        const navigate = useNavigate();
        const location = useLocation();
        const [email, setEmail] = useState("worker@workshop.local");
        const [password, setPassword] = useState("workshop");
        const [error, setError] = useState("");
        const destination = (location.state as { from?: string } | null)?.from ?? "/queue";

        function handleSubmit(event: FormEvent<HTMLFormElement>) {
                event.preventDefault();
                if (!login(email, password)) {
                        setError("Those credentials do not match the workshop ledger.");
                        return;
                }
                navigate(destination, { replace: true });
        }

        return (
                <div className="grid min-h-[calc(100vh-8rem)] overflow-hidden rounded-lg border bg-card lg:grid-cols-2">
                        <div className="relative hidden min-h-96 lg:block">
                                <img src={workshopImage} alt="Tools and materials inside the workshop" className="absolute inset-0 h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-10">
                                        <p className="text-sm font-medium uppercase tracking-wider text-primary">Workshop workers only</p>
                                        <h1 className="mt-3 max-w-md text-4xl font-semibold tracking-tight">The queue is waiting behind the ledger.</h1>
                                </div>
                        </div>
                        <div className="flex items-center p-6 md:p-10">
                                <form className="mx-auto w-full max-w-md space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                                <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary"><LockKeyhole /></div>
                                                <p className="text-sm font-medium uppercase tracking-wider text-primary">Worker access</p>
                                                <h2 className="mt-2 text-3xl font-semibold tracking-tight">Welcome back to the workshop.</h2>
                                                <p className="mt-2 text-muted-foreground">Sign in to view and tend to the custom orders in progress.</p>
                                        </div>
                                        <div className="space-y-4">
                                                <div className="space-y-2"><Label htmlFor="worker-email">Worker email</Label><Input id="worker-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
                                                <div className="space-y-2"><Label htmlFor="worker-password">Password</Label><Input id="worker-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
                                        </div>
                                        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
                                        <Button type="submit" className="w-full">Enter the queue <ArrowRight /></Button>
                                        <p className="text-center text-sm text-muted-foreground"><Link className="underline underline-offset-4 hover:text-foreground" to="/">Return to the storefront</Link></p>
                                        <p className="rounded-md bg-muted p-3 text-xs text-muted-foreground">Demo worker: `worker@workshop.local` / `workshop`</p>
                                </form>
                        </div>
                </div>
        );
}
