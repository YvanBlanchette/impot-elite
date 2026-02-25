import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(req, { params }) {
	try {
		const { id } = await params;
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");
		if (!userId) return Response.json({ error: "Non autorisé" }, { status: 401 });

		const clerk = await clerkClient();
		const clerkUser = await clerk.users.getUser(userId);
		const isAdmin = clerkUser.publicMetadata?.role === "admin";

		const user = await prisma.user.findUnique({ where: { clerkId: userId } });

		const doc = await prisma.document.findFirst({
			where: isAdmin ? { id } : { id, dossier: { userId: user.id } },
		});

		if (!doc) return Response.json({ error: "Document introuvable" }, { status: 404 });

		try {
			await unlink(path.join(process.cwd(), doc.chemin));
		} catch {}

		await prisma.document.delete({ where: { id } });

		return Response.json({ succes: true });
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}
