import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui/input";

type SearchBarProps = {
        mobile?: boolean;
        onSubmit?: () => void;
};

export function SearchBar({ mobile = false, onSubmit }: SearchBarProps) {
        const navigate = useNavigate();
        const [searchParams] = useSearchParams();
        const [query, setQuery] = useState(searchParams.get("q") ?? "");

        function handleSubmit(event: FormEvent<HTMLFormElement>) {
                event.preventDefault();
                const trimmedQuery = query.trim();
                navigate(trimmedQuery ? `/products?q=${encodeURIComponent(trimmedQuery)}` : "/products");
                onSubmit?.();
        }

        return (
                <form className={`relative ${mobile ? "w-full" : "w-40"}`} onSubmit={handleSubmit} role="search">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                                aria-label="Search products"
                                className="h-9 pl-9"
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search products"
                                type="search"
                                value={query}
                        />
                </form>
        );
}
