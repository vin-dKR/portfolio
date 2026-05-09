#!/usr/bin/env node
// One-shot Spotify refresh-token generator.
// Usage:
//   1. Add http://127.0.0.1:8888/callback to your Spotify app's Redirect URIs
//      (Spotify dashboard -> your app -> Edit Settings -> Redirect URIs)
//   2. bun run scripts/spotify-auth.mjs
//   3. Open the printed URL in browser, log in, click "Agree".
//   4. Browser redirects to localhost; this script captures the code,
//      exchanges it, and prints the new SPOTIFY_REFRESH_TOKEN.

import http from 'node:http'
import { URL } from 'node:url'
import { createReadStream } from 'node:fs'
import { config as loadEnv } from 'dotenv'

loadEnv()

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = 'http://127.0.0.1:8888/callback'
const SCOPES = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-recently-played',
].join(' ')

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET must be set in .env')
    process.exit(1)
}

const state = Math.random().toString(36).slice(2)
const authUrl = new URL('https://accounts.spotify.com/authorize')
authUrl.searchParams.set('response_type', 'code')
authUrl.searchParams.set('client_id', CLIENT_ID)
authUrl.searchParams.set('scope', SCOPES)
authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
authUrl.searchParams.set('state', state)

console.log('\n=== Spotify auth ===')
console.log('1. Make sure this exact URI is in your Spotify app:')
console.log('   ', REDIRECT_URI)
console.log('2. Open this URL in your browser:\n')
console.log('   ', authUrl.toString())
console.log('\nWaiting for redirect on http://127.0.0.1:8888 ...\n')

const server = http.createServer(async (req, res) => {
    if (!req.url) return
    const reqUrl = new URL(req.url, `http://127.0.0.1:8888`)
    if (reqUrl.pathname !== '/callback') {
        res.writeHead(404).end('not found')
        return
    }
    const code = reqUrl.searchParams.get('code')
    const returnedState = reqUrl.searchParams.get('state')
    const err = reqUrl.searchParams.get('error')

    if (err || !code || returnedState !== state) {
        res.writeHead(400, { 'Content-Type': 'text/plain' }).end(`Auth failed: ${err || 'state mismatch'}`)
        console.error('auth failed:', err || 'state mismatch')
        server.close()
        process.exit(1)
    }

    try {
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
            }),
        })

        if (!tokenRes.ok) {
            const body = await tokenRes.text()
            throw new Error(`${tokenRes.status} ${body}`)
        }

        const data = await tokenRes.json()

        res.writeHead(200, { 'Content-Type': 'text/html' }).end(
            '<h2>Done. Check your terminal for the refresh token.</h2>'
        )

        console.log('\n=== SUCCESS ===')
        console.log('\nPaste this into your .env (replace existing line):\n')
        console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`)
        console.log('access token (short-lived, no need to save):')
        console.log(data.access_token)
        console.log('\nscopes granted:', data.scope, '\n')

        server.close()
        process.exit(0)
    } catch (e) {
        console.error('token exchange failed:', e)
        res.writeHead(500).end('exchange failed')
        server.close()
        process.exit(1)
    }
})

server.listen(8888)
