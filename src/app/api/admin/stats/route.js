import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");

		const clerk = await clerkClient();
		const clerkUser = await clerk.users.getUser(userId);
		if (clerkUser.publicMetadata?.role !== "admin") {
			return Response.json({ error: "Accès refusé" }, { status: 403 });
		}

		const adminUser = await prisma.user.findUnique({ where: { clerkId: userId } });

		const totalClients = await prisma.user.count({
			where: { clerkId: { not: userId } },
		});

		const dossiersEnAttente = await prisma.dossier.count({
			where: { statut: "en_attente", user: { clerkId: { not: userId } } },
		});

		const dossiersEnCours = await prisma.dossier.count({
			where: { statut: "en_cours", user: { clerkId: { not: userId } } },
		});

		const dossiersCompletes = await prisma.dossier.count({
			where: { statut: "complete", user: { clerkId: { not: userId } } },
		});

		const actionRequise = await prisma.dossier.count({
			where: { statut: "action_requise", user: { clerkId: { not: userId } } },
		});

		return Response.json({
			totalClients,
			dossiersEnAttente,
			dossiersEnCours,
			dossiersCompletes,
			actionRequise,
		});
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}
