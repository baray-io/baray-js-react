import { PublicClient } from "baray-js";
import React from "react";

export const BarayContext = React.createContext<PublicClient | null>(null);

export const BarayProvider: React.FC<Props> = ({ children, apiKey }) => {
	const baray = new PublicClient(apiKey);

	return (
		<BarayContext.Provider value={baray}>{children}</BarayContext.Provider>
	);
};

interface Props {
	children: React.ReactNode;
	apiKey: string;
}
