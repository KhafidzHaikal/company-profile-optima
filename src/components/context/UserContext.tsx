"use client";

import { createContext, useContext } from "react";

interface User {
	name: string;
	email: string;
}

export const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);
