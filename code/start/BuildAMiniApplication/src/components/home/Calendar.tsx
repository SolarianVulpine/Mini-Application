import { useState } from "react";

import { AppointmentCard } from "@/components/home/AppointmentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const appointments = [
        { date: "Tuesday, September 22", time: "10:00 AM" },
        { date: "Wednesday, September 23", time: "2:00 PM" },
        { date: "Saturday, September 26", time: "11:30 AM" },
];

export function Calendar() {
        const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

        return (
                <Card aria-labelledby="appointments-heading">
                        <CardHeader>
                                <p className="text-sm font-medium uppercase tracking-wider text-primary">Book a visit</p>
                                <CardTitle id="appointments-heading">Available appointments</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                                {appointments.map((appointment) => {
                                        const key = `${appointment.date}-${appointment.time}`;
                                        return (
                                                <AppointmentCard
                                                        key={key}
                                                        date={appointment.date}
                                                        time={appointment.time}
                                                        selected={selectedAppointment === key}
                                                        onSelect={() => setSelectedAppointment(key)}
                                                />
                                        );
                                })}
                                <p className="pt-2 text-sm text-muted-foreground" aria-live="polite">
                                        {selectedAppointment ? "Your appointment selection is ready to confirm." : "Choose a time to visit the workshop."}
                                </p>
                        </CardContent>
                </Card>
        );
}
