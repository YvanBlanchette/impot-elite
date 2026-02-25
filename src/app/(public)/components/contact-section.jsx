"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import emmanPhoto from "@/assets/emman.jpg";
import { Mail, Phone } from "lucide-react";

const ContactSection = () => {
	const formRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [formData, setFormData] = useState({
		prenom: "",
		nom: "",
		company: "",
		email: "",
		phone: "",
		message: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Sécurité supplémentaire : vérification du formulaire
		if (!formRef.current) return;

		setLoading(true);

		try {
			const result = await emailjs.sendForm(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
				formRef.current,
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
			);

			console.log("Succès EmailJS:", result.text);
			setSubmitted(true);
			setFormData({ prenom: "", nom: "", company: "", email: "", phone: "", message: "" });
		} catch (error) {
			// On utilise console.dir pour forcer l'affichage de l'objet dans Turbopack
			console.error("Détails de l'erreur d'envoi:");
			console.dir(error);

			alert(`Erreur : ${error?.text || "Vérifiez vos identifiants EmailJS dans le fichier .env"}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section
			id="contact"
			className="relative bg-[#F2EEEA] py-24 overflow-hidden -mt-px"
		>
			{/* Éléments décoratifs en arrière-plan */}
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-base font-semibold text-[#006838] uppercase tracking-widest mb-3">FORMULAIRE DE Contact</h2>
					<h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl text-balance">Travaillons ensemble</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto font-light">
						Vous avez des questions ? Je suis là pour vous accompagner. N&apos;hésitez pas à me joindre via le formulaire ou directement par téléphone.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
					{/* Section Profil & Infos */}
					<div className="lg:col-span-6 space-y-8">
						<div className="relative group">
							<div className="relative bg-white backdrop-blur-md p-8 rounded-2xl border border-white shadow-sm">
								<div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
									<Image
										src={emmanPhoto}
										alt="Emmanuel Savard"
										className="w-48 h-48 block object-cover rounded-2xl shadow-md"
									/>
									<div className="text-center sm:text-left">
										<h2 className="text-2xl font-bold text-gray-900">Emmanuel Savard</h2>
										<p className="text-[#006838] font-medium text-sm uppercase tracking-wider mb-4">Fondateur & Expert</p>
										<div className="space-y-2">
											<a
												href="tel:5148331574"
												className="flex items-center justify-center sm:justify-start gap-3 text-gray-600 hover:text-[#d7931d] transition-colors"
											>
												<Phone className="w-4 h-4 text-[#d7931d]" /> (514) 833-1574
											</a>
											<a
												href="mailto:EmmanuelSavard@impotelite.ca"
												className="flex items-center justify-center sm:justify-start gap-3 text-gray-600 hover:text-[#d7931d] transition-colors"
											>
												<Mail className="w-4 h-4 text-[#d7931d]" /> EmmanuelSavard@impotelite.ca
											</a>
										</div>
									</div>
								</div>

								<div className="space-y-4 text-gray-600 leading-relaxed font-light border-t border-gray-200 pt-6">
									<p>Expertise approfondie en fiscalité pour particuliers, orientée vers la maximisation de vos avantages.</p>
									<p>
										<b>BAA & DESS en sciences comptables</b> : une rigueur académique au service de votre tranquillité d&apos;esprit.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Section Formulaire */}
					<div className="lg:col-span-6">
						<div className="bg-white rounded-3xl shadow-gray-200/50 p-8 sm:p-12 border border-white shadow-sm">
							{submitted ? (
								<div className="py-20 text-center animate-in fade-in zoom-in duration-500">
									<div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
										<svg
											className="w-10 h-10"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<h3 className="text-3xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
									<p className="text-gray-500 mb-8">Je vous répondrai personnellement dans les plus brefs délais.</p>
									<button
										onClick={() => setSubmitted(false)}
										className="text-[#006838] font-semibold hover:underline decoration-2 underline-offset-4"
									>
										Envoyer un autre message
									</button>
								</div>
							) : (
								<form
									ref={formRef}
									onSubmit={handleSubmit}
									className="space-y-6"
								>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label
												htmlFor="prenom"
												className="text-sm font-bold text-gray-700 ml-1"
											>
												Prénom
											</label>
											<input
												required
												type="text"
												name="prenom"
												id="prenom"
												value={formData.prenom}
												onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
												placeholder="Jean"
												className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 shadow-inner focus:ring-2 focus:ring-[#006838]/20 focus:border-[#006838] transition-all outline-none"
											/>
										</div>
										<div className="space-y-2">
											<label
												htmlFor="nom"
												className="text-sm font-bold text-gray-700 ml-1"
											>
												Nom
											</label>
											<input
												required
												type="text"
												name="nom"
												id="nom"
												value={formData.nom}
												onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
												placeholder="Tremblay"
												className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 shadow-inner focus:ring-2 focus:ring-[#006838]/20 focus:border-[#006838] transition-all outline-none"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<label
											htmlFor="email"
											className="text-sm font-bold text-gray-700 ml-1"
										>
											Adresse courriel
										</label>
										<input
											required
											type="email"
											name="email"
											id="email"
											value={formData.email}
											onChange={(e) => setFormData({ ...formData, email: e.target.value })}
											placeholder="votre@email.com"
											className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 shadow-inner focus:ring-2 focus:ring-[#006838]/20 focus:border-[#006838] transition-all outline-none"
										/>
									</div>

									<div className="space-y-2">
										<label
											htmlFor="message"
											className="text-sm font-bold text-gray-700 ml-1"
										>
											Message
										</label>
										<textarea
											required
											name="message"
											id="message"
											rows={5}
											value={formData.message}
											onChange={(e) => setFormData({ ...formData, message: e.target.value })}
											placeholder="Comment puis-je vous aider aujourd'hui ?"
											className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 shadow-inner focus:ring-2 focus:ring-[#006838]/20 focus:border-[#006838] transition-all outline-none resize-none"
										/>
									</div>

									<button
										type="submit"
										disabled={loading}
										className="cursor-pointer uppercase tracking-wider relative w-full inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-[#006838] rounded-md active:scale-[0.98] disabled:opacity-70"
									>
										{loading ? (
											<span className="flex items-center gap-2">
												<svg
													className="animate-spin h-5 w-5 text-white"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
														fill="none"
													/>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													/>
												</svg>
												Transmission...
											</span>
										) : (
											"Envoyer ma demande"
										)}
									</button>
								</form>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
