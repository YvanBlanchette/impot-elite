import { prisma } from "@/lib/prisma";

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");
		if (!userId) return Response.json({ error: "Non autorisé" }, { status: 401 });

		const user = await prisma.user.findUnique({ where: { clerkId: userId } });
		if (!user) return Response.json({ documentsTotal: 0, enCours: 0, rapportsPrets: 0, dossiersTotal: 0 });

		const dossiers = await prisma.dossier.findMany({
			where: { userId: user.id },
			include: { documents: true },
		});

		const documentsTotal = dossiers.reduce((acc, d) => acc + d.documents.filter((doc) => doc.type !== "rapport").length, 0);

		const rapportsPrets = dossiers.reduce((acc, d) => acc + d.documents.filter((doc) => doc.type === "rapport").length, 0);

		const enCours = dossiers.filter((d) => d.statut === "en_cours").length;
		const dossiersTotal = dossiers.length;

		return Response.json({ documentsTotal, enCours, rapportsPrets, dossiersTotal });
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}
