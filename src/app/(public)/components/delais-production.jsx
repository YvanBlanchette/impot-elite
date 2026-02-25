"use client";
import { useEffect, useState } from "react";

const DelaisProduction = () => {
	const [config, setConfig] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/admin/cms/config")
			.then((res) => res.json())
			.then((data) => {
				console.log("DEBUG DATA:", data); // <--- REGARDE CE LOG DANS TA CONSOLE

				// Protection : on vérifie si data est bien un tableau
				if (Array.isArray(data)) {
					const delai = data.find((c) => c.cle === "DELAI_PRODUCTION");
					setConfig(delai);
				} else if (data && data.configs) {
					// Au cas où tes données sont dans une propriété "configs"
					const delai = data.configs.find((c) => c.cle === "DELAI_PRODUCTION");
					setConfig(delai);
				}

				setLoading(false);
			})
			.catch((err) => {
				console.error("Erreur fetch:", err);
				setLoading(false);
			});
	}, []);

	// Si on charge encore, ou si la config n'existe pas, ou si c'est masqué : on n'affiche rien
	if (loading || !config || !config.estVisible) return null;

	return (
		<div className="absolute -top-34 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pb-16">
			<p className="uppercase text-[#006838] tracking-widest text-sm md:text-lg mb-4">Délai de production actuel</p>

			<div className="flex items-center justify-center gap-3 mb-3">
				<div className="px-4 py-5 bg-white border border-neutral-100 rounded-xl text-5xl font-bold text-[#006838] shadow-lg">0</div>
				<div className="px-4 py-5 bg-white border border-neutral-100 rounded-xl text-5xl font-bold text-[#006838] shadow-lg">{config.valeur}</div>
			</div>

			<p className="uppercase text-[#006838] tracking-widest text-lg">Jours</p>
		</div>
	);
};

export default DelaisProduction;
