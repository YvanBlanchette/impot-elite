import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
    try {
        const { userId: authUserId } = await auth();
        const { userId } = await req.json();
        
        // Vérifier que le userId correspond à l'utilisateur authentifié
        if (!authUserId || authUserId !== userId) {
            return Response.json({ error: "Non autorisé" }, { status: 401 });
        }

        let user = await prisma.user.findUnique({ where: { clerkId: userId } });
        
        if (!user) {
            const clerk = await clerkClient();
            const clerkUser = await clerk.users.getUser(userId);
            user = await prisma.user.create({
                data: {
                    clerkId: userId,
                    email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
                    prenom: clerkUser.firstName ?? "",
                    nom: clerkUser.lastName ?? "",
                },
            });
        }

        return Response.json({ ok: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}