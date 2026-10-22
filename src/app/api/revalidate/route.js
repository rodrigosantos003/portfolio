import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
    if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    revalidateTag("repos");
    return NextResponse.json({ revalidated: true });
}