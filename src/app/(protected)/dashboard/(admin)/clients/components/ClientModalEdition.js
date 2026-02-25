"use client";

import { User, FileText, Users, StickyNote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputSecret from "./ui/InputSecret";
import SelectField from "./ui/SelectField";
import { ONGLETS, PROVINCES, TYPES_REVENUS_OPTIONS } from "@/app/(protected)/dashboard/(admin)/clients/components/config";
import clsx from "clsx";

export default function ClientModalEdition({ formData, setFormData, ongletActif, setOngletActif, onSave, onCancel, sauvegarde }) {
	const f = (key) => (e) => setFormData((p) => ({ ...p, [key]: e.target.value }));

	const toggleRevenu = (val) => {
		setFormData((p) => ({
			...p,
			typesRevenus: p.typesRevenus.includes(val) ? p.typesRevenus.filter((r) => r !== val) : [...p.typesRevenus, val],
		}));
	};

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
						{/* Contact */}
						<div className="space-y-3">
							<p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Contact</p>
							<div className="grid grid-cols-2 gap-3">
								<div>
									<Label className="text-xs text-neutral-500 mb-1">Prénom</Label>
									<Input
										value={formData.prenom}
										onChange={f("prenom")}
									/>
								</div>
								<div>
									<Label className="text-xs text-neutral-500 mb-1">Nom</Label>
									<Input
										value={formData.nom}
										onChange={f("nom")}
									/>
								</div>
							</div>
							<div>
								<Label className="text-xs text-neutral-500 mb-1">Email</Label>
								<Input
									value={formData.email}
									onChange={f("email")}
								/>
							</div>
							<div>
								<Label className="text-xs text-neutral-500 mb-1">Téléphone</Label>
								<Input
									value={formData.telephone}
									placeholder="514-555-1234"
									onChange={f("telephone")}
								/>
							</div>
							<div>
								<Label className="text-xs text-neutral-500 mb-1">Adresse</Label>
								<Input
									value={formData.adresse}
									placeholder="123 rue Principale"
									onChange={f("adresse")}
								/>
							</div>
							<div className="grid grid-cols-3 gap-2">
								<div>
									<Label className="text-xs text-neutral-500 mb-1">Ville</Label>
									<Input
										value={formData.ville}
										onChange={f("ville")}
									/>
								</div>
								<SelectField
									label="Province"
									value={formData.province}
									onChange={f("province")}
								>
									<option value="">—</option>
									{PROVINCES.map((p) => (
										<option
											key={p}
											value={p}
										>
											{p}
										</option>
									))}
								</SelectField>
								<div>
									<Label className="text-xs text-neutral-500 mb-1">Code postal</Label>
									<Input
										value={formData.codePostal}
										onChange={f("codePostal")}
									/>
								</div>
							</div>
						</div>

						{/* Profil */}
						<div className="space-y-3">
							<p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Profil</p>
							<SelectField
								label="Type de client"
								value={formData.typeClient}
								onChange={f("typeClient")}
							>
								<option value="">—</option>
								<option value="Particulier">Particulier</option>
								<option value="Travailleur autonome">Travailleur autonome</option>
								<option value="Entreprise">Entreprise</option>
							</SelectField>
							<SelectField
								label="Statut fiscal"
								value={formData.statutFiscal}
								onChange={f("statutFiscal")}
							>
								<option value="">—</option>
								<option value="Résident">Résident</option>
								<option value="Non-résident">Non-résident</option>
								<option value="Étudiant">Étudiant</option>
								<option value="Retraité">Retraité</option>
							</SelectField>
							<div>
								<Label className="text-xs text-neutral-500 mb-1">Occupation</Label>
								<Input
									value={formData.occupation}
									onChange={f("occupation")}
								/>
							</div>
							<div>
								<Label className="text-xs text-neutral-500 mb-1">Employeur principal</Label>
								<Input
									value={formData.employeur}
									onChange={f("employeur")}
								/>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div>
									<Label className="text-xs text-neutral-500 mb-1">Enfants à charge</Label>
									<Input
										type="number"
										min="0"
										value={formData.nbrEnfants}
										onChange={f("nbrEnfants")}
									/>
								</div>
								<SelectField
									label="Niveau priorité"
									value={formData.niveauPriorite}
									onChange={f("niveauPriorite")}
								>
									<option value="normal">Normal</option>
									<option value="vip">VIP</option>
								</SelectField>
							</div>
							<SelectField
								label="Source d'acquisition"
								value={formData.sourceAcquisition}
								onChange={f("sourceAcquisition")}
							>
								<option value="">—</option>
								<option value="Référence">Référence</option>
								<option value="Site web">Site web</option>
								<option value="Publicité">Publicité</option>
								<option value="Réseaux sociaux">Réseaux sociaux</option>
								<option value="Autre">Autre</option>
							</SelectField>
						</div>
					</div>
				)}

				{ongletActif === "fiscal" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-3">
							<p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Données personnelles</p>
							<div className="grid grid-cols-2 gap-3">
								<div>
									<Label className="text-xs text-neutral-500 mb-1">Date de naissance</Label>
									<Input
										type="date"
										value={formData.dateNaissance}
										onChange={f("dateNaissance")}
									/>
								</div>
								<SelectField
									label="État civil"
									value={formData.etatCivil}
									onChange={f("etatCivil")}
								>
									<option value="">—</option>
									<option value="Célibataire">Célibataire</option>
									<option value="Marié(e)">Marié(e)</option>
									<option value="Conjoint(e) de fait">Conjoint(e) de fait</option>
									<option value="Divorcé(e)">Divorcé(e)</option>
									<option value="Veuf/Veuve">Veuf/Veuve</option>
								</SelectField>
							</div>
							<InputSecret
								label="NAS"
								value={formData.nas}
								onChange={f("nas")}
								placeholder="000 000 000"
							/>
							<InputSecret
								label="Numéro TPS"
								value={formData.noTps}
								onChange={f("noTps")}
								placeholder="123456789 RT0001"
							/>
							<InputSecret
								label="Numéro TVQ"
								value={formData.noTvq}
								onChange={f("noTvq")}
								placeholder="1234567890 TQ0001"
							/>
							<div className="flex items-center gap-3 pt-1">
								<input
									type="checkbox"
									id="consentement"
									checked={formData.consentement}
									onChange={(e) => setFormData((p) => ({ ...p, consentement: e.target.checked }))}
									className="w-4 h-4 accent-[#006838]"
								/>
								<Label
									htmlFor="consentement"
									className="text-sm text-neutral-700 cursor-pointer"
								>
									Consentement stockage données sensibles
								</Label>
							</div>
						</div>
						<div className="space-y-3">
							<p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Revenus</p>
							<SelectField
								label="Fourchette de revenus"
								value={formData.revenuFourchette}
								onChange={f("revenuFourchette")}
							>
								<option value="">—</option>
								<option value="0-30k">0 — 30 000 $</option>
								<option value="30k-60k">30 000 — 60 000 $</option>
								<option value="60k-100k">60 000 — 100 000 $</option>
								<option value="100k-150k">100 000 — 150 000 $</option>
								<option value="150k+">150 000 $+</option>
							</SelectField>
							<div>
								<Label className="text-xs text-neutral-500 mb-2">Types de revenus</Label>
								<div className="grid grid-cols-2 gap-2">
									{TYPES_REVENUS_OPTIONS.map((opt) => (
										<label
											key={opt.value}
											className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors"
										>
											<input
												type="checkbox"
												checked={formData.typesRevenus.includes(opt.value)}
												onChange={() => toggleRevenu(opt.value)}
												className="w-4 h-4 accent-[#006838]"
											/>
											<span className="text-sm text-neutral-700">{opt.label}</span>
										</label>
									))}
								</div>
							</div>
						</div>
					</div>
				)}

				{ongletActif === "conjoint" && (
					<div className="max-w-md space-y-3">
						<div className="grid grid-cols-2 gap-3">
							<div>
								<Label className="text-xs text-neutral-500 mb-1">Prénom</Label>
								<Input
									value={formData.conjointPrenom}
									onChange={f("conjointPrenom")}
								/>
							</div>
							<div>
								<Label className="text-xs text-neutral-500 mb-1">Nom</Label>
								<Input
									value={formData.conjointNom}
									onChange={f("conjointNom")}
								/>
							</div>
						</div>
						<div>
							<Label className="text-xs text-neutral-500 mb-1">Date de naissance</Label>
							<Input
								type="date"
								value={formData.conjointDateNaissance}
								onChange={f("conjointDateNaissance")}
							/>
						</div>
						<InputSecret
							label="NAS conjoint(e)"
							value={formData.conjointNas}
							onChange={f("conjointNas")}
							placeholder="000 000 000"
						/>
					</div>
				)}

				{ongletActif === "notes" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<Label className="text-xs text-neutral-500 mb-2">Notes internes</Label>
							<textarea
								value={formData.notesCrm}
								onChange={f("notesCrm")}
								rows={8}
								placeholder="Notes visibles uniquement par l'administrateur..."
								className="w-full text-sm px-3 py-2 border border-neutral-200 rounded-lg bg-white focus:outline-none focus:border-[#006838] resize-none"
							/>
						</div>
						<div>
							<Label className="text-xs text-neutral-500 mb-2">Lien dossier externe</Label>
							<Input
								value={formData.lienDossierExterne}
								placeholder="https://drive.google.com/..."
								onChange={f("lienDossierExterne")}
							/>
							<p className="text-xs text-neutral-400 mt-1">Drive, Dropbox, OneDrive...</p>
						</div>
					</div>
				)}

				{/* Boutons */}
				<div className="flex gap-3 pt-6 mt-6 border-t">
					<button
						onClick={onCancel}
						className="flex-1 py-2.5 border border-neutral-200 text-neutral-700 text-sm rounded-xl hover:bg-neutral-50 transition-colors"
					>
						Annuler
					</button>
					<button
						onClick={onSave}
						disabled={sauvegarde}
						className="flex-1 py-2.5 bg-[#006838] text-white text-sm rounded-xl hover:bg-[#005c31] disabled:opacity-50 transition-colors"
					>
						{sauvegarde ? "Sauvegarde..." : "Sauvegarder"}
					</button>
				</div>
			</div>
		</>
	);
}
