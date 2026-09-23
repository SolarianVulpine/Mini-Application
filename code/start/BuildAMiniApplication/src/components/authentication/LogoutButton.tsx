import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export function LogoutButton() {
        const logout = useAuthStore((state) => state.logout);

        return (
                <Button type="button" variant="outline" size="sm" onClick={logout}>
                        <LogOut />
                        Sign out
                </Button>
        );
}
