import Link from "next/link";
import heroImg from "@/assets/hero-img.jpg";
import Image from "next/image";

const HeroSection = () => {
	return (
		<section className="relative isolate w-full h-full min-h-[calc(100vh-64px)] pt-35 md:pt-25 bg-[#F2EEEA] overflow-hidden">
			{/* Gradient blob */}
			<div
				className="absolute inset-x-0 top-0 -z-10 overflow-hidden blur-3xl"
				aria-hidden="true"
			>
				<div
					className="relative left-1/2 -z-10 w-xl max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#006838] to-[#d7931d] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72rem]"
					style={{
						aspectRatio: "1155/678",
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>

			<div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-center">
				{/* Image */}
				<div className="h-full w-full order-2 md:order-1 flex justify-center">
					<Image
						src={heroImg}
						alt="Image de la page d'accueil"
						className="w-full max-w-[600px] h-auto object-cover mx-auto"
						style={{
							borderRadius: "80% 50% 70% 30% / 67% 60% 38% 33%",

							// Le masque reste utile pour adoucir le contour si nécessaire
							WebkitMaskImage: "radial-gradient(circle, black 100%, transparent 100%)",
							maskImage: "radial-gradient(circle, black 100%, transparent 100%)",
						}}
					/>
				</div>

				{/* Texte */}
				<div className="order-1 md:order-2 text-center md:text-end w-[90%] mx-auto md:pr-[15%] py-12 md:py-0">
					<p className="uppercase font-medium text-center md:text-end text-sm md:text-base lg:text-xl tracking-widest mb-2 text-[#D7931D]">
						100% numérique, rapide et sécuritaire
					</p>
					<h2 className="text-4xl lg:text-6xl text-center md:text-end font-semibold tracking-tight text-gray-900 mb-8">
						Service de déclaration d&apos;impôts en ligne
					</h2>
					<p className="text-base lg:text-lg font-light text-gray-700 w-[95%] ml-auto tracking-wide mb-10 text-center md:text-end">
						La nouvelle façon de <b>faire faire</b> ses impôts par un professionnel. Déposez votre dossier en quelques minutes sur notre plateforme 100% en
						ligne et maximisez vos crédits d&apos;impôts en toute confiance.
					</p>
					<Link
						href="/dashboard"
						className="inline-block font-base tracking-widest text-base uppercase px-8 py-3 bg-[#006838] text-white hover:bg-[#005c31] transition-colors w-full md:w-auto text-center"
					>
						Débuter
					</Link>
				</div>
			</div>
		</section>
	);
};
export default HeroSection;
