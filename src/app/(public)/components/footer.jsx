import { NAV_LINKS } from "../page";
import { Logo } from "../../(protected)/components/logo";

const Footer = () => {
	return (
		<footer className="bg-white border-t border-gray-100">
			<div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-14 lg:px-8">
				<Logo
					height={80}
					width={250}
					className="mx-auto mb-8"
				/>
				<nav
					className="-mb-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm leading-6"
					aria-label="Footer"
				>
					{NAV_LINKS.map((l) => (
						<a
							key={l.href}
							href={l.href}
							className="text-gray-600 hover:text-gray-900"
						>
							{l.label}
						</a>
					))}
				</nav>
				<div className="mt-16 flex justify-center gap-x-10">
					{[
						{ label: "Facebook", href: "https://www.facebook.com/profile.php?id=61573978085209" },
						{ label: "Portail Web", href: "/sign-in" },
					].map((s) => (
						<a
							key={s.label}
							href={s.href}
							target="_blank"
							className="text-gray-600 hover:text-gray-800 text-sm tracking-wide"
						>
							{s.label}
						</a>
					))}
				</div>
				<p className="mt-10 text-center text-sm leading-6 text-gray-600">© 2026 Impôt Élite. Tous droits réservés.</p>
			</div>
		</footer>
	);
};
export default Footer;
