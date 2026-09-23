import workshopImage from "@/assets/workshop.jpg";
import { Calendar } from "@/components/home/Calendar";
import { Footer } from "@/components/layout/Footer";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
        return (
                <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-12">
                        <section className="relative overflow-hidden rounded-lg border bg-card">
                                <img src={workshopImage} alt="Tools and materials inside the workshop" className="h-72 w-full object-cover md:h-96" />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/65 to-transparent" />
                                <div className="absolute inset-0 flex max-w-2xl flex-col justify-center gap-5 px-6 py-10 md:px-10">
                                        <p className="text-sm font-medium uppercase tracking-wider text-primary">Handcrafted for curious minds</p>
                                        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Find something worth keeping.</h1>
                                        <p className="max-w-lg text-muted-foreground">Explore practical tools, curious treasures, and workshop-made goods shaped with patience.</p>
                                        <div>
                                                <Button asChild>
                                                        <Link to="/products">Explore the collection</Link>
                                                </Button>
                                        </div>
                                </div>
                        </section>

                        <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-start">
                                <FeaturedProducts />
                                <Calendar />
                        </div>

                        <Footer />
                </div>
        );
}