import { ContactForm } from "@/components/about/ContactForm";
import { FAQAccordion } from "@/components/about/FAQAccordion";
import { HistorySection } from "@/components/about/HistorySection";
import { Footer } from "@/components/layout/Footer";

export default function About() {
        return (
                <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-12">
                        <section className="lg:text-center">

                                <p className="text-sm font-medium uppercase tracking-wider text-primary">The workshop story</p>
                                <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl lg:mx-auto">Craft that outlasts the age that made it.</h1>
                                <p className="mt-4 max-w-2xl text-muted-foreground lg:mx-auto">Learn how a neutral forge became a home for unusual materials, careful hands, and curious commissions.</p>
                        </section>

                        <div className="grid gap-8 md:grid-cols-2 md:items-start">
                                <HistorySection />
                                <FAQAccordion />
                        </div>

                        <ContactForm />
                        <Footer />
                </div>
        );
}