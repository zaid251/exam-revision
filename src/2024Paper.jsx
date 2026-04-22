import { useState } from "react";

const theme = {
  bg: "#0a0b0f",
  surface: "#111318",
  surface2: "#181c25",
  border: "#1e2433",
  text: "#dde2ef",
  muted: "#6b7894",
  dim: "#3a4258",
  q1: "#38bdf8",
  q2: "#a78bfa",
  q3: "#34d399",
  q4: "#fb923c",
  q5: "#f472b6",
  q6: "#facc15",
};

const qColors = ["#38bdf8","#a78bfa","#34d399","#fb923c","#f472b6","#facc15"];

/* ── tiny primitives ── */
const Code = ({ children }) => (
  <code style={{
    background: "#050608", border: `1px solid ${theme.border}`,
    borderRadius: 4, padding: "2px 7px",
    fontFamily: "'Fira Code', 'Courier New', monospace",
    fontSize: 13, color: "#7dd3fc",
  }}>{children}</code>
);

const Diagram = ({ children }) => (
  <pre style={{
    background: "#05060a", border: `1px solid ${theme.border}`,
    borderRadius: 10, padding: "20px 22px", margin: "14px 0",
    fontFamily: "'Fira Code', 'Courier New', monospace",
    fontSize: 11.5, lineHeight: 1.65, color: "#8da4cc",
    overflowX: "auto", whiteSpace: "pre",
  }}>{children}</pre>
);

const Callout = ({ type = "tip", label, children }) => {
  const colors = { tip: "#34d399", info: "#38bdf8", warn: "#facc15", danger: "#f87171" };
  const c = colors[type];
  return (
    <div style={{
      borderLeft: `3px solid ${c}`, background: `${c}10`,
      borderRadius: "0 8px 8px 0", padding: "12px 16px", margin: "14px 0",
    }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: c, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: theme.text, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
};

const H4 = ({ children }) => (
  <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", margin: "22px 0 10px", letterSpacing: 0.3 }}>{children}</h4>
);

const P = ({ children }) => (
  <p style={{ color: theme.text, lineHeight: 1.8, marginBottom: 13, fontSize: 15 }}>{children}</p>
);

const UL = ({ items }) => (
  <ul style={{ paddingLeft: 20, marginBottom: 13 }}>
    {items.map((it, i) => (
      <li key={i} style={{ color: theme.text, lineHeight: 1.75, marginBottom: 7, fontSize: 14.5 }}>{it}</li>
    ))}
  </ul>
);

const Grid = ({ children }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12, margin: "14px 0" }}>
    {children}
  </div>
);

const Card = ({ title, color, children }) => (
  <div style={{ background: theme.surface2, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 16 }}>
    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, color: color || theme.q1, letterSpacing: 0.5, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 13.5, color: theme.muted, lineHeight: 1.7 }}>{children}</div>
  </div>
);

