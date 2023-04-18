import { NextResponse } from "next/server"

import { prisma } from '@/lib/prismadb';
import HttpStatusCode from "@/helpers/http-status-code";

export const placesSelect = {
	select: {
		id: true,
		name: true,
		longitude: true,
		latitude: true,
		type: true,
	},
};

export async function GET(req: Request) {
	const queries = [prisma.homestay.findMany(placesSelect), prisma.bar.findMany(placesSelect)];
	const places = await Promise.all(queries);

	return NextResponse.json({ status: HttpStatusCode.OK, data: places.flat() });
}