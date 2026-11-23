import { execFileSync } from "node:child_process";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
    try {
        const hash = process.env.VERCEL_GIT_COMMIT_SHA
            || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
            || execFileSync("git", ["rev-parse", "HEAD"], {
                cwd: process.cwd(),
                encoding: "utf8",
                timeout: 1000,
                stdio: ["ignore", "pipe", "ignore"],
            }).trim();
        if (!/^[0-9a-f]{40}$/i.test(hash)) throw new Error("Commit unavailable");
        return Response.json({ hash }, { headers: { "Cache-Control": "no-store" } });
    } catch {
        return Response.json({ hash: null }, { status: 503, headers: { "Cache-Control": "no-store" } });
    }
}
