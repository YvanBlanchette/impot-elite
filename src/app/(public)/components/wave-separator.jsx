import React from "react";

const WaveSeparator = ({ topColor = "#F2EEEA", bottomColor = "#FFFFFF", isReversed = false }) => {
	return (
		<div
			className={isReversed ? "" : "-mt-36"}
			style={{ backgroundColor: isReversed ? bottomColor : topColor }}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				className="w-full h-auto block"
			>
				<path
					fill={isReversed ? topColor : bottomColor}
					fillOpacity="1"
					d="M1440,240L0,320L0,320L1440,320Z"
				/>
			</svg>
		</div>
	);
};

export default WaveSeparator;
