"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import mozaik1 from "@/assets/mozaik1.jpg";
import mozaik2 from "@/assets/mozaik2.jpg";
import mozaik3 from "@/assets/mozaik3.jpg";
import mozaik4 from "@/assets/mozaik4.jpg";
import mozaik5 from "@/assets/mozaik5.jpg";
import step01 from "@/assets/step01.svg";
import step02 from "@/assets/step02.svg";
import step03 from "@/assets/step03.svg";
import DelaisProduction from "./delais-production";

const steps = [
	{
		img: step01,
		num: "1",
		bg: "bg-[#006838]/20",
		label: "Créez votre profil",
		desc: "Ajoutez également conjoint(e) et enfants pour une déclaration commune en un clin d'œil.",
	},
	{
		img: step02,
		num: "2",
		bg: "bg-[#d7d4d1]",
		label: "Court questionnaire",
		desc: "Répondez à quelques questions pour diriger nos professionnels et vous assurer de maximiser vos crédits.",
	},
	{
		img: step03,
		num: "3",
		bg: "bg-[#D7931D]/30",
		label: "Téléchargez vos documents",
		desc: "Téléchargez vos documents. Les documents demandés dépendront de vos réponses.",
	},
];

export default function InfoSection() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="relative bg-white">
			<main>
				<div className="relative isolate">
					<svg
						aria-hidden="true"
						className="absolute inset-x-0 top-0 -z-10 h-256 w-full mask-[radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200"
					>
						<defs>
							<pattern
								x="50%"
								y={-1}
								id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
								width={200}
								height={200}
								patternUnits="userSpaceOnUse"
							>
								<path
									d="M.5 200V.5H200"
									fill="none"
								/>
							</pattern>
						</defs>
						<svg
							x="50%"
							y={-1}
							className="overflow-visible fill-gray-50"
						>
							<path
								d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
								strokeWidth={0}
							/>
						</svg>
						<rect
							fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
							width="100%"
							height="100%"
							strokeWidth={0}
						/>
					</svg>
					<div
						aria-hidden="true"
						className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
					>
						<div
							style={{
								clipPath:
									"polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
							}}
							className="aspect-801/1036 w-200.25 bg-linear-to-tr from-[#006838] to-[#d7931d] opacity-30"
						/>
					</div>
					<div className="overflow-hidden">
						<div className="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
							<div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
								<div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
									<h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl">
										Nous révolutionnons la façon de faire vos impôts
									</h1>
									<p className="text-center md:text-start mt-8 text-lg font-light text-gray-700 sm:text-xl leading-8">
										Impôt Élite simplifie la déclaration de revenus pour les particuliers et les entreprises. Notre plateforme 100% numérique vous permet de
										gérer vos impôts en tout temps et depuis n&apos;importe quel appareil.
									</p>
									<p className="text-center md:text-start mt-8 text-lg font-light text-gray-700 sm:text-xl leading-8">
										Nos experts dédiés vous offrent un soutien personnalisé pour répondre à vos questions et vous guider tout au long du processus. Avec nos
										procédés efficaces et notre tarification transparente, nous vous aidons à économiser temps et argent. Rejoignez la révolution de la
										déclaration d&apos;impôts avec Impôt Élite!
									</p>
									<div className="mt-10 flex items-center gap-x-6">
										<Button className="py-5">
											<Link href="#">Commençons</Link>
										</Button>
									</div>
								</div>
								<div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
									<div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
										<div className="relative">
											<Image
												src={mozaik1}
												alt=""
												className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
											/>
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
										</div>
									</div>
									<div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
										<div className="relative">
											<Image
												src={mozaik2}
												alt=""
												className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
											/>
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
										</div>
										<div className="relative">
											<Image
												src={mozaik3}
												alt=""
												className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
											/>
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
										</div>
									</div>
									<div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
										<div className="relative">
											<Image
												src={mozaik4}
												alt=""
												className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
											/>
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
										</div>
										<div className="relative">
											<Image
												src={mozaik5}
												alt=""
												className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
											/>
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 3 étapes */}
				<div className="pb-24">
					<h2 className=" uppercase font-medium tracking-wider text-lg md:text-2xl text-center mx-auto md:max-w-6xl mb-16">
						Confiez-nous la production de vos déclarations d&apos;impôts en 3 étapes faciles. Simple. Rapide. Sécuritaire.
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16 max-w-7xl mx-auto">
						{steps.map((step, i) => (
							<div
								key={i}
								className={`${step.bg} relative min-h-75 flex flex-col items-center p-12 rounded-sm shadow-sm mb-48 md:mb-0 w-2xl max-w-100 mt-24 mx-auto pt-32`}
							>
								<p className="font-semibold text-white tracking-wider text-4xl mb-8 w-16 h-16 rounded-full flex items-center justify-center border-2 border-white">
									{step.num}
								</p>
								<h3 className="font-base tracking-wider text-2xl mb-8 text-center uppercase">{step.label}</h3>
								<p className="font-light tracking-wider text-lg text-center text-neutral-800">{step.desc}</p>
								<Image
									src={step.img}
									alt=""
									className="absolute -top-24 left-1/2 -translate-x-1/2"
									width={200}
									height={200}
								/>
							</div>
						))}
					</div>
				</div>
			</main>
			<DelaisProduction />
		</div>
	);
}
