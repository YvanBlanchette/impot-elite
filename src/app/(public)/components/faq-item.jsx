"use client"; // N'oublie pas ceci car tu utilises useState
import { useState } from "react";

const FAQItem = ({ q, a }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="py-6 border-b border-gray-900/10 last:border-0">
			<button
				onClick={() => setOpen(!open)}
				className="cursor-pointer flex w-full items-start justify-between text-left text-gray-900"
			>
				<span className="text-base font-semibold leading-7">{q}</span>
				<span className="ml-6 flex h-7 items-center">
					{open ? (
						<svg
							className="w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={1.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M18 12H6"
							/>
						</svg>
					) : (
						<svg
							className="w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={1.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6v12m6-6H6"
							/>
						</svg>
					)}
				</span>
			</button>
			{open && <p className="mt-4 text-base leading-7 text-gray-600 font-light">{a}</p>}
		</div>
	);
};

export default FAQItem;
