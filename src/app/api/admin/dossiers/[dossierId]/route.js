import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

async function verifierAdmin(userId) {
	const clerk = await clerkClient();
	const clerkUser = await clerk.users.getUser(userId);
	if (clerkUser.publicMetadata?.role !== "admin") {
		return false;
	}
	return true;
}

export async function GET(req, { params }) {
	try {
		const { dossierId } = await params;
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");

		if (!(await verifierAdmin(userId))) {
			return Response.json({ error: "Accès refusé" }, { status: 403 });
		}

		const dossier = await prisma.dossier.findUnique({
			where: { id: dossierId },
			include: { documents: { orderBy: { createdAt: "desc" } } },
		});

		const client = await prisma.user.findUnique({
			where: { id: dossier.userId },
		});

		return Response.json({ dossier, client });
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}

export async function PATCH(req, { params }) {
	try {
		const { dossierId } = await params;
		const { userId, statut } = await req.json();

		if (!(await verifierAdmin(userId))) {
			return Response.json({ error: "Accès refusé" }, { status: 403 });
		}

		const dossier = await prisma.dossier.update({
			where: { id: dossierId },
			data: { statut },
		});

		return Response.json(dossier);
	} catch (err) {
		return Response.json({ error: err.message }, { status: 500 });
	}
}

export async function DELETE(req, { params }) {
	try {
		const { dossierId } = await params;
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");

		if (!(await verifierAdmin(userId))) {
			return Response.json({ error: "Accès refusé" }, { status: 403 });
		}

		await prisma.document.deleteMany({
			where: { dossierId },
		});

		await prisma.dossier.delete({
			where: { id: dossierId },
		});

		return Response.json({ success: true });
	} catch (err) {
		console.error("Erreur suppression dossier:", err.message);
		return Response.json({ error: err.message }, { status: 500 });
	}
}
