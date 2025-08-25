/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY: string = "12345abcdef"; // Change this to a strong secret key
const SALT_ROUNDS = 10; // Recommended number of salt rounds




interface User {
	id: number;
	username: string;
	name: string;
	email: string;
	password: string;
}

interface AuthRequest {
	username: string;
	password: string;
	name?: string; // Added for registration
	email?: string; // Added for registration
	action: "login" | "register";
}

// In-memory storage for Vercel
let memoryUsersData: User[] = [
	{
		id: 1,
		username: "admin",
		name: "Administrator",
		email: "admin@optima.com",
		password: "$2b$10$hmMdVaYgA0O7DYLYsIV7KudlOfLFjD.fq81WBrsdAqZeR.mKdyOYK" // password: password
	}
];

const isVercel = process.env.VERCEL === '1';

async function readUsers(): Promise<User[]> {
	if (isVercel) {
		return memoryUsersData;
	}
	try {
		const data = await fs.readFile(process.cwd() + '/src/app/api/data/data-user.json', 'utf8');
		return data ? (JSON.parse(data) as User[]) : [];
	} catch {
		return [];
	}
}

async function writeUsers(users: User[]): Promise<void> {
	if (isVercel) {
		memoryUsersData = users;
		return;
	}
	try {
		await fs.writeFile(process.cwd() + '/src/app/api/data/data-user.json', JSON.stringify(users, null, 2));
	} catch (error) {
		console.error('Write error:', error);
	}
}

export async function POST(req: Request): Promise<Response> {
	const { username, password, name, email, action } =
		(await req.json()) as AuthRequest;
	let users = await readUsers();

	if (action === "login") {
		const user = users.find((u) => u.username === username);
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = jwt.sign(
				{
					id: user.id,
					username: user.username,
					name: user.name,
					email: user.email,
				},
				SECRET_KEY,
				{ expiresIn: "1h" }
			);

			return new Response(
				JSON.stringify({
					success: true,
					message: "Login successful",
					token,
					user: {
						id: user.id,
						username: user.username,
						name: user.name,
						email: user.email,
					},
				}),
				{ status: 200 }
			);
		}
		return new Response(
			JSON.stringify({ success: false, message: "Invalid credentials" }),
			{ status: 401 }
		);
	}

	if (action === "register") {
		if (!name || !email) {
			return new Response(
				JSON.stringify({
					success: false,
					message: "Name and Email are required",
				}),
				{ status: 400 }
			);
		}

		if (users.some((u) => u.username === username || u.email === email)) {
			return new Response(
				JSON.stringify({
					success: false,
					message: "Username or Email already exists",
				}),
				{ status: 400 }
			);
		}

		const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

		const newUser: User = {
			id: users.length + 1,
			username,
			name,
			email,
			password: hashedPassword,
		};

		users.push(newUser);
		await writeUsers(users);

		return new Response(
			JSON.stringify({
				success: true,
				message: "User registered successfully",
				user: {
					id: newUser.id,
					username: newUser.username,
					name: newUser.name,
					email: newUser.email,
				},
			}),
			{ status: 201 }
		);
	}

	return new Response(
		JSON.stringify({ success: false, message: "Invalid action" }),
		{ status: 400 }
	);
}

export async function GET(req: Request): Promise<Response> {
	const authHeader = req.headers.get("authorization");
	if (!authHeader) {
		return new Response(
			JSON.stringify({ success: false, message: "No token provided" }),
			{ status: 401 }
		);
	}

	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		return new Response(JSON.stringify({ success: true, user: decoded }), {
			status: 200,
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ success: false, message: "Invalid token" }),
			{ status: 401 }
		);
	}
}

export async function OPTIONS(): Promise<Response> {
	return new Response(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
			'Access-Control-Max-Age': '86400',
		},
	});
}
