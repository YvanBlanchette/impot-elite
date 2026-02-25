import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Impôt Élite",
	description: "Service de déclaration d'impôts en ligne",
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<TooltipProvider>
				<html lang="fr">
					<head>
						<meta
							name="apple-mobile-web-app-title"
							content="MyWebSite"
						/>
					</head>
					<body
						suppressHydrationWarning
						className={`${geistSans.variable} ${geistMono.variable} antialiased`}
					>
						{children}
					</body>
				</html>
			</TooltipProvider>
		</ClerkProvider>
	);
}
