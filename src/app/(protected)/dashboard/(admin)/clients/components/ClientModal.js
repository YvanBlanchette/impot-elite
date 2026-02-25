"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Pencil, Trash2, Star, FolderOpen } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ClientModalLecture from "./ClientModalLecture";
import ClientModalEdition from "./ClientModalEdition";
import clsx from "clsx";

export default function ClientModal({ client, onClose, onUpdate, onDelete }) {
	const router = useRouter();
	const [modeEdition, setModeEdition] = useState(false);
	const [ongletActif, setOngletActif] = useState("coordonnees");
	const [confirmSupprimer, setConfirmSupprimer] = useState(false);
	const [sauvegarde, setSauvegarde] = useState(false);
	const [formData, setFormData] = useState(() => ({
		prenom: client.prenom ?? "",
		nom: client.nom ?? "",
		email: client.email ?? "",
		telephone: client.telephone ?? "",
		adresse: client.adresse ?? "",
		ville: client.ville ?? "",
		codePostal: client.codePostal ?? "",
		province: client.province ?? "",
		typeClient: client.typeClient ?? "",
		sourceAcquisition: client.sourceAcquisition ?? "",
		statutFiscal: client.statutFiscal ?? "",
		occupation: client.occupation ?? "",
		employeur: client.employeur ?? "",
		nbrEnfants: client.nbrEnfants ?? "",
		niveauPriorite: client.niveauPriorite ?? "normal",
		typesRevenus: client.typesRevenus ? client.typesRevenus.split(",") : [],
		revenuFourchette: client.revenuFourchette ?? "",
		lienDossierExterne: client.lienDossierExterne ?? "",
		consentement: client.consentement ?? false,
		dateNaissance: client.dateNaissance ?? "",
		nas: client.nas ?? "",
		noTps: client.noTps ?? "",
		noTvq: client.noTvq ?? "",
		etatCivil: client.etatCivil ?? "",
		conjointNom: client.conjointNom ?? "",
		conjointPrenom: client.conjointPrenom ?? "",
		conjointNas: client.conjointNas ?? "",
		conjointDateNaissance: client.conjointDateNaissance ?? "",
		notesCrm: client.notesCrm ?? "",
	}));

	const sauvegarder = async () => {
		setSauvegarde(true);
		const payload = { ...formData, typesRevenus: formData.typesRevenus.join(",") };
		// userId doit venir du parent via prop ou context — on le passe ici
		await fetch(`/api/admin/clients/${client.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...payload, userId: client._userId }),
		});
		const updated = { ...client, ...formData, typesRevenus: formData.typesRevenus.join(",") };
		onUpdate(updated);
		setSauvegarde(false);
		setModeEdition(false);
	};

	const supprimerClient = async () => {
		await fetch(`/api/admin/clients/${client.id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: client._userId }),
		});
		onDelete(client.id);
		onClose();
	};

	return (
		<Dialog
			open
			onOpenChange={(open) => !open && onClose()}
		>
			<DialogContent className="max-w-7xl w-full h-[90vh] overflow-y-auto rounded-2xl p-0">
				{/* Header */}
				<div className="flex items-center justify-between px-8 py-5 border-b">
					<div className="flex items-center gap-3">
						<div
							className={clsx(
								"w-11 h-11 rounded-full flex items-center justify-center",
								client.niveauPriorite === "vip" ? "bg-[#c9a227]/15" : "bg-[#006838]/10",
							)}
						>
							<User className={clsx("w-5 h-5", client.niveauPriorite === "vip" ? "text-[#c9a227]" : "text-[#006838]")} />
						</div>
						<div>
							<div className="flex items-center gap-2">
								<h2 className="text-lg font-semibold text-neutral-900">
									{client.prenom} {client.nom}
								</h2>
								{client.niveauPriorite === "vip" && (
									<span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-[#c9a227]/15 text-[#c9a227] rounded-full font-medium">
										<Star className="w-3 h-3" /> VIP
									</span>
								)}
							</div>
							<p className="text-sm text-neutral-400">
								{client.typeClient || "Client"} · {client.email}
							</p>
						</div>
					</div>

					{!modeEdition && !confirmSupprimer && (
						<div className="flex items-center gap-1">
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										onClick={() => setModeEdition(true)}
										className="cursor-pointer p-2 text-neutral-400 hover:text-[#006838] hover:bg-[#006838]/10 rounded-lg transition-colors"
									>
										<Pencil className="w-4 h-4" />
									</button>
								</TooltipTrigger>
								<TooltipContent>Modifier</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										onClick={() => setConfirmSupprimer(true)}
										className="cursor-pointer p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</TooltipTrigger>
								<TooltipContent>Supprimer</TooltipContent>
							</Tooltip>
						</div>
					)}
				</div>

				{/* Confirmation suppression */}
				{confirmSupprimer && (
					<div className="px-8 py-6">
						<div className="p-4 bg-red-50 border border-red-200 rounded-xl">
							<p className="text-sm text-red-700 font-medium mb-3">Supprimer ce client ? Cette action est irréversible.</p>
							<div className="flex gap-2 max-w-xs">
								<button
									onClick={supprimerClient}
									className="flex-1 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
								>
									Confirmer
								</button>
								<button
									onClick={() => setConfirmSupprimer(false)}
									className="flex-1 py-1.5 border border-neutral-200 text-neutral-600 text-sm rounded-lg hover:bg-neutral-50 transition-colors"
								>
									Annuler
								</button>
							</div>
						</div>
					</div>
				)}

				{!confirmSupprimer && (
					<>
						{modeEdition ? (
							<ClientModalEdition
								formData={formData}
								setFormData={setFormData}
								ongletActif={ongletActif}
								setOngletActif={setOngletActif}
								onSave={sauvegarder}
								onCancel={() => setModeEdition(false)}
								sauvegarde={sauvegarde}
							/>
						) : (
							<ClientModalLecture
								client={client}
								ongletActif={ongletActif}
								setOngletActif={setOngletActif}
							/>
						)}

						{/* Footer */}
						{!modeEdition && (
							<div className="px-8 py-4 border-t bg-neutral-50 rounded-b-2xl">
								<button
									onClick={() => {
										const id = client.id;
										onClose();
										router.push(`/dashboard/clients/${id}`);
									}}
									className="cursor-pointer w-full py-2.5 bg-[#006838] text-white text-sm rounded-xl hover:bg-[#005c31] transition-colors flex items-center justify-center gap-2"
								>
									<FolderOpen className="w-4 h-4" />
									Voir les dossiers fiscaux
								</button>
							</div>
						)}
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}
