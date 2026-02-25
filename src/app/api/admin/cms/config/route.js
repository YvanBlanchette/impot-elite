import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// GET : Pour afficher le délai sur le site public
export async function GET() {
	try {
		const configs = await prisma.configuration.findMany();
		return NextResponse.json(configs);
	} catch (error) {
		return NextResponse.json({ error: "Erreur de récupération" }, { status: 500 });
	}
}

// PATCH : Pour que ton ami change le délai ou cache la section
export async function PATCH(req) {
	try {
		// Vérification de sécurité avec Clerk
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
		}

		const body = await req.json();
		const { cle, valeur, estVisible } = body;

		const configMiseAJour = await prisma.configuration.update({
			where: { cle: cle },
			data: {
				valeur,
				estVisible,
			},
		});

		return NextResponse.json(configMiseAJour);
	} catch (error) {
		return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
	}
}
