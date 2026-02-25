"use client";

import { User, Mail, Phone, MapPin, FileText, Heart, Users, StickyNote, Star, Link, CheckSquare, Building2 } from "lucide-react";
import InfoLigne from "./ui/InfoLigne";
import ChampSecret from "./ui/ChampSecret";
import Section from "./ui/Section";
import { ONGLETS, TYPES_REVENUS_OPTIONS } from "@/app/(protected)/dashboard/(admin)/clients/components/config";
import clsx from "clsx";

export default function ClientModalLecture({ client, ongletActif, setOngletActif }) {
	return (
		<>
			{/* Onglets */}
			<div className="flex border-b px-8">
				{ONGLETS.map((o) => (
					<button
						key={o.id}
						onClick={() => setOngletActif(o.id)}
						className={clsx(
							"px-4 py-3 text-sm border-b-2 -mb-px transition-colors",
							ongletActif === o.id ? "border-[#006838] text-[#006838] font-medium" : "border-transparent text-neutral-500 hover:text-neutral-700",
						)}
					>
						{o.label}
					</button>
				))}
			</div>

			<div className="px-8 py-6">
				{ongletActif === "coordonnees" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Section
							titre="Contact"
							icone={User}
						>
							<InfoLigne
								icone={Mail}
								label="Email"
								valeur={client.email}
								link
								href={`mailto:${client.email}`}
							/>
							<InfoLigne
								icone={Phone}
								label="Téléphone"
								valeur={client.telephone}
								link
								href={`tel:${client.telephone}`}
							/>
							<InfoLigne
								icone={MapPin}
								label="Adresse"
								valeur={client.adresse}
							/>
							<InfoLigne
								icone={MapPin}
								label="Ville / Province"
								valeur={`${client.ville ?? ""}${client.province ? `, ${client.province}` : ""}${client.codePostal ? `  ${client.codePostal}` : ""}`}
							/>
						</Section>
						<Section
							titre="Profil"
							icone={Building2}
						>
							<InfoLigne
								icone={Building2}
								label="Type de client"
								valeur={client.typeClient}
							/>
							<InfoLigne
								icone={User}
								label="Statut fiscal"
								valeur={client.statutFiscal}
							/>
							<InfoLigne
								icone={Building2}
								label="Occupation"
								valeur={client.occupation}
							/>
							<InfoLigne
								icone={Building2}
								label="Employeur"
								valeur={client.employeur}
							/>
							<InfoLigne
								icone={Users}
								label="Enfants à charge"
								valeur={client.nbrEnfants?.toString()}
							/>
							<InfoLigne
								icone={Star}
								label="Source d'acquisition"
								valeur={client.sourceAcquisition}
							/>
						</Section>
					</div>
				)}

				{ongletActif === "fiscal" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Section
							titre="Données personnelles"
							icone={User}
						>
							<InfoLigne
								icone={User}
								label="Date de naissance"
								valeur={client.dateNaissance}
							/>
							<InfoLigne
								icone={Heart}
								label="État civil"
								valeur={client.etatCivil}
							/>
							<ChampSecret
								label="Numéro d'assurance sociale (NAS)"
								valeur={client.nas}
							/>
							<ChampSecret
								label="Numéro TPS"
								valeur={client.noTps}
							/>
							<ChampSecret
								label="Numéro TVQ"
								valeur={client.noTvq}
							/>
						</Section>
						<div>
							<Section
								titre="Revenus"
								icone={FileText}
							>
								<InfoLigne
									icone={FileText}
									label="Fourchette de revenus"
									valeur={client.revenuFourchette}
								/>
								<div className="py-3">
									<p className="text-xs text-neutral-400 mb-2">Types de revenus</p>
									{client.typesRevenus ? (
										<div className="flex flex-wrap gap-1.5">
											{client.typesRevenus.split(",").map((r) => {
												const opt = TYPES_REVENUS_OPTIONS.find((o) => o.value === r);
												return opt ? (
													<span
														key={r}
														className="text-xs px-2 py-1 bg-[#006838]/10 text-[#006838] rounded-full"
													>
														{opt.label}
													</span>
												) : null;
											})}
										</div>
									) : (
										<p className="text-sm text-neutral-500">—</p>
									)}
								</div>
							</Section>
							<Section
								titre="Conformité"
								icone={CheckSquare}
							>
								<div className="py-3 flex items-center gap-2">
									<div className={clsx("w-4 h-4 rounded flex items-center justify-center", client.consentement ? "bg-[#006838]" : "bg-neutral-200")}>
										{client.consentement && <CheckSquare className="w-3 h-3 text-white" />}
									</div>
									<p className="text-sm text-neutral-700">Consentement stockage données</p>
								</div>
								{client.consentementDate && (
									<p className="text-xs text-neutral-400 pb-3">Signé le {new Date(client.consentementDate).toLocaleDateString("fr-CA")}</p>
								)}
							</Section>
						</div>
					</div>
				)}

				{ongletActif === "conjoint" && (
					<div className="max-w-md">
						<Section
							titre="Conjoint(e)"
							icone={Users}
						>
							<InfoLigne
								icone={User}
								label="Prénom et nom"
								valeur={`${client.conjointPrenom ?? ""} ${client.conjointNom ?? ""}`.trim() || null}
							/>
							<InfoLigne
								icone={User}
								label="Date de naissance"
								valeur={client.conjointDateNaissance}
							/>
							<ChampSecret
								label="NAS du/de la conjoint(e)"
								valeur={client.conjointNas}
							/>
						</Section>
					</div>
				)}

				{ongletActif === "notes" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Section
							titre="Notes internes"
							icone={StickyNote}
						>
							<div className="py-3">
								<p className="text-sm text-neutral-700 whitespace-pre-wrap">{client.notesCrm || "Aucune note."}</p>
							</div>
						</Section>
						<Section
							titre="Lien dossier externe"
							icone={Link}
						>
							{client.lienDossierExterne ? (
								<InfoLigne
									icone={Link}
									label="Lien"
									valeur={client.lienDossierExterne}
									link
									href={client.lienDossierExterne}
								/>
							) : (
								<div className="py-3">
									<p className="text-sm text-neutral-500">Aucun lien configuré.</p>
								</div>
							)}
						</Section>
					</div>
				)}
			</div>
		</>
	);
}
