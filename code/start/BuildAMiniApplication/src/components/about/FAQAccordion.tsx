import {
        Accordion,
        AccordionContent,
        AccordionItem,
        AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const questions = [
        ["Can I request a custom item?", "Yes. Use the contact form below to describe the piece, materials, and purpose you have in mind."],
        ["How long does a commission take?", "Small pieces usually take two to four weeks. Larger commissions receive a timeline after the first consultation."],
        ["Are the materials ethically sourced?", "The workshop prioritizes reclaimed, responsibly traded, and locally sourced materials whenever they are available."],
        ["Can I visit the workshop?", "Appointments are welcome during listed calendar hours so the craft can continue without interruption."],
];

export function FAQAccordion() {
        return (
                <Card className="md:sticky md:top-24 md:self-start">
                        <CardHeader>
                                <p className="text-sm font-medium uppercase tracking-wider text-primary">Common questions</p>
                                <CardTitle className="text-2xl">Before you enter the forge</CardTitle>
                        </CardHeader>
                        <CardContent>
                                <Accordion type="single" collapsible>
                                        {questions.map(([question, answer], index) => (
                                                <AccordionItem key={question} value={`question-${index}`}>
                                                        <AccordionTrigger>{question}</AccordionTrigger>
                                                        <AccordionContent>{answer}</AccordionContent>
                                                </AccordionItem>
                                        ))}
                                </Accordion>
                        </CardContent>
                </Card>
        );
}
