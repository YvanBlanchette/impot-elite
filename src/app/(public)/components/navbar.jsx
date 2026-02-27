"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "../../(protected)/components/link";
import { Logo } from "../../(protected)/components/logo";
import { PlusGrid, PlusGridItem, PlusGridRow } from "../../(protected)/components/plus-grid";
import { Button } from "@/components/ui/button";

const links = [
	{ href: "#about", label: "À Propos" },
	{ href: "#rates", label: "Tarifs" },
	{ href: "#faq", label: "FAQ" },
	{ href: "#contact", label: "Contact" },
];

function DesktopNav() {
	return (
		<nav className="relative hidden lg:flex">
			{links.map(({ href, label }) => (
				<Link
					key={label}
					href={href}
					className="flex items-center px-6 py-3 text-base text-gray-950 bg-blend-multiply data-hover:bg-black/2.5 uppercase tracking-widest"
				>
					{label}
				</Link>
			))}
		</nav>
	);
}

function MobileNavButton() {
	return (
		<DisclosureButton
			className="flex size-12 items-center justify-center self-center rounded-lg data-hover:bg-black/5 lg:hidden"
			aria-label="Open main menu"
		>
			<Menu className="size-6" />
		</DisclosureButton>
	);
}

function MobileNav() {
	return (
		<DisclosurePanel className="lg:hidden">
			<div className="flex flex-col gap-6 py-4">
				{links.map(({ href, label }, linkIndex) => (
					<motion.div
						initial={{ opacity: 0, rotateX: -90 }}
						animate={{ opacity: 1, rotateX: 0 }}
						transition={{
							duration: 0.15,
							ease: "easeInOut",
							rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
						}}
						key={href}
					>
						<Link
							href={href}
							className="text-base font-medium text-gray-950"
						>
							{label}
						</Link>
					</motion.div>
				))}
			</div>
			<div className="absolute left-1/2 w-screen -translate-x-1/2">
				<div className="absolute inset-x-0 top-0 border-t border-black/5" />
				<div className="absolute inset-x-0 top-2 border-t border-black/5" />
			</div>
		</DisclosurePanel>
	);
}

export function Navbar({ banner }) {
	return (
		<Disclosure
			as="header"
			className="sticky top-0 z-50 bg-white h-30 shadow-lg"
		>
			<div className="mx-auto max-w-7xl h-full flex justify-between items-center">
				<Logo />
				{banner && <div className="relative hidden items-center py-3 lg:flex">{banner}</div>}
				<DesktopNav />
				<MobileNavButton />
				<MobileNav />

				<div className="flex justify-end items-center gap-8">
					<Link
						className="uppercase tracking-widest px-4 py-3 text-base bg-blend-multiply data-hover:bg-black/2.5"
						href="/sign-in"
					>
						Portail Web
					</Link>
					<Button asChild>
						<Link href="/sign-in">Soumission</Link>
					</Button>
				</div>
			</div>
		</Disclosure>
	);
}
