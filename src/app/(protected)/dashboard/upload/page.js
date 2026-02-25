"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

const TYPES_DOCUMENT = [
	{ value: "declaration_revenus", label: "Déclaration de revenus" },
	{ value: "avis_cotisation", label: "Avis de cotisation" },
	{ value: "piece_justificative", label: "Pièce justificative" },
];

const ANNEE_COURANTE = new Date().getFullYear() - 1;
const ANNEES = Array.from({ length: 25 }, (_, i) => ANNEE_COURANTE - i);

function creerFichier(f) {
	return {
		fichier: f,
		nom: f.name.replace(/\.[^/.]+$/, ""), // nom sans extension
		type: f.type,
		typeFiscal: "piece_justificative",
		anneeFiscale: ANNEE_COURANTE,
	};
}

export default function UploadPage() {
	const { userId } = useAuth();
	const [fichiers, setFichiers] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [resultat, setResultat] = useState(null);

	// Pour le bandeau "appliquer à tous"
	const [globalType, setGlobalType] = useState("piece_justificative");
	const [globalAnnee, setGlobalAnnee] = useState(ANNEE_COURANTE);

	const onDrop = useCallback((acceptedFiles) => {
		setFichiers((prev) => [...prev, ...acceptedFiles.map(creerFichier)]);
		setResultat(null);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"application/pdf": [".pdf"],
			"image/jpeg": [".jpg", ".jpeg"],
			"image/png": [".png"],
		},
		maxSize: 10 * 1024 * 1024,
	});

	const retirer = (index) => setFichiers((prev) => prev.filter((_, i) => i !== index));

	const mettreAJour = (index, champ, valeur) => {
		setFichiers((prev) => prev.map((f, i) => (i === index ? { ...f, [champ]: valeur } : f)));
	};

	const appliquerATous = () => {
		setFichiers((prev) => prev.map((f) => ({ ...f, typeFiscal: globalType, anneeFiscale: globalAnnee })));
	};

	const envoyer = async () => {
		if (fichiers.length === 0) return;
		setUploading(true);
		setResultat(null);

		try {
			const formData = new FormData();
			fichiers.forEach((f, i) => {
				formData.append("fichiers", f.fichier);
				formData.append(`nom_${i}`, f.nom);
				formData.append(`type_${i}`, f.typeFiscal);
				formData.append(`annee_${i}`, f.anneeFiscale);
			});
			formData.append("userId", userId);
			formData.append("count", fichiers.length);

			const res = await fetch("/api/upload", { method: "POST", body: formData });
			if (!res.ok) throw new Error("Erreur lors de l'upload");

			setResultat({ succes: true, message: `${fichiers.length} fichier(s) envoyé(s) avec succès.` });
			setFichiers([]);
		} catch (err) {
			setResultat({ succes: false, message: err.message });
		} finally {
			setUploading(false);
		}
	};

	const selectClass =
		"text-sm px-2 py-1.5 border border-neutral-200 rounded-lg bg-white text-neutral-700 focus:outline-none focus:border-[#006838] cursor-pointer";

	return (
		<div>
			{/* Header */}
			<div className="bg-white h-26 border-b px-8 flex flex-col items-start justify-center">
				<h1 className="text-2xl font-semibold text-neutral-900">Déposer mes documents</h1>
				<p className="text-neutral-500 mt-1">Uploadez vos T4, relevés, reçus et autres documents fiscaux.</p>
			</div>

			<div className="p-8 max-w-4xl mx-auto space-y-6">
				{/* Zone de drop */}
				<div
					{...getRootProps()}
					className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all bg-[#006838]/5 hover:bg-[#006838]/10 ${isDragActive ? "border-[#006838] scale-[1.01]" : "border-neutral-200 hover:border-[#006838]/40"}`}
				>
					<input {...getInputProps()} />
					<div
						className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors ${isDragActive ? "bg-[#006838]/15" : "bg-neutral-100"}`}
					>
						<Upload className={`w-7 h-7 transition-colors ${isDragActive ? "text-[#006838]" : "text-neutral-400"}`} />
					</div>
					{isDragActive ? (
						<p className="text-[#006838] font-medium">Déposez vos fichiers ici...</p>
					) : (
						<>
							<p className="text-neutral-700 font-medium">Glissez-déposez vos fichiers ici</p>
							<p className="text-neutral-400 text-sm mt-1">ou cliquez pour sélectionner</p>
							<p className="text-neutral-400 text-xs mt-4">PDF, JPG, PNG — Max 10 MB par fichier</p>
						</>
					)}
				</div>

				{/* Liste des fichiers */}
				{fichiers.length > 0 && (
					<div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
						{/* Bandeau appliquer à tous */}
						<div className="px-4 py-3 bg-[#006838]/5 border-b border-[#006838]/10 flex flex-wrap items-center gap-3">
							<span className="text-xs font-medium text-[#006838] uppercase tracking-wider shrink-0">Appliquer à tous :</span>
							<select
								value={globalType}
								onChange={(e) => setGlobalType(e.target.value)}
								className={selectClass}
							>
								{TYPES_DOCUMENT.map((t) => (
									<option
										key={t.value}
										value={t.value}
									>
										{t.label}
									</option>
								))}
							</select>
							<select
								value={globalAnnee}
								onChange={(e) => setGlobalAnnee(Number(e.target.value))}
								className={selectClass}
							>
								{ANNEES.map((a) => (
									<option
										key={a}
										value={a}
									>
										{a}
									</option>
								))}
							</select>
							<button
								onClick={appliquerATous}
								className="text-xs px-3 py-1.5 bg-[#006838] text-white rounded-lg hover:bg-[#005c31] transition-colors shrink-0"
							>
								Appliquer
							</button>
							<button
								onClick={() => setFichiers([])}
								className="text-xs text-neutral-400 hover:text-red-500 transition-colors ml-auto shrink-0"
							>
								Tout retirer
							</button>
						</div>

						{/* Entêtes */}
						<div className="grid grid-cols-[1fr_180px_120px_36px] gap-3 px-4 py-2 border-b border-neutral-100 bg-neutral-50">
							<span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Nom du document</span>
							<span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Type</span>
							<span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Année fiscale</span>
							<span />
						</div>

						{/* Lignes */}
						<div className="divide-y divide-neutral-50">
							{fichiers.map((f, i) => (
								<div
									key={i}
									className="grid grid-cols-[1fr_180px_120px_36px] gap-3 items-center px-4 py-3"
								>
									{/* Nom éditable */}
									<div className="flex items-center gap-2 min-w-0">
										<div className="w-7 h-7 bg-[#006838]/10 rounded-lg flex items-center justify-center shrink-0">
											<File className="w-3.5 h-3.5 text-[#006838]" />
										</div>
										<input
											type="text"
											value={f.nom}
											onChange={(e) => mettreAJour(i, "nom", e.target.value)}
											className="text-sm text-neutral-900 bg-transparent border-b border-transparent hover:border-neutral-200 focus:border-[#006838] focus:outline-none w-full truncate transition-colors"
										/>
									</div>

									{/* Type fiscal */}
									<select
										value={f.typeFiscal}
										onChange={(e) => mettreAJour(i, "typeFiscal", e.target.value)}
										className={selectClass}
									>
										{TYPES_DOCUMENT.map((t) => (
											<option
												key={t.value}
												value={t.value}
											>
												{t.label}
											</option>
										))}
									</select>

									{/* Année fiscale */}
									<select
										value={f.anneeFiscale}
										onChange={(e) => mettreAJour(i, "anneeFiscale", Number(e.target.value))}
										className={`${selectClass} border-2 ${f.anneeFiscale ? "border-neutral-200" : "border-red-400"}`}
									>
										{ANNEES.map((a) => (
											<option
												key={a}
												value={a}
											>
												{a}
											</option>
										))}
									</select>

									{/* Supprimer */}
									<button
										onClick={() => retirer(i)}
										className="p-1.5 text-neutral-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
									>
										<X className="w-3.5 h-3.5" />
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Résultat */}
				{resultat && (
					<div
						className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm ${resultat.succes ? "bg-[#006838]/8 border border-[#006838]/20 text-[#006838]" : "bg-red-50 border border-red-100 text-red-600"}`}
					>
						{resultat.succes ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
						{resultat.message}
					</div>
				)}

				{/* Bouton envoyer */}
				{fichiers.length > 0 && (
					<button
						onClick={envoyer}
						disabled={uploading}
						className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#006838] text-white text-sm font-medium rounded-xl hover:bg-[#005c31] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
					>
						{uploading ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours...
							</>
						) : (
							<>
								<Upload className="w-4 h-4" /> Envoyer {fichiers.length} document{fichiers.length > 1 ? "s" : ""}
							</>
						)}
					</button>
				)}
			</div>
		</div>
	);
}
