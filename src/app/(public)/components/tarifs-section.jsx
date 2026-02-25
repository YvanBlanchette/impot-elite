"use client";
import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";

const TarifsSection = () => {
	const [services, setServices] = useState([]);
	const [supplements, setSupplements] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// On fetch les deux API en parallèle
				const [resServices, resSupplements] = await Promise.all([fetch("/api/admin/cms/services"), fetch("/api/admin/cms/supplements")]);

				const servicesData = await resServices.json();
				const supplementsData = await resSupplements.json();

				setServices(servicesData);
				setSupplements(supplementsData);
			} catch (error) {
				console.error("Erreur de fetch tarifs:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return null;

	return (
		<section
			id="prices"
			className="bg-[#F2EEEA]"
		>
			<div className="w-[85%] mx-auto">
				<div className="relative isolate px-6 pt-12 md:pt-24">
					<div className="mx-auto max-w-4xl text-center">
						<p className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Nos Tarifs</p>
					</div>

					{/* Pricing cards - Générées dynamiquement */}
					<div className="mx-auto mt-16 w-[90%] flex flex-col md:flex-row items-center justify-center gap-y-8">
						{services.map((service, index) => (
							<div
								key={service.id}
								className={`relative flex flex-col justify-between p-8 ring-1 ring-gray-900/10 sm:p-10 transition-all ${
									service.populaire
										? "bg-white shadow-2xl h-auto md:h-131.5 md:w-[110%] rounded-3xl z-10"
										: "bg-white/60 h-auto md:h-120 w-full rounded-3xl md:rounded-none " + (index === 0 ? "md:rounded-l-3xl" : "md:rounded-r-3xl")
								}`}
							>
								<div>
									<h3 className="text-3xl font-medium text-center tracking-wider uppercase text-[#D7931D]">{service.nom}</h3>
									<p className="mt-4 text-center">
										<span className="text-6xl font-semibold tracking-tight text-gray-900">
											{service.prix.toLocaleString("fr-CA", { minimumFractionDigits: 2 })} $
										</span>
									</p>
									<p className="mt-6 text-base text-gray-600 text-center">{service.description}</p>
									<ul className="mt-8 space-y-3 text-sm text-gray-600">
										{service.features &&
											service.features.map((feature, idx) => (
												<li
													key={idx}
													className="flex gap-x-3"
												>
													<CheckIcon
														className="h-5 w-5 flex-none text-[#D7931D]"
														aria-hidden="true"
													/>
													{feature}
												</li>
											))}
									</ul>
								</div>
								<a
									href="#contact"
									className={`mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold uppercase tracking-wider transition-all ${
										service.populaire ? "bg-[#006838] text-white hover:bg-[#006838]/80" : "text-[#006838] ring-1 ring-[#006838]/30 hover:ring-[#006838]/50"
									}`}
								>
									Débuter dès maintenant !
								</a>
							</div>
						))}
					</div>

					{/* Suppléments*/}
					<div className="relative bg-white w-full max-w-7xl mx-auto rounded-3xl mt-12 p-10 py-18 shadow-sm">
						<h3 className="text-4xl font-medium text-center uppercase tracking-widest pb-8">Suppléments</h3>
						<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
							{supplements.map((s) => (
								<li
									key={s.id}
									className="flex gap-x-3 items-center border-b border-gray-100 pb-2"
								>
									<CheckIcon className="h-5 w-5 text-[#D7931D]  mt-1" />
									<span>
										<span className="font-medium">{s.nom} &nbsp;:</span>
										{s.prix && (
											<span className="ml-2">
												&nbsp;
												<span className="text-ms font-semibold tracking-tight text-gray-900">
													{Number(s.prix).toLocaleString("fr-CA", {
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													})}{" "}
													$
												</span>
											</span>
										)}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TarifsSection;
