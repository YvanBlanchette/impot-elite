import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(req, { params }) {
	try {
		const { id } = await params;
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");
		if (!userId) return new Response("Non autorisé", { status: 401 });

		const clerk = await clerkClient();
		const clerkUser = await clerk.users.getUser(userId);
		const isAdmin = clerkUser.publicMetadata?.role === "admin";

		const user = await prisma.user.findUnique({ where: { clerkId: userId } });

		const doc = await prisma.document.findFirst({
			where: isAdmin ? { id } : { id, dossier: { userId: user.id } },
		});

		if (!doc) return new Response("Document introuvable", { status: 404 });

		const buffer = await readFile(path.join(process.cwd(), doc.chemin));

		return new Response(buffer, {
			headers: {
				"Content-Type": doc.type === "rapport" ? "application/pdf" : "application/octet-stream",
				"Content-Disposition": `attachment; filename="${doc.nom}"`,
			},
		});
	} catch (err) {
		return new Response(err.message, { status: 500 });
	}
}
