import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const userId = formData.get("userId");
		const dossierId = formData.get("dossierId");
		const fichier = formData.get("fichier");

		const clerk = await clerkClient();
		const clerkUser = await clerk.users.getUser(userId);
		if (clerkUser.publicMetadata?.role !== "admin") {
			return Response.json({ error: "Accès refusé" }, { status: 403 });
		}

		const dossier = await prisma.dossier.findUnique({ where: { id: dossierId } });
		if (!dossier) return Response.json({ error: "Dossier introuvable" }, { status: 404 });

		const uploadDir = path.join(process.cwd(), "uploads", dossier.userId, String(dossier.annee));
		await mkdir(uploadDir, { recursive: true });

		const buffer = Buffer.from(await fichier.arrayBuffer());
		const nomFichier = `rapport-${Date.now()}-${fichier.name}`;
		const chemin = path.join(uploadDir, nomFichier);
		await writeFile(chemin, buffer);

		await prisma.document.create({
			data: {
				nom: fichier.name,
				type: "rapport",
				chemin: path.join("uploads", dossier.userId, String(dossier.annee), nomFichier),
				dossierId,
			},
		});

		return Response.json({ succes: true });
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}
