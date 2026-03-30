Landing Page → Login → Admin Dashboard → Companies → Customers → Document View → QR → Public Verify 👉 Only one admin 👉 No signup, no roles, no complexity 🧠 AUTH STRATEGY (KEEP IT SIMPLE) You have 2 options: ✅ Recommended (fast + safe) Use: JWT-based login (custom) ❌ Avoid Full auth systems (overkill) OAuth (useless here) 🧱 COMPLETE FLOW WITH LOGIN 1️⃣ LANDING PAGE Route: / Purpose: Simple intro page Button: Admin Login Content: Agency name Description “Login” button ✅ CHECKPOINT Page loads fast Login button works 2️⃣ ADMIN LOGIN (SINGLE USER) Route: /login Logic (IMPORTANT) 👉 Hardcode credentials in .env ADMIN_EMAIL=admin@gmail.com ADMIN_PASSWORD=123456 JWT_SECRET=your_secret Login Flow: Enter email/password → Validate against env → Generate JWT → Store in cookie → Redirect to dashboard Example API import jwt from "jsonwebtoken" if ( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) { const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET) // set cookie } ✅ CHECKPOINT Login works Wrong credentials rejected Token stored in cookie Redirect to dashboard 3️⃣ PROTECT ADMIN ROUTES Routes to protect: /dashboard /companies /customers /document/* Middleware logic: Check cookie → Verify JWT → Allow / block access ✅ CHECKPOINT Unauthorized user redirected to /login Admin can access all routes No infinite redirect bugs 4️⃣ DASHBOARD (ENTRY POINT) Route: /dashboard Show: Total companies Total customers ✅ CHECKPOINT Data loads correctly No UI crash 5️⃣ CORE SYSTEM (UNCHANGED) Everything else remains SAME: Companies Add / List / Delete Customers Add / Edit / Delete / View Document Page PDF-style layout QR code Verify Page (Public) /verify/[token] 🔁 FULL FINAL FLOW User visits landing page → clicks login → enters admin credentials → redirected to dashboard Admin: → creates company → creates customer → uploads image → QR generated Admin clicks "View" → document page opens → clicks print → PDF generated Any person: → scans QR → opens /verify/token → sees real data 🔐 SECURITY (BASIC BUT ENOUGH) Do: Store JWT in httpOnly cookie Use middleware to protect routes Don’t: Expose credentials in frontend ❌ Skip route protection ❌ 🧱 FINAL MVP PHASES (UPDATED) Phase 1 Landing page Login system Phase 2 Company CRUD Phase 3 Customer CRUD Phase 4 Image upload (Cloudinary) Phase 5 QR system Phase 6 Document page Phase 7 Verify page (public) Phase 8 Print (PDF) Phase 9 Deploy ✅ FINAL CHECKLIST Auth Login works JWT stored Routes protected Core Companies working Customers working Image upload working Document QR generated Document view correct Print works Public Verify page works Expiry logic correct Deployment Live app QR works on mobile 🔴 HARD TRUTH This login system should take: 👉 1 day max If it takes longer: You’re overengineering Or you don’t understand flow 🔥 Final Advice Don’t treat auth as main feature. 👉 Your product = document + QR verification 👉 Auth = just a gatekeeper



Milestones : 
Overall Flow:

Landing Page → Admin Login → Dashboard
→ Companies → Customers → Document View → QR → Public Verify

Key Notes:

Only one admin, no signup or roles.
Auth is simple JWT-based (custom).
Core system is document + QR verification, all else supports this.
🧱 MILESTONE 1 — Landing Page + Admin Login + Auth Middleware
Goal:

Set up project foundation, landing page, admin login, and secure routes.

Tasks:
1️⃣ Project Setup
Initialize Next.js project.
Install dependencies:
axios → for API calls
jsonwebtoken → for JWT
cookie → for cookie management
react-hook-form + zod → for login form validation
Setup .env file:
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=123456
JWT_SECRET=your_secret

✅ Checkpoint: App runs locally, env variables accessible.

2️⃣ Landing Page
Route: /
Features:
Show agency name, short description.
Button: Admin Login
Design: Minimal, fast-loading.

✅ Checkpoint: Landing page loads, login button works.

3️⃣ Admin Login Page
Route: /login
Logic:
Form for email + password.
Validate against .env.
Generate JWT if valid.
Store JWT in httpOnly cookie.
Redirect to /dashboard.

Example:

import jwt from "jsonwebtoken";

