import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
        const [submitted, setSubmitted] = useState(false);

        function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
                event.preventDefault();
                setSubmitted(true);
        }

        return (
                <Card>
                        <CardHeader>
                                <p className="text-sm font-medium uppercase tracking-wider text-primary">Start a conversation</p>
                                <CardTitle className="text-2xl">Ask about a custom piece</CardTitle>
                        </CardHeader>
                        <CardContent>
                                <form className="space-y-5" onSubmit={handleSubmit}>
                                        <div className="grid gap-5 md:grid-cols-2">
                                                <div className="space-y-2">
                                                        <Label htmlFor="name">Name</Label>
                                                        <Input id="name" name="name" placeholder="Your name" required />
                                                </div>
                                                <div className="space-y-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input id="email" name="email" placeholder="you@example.com" required type="email" />
                                                </div>
                                        </div>
                                        <div className="space-y-2">
                                                <Label htmlFor="message">What can we make for you?</Label>
                                                <Textarea id="message" name="message" placeholder="Tell us about your custom product or service..." required />
                                        </div>
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <p className="text-sm text-muted-foreground" role="status">
                                                        {submitted ? "Your message is ready for the workshop." : "We will use your details only to respond to this request."}
                                                </p>
                                                <Button type="submit">Send inquiry</Button>
                                        </div>
                                </form>
                        </CardContent>
                </Card>
        );
}
