"use client";

import { Fragment, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Download, Loader2, Trash2, Upload, File, Folder, ChevronDown, ChevronRight, Minus, Plus, ChevronUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import clsx from "clsx";
import { useIsAdmin } from "@/hooks/use-is-admin";

const TYPES_DOCUMENT = {
	declaration_revenus: "Déclaration de revenus",
	avis_cotisation: "Avis de cotisation",
	piece_justificative: "Pièce justificative",
};

function formatDate(str) {
	return new Date(str).toLocaleDateString("fr-CA", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export default function DocumentsPage() {
	const { userId } = useAuth();
	const [dossiers, setDossiers] = useState([]);
	const [chargement, setChargement] = useState(true);
	const [ouvert, setOuvert] = useState(null);

	const isAdmin = useIsAdmin();

	useEffect(() => {
		if (!userId) return;
		fetch(`/api/documents?userId=${userId}`)
			.then((r) => r.json())
			.then((data) => {
				setDossiers(data);
				setChargement(false);
			});
	}, [userId]);

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

	const peutSupprimer = (doc) => isAdmin || doc.type === "piece_justificative";

	if (chargement) {
		return (
			<div className="p-8 flex items-center gap-3 text-neutral-400">
				<Loader2 className="w-5 h-5 animate-spin" /> Chargement...
			</div>
		);
	}

	return (
		<div className="min-h-full bg-neutral-50">
			{/* Header */}
			<div className="h-26 bg-white border-b px-8 flex items-center justify-between">
				<div className="flex flex-col items-start justify-center">
					<h1 className="text-2xl font-semibold text-neutral-900">Mes documents</h1>
					<p className="text-neutral-500 mt-1">Suivez l&apos;état de vos dossiers fiscaux.</p>
				</div>
				<Link
					href="/dashboard/upload"
					className="flex items-center gap-2 px-4 py-2 bg-[#006838] text-white text-sm rounded-lg hover:bg-[#005c31] transition-colors uppercase tracking-wider"
				>
					<Upload className="w-4 h-4" />
					Déposer des documents
				</Link>
			</div>

			{/* Tableau accordion */}
			<div className="border-b border-neutral-200 bg-white overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow className="grid grid-cols-12 w-full h-10 items-center bg-[#006838]/20">
							<TableHead className="col-span-6 h-full flex items-center text-[#006838] font-medium pl-12">Dossiers fiscaux</TableHead>
							<TableHead className="col-span-2 h-full flex items-center justify-center text-[#006838] font-medium">Documents</TableHead>

							<TableHead className="col-span-2 h-full" />
							<TableHead className="col-span-2 h-full" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{!dossiers?.length ? (
							<TableRow>
								<TableCell
									colSpan={4}
									className="text-center text-neutral-400 py-12"
								>
									Aucun dossier trouvé.
								</TableCell>
							</TableRow>
						) : (
							dossiers.map((dossier, index) => {
								const estOuvert = ouvert === dossier.id;

								return (
									<Fragment key={dossier.id}>
										{/* Ligne dossier */}
										<TableRow
											onClick={() => toggleDossier(dossier.id)}
											className={clsx(
												"cursor-pointer transition-colors grid grid-cols-12 w-full",
												estOuvert
													? "bg-[#006838]/5 hover:bg-[#006838]/5 border-b-0"
													: index % 2 !== 0
														? "bg-white hover:bg-[#006838]/5"
														: "bg-neutral-50/50 hover:bg-[#006838]/5",
											)}
										>
											<TableCell className="col-span-6 flex items-center pl-12">
												<div className="flex items-center gap-3">
													<div
														className={clsx(
															"w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
															estOuvert ? "bg-[#006838]/20" : "bg-[#006838]/10",
														)}
													>
														<Folder className="w-4 h-4 text-[#006838]" />
													</div>
													<span className="text-sm font-medium text-neutral-900">Dossier fiscal {dossier.annee - 1}</span>
												</div>
											</TableCell>
											<TableCell className="col-span-2 flex items-center justify-center">
												<span className="text-sm text-neutral-500">
													{dossier.documents?.length ?? 0} document
													{dossier.documents?.length !== 1 ? "s" : ""}
												</span>
											</TableCell>
											<TableCell className="col-span-2 flex items-center justify-center"></TableCell>
											<TableCell className="col-span-2 flex items-center justify-center pr-4">
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

											{/* En-tête documents */}
										</TableRow>
										{estOuvert && (
											<TableRow className="grid grid-cols-12 w-full bg-[#006838]/20 border-b border-neutral-100">
												<TableHead className="col-span-6 flex items-center pl-20 py-1 text-xs text-neutral-500 uppercase tracking-widest">Nom</TableHead>
												<TableHead className="col-span-2 flex items-center justify-center py-1 text-xs text-neutral-500 uppercase tracking-widest">
													Type
												</TableHead>
												<TableHead className="col-span-2 flex items-center justify-center py-1 text-xs text-neutral-500 uppercase tracking-widest">
													Date d&apos;ajout
												</TableHead>
												<TableHead className="col-span-2" />
											</TableRow>
										)}

										{/* Lignes documents */}
										{estOuvert &&
											dossier.documents.map((doc) => (
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
													<TableCell className="col-span-2 flex items-center justify-center py-2 text-sm text-neutral-500">
														{TYPES_DOCUMENT[doc.type] ?? doc.type}
													</TableCell>
													<TableCell className="col-span-2 flex items-center justify-center py-2 text-sm text-neutral-400">
														{formatDate(doc.createdAt)}
													</TableCell>
													<TableCell className="col-span-2 flex items-center justify-center py-2">
														<div className="flex items-center gap-2">
															<Tooltip>
																<TooltipTrigger asChild>
																	<a
																		href={doc.url}
																		target="_blank"
																		rel="noopener noreferrer"
																		className="cursor-pointer inline-flex items-center justify-center p-1.5 rounded hover:bg-blue-50 text-neutral-300 hover:text-blue-500 transition-colors"
																	>
																		<Download className="w-4 h-4" />
																	</a>
																</TooltipTrigger>
																<TooltipContent side="top">Télécharger</TooltipContent>
															</Tooltip>
															{peutSupprimer(doc) && (
																<Tooltip>
																	<TooltipTrigger asChild>
																		<button
																			onClick={(e) => {
																				e.stopPropagation();
																				supprimerDocument(dossier.id, doc.id);
																			}}
																			className="inline-flex items-center justify-center p-1.5 rounded hover:bg-red-50 text-neutral-300 hover:text-red-500 transition-colors"
																		>
																			<Trash2 className="w-4 h-4" />
																		</button>
																	</TooltipTrigger>
																	<TooltipContent side="top">Supprimer</TooltipContent>
																</Tooltip>
															)}
														</div>
													</TableCell>
												</TableRow>
											))}

										{/* Séparateur bas */}
										{estOuvert && (
											<TableRow>
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
		</div>
	);
}
