"use client";
import InfoSection from "@/app/(public)/components/info-section";
import AvantagesSection from "@/app/(public)/components/avantages-section";

const AboutSection = () => {
	return (
		<section
			id="about"
			className="bg-white"
		>
			<main className="isolate relative">
				<InfoSection />
				<AvantagesSection />
			</main>
		</section>
	);
};

export default AboutSection;
