import { CheckIcon } from "lucide-react";

const avantages = [
	{
		title: "100% numérique",
		items: [
			"Votre temps est précieux : aucun déplacement nécessaire.",
			"Accessible entièrement sur votre mobile, votre tablette ou votre ordinateur.",
			"Un espace client vous donnant accès à vos informations en tout temps.",
		],
	},
	{
		title: "Solution économique",
		items: [
			"Nos procédés nous permettent de vous offrir les meilleurs prix.",
			"Coût uniforme : aucuns frais cachés pour un feuillet ou un crédit supplémentaire.",
			"Accès à un professionnel à faible coût.",
		],
	},
	{
		title: "Soutien personnalisé",
		items: [
			"Accès à un expert dédié pour répondre à toutes vos questions.",
			"Suivi personnalisé de votre dossier pour une expérience sans souci.",
			"Support technique disponible pour vous aider à chaque étape.",
		],
	},
];

const AvantagesSection = () => {
	return (
		<section className="w-full bg-white">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">Les avantages Impôt Élite</h2>
				<p className="mt-4 text-lg font-light text-gray-700 max-w-3xl mb-12">
					Simplifiez vos déclarations d&apos;impôt avec notre solution numérique. Notre plateforme intuitive et sécurisée offre des solutions personnalisées et
					efficaces pour vos besoins fiscaux.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{avantages.map((col, i) => (
						<div key={i}>
							<h3 className="tracking-widest text-xl mb-4 uppercase font-medium text-[#D7931D]">{col.title}</h3>
							<ul className="w-[90%] space-y-3">
								{col.items.map((item, j) => (
									<li
										key={j}
										className="flex items-center gap-3"
									>
										<CheckIcon className="w-5 h-5 shrink-0 text-primary" />
										<p className="font-light tracking-wide">{item}</p>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
export default AvantagesSection;
