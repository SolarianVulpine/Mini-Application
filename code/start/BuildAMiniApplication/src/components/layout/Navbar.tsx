import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, ShoppingCart, Sun, X } from "lucide-react";

import { useCartStore } from "@/stores/cart-store";
import { useThemeStore } from "@/stores/theme-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/SearchBar";

const links = [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
        { label: "About", to: "/about" },
];

function Navbar() {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const { theme, toggleTheme } = useThemeStore();
        const itemCount = useCartStore((state) => state.getItemCount());

        useEffect(() => {
                document.documentElement.classList.toggle("dark", theme === "dark");
        }, [theme]);

        const closeMenu = () => setIsMenuOpen(false);

        return (
                <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
                                <Link to="/" className="shrink-0 text-xl font-semibold tracking-wide">
                                        The Workshop
                                </Link>

                                <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
                                        {links.map((link) => (
                                                <NavLink
                                                        key={link.to}
                                                        to={link.to}
                                                        className={({ isActive }) =>
                                                                cn(
                                                                        "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                                                        isActive && "bg-accent text-accent-foreground",
                                                                )
                                                        }
                                                >
                                                        {link.label}
                                                </NavLink>
                                        ))}
                                </nav>

                                <div className="hidden items-center gap-2 md:flex">
                                        <SearchBar />
                                        <Button
                                                aria-label={`Cart with ${itemCount} items`}
                                                asChild
                                                className="relative"
                                                size="icon"
                                                variant="ghost"
                                        >
                                                <Link to="/cart">
                                                        <ShoppingCart />
                                                        {itemCount > 0 && (
                                                                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                                                                        {itemCount}
                                                                </span>
                                                        )}
                                                </Link>
                                        </Button>
                                        <Button
                                                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                                                onClick={toggleTheme}
                                                size="icon"
                                                variant="ghost"
                                        >
                                                {theme === "light" ? <Moon /> : <Sun />}
                                        </Button>
                                </div>

                                <Button
                                        aria-expanded={isMenuOpen}
                                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                        className="md:hidden"
                                        onClick={() => setIsMenuOpen((open) => !open)}
                                        size="icon"
                                        variant="ghost"
                                >
                                        {isMenuOpen ? <X /> : <Menu />}
                                </Button>
                        </div>

                        {isMenuOpen && (
                                <div className="border-t px-4 pb-4 md:hidden">
                                        <nav className="container mx-auto flex flex-col gap-1 pt-3" aria-label="Mobile navigation">
                                                {links.map((link) => (
                                                        <NavLink
                                                                key={link.to}
                                                                to={link.to}
                                                                onClick={closeMenu}
                                                                className={({ isActive }) =>
                                                                        cn(
                                                                                "rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                                                                                isActive && "bg-accent text-accent-foreground",
                                                                        )
                                                                }
                                                        >
                                                                {link.label}
                                                        </NavLink>
                                                ))}
                                                <SearchBar mobile onSubmit={closeMenu} />
                                                <NavLink to="/cart" onClick={closeMenu} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
                                                        <ShoppingCart className="size-4" />
                                                        Cart ({itemCount})
                                                </NavLink>
                                                <button
                                                        type="button"
                                                        onClick={toggleTheme}
                                                        className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-accent"
                                                >
                                                        {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
                                                        {theme === "light" ? "Dark mode" : "Light mode"}
                                                </button>
                                        </nav>
                                </div>
                        )}
                </header>
        );
}

export default Navbar;