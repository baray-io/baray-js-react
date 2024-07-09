import React from "react";
import { BarayContext } from "./provider";

export const useBaray = () => {
	const context = React.useContext(BarayContext);

	if (typeof context === "undefined") {
		throw new Error("useBaray hook must be used inside BarayProvider");
	}

	return context;
};
