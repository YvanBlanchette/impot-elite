"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { FileText, Upload, Clock, CheckCircle, Users, FolderOpen, AlertCircle, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color, bg }) {
	return (
		<Card className="border-0 shadow-sm">
			<CardContent className="p-5">
				<div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
					<Icon className={`w-5 h-5 ${color}`} />
				</div>
				<p className="text-2xl font-bold text-neutral-900">{value}</p>
				<p className="text-xs text-neutral-500 mt-1">{label}</p>
			</CardContent>
		</Card>
	);
}

// ─── Action Card ─────────────────────────────────────────────────────────────

function ActionCard({ href, icon: Icon, iconBg, iconColor, title, subtitle, primary }) {
	return (
		<Link
			href={href}
			className={`flex items-center gap-4 p-5 rounded-xl transition-all group
        ${primary ? "bg-[#006838]/15 hover:bg-[#006838]/22 border border-[#006838]/20" : "bg-white border hover:border-[#c9a227]/40 hover:shadow-sm"}`}
		>
			<div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shrink-0`}>
				<Icon className={`w-5 h-5 ${iconColor}`} />
			</div>
			<div className="flex-1 min-w-0">
				<p className="font-medium text-neutral-900">{title}</p>
				<p className="text-sm text-neutral-500 mt-0.5">{subtitle}</p>
			</div>
			<ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all shrink-0" />
		</Link>
	);
}

// ─── Dashboard Client ─────────────────────────────────────────────────────────

function DashboardClient({ user, userId }) {
	const [stats, setStats] = useState({
		documentsTotal: 0,
		enCours: 0,
		rapportsPrets: 0,
		dossiersTotal: 0,
	});

	useEffect(() => {
		if (!userId) return;
		fetch(`/api/stats?userId=${userId}`)
			.then((r) => r.json())
			.then(setStats);
	}, [userId]);

	const statCards = [
		{ label: "Documents soumis", value: stats.documentsTotal, icon: Upload, color: "text-[#006838]", bg: "bg-[#006838]/10" },
		{ label: "Dossiers en cours", value: stats.enCours, icon: Clock, color: "text-[#c9a227]", bg: "bg-[#c9a227]/10" },
		{ label: "Rapports prêts", value: stats.rapportsPrets, icon: CheckCircle, color: "text-[#006838]", bg: "bg-[#006838]/10" },
		{ label: "Total dossiers", value: stats.dossiersTotal, icon: FolderOpen, color: "text-[#c9a227]", bg: "bg-[#c9a227]/10" },
	];

	return (
		<div className="p-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-semibold text-neutral-900">Bonjour, {user?.firstName}</h1>
				<p className="text-neutral-500 mt-1">Bienvenue sur votre portail fiscal Impôt Élite.</p>
			</div>

			{/* Alerte rapport disponible */}
			{stats.rapportsPrets > 0 && (
				<div className="flex items-center gap-4 p-4 bg-[#c9a227]/10 border border-[#c9a227]/25 rounded-xl mb-6">
					<div className="w-9 h-9 bg-[#c9a227]/20 rounded-lg flex items-center justify-center shrink-0">
						<CheckCircle className="w-4 h-4 text-[#c9a227]" />
					</div>
					<div className="flex-1">
						<p className="text-sm font-medium text-neutral-900">{stats.rapportsPrets} rapport(s) prêt(s) à télécharger</p>
						<p className="text-xs text-neutral-500 mt-0.5">Vos documents fiscaux sont disponibles.</p>
					</div>
					<Link
						href="/dashboard/documents"
						className="text-sm font-medium text-[#c9a227] hover:text-[#b08a1e] transition-colors shrink-0 flex items-center gap-1"
					>
						Voir <ArrowRight className="w-3.5 h-3.5" />
					</Link>
				</div>
			)}

			{/* Stats */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				{statCards.map((stat) => (
					<StatCard
						key={stat.label}
						{...stat}
					/>
				))}
			</div>

			{/* Actions */}
			<h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">Actions rapides</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<ActionCard
					href="/dashboard/upload"
					icon={Upload}
					iconBg="bg-[#006838]/10"
					iconColor="text-[#006838]"
					title="Déposer mes documents"
					subtitle="T4, relevés, reçus..."
					primary
				/>
				<ActionCard
					href="/dashboard/documents"
					icon={FileText}
					iconBg="bg-[#c9a227]/10"
					iconColor="text-[#c9a227]"
					title="Mes dossiers"
					subtitle="Suivre l'état de mes fichiers"
				/>
			</div>
		</div>
	);
}

// ─── Dashboard Admin ──────────────────────────────────────────────────────────

function DashboardAdmin({ user, userId }) {
	const [stats, setStats] = useState({
		totalClients: 0,
		dossiersEnAttente: 0,
		dossiersEnCours: 0,
		dossiersCompletes: 0,
		actionRequise: 0,
	});

	useEffect(() => {
		if (!userId) return;
		fetch(`/api/admin/stats?userId=${userId}`)
			.then((r) => r.json())
			.then(setStats);
	}, [userId]);

	const statCards = [
		{ label: "Clients", value: stats.totalClients, icon: Users, color: "text-[#006838]", bg: "bg-[#006838]/10" },
		{ label: "En attente", value: stats.dossiersEnAttente, icon: Clock, color: "text-[#c9a227]", bg: "bg-[#c9a227]/10" },
		{ label: "En traitement", value: stats.dossiersEnCours, icon: TrendingUp, color: "text-[#006838]", bg: "bg-[#006838]/10" },
		{ label: "Action requise", value: stats.actionRequise, icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
	];

	return (
		<div>
			{/* Header */}
			<header className="bg-white h-26 border-b px-8 flex items-center justify-betweenw-full shadow">
				<div className="">
					<h1 className="text-2xl font-semibold text-neutral-900">Bonjour, {user?.firstName}</h1>
					<p className="text-neutral-500 mt-1">Voici un aperçu de votre cabinet.</p>
				</div>

				{/* Alerte action requise */}
				{stats.actionRequise > 0 && (
					<div className="flex items-center gap-4 p-4 bg-red-50 border border-red-100 rounded-xl mb-6">
						<div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
							<AlertCircle className="w-4 h-4 text-red-500" />
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium text-neutral-900">{stats.actionRequise} dossier(s) nécessitent une action</p>
							<p className="text-xs text-neutral-500 mt-0.5">Des clients attendent votre intervention.</p>
						</div>
						<Link
							href="/dashboard/clients"
							className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors shrink-0 flex items-center gap-1"
						>
							Voir <ArrowRight className="w-3.5 h-3.5" />
						</Link>
					</div>
				)}
			</header>

			<main className="p-8">
				{/* Stats */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					{statCards.map((stat) => (
						<StatCard
							key={stat.label}
							{...stat}
						/>
					))}
				</div>

				{/* Actions */}
				<h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">Actions rapides</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<ActionCard
						href="/dashboard/clients"
						icon={Users}
						iconBg="bg-[#006838]/10"
						iconColor="text-[#006838]"
						title="Gérer les clients"
						subtitle="Voir tous les dossiers"
						primary
					/>
					<ActionCard
						href="/dashboard/clients"
						icon={Clock}
						iconBg="bg-[#c9a227]/10"
						iconColor="text-[#c9a227]"
						title="Dossiers en attente"
						subtitle={`${stats.dossiersEnAttente} dossier(s) à traiter`}
					/>
				</div>
			</main>
		</div>
	);
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function DashboardPage() {
	const { user } = useUser();
	const { userId } = useAuth();
	const isAdmin = user?.publicMetadata?.role === "admin";

	if (!user) return null;

	return isAdmin ? (
		<DashboardAdmin
			user={user}
			userId={userId}
		/>
	) : (
		<DashboardClient
			user={user}
			userId={userId}
		/>
	);
}
