import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

        // Supprimer de Cloudinary si c'est une URL Cloudinary
        if (doc.chemin && doc.chemin.includes("cloudinary.com")) {
            try {
                // Extraire le public_id de l'URL
                const matches = doc.chemin.match(/\/impot-elite\/.+\/(.+)\.[^.]+$/);
                if (matches) {
                    const publicId = `impot-elite/${doc.chemin.split("/impot-elite/")[1].replace(/\.[^.]+$/, "")}`;
                    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
                }
            } catch (e) {
                console.error("Erreur suppression Cloudinary:", e);
            }
        }

        await prisma.document.delete({ where: { id } });

        return Response.json({ succes: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}