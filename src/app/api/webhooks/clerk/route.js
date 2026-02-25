import { Webhook } from "svix";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
	if (!WEBHOOK_SECRET) return new Response("No webhook secret", { status: 400 });

	const headerPayload = await headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Missing svix headers", { status: 400 });
	}

	const payload = await req.json();
	const body = JSON.stringify(payload);

	const wh = new Webhook(WEBHOOK_SECRET);
	let evt;

	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		});
	} catch (err) {
		return new Response("Invalid signature", { status: 400 });
	}

	const { type, data } = evt;

	if (type === "user.created") {
		console.log("=== USER CREATED ===", data.id, data.email_addresses[0]?.email_address);
		try {
			await prisma.user.upsert({
				where: { clerkId: data.id },
				update: {
					email: data.email_addresses[0]?.email_address ?? "",
					prenom: data.first_name ?? "",
					nom: data.last_name ?? "",
				},
				create: {
					clerkId: data.id,
					email: data.email_addresses[0]?.email_address ?? "",
					prenom: data.first_name ?? "",
					nom: data.last_name ?? "",
				},
			});
			console.log("=== USER CRÉÉ DANS NEON ===");
		} catch (err) {
			console.error("=== ERREUR CRÉATION USER ===", err.message);
		}
	}

	if (type === "user.deleted") {
		await prisma.user.deleteMany({
			where: { clerkId: data.id },
		});
	}

	return new Response("OK", { status: 200 });
}
