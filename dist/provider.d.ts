import { PublicClient } from 'baray-js';
import { default as React } from 'react';

export declare const BarayContext: React.Context<PublicClient | null>;
export declare const BarayProvider: React.FC<Props>;
interface Props {
    children: React.ReactNode;
    apiKey: string;
}
export {};
