"use client";

import { Fragment, useState } from "react";
import { Folder, ChevronRight, ChevronDown, Clock, CheckCircle, AlertCircle, Loader2, File, Download, Trash2, Minus, Plus, ChevronUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { STATUT_CONFIG } from "@/app/(protected)/dashboard/(admin)/clients/components/config";
import { useIsAdmin } from "@/hooks/use-is-admin";
import clsx from "clsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const TYPES_DOCUMENT = {
	declaration_revenus: "Déclaration de revenus",
	avis_cotisation: "Avis de cotisation",
	piece_justificative: "Pièce justificative",
	rapport: "Rapport",
};

const icons = {
	en_attente: Clock,
	en_cours: Loader2,
	complete: CheckCircle,
	action_requise: AlertCircle,
};

export default function TabDossiers({ dossiers: initialDossiers }) {
	const [dossiers, setDossiers] = useState(initialDossiers);
	const [ouvert, setOuvert] = useState(null);
	const isAdmin = useIsAdmin();

	const toggleDossier = (id) => setOuvert((prev) => (prev === id ? null : id));

	const supprimerDocument = async (dossierId, docId) => {
		if (!confirm("Supprimer ce document ?")) return;
		await fetch(`/api/documents/${docId}?userId=${userId}`, { method: "DELETE" });

		const dossier = dossiers.find((d) => d.id === dossierId);
		const documentsRestants = dossier.documents.filter((doc) => doc.id !== docId);

		// Si le dossier devient vide, on le supprime en BD
		if (documentsRestants.length === 0) {
			await fetch(`/api/admin/dossiers/${dossierId}?userId=${userId}`, { method: "DELETE" });
		}

		setDossiers((prev) => prev.map((d) => (d.id === dossierId ? { ...d, documents: documentsRestants } : d)).filter((d) => d.documents.length > 0));
	};

	return (
		<div className="border border-neutral-200 overflow-hidden bg-white">
			<Table>
				<TableHeader>
					<TableRow className="grid grid-cols-12 w-full h-10 items-center bg-primary/20">
						<TableHead className="col-span-6 h-full flex items-center text-primary font-medium pl-5">Dossiers fiscaux</TableHead>
						<TableHead className="col-span-2 h-full flex items-center justify-center text-primary font-medium">Documents</TableHead>
						<TableHead className="col-span-2 h-full flex items-center justify-center text-primary font-medium">Statut</TableHead>
						<TableHead className="col-span-2 h-full" />
					</TableRow>
				</TableHeader>
				<TableBody>
					{!dossiers?.length ? (
						<TableRow className="">
							<TableCell
								colSpan={4}
								className="text-center text-neutral-400 py-12"
							>
								Aucun dossier pour ce client.
							</TableCell>
						</TableRow>
					) : (
						dossiers.map((dossier, index) => {
							const statut = STATUT_CONFIG[dossier.statut] ?? STATUT_CONFIG.en_attente;
							const StatutIcon = icons[dossier.statut] ?? Clock;
							const estOuvert = ouvert === dossier.id;

							return (
								<Fragment key={dossier.id}>
									{/* Ligne dossier */}
									<TableRow
										key={dossier.id}
										onClick={() => toggleDossier(dossier.id)}
										className={clsx(
											"cursor-pointer transition-colors grid grid-cols-12 w-full",
											estOuvert
												? "bg-primary/5 hover:bg-primary/5 border-b-0"
												: index % 2 !== 0
													? "bg-white hover:bg-primary/5"
													: "bg-neutral-50/50 hover:bg-primary/5",
										)}
									>
										<TableCell className="col-span-6 flex items-center">
											<div className="flex items-center gap-3">
												<div
													className={clsx(
														"w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
														estOuvert ? "bg-primary/20" : "bg-primary/10",
													)}
												>
													<Folder className="w-4 h-4 text-primary" />
												</div>
												<span className="text-sm font-medium text-neutral-900">Dossier fiscal {dossier.annee - 1}</span>
											</div>
										</TableCell>
										<TableCell className="col-span-2 flex items-center justify-center">
											<span className="text-sm text-neutral-500">
												{dossier.documents?.length ?? 0} document{dossier.documents?.length !== 1 ? "s" : ""}
											</span>
										</TableCell>
										<TableCell className="col-span-2 flex items-center justify-center">
											<span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${statut.color}`}>
												<StatutIcon className="w-3 h-3" />
												{statut.label}
											</span>
										</TableCell>
										<TableCell className="col-span-2 flex items-center justify-center">
											{estOuvert ? (
												<div className="flex items-center justify-center gap-2">
													Fermer
													<ChevronUp className="w-4 h-4 text-[#006838]" />
												</div>
											) : (
												<div className="flex items-center justify-center gap-2">
													Ouvrir
													<ChevronDown className="w-4 h-4 text-[#006838]" />
												</div>
											)}
										</TableCell>
									</TableRow>

									{/* --- Documents expandés ----------------------------------- */}
									{/* En-tête documents */}
									{estOuvert && (
										<TableRow className="grid grid-cols-12 w-full bg-primary/20 border-b  border-neutral-100">
											<TableHead className="col-span-6 flex items-center pl-21 py-2 text-xs text-neutral-500 uppercase tracking-widest">Nom</TableHead>
											<TableHead className="col-span-2 flex items-center justify-center py-2 text-xs text-neutral-500 uppercase tracking-widest">
												Type
											</TableHead>
											<TableHead className="col-span-2 flex items-center justify-center py-2 text-xs text-neutral-500 uppercase tracking-widest">
												Date d&apos;ajout
											</TableHead>
											<TableHead className="col-span-2 flex items-center justify-center " />
										</TableRow>
									)}

									{/* Lignes documents */}
									{estOuvert &&
										(dossier.documents ?? []).map((doc) => (
											<TableRow
												key={doc.id}
												className="grid grid-cols-12 w-full border-b bg-white transition-colors"
											>
												<TableCell className="col-span-6 flex items-center py-2">
													<div className="pl-16 flex items-center gap-2">
														<File className="w-4 h-4 text-neutral-300 shrink-0" />
														<span className="text-sm text-neutral-700">{doc.nom}</span>
													</div>
												</TableCell>
												<TableCell className="col-span-2  flex items-center justify-center py-2 text-sm text-neutral-500">
													{TYPES_DOCUMENT[doc.type] ?? doc.type}
												</TableCell>
												<TableCell className="col-span-2  flex items-center justify-center py-2 text-sm text-neutral-400">
													{new Date(doc.createdAt).toLocaleDateString("fr-CA", {
														year: "numeric",
														month: "long",
														day: "numeric",
													})}
												</TableCell>
												<TableCell className="col-span-2  flex items-center justify-center py-2">
													<div className="flex items-center gap-2 justify-center">
														<Tooltip>
															<TooltipContent>Télécharger</TooltipContent>
															<TooltipTrigger asChild>
																<a
																	href={doc.chemin}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="cursor-pointer p-1.5 rounded hover:bg-blue-50 text-neutral-300 hover:text-blue-500 transition-colors"
																	title="Télécharger"
																>
																	<Download className="w-4 h-4" />
																</a>
															</TooltipTrigger>
														</Tooltip>
														{(isAdmin || doc.type === "piece_justificative") && (
															<Tooltip>
																<TooltipContent>Supprimer</TooltipContent>
																<TooltipTrigger asChild>
																	<button
																		onClick={(e) => {
																			e.stopPropagation();
																			supprimerDocument(dossier.id, doc.id);
																		}}
																		className="cursor-pointer p-1.5 rounded hover:bg-red-50 text-neutral-300 hover:text-red-500 transition-colors"
																		title="Supprimer"
																	>
																		<Trash2 className="w-4 h-4" />
																	</button>
																</TooltipTrigger>
															</Tooltip>
														)}
													</div>
												</TableCell>
											</TableRow>
										))}

									{/* Séparateur bas */}
									{estOuvert && (
										<TableRow className="">
											<TableCell
												colSpan={4}
												className="p-0 h-1 bg-neutral-100"
											/>
										</TableRow>
									)}
								</Fragment>
							);
						})
					)}
				</TableBody>
			</Table>
		</div>
	);
}
