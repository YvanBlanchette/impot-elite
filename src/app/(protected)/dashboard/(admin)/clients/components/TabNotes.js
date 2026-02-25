"use client";

import { StickyNote, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InfoLigne from "./ui/InfoLigne";
import Section from "./ui/Section";

export function TabNotesLecture({ client }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
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
	);
}

export function TabNotesEdition({ formData, f }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
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
	);
}