const Table = ({ headers, rows }) => (
  <div style={{ overflowX: "auto", margin: "14px 0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
      <thead>
        <tr>{headers.map((h, i) => (
          <th key={i} style={{ background: theme.surface2, color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "10px 13px", textAlign: "left", border: `1px solid ${theme.border}` }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>{rows.map((row, i) => (
        <tr key={i}>{row.map((cell, j) => (
          <td key={j} style={{ padding: "10px 13px", border: `1px solid ${theme.border}`, color: theme.text, verticalAlign: "top", background: i % 2 === 1 ? "rgba(255,255,255,0.018)" : "transparent" }}>{cell}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  </div>
);

const Steps = ({ steps, color }) => (
  <div style={{ margin: "14px 0" }}>
    {steps.map((s, i) => (
      <div key={i} style={{ display: "flex", gap: 14, marginBottom: 13, alignItems: "flex-start" }}>
        <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800, border: `2px solid ${color}`, color: color, background: `${color}12`, marginTop: 2 }}>{i + 1}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12.5, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{s.title}</div>
          <div style={{ fontSize: 13.5, color: theme.muted, lineHeight: 1.7 }}>{s.body}</div>
        </div>
      </div>
    ))}
  </div>
);

const Part = ({ label, question, marks, color, children }) => (
  <div style={{ marginBottom: 44 }}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20, padding: "18px 22px", background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, flexWrap: "wrap" }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", padding: "4px 10px", borderRadius: 6, color: color, border: `1px solid ${color}`, background: `${color}12`, flexShrink: 0, marginTop: 2 }}>{label}</span>
      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.5, flex: 1, minWidth: 180 }}>{question}</span>
      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: `1px solid ${theme.border}`, color: theme.muted, flexShrink: 0, marginTop: 2 }}>{marks} marks</span>
    </div>
    <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", background: theme.surface2, borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: theme.muted }}>Full Answer</span>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════
   QUESTION CONTENT
══════════════════════════════════════════════════════ */

function Q1({ color }) {
  return (
    <div>
      <Part label="Part A" question="Explain the concept and operation of Node.js Express middleware, with a code example." marks="10" color={color}>
        <H4>What is Middleware?</H4>
        <P>In Express.js, <strong>middleware</strong> is a function that has access to the <Code>request</Code> object, the <Code>response</Code> object, and the <Code>next</Code> function in the application's request-response cycle. Middleware functions execute in sequence — each one can modify the request/response or call <Code>next()</Code> to pass control to the next middleware.</P>
        <P>Think of middleware as a pipeline of processing steps that every HTTP request flows through before reaching the final route handler.</P>
        <Diagram>{`
HTTP Request
    │
    ▼
┌─────────────────────┐
│  Middleware 1        │  e.g. Morgan (request logger)
│  (req, res, next)   │──► next() ──►
└─────────────────────┘
┌─────────────────────┐
│  Middleware 2        │  e.g. express.json() (body parser)
│  (req, res, next)   │──► next() ──►
└─────────────────────┘
┌─────────────────────┐
│  Middleware 3        │  e.g. Auth check
│  (req, res, next)   │──► next() or res.status(401).send()
└─────────────────────┘
┌─────────────────────┐
│   Route Handler     │  GET /api/orders → sends response
└─────────────────────┘`}</Diagram>
        <H4>Key Properties</H4>
        <UL items={[
          "Middleware executes in the ORDER it is registered with app.use()",
          "It can modify req and res objects (e.g. attach decoded user data to req.user)",
          "It must either call next() to pass control along, or terminate the request by sending a response",
          "It can be global (applied to all routes) or scoped to specific routes",
          "Error-handling middleware has a special 4-argument signature: (err, req, res, next)",
        ]} />
        <H4>Code Example</H4>
        <Diagram>{`const express = require('express');
const app = express();

// ─── Global Middleware ─────────────────────────────
// 1. Body parser — makes req.body available
app.use(express.json());

// 2. Custom logger middleware
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // MUST call next() or the request hangs
});

// 3. Auth middleware — scoped to /api routes only
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorised' });
  }
  req.user = { id: 42, role: 'admin' }; // attach to req
  next();
};

// Route using scoped middleware
app.get('/api/orders', authMiddleware, (req, res) => {
  res.json({ orders: [], user: req.user });
});

// 4. Error-handling middleware (4 args — always last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});`}</Diagram>
        <Callout type="tip" label="Exam Tip">Always emphasise that middleware calls <Code>next()</Code> to continue the chain, or sends a response to terminate it. If neither happens, the request hangs forever.</Callout>
      </Part>

      <Part label="Part B" question="Explain 'referential integrity' and how it may be used in a relational database." marks="5" color={color}>
        <P><strong>Referential integrity</strong> is a constraint in a relational database that ensures relationships between tables remain consistent. Specifically, it guarantees that a <strong>foreign key</strong> value in one table must either match a <strong>primary key</strong> value in the referenced table, or be NULL — it cannot reference a non-existent record.</P>
        <H4>Example</H4>
        <Diagram>{`Table: Customers          Table: Orders
┌────┬──────────┐         ┌────┬─────────────┬─────────────┐
│ id │ name     │         │ id │ customer_id │ total       │
├────┼──────────┤         ├────┼─────────────┼─────────────┤
│  1 │ Alice    │◄────────│  1 │      1      │   £49.99    │
│  2 │ Bob      │         │  2 │      2      │   £12.50    │
└────┴──────────┘         │  3 │      9      │   ← BLOCKED │
                          └────┴─────────────┴─────────────┘
  Customer 9 doesn't exist — referential integrity prevents this insert.`}</Diagram>
        <H4>How It Works in SQL</H4>
        <Diagram>{`CREATE TABLE Orders (
  id          INT PRIMARY KEY,
  customer_id INT NOT NULL,
  total       DECIMAL(10,2),
  FOREIGN KEY (customer_id) REFERENCES Customers(id)
    ON DELETE CASCADE   -- if Customer deleted, their Orders are deleted too
    ON UPDATE CASCADE   -- if Customer id changes, Orders updated automatically
);`}</Diagram>
        <UL items={[
          "ON DELETE CASCADE — deleting a Customer automatically deletes their Orders",
          "ON DELETE RESTRICT — prevents deleting a Customer who still has Orders",
          "ON DELETE SET NULL — sets customer_id to NULL when Customer is deleted",
          "Enforced by the database engine, so application bugs cannot bypass it",
        ]} />
      </Part>

      <Part label="Part C" question="Explain environment variables: what they are, their benefits, and use in Docker Compose / Kubernetes." marks="10" color={color}>
        <H4>What are Environment Variables?</H4>
        <P><strong>Environment variables</strong> are key-value pairs stored in the operating system's environment at runtime, external to the application code. The application reads them at startup using APIs like <Code>process.env.DB_HOST</Code> in Node.js. They allow configuration to change without modifying or redeploying code.</P>
        <Diagram>{`# Examples of environment variables
DB_HOST=postgres.internal
DB_PORT=5432
DB_PASSWORD=s3cr3t
NODE_ENV=production
JWT_SECRET=mySuperSecretKey
API_KEY=abc123xyz`}</Diagram>
        <H4>Benefits</H4>
        <Grid>
          <Card title="Security" color={color}>Secrets (passwords, API keys) are not hardcoded in source code, keeping them out of Git repositories and version history.</Card>
          <Card title="12-Factor App / Portability" color={color}>The same Docker image runs in dev, staging, and production — only the env vars differ. No rebuilding the image per environment.</Card>
          <Card title="Separation of Concerns" color={color}>Configuration is separated from code. Ops teams can update DB credentials without touching application code.</Card>
          <Card title="Easy Configuration Changes" color={color}>Changing a URL, feature flag, or secret requires only updating the env var — no code change, no redeployment of the image itself.</Card>
        </Grid>
        <H4>Docker Compose Usage</H4>
        <Diagram>{`# docker-compose.yml
services:
  api:
    image: my-api:latest
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_PASSWORD=\${DB_PASSWORD}   # read from .env file on host
    env_file:
      - .env                          # load all vars from a file

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=\${DB_PASSWORD}

# .env file (never commit this to Git!)
DB_PASSWORD=s3cr3t`}</Diagram>
        <H4>Kubernetes Usage</H4>
        <Diagram>{`# ConfigMap — for non-sensitive config
apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
data:
  NODE_ENV: "production"
  DB_HOST: "postgres-service"

---
# Secret — for sensitive values (base64 encoded)
apiVersion: v1
kind: Secret
metadata:
  name: api-secrets
type: Opaque
data:
  DB_PASSWORD: czNjcjN0   # base64("s3cr3t")

---
# Pod uses both:
spec:
  containers:
    - name: api
      envFrom:
        - configMapRef:
            name: api-config       # inject all ConfigMap vars
        - secretRef:
            name: api-secrets      # inject all Secret vars`}</Diagram>
        <Callout type="info" label="Key Distinction">In Kubernetes, use <strong>ConfigMaps</strong> for non-sensitive config and <strong>Secrets</strong> for passwords and API keys. Secrets are base64-encoded and can be encrypted at rest by the cluster.</Callout>
      </Part>
    </div>
  );
}

function Q2({ color }) {
  return (
    <div>
      <Part label="Part A" question="Explain four potential business/technical benefits of cloud hosting vs. on-premises for a large organisation." marks="12" color={color}>
        <H4>Benefit 1 — Cost Model: CapEx to OpEx</H4>
        <P>On-premises requires large upfront <strong>Capital Expenditure (CapEx)</strong> — purchasing servers, networking, data centre space, and cooling. Cloud converts this to <strong>Operational Expenditure (OpEx)</strong> — a monthly pay-as-you-go bill. This frees capital for core business investments rather than depreciating hardware assets. For a large organisation, this can represent millions in savings in the first year alone.</P>

        <H4>Benefit 2 — Elastic Scalability (No Over-Provisioning)</H4>
        <P>On-premises infrastructure must be sized for <em>peak load</em> (e.g. Black Friday traffic). For the other 350+ days, that hardware sits idle, consuming power and incurring maintenance costs. Cloud auto-scaling provisions resources on demand and de-provisions them when not needed. A large retailer can scale from 50 to 5,000 servers in minutes during a flash sale, paying only for those hours.</P>

        <H4>Benefit 3 — Global Reach and Low Latency</H4>
        <P>Cloud providers (AWS, Azure, GCP) operate data centres across every continent. A large organisation can deploy its application to multiple geographic regions in hours — serving users in Asia, Europe, and the Americas from local edge locations. Achieving equivalent global infrastructure on-premises would cost hundreds of millions and take years.</P>

        <H4>Benefit 4 — Built-In Disaster Recovery and High Availability</H4>
        <P>Cloud providers offer Multi-AZ (Availability Zone) deployments, automated database failover, and cross-region replication as standard services. An on-premises organisation building equivalent disaster recovery (warm standby data centre, real-time replication) faces enormous cost and complexity. Cloud DR typically achieves Recovery Time Objectives (RTO) of minutes and Recovery Point Objectives (RPO) near zero.</P>
      </Part>

      <Part label="Part B" question="Explain IaaS and PaaS properties with use-cases and reference to the Shared Responsibility Model." marks="6" color={color}>
        <Table
          headers={["Aspect", "IaaS", "PaaS"]}
          rows={[
            ["Example", "AWS EC2, Azure VMs", "Heroku, AWS Elastic Beanstalk, Google App Engine"],
            ["Customer manages", "OS, runtime, middleware, app, data", "App code and data only"],
            ["Provider manages", "Hardware, virtualisation, networking", "Hardware, OS, runtime, middleware too"],
            ["Use-case", "Host a custom Node.js server needing specific OS config", "Deploy a web app without managing servers"],
          ]}
        />
        <H4>Shared Responsibility in IaaS</H4>
        <P>The customer is responsible for <strong>patching the OS</strong>, configuring the firewall, securing the runtime, and managing their application and data. The provider secures the physical data centre and hypervisor layer. Running an EC2 instance — you patch your own Ubuntu server.</P>
        <H4>Shared Responsibility in PaaS</H4>
        <P>The provider additionally manages the OS and runtime. The customer only secures their <strong>application code and data</strong>. Heroku patches Node.js and Ubuntu for you — you just push code. However, the customer is still always responsible for their data and user access controls.</P>
      </Part>

      <Part label="Part C" question="Explain asymmetric public key encryption: Alice securely sends an encrypted, authenticated message to Bob." marks="7" color={color}>
        <H4>Key Pair Concept</H4>
        <P>In asymmetric encryption, each party has a <strong>public key</strong> (shared freely) and a <strong>private key</strong> (kept secret). Data encrypted with a public key can only be decrypted by the corresponding private key — and vice versa.</P>

        <H4>Step 1 — Encryption (Confidentiality): Only Bob can read it</H4>
        <Diagram>{`Alice wants to send a secret message to Bob.

1. Alice obtains Bob's PUBLIC key (from a certificate / key server).
2. Alice encrypts the message using Bob's PUBLIC key.
3. Alice sends the encrypted ciphertext to Bob.
4. Bob decrypts it using his PRIVATE key (only he has it).

   Even if the ciphertext is intercepted, without Bob's private key
   it is unreadable.`}</Diagram>

        <H4>Step 2 — Digital Signature (Authentication): Proof it's from Alice</H4>
        <Diagram>{`Alice wants to prove the message came from her (not an impersonator).

1. Alice hashes the message:  SHA-256(message) = hash
2. Alice encrypts the hash with her OWN PRIVATE key → Digital Signature
3. Alice sends the message + signature to Bob.

Bob verifies:
1. Bob decrypts the signature using Alice's PUBLIC key → hash_from_sig
2. Bob independently hashes the message → hash_computed
3. If hash_from_sig == hash_computed → message is authentic, from Alice.
   Only Alice's private key could have produced that signature.`}</Diagram>

        <H4>Combined Flow</H4>
        <Diagram>{`Alice                                           Bob
  │                                               │
  │  1. Hash message → encrypt hash w/ Alice priv │
  │     (creates digital signature)               │
  │  2. Encrypt message w/ Bob's public key       │
  │     (ensures only Bob can read it)            │
  │──── encrypted message + signature ───────────▶│
  │                                               │
  │                     3. Decrypt message w/ Bob priv key
  │                     4. Verify signature w/ Alice pub key
  │                        → Authentic + Confidential ✓`}</Diagram>
        <Callout type="info" label="Two Guarantees Achieved">
          <strong>Confidentiality</strong> — encrypted with Bob's public key, only Bob's private key can decrypt.<br/>
          <strong>Authentication / Non-repudiation</strong> — signed with Alice's private key, Bob verifies with Alice's public key. Only Alice could have created that signature.
        </Callout>
      </Part>
    </div>
  );
}

function Q3({ color }) {
  return (
    <div>
      <Part label="Part A" question="Explain the rationale and key properties of a microservice." marks="6" color={color}>
        <H4>Rationale</H4>
        <P>Traditional <strong>monolithic applications</strong> bundle all functionality into a single deployable unit. As they grow, they become difficult to scale, deploy, and maintain — a small change to the checkout feature requires redeploying the entire application. Microservices decompose an application into small, independent services, each focused on a single business capability.</P>
        <H4>Key Properties</H4>
        <Grid>
          <Card title="Single Responsibility" color={color}>Each microservice owns one business domain (e.g. User Service, Payment Service). It does one thing well.</Card>
          <Card title="Independent Deployment" color={color}>Each service is deployed independently. Updating the Notification Service doesn't require redeploying the Order Service.</Card>
          <Card title="Own Database" color={color}>Each service owns its own database schema (Database per Service pattern). No shared schemas — services are loosely coupled.</Card>
          <Card title="Communicates via APIs" color={color}>Services communicate over HTTP/REST, gRPC, or message queues. They don't import each other's code directly.</Card>
          <Card title="Technology Agnostic" color={color}>Each service can use a different language or database. Node.js for one, Python for another — whatever fits the problem.</Card>
          <Card title="Independently Scalable" color={color}>The Payment Service can be scaled to 10 instances during a sale without scaling the User Service.</Card>
        </Grid>
      </Part>

      <Part label="Part B" question="Explain the rationale and key properties of a composite microservice." marks="4" color={color}>
        <H4>What is a Composite Microservice?</H4>
        <P>A <strong>composite microservice</strong> (also called an aggregator or orchestrator service) is a microservice that itself calls other microservices to fulfil a request. Rather than exposing raw data from a single service, it composes responses from multiple underlying services into a single, unified response for the client.</P>
        <Diagram>{`Client → GET /dashboard
              │
              ▼
    ┌─────────────────────┐
    │  Dashboard Composite│  ← Composite microservice
    │     Service         │
    └──┬──────┬──────┬────┘
       │      │      │
       ▼      ▼      ▼
  [User]  [Orders] [Recommend]
  Service  Service  Service

  Composite aggregates all three responses and returns one JSON.`}</Diagram>
        <H4>Key Properties</H4>
        <UL items={[
          "Orchestrates calls to multiple atomic microservices — reducing client round-trips",
          "Hides internal service topology from the client — client sees one clean API",
          "Can apply business logic: filter, transform, merge data from multiple sources",
          "Must handle partial failures gracefully (e.g. if Recommendations Service is down, still return user + orders)",
          "Typically implemented as an API Gateway aggregation layer or a dedicated BFF (Backend for Frontend)",
        ]} />
      </Part>

      <Part label="Part C" question="Redraw the Joke Service as an event-driven architecture. Explain synchronous vs asynchronous flows." marks="15" color={color}>
        <H4>Event-Driven Architecture — Diagram</H4>
        <Diagram>{`
USER FRONTEND                      MESSAGE BROKER (e.g. Kafka)
      │                           ┌────────────────────────────────────┐
      │──POST /sub (submit joke)─▶│  Topic: joke-submitted             │
      │   [ASYNC]                 └──────────────────┬─────────────────┘
      │                                              │ consumed by
      │                                    ┌─────────▼──────────┐
      │                                    │  Moderate Service  │
      │◄──polling GET /moderate ──────────▶│  (reviews joke)    │  [SYNC poll]
      │   [SYNC — frontend polls]          └─────────┬──────────┘
      │                                              │ approved →
      │                           ┌──────────────────▼─────────────────┐
      │                           │  Topic: joke-approved               │
      │                           └──────────────────┬─────────────────┘
      │                                              │ consumed by
      │                                    ┌─────────▼──────────┐
      │                                    │   Joke Service     │
      │                                    │   (stores joke     │
      │                                    │    in database)    │
      │                                    └────────────────────┘
      │
      │──GET /joke ──────────────────────────────────────────────▶ [Joke Service]
      │   [SYNC]                                                  returns stored joke
      │
      │◄─────────────────────────────────────────────────────────── joke JSON
      │
      │──GET /types ─────────────────────────────────────────────▶ [Joke Service]
         [SYNC — ensures each service knows joke types]`}</Diagram>

        <H4>Explanation of Event Flow</H4>
        <Steps color={color} steps={[
          { title: "User submits a joke — POST /sub (ASYNCHRONOUS)", body: "The frontend POSTs a new joke. The API Gateway publishes a 'joke-submitted' event to the Kafka topic. The response to the user is immediate (202 Accepted) — the joke will be processed asynchronously. The user does not wait for moderation." },
          { title: "Moderate Service consumes the event (ASYNCHRONOUS consumer)", body: "The Moderate Service subscribes to the 'joke-submitted' topic and picks up the new joke. It presents it to the moderator for review. This is decoupled from the submission — it happens in the background." },
          { title: "Frontend polls for pending jokes — GET /moderate (SYNCHRONOUS)", body: "The moderator's frontend periodically calls GET /moderate to check if there are jokes awaiting review. This is a synchronous HTTP request — the frontend waits for the Moderate Service to respond with the current queue." },
          { title: "Moderator approves — POST /mod (ASYNCHRONOUS)", body: "When the moderator approves a joke, the Moderate Service publishes a 'joke-approved' event to a second Kafka topic. Again, fire-and-forget — no waiting for the Joke Service to process it." },
          { title: "Joke Service stores the approved joke (ASYNCHRONOUS consumer)", body: "The Joke Service subscribes to 'joke-approved', reads the event, and persists the joke to its own database. This is equivalent to the /mod endpoint in the original message-based design." },
          { title: "User retrieves a joke — GET /joke (SYNCHRONOUS)", body: "The frontend calls GET /joke synchronously. The Joke Service queries its database and returns the joke directly. Equivalent to the original /joke endpoint." },
          { title: "/types — Synchronous calls for type awareness", body: "GET /types calls are synchronous — each microservice needs an immediate, guaranteed response to know which joke types exist. Local copies are maintained in each service for resilience (the original system's requirement is preserved)." },
        ]} />
        <Callout type="tip" label="Key Equivalence to Figure 1">
          The event-driven design is functionally equivalent: joke submission → moderation → approval → storage → retrieval. The key difference is that the message-based point-to-point messages are replaced by <strong>Kafka topics</strong>, enabling multiple consumers, replay, and decoupling. Async steps use topics; sync steps use direct HTTP calls.
        </Callout>
      </Part>
    </div>
  );
}

function Q4({ color }) {
  const components = [
    { name: "a. Control Plane", marks: 3, body: <>
      <P>The <strong>Control Plane</strong> is the brain of the Kubernetes cluster — it manages the overall state of the cluster. It makes decisions about scheduling (where to run pods), detects and responds to cluster events (e.g. a pod crashing), and maintains the desired state declared by the user.</P>
      <P>Key components within the control plane: <strong>kube-apiserver</strong> (the front-end for the control plane; all kubectl commands go here), <strong>etcd</strong> (distributed key-value store holding all cluster state), <strong>kube-scheduler</strong> (assigns pods to nodes based on resource availability), and <strong>kube-controller-manager</strong> (runs controllers that watch state and reconcile it).</P>
    </> },
    { name: "b. Kubelet", marks: 3, body: <>
      <P>The <strong>kubelet</strong> is an agent that runs on every <em>worker node</em> in the cluster. It is responsible for ensuring that the containers described in a PodSpec are running and healthy on that node.</P>
      <P>The kubelet watches the kube-apiserver for pods assigned to its node, instructs the container runtime (e.g. containerd/Docker) to start/stop containers, reports the node's and pod's status back to the control plane, and performs health checks (liveness and readiness probes).</P>
    </> },
    { name: "c. Node", marks: 3, body: <>
      <P>A <strong>Node</strong> (previously called a "minion") is a physical or virtual machine that runs workloads in the cluster. Each node runs the kubelet, a container runtime (containerd), and kube-proxy. Nodes are where your application pods actually execute.</P>
      <P>The control plane schedules pods onto nodes based on available CPU/memory resources. A cluster typically has multiple nodes for redundancy and capacity. You can label nodes (e.g. <Code>gpu=true</Code>) and use node selectors to control where specific pods are scheduled.</P>
    </> },
    { name: "d. Pod", marks: 3, body: <>
      <P>A <strong>Pod</strong> is the smallest deployable unit in Kubernetes — it represents one or more containers that share the same network namespace (IP address) and storage volumes. Containers within a pod communicate via localhost.</P>
      <P>Pods are ephemeral — if a pod dies, Kubernetes replaces it (via a Deployment). Each new pod gets a new IP address, which is why Services (not pod IPs) are used for stable communication. In practice, most pods contain a single container.</P>
      <Diagram>{`Pod (shared IP: 10.0.0.5)
┌──────────────────────────────────┐
│  Container: my-api               │  port 3000
│  Container: log-sidecar          │  shared /var/log volume
└──────────────────────────────────┘`}</Diagram>
    </> },
    { name: "e. Replica Set", marks: 3, body: <>
      <P>A <strong>ReplicaSet</strong> ensures that a specified number of identical pod replicas are running at all times. If a pod crashes or a node fails, the ReplicaSet controller automatically creates replacement pods to maintain the desired replica count.</P>
      <P>In practice, you rarely create ReplicaSets directly — <strong>Deployments</strong> manage ReplicaSets for you (providing rolling updates on top). The ReplicaSet's job is purely: "always maintain N running replicas of this pod template."</P>
    </> },
    { name: "f. Deployment", marks: 3, body: <>
      <P>A <strong>Deployment</strong> is a higher-level abstraction that manages ReplicaSets and provides declarative updates to pods. You describe the <em>desired state</em> (e.g. "run 3 replicas of image my-api:v2") and the Deployment controller changes the actual state to match.</P>
      <P>Key capabilities: <strong>Rolling updates</strong> (gradually replace old pods with new ones — zero downtime), <strong>rollback</strong> (kubectl rollout undo if the new version is broken), and <strong>scaling</strong> (kubectl scale --replicas=5). Deployments are the standard way to run stateless applications in Kubernetes.</P>
    </> },
    { name: "g. ConfigMap", marks: 3, body: <>
      <P>A <strong>ConfigMap</strong> is a Kubernetes object used to store non-sensitive configuration data as key-value pairs, separate from the container image. This allows you to change configuration without rebuilding the image.</P>
      <P>ConfigMaps can be injected into pods as <strong>environment variables</strong> (<Code>envFrom: configMapRef</Code>), as <strong>command-line arguments</strong>, or <strong>mounted as files</strong> in a volume (useful for config files like nginx.conf). For sensitive data (passwords, API keys), use <strong>Secrets</strong> instead of ConfigMaps.</P>
      <Diagram>{`# Example ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: api-config
data:
  NODE_ENV: "production"
  DB_HOST: "postgres-svc"
  LOG_LEVEL: "info"`}</Diagram>
    </> },
    { name: "h. Service (ClusterIP / NodePort / LoadBalancer)", marks: 4, body: <>
      <P>A <strong>Service</strong> provides a stable network endpoint for accessing a set of pods. Since pods are ephemeral (new pod = new IP), Services give a consistent IP/DNS name that routes to healthy pods using label selectors. Services also load-balance across all matching pod replicas.</P>
      <H4>ClusterIP (default)</H4>
      <P>Creates a virtual IP reachable <em>only within the cluster</em>. Used for service-to-service communication (e.g. the API pod calling the Database service). Not accessible from outside the cluster. Use when: you need internal-only communication between microservices.</P>
      <H4>NodePort</H4>
      <P>Exposes the service on a static port (30000–32767) on <em>every node's IP</em>. External traffic can reach it at <Code>NodeIP:NodePort</Code>. Useful for development/testing. Not ideal for production — exposes a port on every node and lacks load balancing across nodes. Use when: quick external access for testing without a cloud load balancer.</P>
      <H4>LoadBalancer</H4>
      <P>Provisions an external <strong>cloud load balancer</strong> (e.g. AWS ALB, GCP Load Balancer) that routes traffic into the cluster. This is the standard production approach for exposing public-facing services. The cloud provider assigns a public IP/DNS. Use when: you need to expose a service to the internet in a production cloud environment.</P>
      <Table
        headers={["Type", "Accessible From", "Use Case"]}
        rows={[
          ["ClusterIP", "Within cluster only", "Microservice-to-microservice communication"],
          ["NodePort", "External via Node IP + port", "Dev/testing, simple external access"],
          ["LoadBalancer", "External via cloud LB public IP", "Production internet-facing services"],
        ]}
      />
    </> },
  ];

  return (
    <div>
      {components.map((c, i) => (
        <Part key={i} label={c.name} question={`Kubernetes component: ${c.name.split(". ")[1]}`} marks={c.marks} color={color}>
          {c.body}
        </Part>
      ))}
    </div>
  );
}

function Q5({ color }) {
  return (
    <div>
      <Part label="Part A" question="Explain five properties of an API Gateway (e.g. Kong) and how they benefit a distributed system." marks="10" color={color}>
        <H4>Property 1 — Authentication &amp; Authorisation (2 marks)</H4>
        <P>An enterprise API gateway like Kong can validate <strong>JWT tokens, API keys, OAuth 2.0, and OpenID Connect</strong> at the gateway layer — before the request reaches any microservice. This means authentication logic is centralised: individual microservices don't each need to implement their own auth. A single point of policy enforcement improves security and reduces duplication across dozens of services.</P>

        <H4>Property 2 — Rate Limiting &amp; Throttling (2 marks)</H4>
        <P>The gateway enforces request rate limits per consumer, API key, or IP address (e.g. 1,000 requests/minute per API key). This protects backend microservices from overload, prevents abuse, and enables commercial tiering (free tier: 100 req/min, paid tier: 10,000 req/min). Without a gateway, each service would need to implement this independently — inconsistently and expensively.</P>

        <H4>Property 3 — Request Routing &amp; Load Balancing (2 marks)</H4>
        <P>Kong routes incoming requests to the correct upstream microservice based on URL path, headers, or other attributes. It also load-balances across multiple instances of a service. A client calls one gateway URL — the gateway handles service discovery and distributes load. This decouples clients from internal service topology: services can be renamed, moved, or scaled without the client knowing.</P>

        <H4>Property 4 — SSL Termination (2 marks)</H4>
        <P>The gateway handles HTTPS/TLS encryption and decryption, presenting a certificate to clients. Internal service-to-service traffic can then use plain HTTP over a private, trusted network — saving CPU overhead on every microservice. Certificate management is centralised at the gateway rather than requiring TLS configuration on dozens of individual services.</P>

        <H4>Property 5 — Observability: Logging, Monitoring &amp; Tracing (2 marks)</H4>
        <P>Kong provides centralised logging of all API requests and responses, metrics (request count, latency, error rates) that integrate with Prometheus/Grafana, and distributed tracing (Zipkin/Jaeger integration). Without a gateway, you'd have to aggregate logs and metrics from every individual microservice. The gateway provides a single, consistent view of all API traffic across the entire distributed system.</P>
      </Part>

      <Part label="Part B" question="Explain the structure and purpose of a digital certificate: three key components, CA signing process, and example use." marks="10" color={color}>
        <H4>Three Key Components of an x.509 Digital Certificate</H4>
        <Grid>
          <Card title="1. Subject & Public Key" color={color}>Who the certificate belongs to (Common Name: e.g. www.mybank.com, Organisation, Country) and the entity's <strong>public key</strong>. This is what clients use to establish encrypted communication.</Card>
          <Card title="2. Issuer & Validity Period" color={color}>The <strong>Certificate Authority (CA)</strong> that verified and signed the certificate (e.g. DigiCert, Let's Encrypt), plus Valid From / Valid To dates. Expired certificates are rejected by browsers.</Card>
          <Card title="3. Digital Signature" color={color}>The CA's cryptographic signature over the certificate data — generated by hashing the cert and encrypting with the CA's private key. Proves the certificate was issued by a trusted CA and has not been tampered with.</Card>
        </Grid>

        <H4>Process: Creating a CA-Signed Certificate</H4>
        <Steps color={color} steps={[
          { title: "Generate Key Pair", body: "The server owner generates a public/private key pair (RSA 2048-bit or ECDSA). The private key is kept secret on the server." },
          { title: "Create Certificate Signing Request (CSR)", body: "A CSR file is created containing: the domain name (CN), organisation details, and the public key — all signed with the private key. The CSR is submitted to a Certificate Authority." },
          { title: "CA Domain Validation", body: "The CA verifies the applicant controls the domain (via DNS TXT record or HTTP file challenge). For EV certificates, additional company identity verification is performed." },
          { title: "CA Signs and Issues Certificate", body: "The CA hashes the certificate data and signs the hash with its own private key — creating the digital signature. The signed x.509 certificate is returned to the applicant and deployed on the server." },
        ]} />

        <H4>Example Use: HTTPS Web Server</H4>
        <P>A bank's web server presents its certificate during the TLS handshake. The browser: (1) verifies the CA's signature using the CA's pre-trusted public key, (2) checks the certificate hasn't expired, (3) checks the hostname matches <Code>www.mybank.com</Code>. Once verified, the browser uses the server's public key to establish an encrypted session. The certificate protects against <strong>man-in-the-middle attacks</strong> — an attacker intercepting traffic cannot fake a certificate signed by a trusted CA.</P>
      </Part>

      <Part label="Part C" question="Explain the structure of a JSON Web Token (JWT) and provide a use-case relying on its characteristics." marks="5" color={color}>
        <H4>JWT Structure</H4>
        <P>A JWT is a compact, URL-safe token made of three Base64URL-encoded parts separated by dots:</P>
        <Diagram>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9    ← Header
.eyJ1c2VySWQiOjQyLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MDAwMDAwMDB9  ← Payload
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c   ← Signature

Decoded Header:   { "alg": "HS256", "typ": "JWT" }
Decoded Payload:  { "userId": 42, "role": "admin", "exp": 1700000000 }
Signature:        HMACSHA256(base64(header) + "." + base64(payload), secret)`}</Diagram>
        <UL items={[
          "Header — specifies the token type (JWT) and signing algorithm (HS256 or RS256)",
          "Payload — contains claims: user identity (sub/userId), roles, expiry (exp), issued-at (iat). Anyone can read this — it is NOT encrypted, only signed",
          "Signature — prevents tampering. Only the server with the secret/private key can produce a valid signature",
        ]} />
        <H4>Use-Case: Stateless API Authentication</H4>
        <P>After login, the server issues a signed JWT. The client stores it and sends it in every subsequent request header: <Code>Authorization: Bearer &lt;token&gt;</Code>. The API Gateway or each microservice verifies the signature — <em>no database lookup needed</em>. This makes authentication <strong>stateless and scalable</strong>: any instance of any microservice can verify the token without shared session storage. The <Code>exp</Code> claim ensures tokens expire, limiting damage if stolen.</P>
        <Callout type="warn" label="Important">JWT payloads are Base64-encoded, not encrypted. Never put sensitive data (passwords, card numbers) in the payload — anyone who intercepts the token can read it. Use HTTPS to protect the token in transit.</Callout>
      </Part>
    </div>
  );
}

function Q6({ color }) {
  return (
    <div>
      <Part label="Part A & B" question="OpenID Connect authorisation flow — sequence diagram and explanation for accessing protected resources." marks="15" color={color}>
        <H4>UML Sequence Diagram — OpenID Connect Auth Code Flow</H4>
        <Diagram>{`
User Browser      Client App (RP)       Auth Server (IdP)       Resource Server
      │                  │                     │                       │
      │──Visit /dashboard▶│                     │                       │
      │                  │                     │                       │
      │◄─Redirect to IdP─│                     │                       │
      │  (client_id,      │                     │                       │
      │   redirect_uri,   │                     │                       │
      │   scope=openid    │                     │                       │
      │   profile email   │                     │                       │
      │   response_type   │                     │                       │
      │   =code, state)   │                     │                       │
      │                  │                     │                       │
      │──────────────────────────Login Page────▶│                       │
      │◄─────────────────────────Login Form─────│                       │
      │                  │                     │                       │
      │──────────────────────────Credentials───▶│                       │
      │                  │                     │                       │
      │◄─Redirect to redirect_uri───────────────│                       │
      │  + auth code + state                   │                       │
      │                  │                     │                       │
      │──auth code───────▶│                     │                       │
      │                  │──POST /token────────▶│                       │
      │                  │  (code, client_secret│                       │
      │                  │   redirect_uri)      │                       │
      │                  │                     │                       │
      │                  │◄──Access Token───────│                       │
      │                  │   + ID Token (JWT)  │                       │
      │                  │                     │                       │
      │                  │──GET /userinfo──────▶│                       │
      │                  │◄──name, email, photo─│                       │
      │                  │                     │                       │
      │                  │──API call + Bearer Token────────────────────▶│
      │                  │◄──Protected Resource────────────────────────│
      │                  │                     │                       │
      │◄─Personalised────│                     │                       │
      │  Dashboard       │                     │                       │`}</Diagram>

        <H4>Explanation of Key Stages</H4>
        <Steps color={color} steps={[
          { title: "User visits protected page — redirect to IdP", body: "The client app detects the user is unauthenticated and redirects the browser to the Identity Provider's authorisation endpoint. The redirect URL includes: client_id (identifies this app), redirect_uri (where to send the user back), scope=openid profile email (what identity data to request), response_type=code, and a random state value for CSRF protection." },
          { title: "User authenticates with the Identity Provider", body: "The IdP (e.g. Google, Auth0) presents a login form. The user enters credentials. If the user has an existing SSO session (already logged into Google), this step is skipped — SSO magic. The IdP verifies credentials against its own user store." },
          { title: "IdP redirects back with Authorization Code", body: "The IdP redirects the browser to the client's redirect_uri with a short-lived, single-use authorization_code and the state value. The client verifies state matches to prevent CSRF attacks. The code is NOT a token — it is just a temporary voucher." },
          { title: "Client exchanges code for tokens (back-channel, server-to-server)", body: "The client's backend server sends a POST to the IdP's token endpoint with the authorization code and client_secret. This happens server-side — the client_secret is never exposed to the browser. This is the critical security advantage of the Authorization Code flow over the Implicit flow." },
          { title: "IdP returns Access Token + ID Token (JWT)", body: "The ID Token (JWT) contains identity claims: name, email, sub (user ID), and profile photo URL — everything needed to personalise the page. The Access Token is used to call protected APIs. The client verifies the ID Token's JWT signature using the IdP's public key." },
          { title: "Client fetches user profile and accesses resource server", body: "Using the Access Token, the client calls GET /userinfo on the IdP to get the full profile (name, email, photo). It also calls the Resource Server's API using the Bearer token. The resource server validates the token and returns protected data." },
          { title: "Personalised dashboard rendered", body: "The client now has the user's name, email, and photo URL from the ID Token / userinfo endpoint. The dashboard is rendered with the user's details. The user has full authenticated access to protected resources." },
        ]} />
      </Part>

      <Part label="Part C" question="Explain the SAGA orchestration pattern for distributed transactions — successful and failed transactions across three microservices." marks="10" color={color}>
        <H4>Why SAGA? The Distributed Transaction Problem</H4>
        <P>In a microservice architecture, a single business transaction (e.g. placing an order) may span multiple services, each with its own database. Traditional <strong>ACID transactions</strong> across services are impractical — you cannot hold a database lock across a network call to another service. The <strong>SAGA pattern</strong> solves this by breaking the transaction into a sequence of local transactions, each published as an event, with <strong>compensating transactions</strong> that undo completed steps if a later step fails.</P>
        <P>In <strong>Orchestration</strong> (as opposed to Choreography), a central <strong>Saga Orchestrator</strong> tells each service what to do and listens for responses — it knows the entire workflow.</P>

        <H4>Scenario: Place Order (3 Microservices)</H4>
        <P>Services involved: <strong>Order Service</strong>, <strong>Payment Service</strong>, <strong>Inventory Service</strong></P>

        <H4>Successful Transaction Flow</H4>
        <Diagram>{`
    ┌──────────────────────────────────┐
    │       SAGA ORCHESTRATOR          │
    └──┬──────────────────────────────┘
       │
  (1)  │──createOrder()──────────────▶ Order Service
       │◄──OrderCreated (success)──────
       │
  (2)  │──processPayment()───────────▶ Payment Service
       │◄──PaymentProcessed (success)──
       │
  (3)  │──reserveInventory()─────────▶ Inventory Service
       │◄──InventoryReserved (success)─
       │
  (4)  │──confirmOrder()─────────────▶ Order Service
       │◄──OrderConfirmed─────────────
       │
  ✓ SAGA COMPLETE — Order successfully placed`}</Diagram>

        <H4>Failed Transaction — Compensating Transactions</H4>
        <Diagram>{`
    ┌──────────────────────────────────┐
    │       SAGA ORCHESTRATOR          │
    └──┬──────────────────────────────┘
       │
  (1)  │──createOrder()──────────────▶ Order Service
       │◄──OrderCreated (success)──────
       │
  (2)  │──processPayment()───────────▶ Payment Service
       │◄──PaymentFailed (insufficient funds)
       │
       │  *** FAILURE DETECTED — begin compensation ***
       │
  (3)  │──cancelOrder()──────────────▶ Order Service   ← Compensating Tx
       │◄──OrderCancelled──────────────
       │
  ✗ SAGA FAILED — state rolled back via compensating transactions
    Inventory was never touched, so no compensation needed there.`}</Diagram>

        <H4>Key Concepts</H4>
        <UL items={[
          "Each local transaction (createOrder, processPayment, reserveInventory) commits independently to its own database",
          "A compensating transaction is the logical UNDO of a completed local transaction (cancelOrder undoes createOrder)",
          "The orchestrator tracks the current step and decides whether to proceed or compensate",
          "Compensating transactions must be idempotent — safe to run multiple times in case of retries",
          "The system reaches eventual consistency — not immediate atomicity, but a guaranteed correct final state",
          "If the orchestrator itself fails, it can resume from the last known state stored in its own database",
        ]} />
        <Callout type="warn" label="SAGA vs. ACID">
          SAGAs do NOT provide isolation — other services may see intermediate states (e.g. payment deducted before inventory reserved). This is a trade-off accepted in distributed systems in exchange for availability and scalability. Use <strong>semantic locks</strong> or <strong>countermeasures</strong> if intermediate visibility is a problem.
        </Callout>
      </Part>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════ */

const questions = [
  { id: "q1", label: "Q1", title: "Middleware, Referential Integrity & Env Vars", sub: "Node.js · SQL · Docker · Kubernetes", Component: Q1 },
  { id: "q2", label: "Q2", title: "Cloud Benefits, IaaS/PaaS & Encryption", sub: "Cloud · Shared Responsibility · Asymmetric Crypto", Component: Q2 },
  { id: "q3", label: "Q3", title: "Microservices & Event-Driven Architecture", sub: "Microservices · Composite · SAGA · Kafka", Component: Q3 },
  { id: "q4", label: "Q4", title: "Kubernetes Components (All 8)", sub: "Control Plane · Pod · Deployment · Service", Component: Q4 },
  { id: "q5", label: "Q5", title: "API Gateway, Certificates & JWT", sub: "Kong · x.509 · JWT · PKI", Component: Q5 },
  { id: "q6", label: "Q6", title: "OpenID Connect & SAGA Pattern", sub: "OIDC · Auth Code Flow · Distributed Transactions", Component: Q6 },
];

export default function App() {
  const [active, setActive] = useState("q1");
  const current = questions.find(q => q.id === active);
  const color = qColors[questions.findIndex(q => q.id === active)];

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Source+Serif+4:wght@300;400;600&family=Fira+Code:wght@400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        strong { color: #fff; }
        em { color: ${theme.muted}; font-style: italic; }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 2px; }
      `}</style>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, #0a0b0f 0%, #10152a 50%, #0a0b0f 100%)", borderBottom: `1px solid ${theme.border}`, padding: "44px 32px 36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 700, height: 350, background: "radial-gradient(ellipse, rgba(56,189,248,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.25)", color: theme.q1, fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 18 }}>Study Guide</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px,4.5vw,46px)", fontWeight: 800, color: "#fff", letterSpacing: -1, marginBottom: 10 }}>
          CO3404 <span style={{ color: theme.q1 }}>Distributed Systems</span>
        </h1>
        <p style={{ color: theme.muted, fontSize: 14, maxWidth: 480, margin: "0 auto 22px" }}>Complete answers — 2023–2024 Exam Paper</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
          {[["6","Questions"], ["25 marks","each"], ["Answer 3","of 6"], ["1.5 hrs","allowed"]].map(([v, l]) => (
            <div key={l} style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 600, color: theme.muted, textTransform: "uppercase", letterSpacing: 1 }}>
              <span style={{ color: theme.q3, marginRight: 5 }}>{v}</span>{l}
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}`, display: "flex", overflowX: "auto", scrollbarWidth: "none", position: "sticky", top: 0, zIndex: 100 }}>
        {questions.map((q, i) => {
          const isActive = q.id === active;
          const c = qColors[i];
          return (
            <button key={q.id} onClick={() => setActive(q.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "14px 18px", fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap", color: isActive ? c : theme.muted, borderBottom: `2px solid ${isActive ? c : "transparent"}`, transition: "all 0.18s", flexShrink: 0 }}>
              {q.label}
            </button>
          );
        })}
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 20px 80px" }}>
        <div style={{ padding: "44px 0 30px", borderBottom: `1px solid ${theme.border}`, marginBottom: 38 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: color, marginBottom: 10 }}>{current.label}</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(20px,3vw,30px)", fontWeight: 800, color: "#fff", letterSpacing: -0.5, marginBottom: 7 }}>{current.title}</h2>
          <p style={{ color: theme.muted, fontSize: 13.5 }}>{current.sub}</p>
        </div>
        <current.Component color={color} />
      </div>
    </div>
  );
}