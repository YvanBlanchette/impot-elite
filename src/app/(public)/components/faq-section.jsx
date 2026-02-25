import { useEffect, useState } from "react";
import FAQItem from "./faq-item";

const FAQSection = () => {
	const [FAQs, setFAQs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Vérifie bien que ton API est à cette adresse exacte
				const res = await fetch("/api/admin/cms/faq");
				const data = await res.json();

				// Utilise le même nom que ton state [FAQs, setFAQs]
				setFAQs(data);
			} catch (error) {
				console.error("Erreur de fetch FAQ:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return null;

	return (
		<section className="bg-white">
			<div
				id="faq"
				className="relative isolate mx-auto max-w-7xl px-6 pt-24 lg:px-8"
			>
				<div
					className="absolute inset-x-0 top-0 -z-10 overflow-hidden blur-3xl"
					aria-hidden="true"
				>
					<div
						className="relative left-1/2 -z-10 w-[36rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#006838] to-[#d7931d] opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72rem]"
						style={{
							aspectRatio: "1155/678",
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
				<div className="mx-auto max-w-4xl">
					<h2 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">Foire aux questions</h2>
					<p className="mt-4 text-lg font-light text-gray-700 lg:max-w-none">
						Vous retrouverez ici les réponses à la plupart de vos questions. Si des questions persistent, n&apos;hésitez pas à visiter la section « Nous
						contacter » ou utiliser la messagerie directe.
					</p>
					<dl className="mt-16 divide-y divide-gray-900/10">
						{/* Utilise 'FAQs' (le nom de ton state) */}
						{FAQs.map((item) => (
							<FAQItem
								key={item.id}
								q={item.question}
								a={item.reponse}
							/>
						))}
					</dl>
				</div>
			</div>
		</section>
	);
};
export default FAQSection;
