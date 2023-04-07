import { NextResponse } from "next/server"

import { prisma } from '@/lib/prismadb';
import HttpStatusCode from "@/helpers/http-status-code";


export async function GET(req: Request) {
	const queries = [prisma.homestay.findMany(), prisma.bar.findMany()];
	const places = await Promise.all(queries);

	return NextResponse.json({ status: HttpStatusCode.OK, data: places });
}