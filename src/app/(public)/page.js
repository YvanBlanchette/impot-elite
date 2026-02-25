"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";

import emmanPhoto from "@/assets/emman.jpg";
import { Navbar } from "@/app/(public)/components/navbar";
import InfoSection from "@/app/(public)/components/info-section";
import HeroSection from "./components/hero-section";
import AboutSection from "./components/about-section";
import TarifsSection from "./components/tarifs-section";
import WaveSeparator from "./components/wave-separator";
import FAQSection from "./components/faq-section";
import { Contact } from "lucide-react";
import ContactSection from "./components/contact-section";
import AvantagesSection from "./components/avantages-section";
import Footer from "./components/footer";

export const NAV_LINKS = [
	{ href: "#about", label: "À propos" },
	{ href: "#prices", label: "Tarifs" },
	{ href: "#faq", label: "FAQ" },
	{ href: "#contact", label: "Contact" },
];

export default function LandingPage() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="font-sans bg-[#F2EEEA] min-h-screen">
			{/* ── NAVBAR ── */}
			<Navbar />

			<HeroSection />

			{/* Wave separator */}
			<WaveSeparator
				topColor="#F2EEEA"
				bottomColor="#FFFFFF"
			/>

			{/* ── A PROPOS ── */}
			<AboutSection />

			{/* Wave separator */}
			<WaveSeparator
				topColor="#FFFFFF"
				bottomColor="#F2EEEA"
			/>

			{/* ── TARIFS ── */}
			<TarifsSection />

			{/* Wave */}
			<WaveSeparator
				topColor="#F2EEEA"
				bottomColor="#FFFFFF"
			/>

			{/* ── FAQ ── */}
			<FAQSection />

			{/* Wave */}
			<WaveSeparator
				topColor="#FFFFFF"
				bottomColor="#F2EEEA"
			/>

			{/* ── CONTACT ── */}
			<ContactSection />

			{/* ── FOOTER ── */}
			<Footer />
		</div>
	);
}
