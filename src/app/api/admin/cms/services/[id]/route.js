import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(req, { params }) {
	try {
		const { userId } = auth();
		if (!userId) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

		const { id } = params;
		const body = await req.json();

		// On s'assure que le prix est un nombre si envoyé
		const data = { ...body };
		if (data.prix) data.prix = parseFloat(data.prix);

		const serviceModifie = await prisma.service.update({
			where: { id: id },
			data: data,
		});

		return NextResponse.json(serviceModifie);
	} catch (error) {
		return NextResponse.json({ error: "Erreur lors de la modification du service" }, { status: 500 });
	}
}
