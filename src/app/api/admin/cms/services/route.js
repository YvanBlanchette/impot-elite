import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
	try {
		const services = await prisma.service.findMany({
			orderBy: { ordre: "asc" },
		});
		return NextResponse.json(services);
	} catch (error) {
		console.error("Erreur API Services:", error);
		return NextResponse.json({ error: "Erreur lors du chargement" }, { status: 500 });
	}
}
