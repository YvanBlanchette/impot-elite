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

       // Supprimer de Cloudinary
        if (doc.chemin && doc.chemin.includes("cloudinary.com")) {
            try {
                const publicId = decodeURIComponent(doc.chemin)
                    .replace(/.*\/upload\/(?:v\d+\/)?/, "")
                    .replace(/\.[^.]+$/, "");

                const resourceType = doc.resourceType || "image";

                console.log("public_id:", publicId);
                console.log("resource_type:", resourceType);

                const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
                console.log("Résultat Cloudinary:", result);

                if (result.result !== "ok") {
                    console.warn("Cloudinary n'a pas supprimé le fichier:", result);
                }
            } catch (e) {
                console.error("Erreur suppression Cloudinary:", e);
            }
        }

        await prisma.document.delete({ where: { id } });

        return Response.json({ succes: true });
    } catch (err) {
        console.error("Erreur DELETE document:", err);
        return Response.json({ error: err.message }, { status: 500 });
    }
}