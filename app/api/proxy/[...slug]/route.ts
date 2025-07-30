
// we proxy all requests from client to our frontend server for better security

import mockData from "@/app/mock/data";
import { NextRequest, NextResponse } from "next/server";
import { APIResponse } from "@/app/types/api";

async function GET(request: NextRequest) {
    const slug = request.nextUrl.pathname.replace("/api/proxy/", "");
    
    // MOCK API RESPONSE
    const response : APIResponse = {
        status: 200,
        data: mockData,
        message: "Success",
        success: true
    }
    return NextResponse.json(response);
}

async function POST(request: NextRequest) {
    const slug = request.nextUrl.pathname.replace("/api/proxy/", "");
    const body = await request.json();
    // MOCK API RESPONSE
    const response : APIResponse = {
        status: 200,
        data: body?.ids,
        message: "Ids Received",
        success: true
    }
    return NextResponse.json(response);
}

export { GET, POST };
