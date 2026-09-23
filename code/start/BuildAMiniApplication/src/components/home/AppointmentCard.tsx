import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AppointmentCardProps = {
        date: string;
        time: string;
        selected: boolean;
        onSelect: () => void;
};

export function AppointmentCard({ date, time, selected, onSelect }: AppointmentCardProps) {
        return (
                <Card className={selected ? "border-primary ring-1 ring-primary" : undefined}>
                        <CardHeader className="flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-base">{date}</CardTitle>
                                <CalendarDays className="size-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                                <Button className="w-full" onClick={onSelect} variant={selected ? "default" : "outline"}>
                                        {selected ? `Selected at ${time}` : time}
                                </Button>
                        </CardContent>
                </Card>
        );
}
