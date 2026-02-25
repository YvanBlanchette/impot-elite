// src/hooks/useIsAdmin.js
import { useUser } from "@clerk/nextjs";

export function useIsAdmin() {
	const { user } = useUser();
	return user?.publicMetadata?.role === "admin";
}
