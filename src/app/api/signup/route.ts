import { NextResponse } from "next/server"
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

import { SignUpSchemaType } from "@/components/user-signup-form";
import { prisma } from '@/lib/prismadb';
import { sendEmailVerification } from "@/helpers/send-email";
import HttpStatusCode from "@/helpers/http-status-code";

const SALT_ROUND = 10;

export async function POST(req: Request) {
	try {
		const body: SignUpSchemaType = await req.json();
		const { password, email, name } = body;
		const hashPassword = await bcrypt.hash(password, SALT_ROUND);
		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashPassword,
			},
		});

		await sendEmailVerification(user.name, user.id, user.email);
		return NextResponse.json({ status: HttpStatusCode.CREATED, message: 'A verification link has been sent to your email account', data: user })
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			// The .code property can be accessed in a type-safe manner
			if (error.code === 'P2002') {
				return NextResponse.json({ status: HttpStatusCode.CONFLICT, message: `Email has already been taken ` })
			}
		}
	}
}