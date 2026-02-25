"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Upload, Users, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Logo } from "@/app/(protected)/components/logo";

const navItems = [
	{ href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
	{ href: "/dashboard/documents", label: "Mes documents", icon: FileText },
	{ href: "/dashboard/upload", label: "Déposer documents", icon: Upload },
];

const adminItems = [
	{ href: "/dashboard/clients", label: "Clients", icon: Users },
	{ href: "/dashboard/parametres", label: "Paramètres", icon: Settings },
];

export default function DashboardLayout({ children }) {
	const { user } = useUser();
	const pathname = usePathname();
	const isAdmin = user?.publicMetadata?.role === "admin";

	const isActive = (href) => (href === "/dashboard" ? pathname === href : pathname.startsWith(href));

	return (
		<TooltipProvider>
			<div className="flex h-screen bg-neutral-50">
				<aside className="w-64 bg-white border-r flex flex-col shadow">
					{/* Logo */}
					<div className="flex items-center justify-center px-6 py-5 h-26 border-b">
						<Logo className="h-16" />
					</div>

					{/* Navigation */}
					<nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                  ${isActive(item.href) ? "bg-[#006838]/10 text-neutral-600 font-medium" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"}`}
							>
								<item.icon className="w-4 h-4 shrink-0" />
								{item.label}
							</Link>
						))}

						{isAdmin && (
							<>
								<div className="pt-4 pb-1 px-3">
									<p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Administration</p>
								</div>
								{adminItems.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                      ${isActive(item.href) ? "bg-[#006838]/10 text-neutral-600 font-medium" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"}`}
									>
										<item.icon className="w-4 h-4 shrink-0" />
										{item.label}
									</Link>
								))}
							</>
						)}
					</nav>

					<Separator />

					{/* User */}
					<div className="p-4 flex items-center gap-3">
						<UserButton />
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-neutral-900 truncate">
								{user?.firstName} {user?.lastName}
							</p>
							<p className="text-xs text-neutral-400 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
						</div>
					</div>
				</aside>

				<main className="flex-1 overflow-auto">{children}</main>
			</div>
		</TooltipProvider>
	);
}
