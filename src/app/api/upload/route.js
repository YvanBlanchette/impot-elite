import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
	try {
		const formData = await req.formData();
		const userId = formData.get("userId");
		if (!userId) return Response.json({ error: "Non autorisé" }, { status: 401 });

		const user = await prisma.user.findUnique({ where: { clerkId: userId } });
		if (!user) return Response.json({ error: "Utilisateur introuvable" }, { status: 404 });

		const fichiers = formData.getAll("fichiers");

		const dossierCache = {};
		const getDossier = async (anneeFiscale) => {
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

			// Upload vers Cloudinary
			const buffer = Buffer.from(await fichier.arrayBuffer());
			const uploadResult = await new Promise((resolve, reject) => {
				cloudinary.uploader.upload_stream(
					{
						folder: `impot-elite/${user.id}/${dossier.annee}`,
						resource_type: "auto",
						public_id: `${Date.now()}-${fichier.name.replace(/\.[^/.]+$/, "")}`,
					},
					(error, result) => {
						if (error) reject(error);
						else resolve(result);
					}
				).end(buffer);
			});

		await prisma.document.create({
				data: {
						nom,
						type,
						chemin: uploadResult.secure_url,
						resourceType: uploadResult.resource_type, // 👈 ajoute cette ligne
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