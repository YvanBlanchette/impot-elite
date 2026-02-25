"use client";

import { ChevronRight, Star } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { STATUT_CONFIG } from "@/app/(protected)/dashboard/(admin)/clients/components/config";
import clsx from "clsx";

export default function ClientTable({ clients, onSelectClient }) {
	const dernierStatut = (client) => {
		const dossier = client.dossiers?.[0];
		if (!dossier) return null;
		return STATUT_CONFIG[dossier.statut] ?? STATUT_CONFIG.en_attente;
	};

	return (
		<div className="mx-6 border border-neutral-200 bg-white rounded-xl overflow-hidden h-[calc(100vh-130px)]">
			<Table>
				<TableHeader>
					<TableRow className="bg-[#006838]/10 hover:bg-[#006838]/10">
						<TableHead className="text-[#006838] font-medium">Nom</TableHead>
						<TableHead className="text-[#006838] font-medium">Type</TableHead>
						<TableHead className="text-[#006838] font-medium">Email</TableHead>
						<TableHead className="text-[#006838] font-medium">Téléphone</TableHead>
						<TableHead className="text-[#006838] font-medium">Dossiers</TableHead>
						<TableHead className="text-[#006838] font-medium">Statut récent</TableHead>
						<TableHead className="text-[#006838] font-medium">Priorité</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{clients.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={8}
								className="text-center text-neutral-400 py-12"
							>
								Aucun client trouvé.
							</TableCell>
						</TableRow>
					) : (
						clients.map((client, index) => {
							const statut = dernierStatut(client);
							return (
								<TableRow
									key={client.id}
									className={clsx("cursor-pointer hover:bg-[#006838]/5", index % 2 !== 0 ? "bg-white" : "bg-neutral-50/50")}
									onClick={() => onSelectClient(client)}
								>
									<TableCell className="font-medium text-neutral-900">
										{client.prenom} {client.nom}
									</TableCell>
									<TableCell className="text-neutral-500 text-xs">{client.typeClient || "—"}</TableCell>
									<TableCell className="text-neutral-500">{client.email}</TableCell>
									<TableCell className="text-neutral-500">{client.telephone ?? "—"}</TableCell>
									<TableCell className="text-neutral-500">{client.dossiers?.length ?? 0}</TableCell>
									<TableCell>{statut ? <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statut.color}`}>{statut.label}</span> : "—"}</TableCell>
									<TableCell>
										{client.niveauPriorite === "vip" && (
											<span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-[#c9a227]/15 text-[#c9a227] rounded-full font-medium">
												<Star className="w-3 h-3" /> VIP
											</span>
										)}
									</TableCell>
									<TableCell>
										<ChevronRight className="w-4 h-4 text-neutral-300" />
									</TableCell>
								</TableRow>
							);
						})
					)}
				</TableBody>
			</Table>
		</div>
	);
}
