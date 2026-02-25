"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import { Loader2, ChevronLeft, FileText, Upload, Trash2, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsAdmin } from "@/hooks/use-is-admin";

const STATUTS = [
	{ value: "en_attente", label: "En attente" },
	{ value: "en_cours", label: "En traitement" },
	{ value: "complete", label: "Complété" },
	{ value: "action_requise", label: "Action requise" },
];

function formatDate(str) {
	return new Date(str).toLocaleDateString("fr-CA", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export default function DossierPage() {
	const { userId } = useAuth();
	const { user } = useUser();
	const router = useRouter();
	const { clientId, dossierId } = useParams();
	const [dossier, setDossier] = useState(null);
	const [client, setClient] = useState(null);
	const [chargement, setChargement] = useState(true);
	const [uploadEnCours, setUploadEnCours] = useState(false);

	const isAdmin = useIsAdmin();

	const charger = () => {
		fetch(`/api/admin/dossiers/${dossierId}?userId=${userId}`)
			.then((r) => r.json())
			.then((data) => {
				setDossier(data.dossier);
				setClient(data.client);
				setChargement(false);
			});
	};

	useEffect(() => {
		if (!userId || !isAdmin) return;
		charger();
	}, [userId, isAdmin]);

	const changerStatut = async (statut) => {
		await fetch("/api/admin/dossiers", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ dossierId, statut, userId }),
		});
		setDossier((prev) => ({ ...prev, statut }));
	};

	const uploaderRapport = async (fichier) => {
		setUploadEnCours(true);
		const formData = new FormData();
		formData.append("fichier", fichier);
		formData.append("dossierId", dossierId);
		formData.append("userId", userId);
		await fetch("/api/admin/rapport", { method: "POST", body: formData });
		setUploadEnCours(false);
		charger();
	};

	const supprimer = async (docId) => {
		if (!confirm("Supprimer ce fichier ?")) return;
		await fetch(`/api/documents/${docId}?userId=${userId}`, { method: "DELETE" });
		setDossier((prev) => ({
			...prev,
			documents: prev.documents.filter((d) => d.id !== docId),
		}));
	};

	if (!isAdmin) return <div className="p-8 text-neutral-500">Accès refusé.</div>;
	if (chargement)
		return (
			<div className="p-8 flex items-center gap-3 text-neutral-400">
				<Loader2 className="w-5 h-5 animate-spin" /> Chargement...
			</div>
		);

	return (
		<div className="p-8 max-w-3xl">
			<button
				onClick={() => router.push(`/dashboard/clients/${clientId}`)}
				className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 mb-6 transition-colors"
			>
				<ChevronLeft className="w-4 h-4" /> Retour aux dossiers
			</button>

			<div className="flex items-start justify-between mb-8">
				<div>
					<h1 className="text-2xl font-semibold text-neutral-900">Dossier fiscal {dossier?.annee - 1}</h1>
					<p className="text-neutral-400 text-sm mt-1">
						{client?.prenom} {client?.nom} · {client?.email}
					</p>
				</div>
				{/* Statut */}
				<div className="relative">
					<select
						value={dossier?.statut}
						onChange={(e) => changerStatut(e.target.value)}
						className="appearance-none text-sm px-4 py-2 pr-8 rounded-lg border border-neutral-200 bg-white cursor-pointer focus:outline-none focus:border-blue-400"
					>
						{STATUTS.map((s) => (
							<option
								key={s.value}
								value={s.value}
							>
								{s.label}
							</option>
						))}
					</select>
					<ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
				</div>
			</div>

			<Card>
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-sm font-medium text-neutral-700">Documents ({dossier?.documents?.length ?? 0})</CardTitle>
						<label className="inline-flex items-center gap-2 cursor-pointer px-3 py-1.5 border border-dashed border-neutral-300 rounded-lg text-xs text-neutral-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
							{uploadEnCours ? (
								<>
									<Loader2 className="w-3.5 h-3.5 animate-spin" /> Upload...
								</>
							) : (
								<>
									<Upload className="w-3.5 h-3.5" /> Déposer un rapport
								</>
							)}
							<input
								type="file"
								className="hidden"
								accept=".pdf"
								onChange={(e) => {
									if (e.target.files[0]) uploaderRapport(e.target.files[0]);
								}}
							/>
						</label>
					</div>
				</CardHeader>
				<CardContent>
					{(dossier?.documents?.length ?? 0) === 0 ? (
						<p className="text-sm text-neutral-400 py-4 text-center">Aucun document.</p>
					) : (
						<div className="space-y-2">
							{dossier.documents.map((doc) => (
								<div
									key={doc.id}
									className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
								>
									<div className="flex items-center gap-3">
										<FileText className="w-4 h-4 text-neutral-400" />
										<div>
											<p className="text-sm text-neutral-900">{doc.nom}</p>
											<div className="flex items-center gap-2">
												<p className="text-xs text-neutral-400">{formatDate(doc.createdAt)}</p>
												{doc.type === "rapport" && <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">Rapport</span>}
											</div>
										</div>
									</div>
									<Tooltip>
										<TooltipTrigger asChild>
											<button
												onClick={() => supprimer(doc.id)}
												className="p-1.5 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
											>
												<Trash2 className="w-4 h-4" />
											</button>
										</TooltipTrigger>
										<TooltipContent>Supprimer</TooltipContent>
									</Tooltip>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
