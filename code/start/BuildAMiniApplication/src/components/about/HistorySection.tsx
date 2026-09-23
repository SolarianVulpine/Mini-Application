import workshopImage from "@/assets/workshop.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HistorySection() {
        return (
                <Card className="overflow-hidden">
                        <img
                                src={workshopImage}
                                alt="The interior of the workshop"
                                className="h-56 w-full object-cover"
                        />
                        <CardHeader>
                                <p className="text-sm font-medium uppercase tracking-wider text-primary">A living craft</p>
                                <CardTitle className="text-2xl">Forged through changing ages</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                                <p>
                                        Through decades of royal conflicts, dragon raids, and shifting empires, the forge stood as sacred neutral ground, protected by the sheer necessity of its craft.
                                </p>
                                <p>
                                        Upon its grand meteorite-iron anvil, the famous Glass-Breaker Warhammer was quenched in leviathan oil, and the shattered crown of King Valen was re-fused with woven mithril thread.
                                </p>
                                <p>
                                        When Thrumlin finally faded into the stone, he left the workshop to his sharp-eyed halfling apprentice, Pipkin Bramble. Pipkin introduced the now-revered practice of folding celestial star-glass into heavy knight plate.
                                </p>
                        </CardContent>
                </Card>
        );
}
