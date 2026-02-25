import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
	try {
		const faqs = await prisma.FAQ.findMany({
			where: { publie: true },
			orderBy: { ordre: "asc" },
		});

		return NextResponse.json(faqs);
	} catch (error) {
		console.error("Erreur API FAQ:", error);
		return NextResponse.json({ error: "Impossible de charger les items de la FAQ" }, { status: 500 });
	}
}
