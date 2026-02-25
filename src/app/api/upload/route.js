import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
	try {
		const formData = await req.formData();
		const userId = formData.get("userId");
		if (!userId) return Response.json({ error: "Non autorisé" }, { status: 401 });

		const user = await prisma.user.findUnique({ where: { clerkId: userId } });
		if (!user) return Response.json({ error: "Utilisateur introuvable" }, { status: 404 });

		const count = Number(formData.get("count"));
		const fichiers = formData.getAll("fichiers");

		// Grouper les fichiers par année fiscale pour créer/réutiliser les bons dossiers
		const dossierCache = {};
		const getDossier = async (anneeFiscale) => {
			// Le dossier est pour l'année de déclaration (anneeFiscale + 1)
			const annee = anneeFiscale + 1;
			if (dossierCache[annee]) return dossierCache[annee];

			let dossier = await prisma.dossier.findFirst({ where: { userId: user.id, annee } });
			if (!dossier) {
				dossier = await prisma.dossier.create({
					data: { userId: user.id, annee, statut: "en_attente" },
				});
			}
			dossierCache[annee] = dossier;
			return dossier;
		};

		for (let i = 0; i < fichiers.length; i++) {
			const fichier = fichiers[i];
			const nom = formData.get(`nom_${i}`) || fichier.name;
			const type = formData.get(`type_${i}`) || "piece_justificative";
			const anneeFiscale = Number(formData.get(`annee_${i}`)) || new Date().getFullYear() - 1;

			const dossier = await getDossier(anneeFiscale);
			const uploadDir = path.join(process.cwd(), "uploads", user.id, String(dossier.annee));
			await mkdir(uploadDir, { recursive: true });

			const buffer = Buffer.from(await fichier.arrayBuffer());
			const nomFichier = `${Date.now()}-${fichier.name}`;
			const chemin = path.join(uploadDir, nomFichier);
			await writeFile(chemin, buffer);

			await prisma.document.create({
				data: {
					nom,
					type,
					chemin: path.join("uploads", user.id, String(dossier.annee), nomFichier),
					dossierId: dossier.id,
				},
			});
		}

		return Response.json({ succes: true });
	} catch (err) {
		console.error(err);
		return Response.json({ error: err.message }, { status: 500 });
	}
}
