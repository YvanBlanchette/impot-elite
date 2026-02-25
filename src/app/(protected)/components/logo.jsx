"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";

export function Logo({ className, width = 160, height = 50 }) {
	return (
		<Link href="/">
			<Image
				src={logo}
				alt="Logo de Impôt Élite"
				className={className}
				width={width}
				height={height}
				priority
			/>
		</Link>
	);
}
