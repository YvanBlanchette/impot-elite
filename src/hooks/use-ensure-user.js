"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export function useEnsureUser() {
    const { userId } = useAuth();

    useEffect(() => {
        if (!userId) return;
        fetch("/api/ensure-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });
    }, [userId]);
}