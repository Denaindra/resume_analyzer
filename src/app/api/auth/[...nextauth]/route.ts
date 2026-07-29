import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    nextauth: string[];
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const params = await context.params;
  const pathSegments = params.nextauth || [];

  return NextResponse.json({
    message: "Mock NextAuth API route",
    pathSegments,
    note: "Next.js 16 resolved route context parameter asynchronously.",
  });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const params = await context.params;
  const pathSegments = params.nextauth || [];

  return NextResponse.json({
    message: "Mock NextAuth API route (POST)",
    pathSegments,
    note: "Next.js 16 resolved route context parameter asynchronously.",
  });
}
