"use client";

import { User, FileText, Heart, CheckSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InfoLigne from "./ui/InfoLigne";
import ChampSecret from "./ui/ChampSecret";
import InputSecret from "./ui/InputSecret";
import Section from "./ui/Section";
import SelectField from "./ui/SelectField";
import { TYPES_REVENUS_OPTIONS } from "@/app/(protected)/dashboard/(admin)/clients/components/config";
import clsx from "clsx";

export function TabFiscalLecture({ client }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
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
					{client.consentementDate && <p className="text-xs text-neutral-400 pb-3">Signé le {new Date(client.consentementDate).toLocaleDateString("fr-CA")}</p>}
				</Section>
			</div>
		</div>
	);
}

export function TabFiscalEdition({ formData, setFormData, f }) {
	const toggleRevenu = (val) => {
		setFormData((p) => ({
			...p,
			typesRevenus: p.typesRevenus.includes(val) ? p.typesRevenus.filter((r) => r !== val) : [...p.typesRevenus, val],
		}));
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
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
	);
}
