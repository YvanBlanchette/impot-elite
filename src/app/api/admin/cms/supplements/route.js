import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
	try {
		const supplements = await prisma.supplement.findMany({
			orderBy: { ordre: "asc" },
		});
		return NextResponse.json(supplements);
	} catch (error) {
		console.error("Erreur API Suppléments:", error);
		return NextResponse.json({ error: "Impossible de charger les suppléments" }, { status: 500 });
	}
}
