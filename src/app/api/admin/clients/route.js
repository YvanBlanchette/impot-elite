import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");
		if (!userId) return Response.json({ error: "Non autorisé" }, { status: 401 });

		// Vérifier admin
		const clerk = await clerkClient();
		const clerkUser = await clerk.users.getUser(userId);
		if (clerkUser.publicMetadata?.role !== "admin") {
			return Response.json({ error: "Accès refusé" }, { status: 403 });
		}

		const clients = await prisma.user.findMany({
			where: { clerkId: { not: userId } },
			include: {
				dossiers: {
					include: { documents: { orderBy: { createdAt: "desc" } } },
					orderBy: { annee: "desc" },
				},
			},
			orderBy: { createdAt: "desc" },
		});

		return Response.json(clients);
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}
