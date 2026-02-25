import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function PATCH(req) {
	try {
		const { dossierId, statut, userId } = await req.json();

		const clerk = await clerkClient();
		const clerkUser = await clerk.users.getUser(userId);
		if (clerkUser.publicMetadata?.role !== "admin") {
			return Response.json({ error: "Accès refusé" }, { status: 403 });
		}

		await prisma.dossier.update({
			where: { id: dossierId },
			data: { statut },
		});

		return Response.json({ succes: true });
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}
