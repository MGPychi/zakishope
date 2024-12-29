"use sever";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/passwords";
import { redirect } from "next/navigation";

export const authConfig: NextAuthConfig = {
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id as string;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.role = token.role as "admin";
				session.user.id = token.id as string;
			}
			return session;
		},
	},
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", placeholder: "Email", type: "email" },
				password: {
					label: "Password",
					placeholder: "Password",
					type: "password",
				},
			},
			authorize: async (credentials) => {
				const email = credentials.email as string;
				const password = credentials.password as string;
				if (!email || !password) return null;
				try {
					const user = await db.query.users.findFirst({
						where: eq(users.email, email),
					});
					if (!user) return null;

					const isValid =
						user.role == "admin" &&
						(await verifyPassword(
							password as string,
							user.password,
						));
					if (!isValid) return null;
					return {
						id: user.id,
						email: user.email,
						name: user.name,
						role: user.role,
					};
				} catch (err) {
					console.log("Error in auth.ts ", err);
					return null;
				}
			},
		}),
	],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
export const getUserOrRedirectToLogin = async () => {
	const session = await auth();
	if (!session || !session.user) redirect("/auth/login");
	return session.user;
};
