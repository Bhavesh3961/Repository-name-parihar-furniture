# Parihar Furniture & Interior — Full-stack website

A production-oriented Next.js rebuild of the supplied Parihar Furniture & Interior screenshots, with an owner-only AI catalog studio.

## What is included

- Responsive public website matching the black / cream / gold visual language from the screenshots.
- Hero, brand standards, collections, full-house interiors, Devghar, estimator, reviews and store CTA.
- Owner login with Firebase Authentication.
- Owner-only AI Studio at `/owner`.
- Upload JPG/PNG/WebP furniture photo (8 MB max).
- Server-side Gemini analysis: product name, description, category, material, finish, style and indicative INR price.
- Server-side Gemini image editing to create a professional studio background while instructing the model to preserve the furniture itself.
- Owner review step before publishing.
- Firestore product catalog and Firebase Storage image storage.
- Server-side ID-token verification; no Gemini key or Firebase Admin credentials in browser code.
- Security headers, CSP, upload MIME/magic-byte validation, rate limiting, request validation and Firestore/Storage deny-by-default write rules.

## Architecture

`Browser → Next.js UI → Next.js API routes → Firebase Admin / Gemini`

Public catalog reads through `/api/products`.
Owner writes require a valid Firebase ID token and an email present in `OWNER_EMAILS`.
Gemini is called only from the server.

## 1. Install

```bash
npm install
```

## 2. Create Firebase project

1. Create a Firebase project.
2. Enable Email/Password Authentication.
3. Create the owner account and verify its email.
4. Create Firestore Database.
5. Create Storage.
6. Add the web app and copy its public config into `.env.local`.
7. Create a Firebase Admin service account. Put its credentials into server-only environment variables.
8. Deploy `firestore.rules`, `firestore.indexes.json` and `storage.rules` using Firebase CLI.

Do **not** put the service-account JSON file in this repository.

## 3. Gemini

Create a Gemini API key and set `GEMINI_API_KEY` only on the server. The AI Studio uses:

- Text/structured output model: `GEMINI_TEXT_MODEL`
- Image editing model: `GEMINI_IMAGE_MODEL`

The default values in `.env.example` are current Google model names at the time this project was generated. If Google changes model availability, change the two environment variables instead of editing application code.

## 4. Environment

Copy `.env.example` to `.env.local` and fill every value.

Important:

- `NEXT_PUBLIC_*` values are browser-visible Firebase app configuration. Firebase Security Rules are what protect data.
- `GEMINI_API_KEY`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`, `OWNER_EMAILS` are server-side secrets/configuration and must never be prefixed with `NEXT_PUBLIC_`.
- Use a long random value for `SESSION_AUDIENCE` if you later add an application session layer.

## 5. Run

```bash
npm run dev
```

Open `http://localhost:3000`.
Owner portal: `http://localhost:3000/owner`.

## 6. Production deployment

Recommended simple deployment:

1. Push this repository to a private GitHub repository.
2. Import the repository into Vercel.
3. Add all `.env.local` values as Vercel environment variables.
4. Deploy.
5. Test public catalog and `/owner` separately.

The shop owner should receive the deployed URL and their owner login, not the Gemini key or Firebase Admin credentials.

## Security notes

This project deliberately avoids the common vibe-coding failure of putting AI keys or privileged database credentials in client-side JavaScript.

### Current protections

- Firebase ID token verification on every owner mutation.
- Owner email allowlist + verified-email requirement.
- Firestore direct client writes disabled.
- Storage direct client writes disabled.
- 8 MB upload limit.
- MIME allowlist and file-signature validation.
- Zod validation for catalog and estimator inputs.
- AI endpoint rate limit per owner UID.
- Security headers including CSP, HSTS, frame denial and MIME sniffing protection.
- AI output is treated as a draft; owner must explicitly publish it.
- AI-generated price is labelled as indicative, not a quotation.
- Product image URLs are signed URLs rather than raw server filesystem paths.

### What you should still add before a serious commercial launch

- Put rate limiting in a shared store such as Redis/Upstash instead of the in-memory limiter, because serverless instances do not share memory.
- Add audit logs for owner actions.
- Add a second owner/admin role if multiple staff need access.
- Add automated dependency/security scanning in GitHub.
- Enable Firebase App Check with reCAPTCHA Enterprise, set `NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY`, then set `FIREBASE_APPCHECK_REQUIRED=true`. Firebase documents App Check as protection against unauthorized clients, including custom backends.
- For the strongest production setup, also require App Check on the Firebase services themselves in the Firebase console.
- Use a custom domain and verify HTTPS/HSTS after deployment.
- Back up Firestore and Storage.
- Review AI-generated product copy before publishing.

## AI image behavior

The image prompt explicitly tells Gemini to preserve the uploaded furniture and change the background only. Generative editing can still make mistakes. The owner preview is therefore intentional: never auto-publish AI output blindly.

## Screenshots

The supplied screenshots were used as the visual reference. The supplied logo and selected screenshot crops are included as starter assets under `public/assets/`.
