import { Inter } from "next/font/google";
import "../globals.css";
import { I18nProvider } from "@/components/I18nProvider";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

type Props = {
	children: ReactNode;
	params: { locale: string };
};

export async function generateStaticParams() {
	return [{ locale: "en" }, { locale: "id" }];
}

export async function generateMetadata({
	params,
}: {
	params: { locale: string | string[] };
}) {
	const resolvedParams = await Promise.resolve(params);
	const locale = Array.isArray(resolvedParams.locale)
		? resolvedParams.locale[0]
		: resolvedParams.locale ?? "en";

	return {
		title: locale === "id" ? "Beranda" : "Home",
	};
}

export default async function RootLayout({ children, params }: Props) {
	const resolvedParams = await Promise.resolve(params);
	const locale = Array.isArray(resolvedParams.locale)
		? resolvedParams.locale[0]
		: resolvedParams.locale ?? "en";

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<link rel="shortcut icon" href="/images/favicon.ico" />
			</head>
			<body
				className={`${inter.variable} font-inter antialiased container flex flex-col min-h-screen scroll-smooth`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<I18nProvider locale={locale}>
						{children}
					</I18nProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
