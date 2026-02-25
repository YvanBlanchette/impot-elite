import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
	try {
		const { clientId } = await params;
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");

		const clerk = await clerkClient();
		const clerkUser = await clerk.users.getUser(userId);
		if (clerkUser.publicMetadata?.role !== "admin") {
			return Response.json({ error: "Accès refusé" }, { status: 403 });
		}

		const client = await prisma.user.findUnique({
			where: { id: clientId },
			include: {
				dossiers: {
					include: { documents: { orderBy: { createdAt: "desc" } } },
					orderBy: { annee: "desc" },
				},
			},
		});

		return Response.json(client);
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}

export async function PATCH(req, { params }) {
	try {
		const { clientId } = await params;
		const { userId, ...data } = await req.json();

		const clerk = await clerkClient();
		const clerkUser = await clerk.users.getUser(userId);
		if (clerkUser.publicMetadata?.role !== "admin") {
			return Response.json({ error: "Accès refusé" }, { status: 403 });
		}

		const client = await prisma.user.update({
			where: { id: clientId },
			data: {
				prenom: data.prenom,
				nom: data.nom,
				email: data.email,
				telephone: data.telephone,
				adresse: data.adresse,
				ville: data.ville,
				codePostal: data.codePostal,
				province: data.province,
				typeClient: data.typeClient,
				sourceAcquisition: data.sourceAcquisition,
				statutFiscal: data.statutFiscal,
				occupation: data.occupation,
				employeur: data.employeur,
				nbrEnfants: data.nbrEnfants ? parseInt(data.nbrEnfants) : null,
				niveauPriorite: data.niveauPriorite,
				typesRevenus: data.typesRevenus,
				revenuFourchette: data.revenuFourchette,
				lienDossierExterne: data.lienDossierExterne,
				consentement: data.consentement,
				consentementDate: data.consentement ? new Date() : null,
				dateNaissance: data.dateNaissance,
				nas: data.nas,
				noTps: data.noTps,
				noTvq: data.noTvq,
				etatCivil: data.etatCivil,
				conjointNom: data.conjointNom,
				conjointPrenom: data.conjointPrenom,
				conjointNas: data.conjointNas,
				conjointDateNaissance: data.conjointDateNaissance,
				notesCrm: data.notesCrm,
			},
		});

		return Response.json(client);
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}

export async function DELETE(req, { params }) {
	try {
		const { clientId } = await params;
		const { userId } = await req.json();

		const clerk = await clerkClient();
		const clerkUser = await clerk.users.getUser(userId);
		if (clerkUser.publicMetadata?.role !== "admin") {
			return Response.json({ error: "Accès refusé" }, { status: 403 });
		}

		await prisma.document.deleteMany({
			where: { dossier: { userId: clientId } },
		});
		await prisma.dossier.deleteMany({ where: { userId: clientId } });
		await prisma.user.delete({ where: { id: clientId } });

		return Response.json({ succes: true });
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}
