"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2, Search, ChevronRight, Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { STATUT_CONFIG } from "@/app/(protected)/dashboard/(admin)/clients/components/config";
import clsx from "clsx";

export default function ClientsPage() {
	const { userId } = useAuth();
	const { user } = useUser();
	const router = useRouter();
	const [clients, setClients] = useState([]);
	const [recherche, setRecherche] = useState("");
	const [chargement, setChargement] = useState(true);

	const isAdmin = user?.publicMetadata?.role === "admin";

	useEffect(() => {
		if (!userId || !isAdmin) return;
		fetch(`/api/admin/clients?userId=${userId}`)
			.then((r) => r.json())
			.then((data) => {
				setClients([...data].sort((a, b) => `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`, "fr")));
				setChargement(false);
			});
	}, [userId, isAdmin]);

	const clientsFiltres = clients.filter((c) => {
		const q = recherche.toLowerCase();
		return (
			c.nom?.toLowerCase().includes(q) || c.prenom?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.telephone?.toLowerCase().includes(q)
		);
	});

	const dernierStatut = (client) => {
		const dossier = client.dossiers?.[0];
		if (!dossier) return null;
		return STATUT_CONFIG[dossier.statut] ?? STATUT_CONFIG.en_attente;
	};

	const vipCount = clients.filter((c) => c.niveauPriorite === "vip").length;

	if (!isAdmin) return <div className="p-8 text-neutral-500">Accès refusé.</div>;
	if (chargement)
		return (
			<div className="p-8 flex items-center text-xl justify-center gap-3 text-neutral-400 w-full h-full">
				<Loader2 className="w-8 h-8 animate-spin" /> Chargement...
			</div>
		);

	return (
		<div className="min-h-full bg-neutral-50 h-26">
			{/* Header */}
			<div className="bg-white border-b px-8 py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="w-14 h-14 rounded-full bg-[#006838]/10 flex items-center justify-center">
							<Users className="w-6 h-6 text-[#006838]" />
						</div>
						<div>
							<h1 className="text-2xl font-semibold text-neutral-900">Clients</h1>
							<p className="text-sm text-neutral-400 mt-0.5">
								{clients.length} client(s) enregistré(s)
								{vipCount > 0 && (
									<span className="ml-2 inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-[#c9a227]/15 text-[#c9a227] rounded-full font-medium">
										<Star className="w-3 h-3" /> {vipCount} VIP
									</span>
								)}
							</p>
						</div>
					</div>

					{/* Recherche */}
					<div className="relative w-72">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
						<Input
							placeholder="Rechercher un client..."
							value={recherche}
							onChange={(e) => setRecherche(e.target.value)}
							className="pl-9 bg-white"
						/>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className=" border-b border-neutral-200 bg-white overflow-hidden">
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
						{clientsFiltres.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={8}
									className="text-center text-neutral-400 py-12"
								>
									Aucun client trouvé.
								</TableCell>
							</TableRow>
						) : (
							clientsFiltres.map((client, index) => {
								const statut = dernierStatut(client);
								return (
									<TableRow
										key={client.id}
										className={clsx("cursor-pointer hover:bg-[#006838]/5", index % 2 !== 0 ? "bg-white" : "bg-neutral-50/50")}
										onClick={() => router.push(`/dashboard/clients/${client.id}`)}
									>
										<TableCell className="font-medium text-neutral-900">
											{client.prenom} {client.nom}
										</TableCell>
										<TableCell className="text-neutral-500 text-xs">{client.typeClient || "—"}</TableCell>
										<TableCell className="text-neutral-500">{client.email}</TableCell>
										<TableCell className="text-neutral-500">{client.telephone ?? "—"}</TableCell>
										<TableCell className="text-neutral-500">{client.dossiers?.length ?? 0}</TableCell>
										<TableCell>
											{statut ? <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statut.color}`}>{statut.label}</span> : "—"}
										</TableCell>
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
		</div>
	);
}
