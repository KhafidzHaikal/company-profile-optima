/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export function I18nProvider({
	children,
	locale,
}: {
	children: ReactNode;
	locale: string;
}) {
	let messages;
	try {
		messages = require(`../messages/${locale}.json`); // Load correct translations
	} catch (error) {
		return notFound(); // Return 404 if locale file is missing
	}

	return (
		<NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Jakarta">
			{children}
		</NextIntlClientProvider>
	);
}
