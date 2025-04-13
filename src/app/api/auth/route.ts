/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY: string = "12345abcdef"; // Change this to a strong secret key
const SALT_ROUNDS = 10; // Recommended number of salt rounds
const dataPath: string = path.join(
	process.cwd(),
	"src/app/api/data/data-user.json"
);

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

function readUsers(): User[] {
	if (!fs.existsSync(dataPath)) return [];
	const data = fs.readFileSync(dataPath, "utf-8").trim();
	return data ? (JSON.parse(data) as User[]) : [];
}

function writeUsers(users: User[]): void {
	fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

export async function POST(req: Request): Promise<Response> {
	const { username, password, name, email, action } =
		(await req.json()) as AuthRequest;
	let users = readUsers();

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
		writeUsers(users);

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
