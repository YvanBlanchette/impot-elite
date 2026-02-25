"use client";

import { User, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InfoLigne from "./ui/InfoLigne";
import ChampSecret from "./ui/ChampSecret";
import InputSecret from "./ui/InputSecret";
import Section from "./ui/Section";

export function TabConjointLecture({ client }) {
	const nom = `${client.conjointPrenom ?? ""} ${client.conjointNom ?? ""}`.trim();
	return (
		<div className="max-w-md p-8">
			<Section
				titre="Conjoint(e)"
				icone={Users}
			>
				<InfoLigne
					icone={User}
					label="Prénom et nom"
					valeur={nom || null}
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
	);
}

export function TabConjointEdition({ formData, f }) {
	return (
		<div className="max-w-md space-y-3 p-8">
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
	);
}
