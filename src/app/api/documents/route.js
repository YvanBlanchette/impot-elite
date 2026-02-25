import { prisma } from "@/lib/prisma";

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");
		if (!userId) return Response.json({ error: "Non autorisé" }, { status: 401 });

		const user = await prisma.user.findUnique({ where: { clerkId: userId } });
		if (!user) return Response.json([]);

		const dossiers = await prisma.dossier.findMany({
			where: { userId: user.id },
			include: { documents: { orderBy: { createdAt: "desc" } } },
			orderBy: { annee: "desc" },
		});

		return Response.json(dossiers);
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}
