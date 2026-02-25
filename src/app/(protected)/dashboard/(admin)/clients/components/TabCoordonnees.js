"use client";

import { User, Mail, Phone, MapPin, Building2, Users, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InfoLigne from "@/app/(protected)/dashboard/(admin)/clients/components/ui/InfoLigne";
import Section from "@/app/(protected)/dashboard/(admin)/clients/components/ui/Section";
import SelectField from "@/app/(protected)/dashboard/(admin)/clients/components/ui/SelectField";
import { PROVINCES } from "@/app/(protected)/dashboard/(admin)/clients/components/config";

export function TabCoordonneesLecture({ client }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
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
	);
}

export function TabCoordonneesEdition({ formData, f }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
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
	);
}