if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
  // set cookie
  res.status(200).json({ message: "Logged in" });
} else {
  res.status(401).json({ message: "Invalid credentials" });
}

✅ Checkpoint:

Login works.
Wrong credentials rejected.
JWT stored in cookie.
Redirect works.
4️⃣ Auth Middleware
Protect all admin routes:
/dashboard
/companies/*
/customers/*
/document/*
Middleware checks cookie → verifies JWT → allows or blocks access.

✅ Checkpoint:

Unauthorized user redirected to /login.
Admin can access all routes.
No infinite redirect issues.
Milestone 1 Deliverable
Landing page functional.
Admin login working.
JWT auth middleware protecting admin routes.
🧱 MILESTONE 2 — Dashboard + Companies CRUD
Goal:

Admin can manage travel agency companies.

Tasks:
1️⃣ Dashboard
Route: /dashboard
Show:
Total number of companies
Total number of customers
Fetch data from Supabase.

✅ Checkpoint: Dashboard loads correctly, no UI crashes.

2️⃣ Companies CRUD
Routes:
/companies → list all companies
/companies/create → add new
Features:
Add company (name, contact info optional)
List companies
Delete company

✅ Checkpoint:

Add works.
List shows correct data.
Delete works.
UI stable.
Milestone 2 Deliverable
Admin dashboard ready.
Companies fully manageable.
🧱 MILESTONE 3 — Customers CRUD + Image Upload
Goal:

Admin can add and manage customers under companies. Customer data includes images.

Tasks:
1️⃣ Customer CRUD
Routes:
/customers → list all customers
/customers/create → add customer
Form fields:
Name, Passport, Job Title, Issue Date, Expiry Date
Select company from dropdown
Upload customer image
2️⃣ Image Upload
Use Cloudinary for images.
Flow:
Admin selects image
Upload to Cloudinary
Get URL → store in Supabase

✅ Checkpoint:

Customer saved with image URL.
Customer linked to correct company.
Edit / Delete works.
Images render correctly in UI.
Milestone 3 Deliverable
Customers fully manageable.
Image upload integrated.
Customer data correctly linked to company.
🧱 MILESTONE 4 — Document Page + QR Code System
Goal:

Generate PDF-style documents for customers, embed QR codes for public verification.

Tasks:
1️⃣ QR Token Generation
On customer creation:
Generate unique qr_token (UUID)
Store in DB
QR points to:
/verify/{qr_token}

✅ Checkpoint:

Each customer has unique QR.
QR scans correctly.
2️⃣ Document Page
Route: /document/[id]
Render:
Customer image
Name
Passport
Company
Issue / Expiry dates
QR code
Use HTML + CSS to mimic printable PDF layout.
Add Print button:
<button onClick={() => window.print()}>Print</button>
3️⃣ Print Styles
Use @media print to hide buttons, optimize layout for A4.

✅ Checkpoint:

Document page loads correct customer.
QR visible.
Print preview correct.
Milestone 4 Deliverable
Document view functional.
QR generation working.
PDF export ready (via browser print).
🧱 MILESTONE 5 — Public Verify Page + Deployment
Goal:

Allow anyone to scan QR → view customer data. Deploy final MVP.

Tasks:
1️⃣ Public Verify Page
Route: /verify/[token]
Flow:
Fetch customer by qr_token
Display all customer info (same as document)
Show status: VALID / EXPIRED based on expiry_date

✅ Checkpoint:

Public page loads without login.
Data matches scanned QR.
Expiry logic works.
Invalid token handled gracefully.
2️⃣ Deployment
Frontend → Vercel
Backend / Supabase → Supabase cloud
Environment variables for credentials, JWT secret
Test QR scanning on mobile

✅ Checkpoint:

App live.
QR scanning works.
Document prints correctly from live app.
Milestone 5 Deliverable
Public verification fully functional.
App deployed and ready for use.
🔴 SUMMARY TABLE — MILESTONES
Milestone	Goal	Deliverables	Checkpoints
1	Landing + Login + Auth	Landing page + login + JWT auth middleware	Landing loads, login works, routes protected
2	Dashboard + Companies CRUD	Dashboard + companies fully manageable	Add/List/Delete works, UI stable
3	Customers CRUD + Images	Customers fully manageable + Cloudinary images	Add/Edit/Delete works, images show, linked to company
4	Document Page + QR	PDF-style document + QR code generation	Document loads, QR visible, print works
5	Public Verify + Deploy	Public QR verify page + deployment	Public verify works, QR redirects, app live