import { useState } from "react";
import { Link } from 'react-router-dom';

const AMBER = "#f59e0b";
const GREEN = "#10b981";
const BLUE = "#3b82f6";
const RED = "#ef4444";
const PURPLE = "#8b5cf6";
const CYAN = "#06b6d4";
const ORANGE = "#f97316";
const PINK = "#ec4899";

// ─── EXAM QUESTIONS ────────────────────────────────────────────────────────────
const examBank = [
  // ═══════════════════════════════════════════════════════
  {
    id: "api-gateway-usecase",
    topic: "API Gateway (Kong)",
    topicColor: ORANGE,
    year: "2022-23 Main · Q1a",
    marks: 15,
    question: `With the aid of a relevant use-case and diagram, explain why you may recommend the implementation of an API gateway for your microservice architecture. i.e., what problems does it solve and what benefits could it bring to your use-case solution?

Up to five marks for the diagram, use-case, and overview. The remainder for five key advantages/disadvantages clearly explained, justified, and mapped to the use-case.`,
    markScheme: `• Diagram + use-case + overview: up to 5 marks
• 5 advantages/disadvantages clearly explained, justified and mapped to use-case: ~2 marks each`,
    diagram: `USE-CASE: Online Retail Platform (microservice architecture)

  INTERNET
     │
     ▼
 ┌─────────────────────────────────────────────┐
 │           API GATEWAY (Kong)                │
 │  ┌──────────┐ ┌──────────┐ ┌─────────────┐ │
 │  │Auth/JWT  │ │Rate Limit│ │ SSL/TLS     │ │
 │  │ check   │ │10 req/s  │ │termination  │ │
 │  └──────────┘ └──────────┘ └─────────────┘ │
 └───────┬───────────┬──────────────┬──────────┘
         │           │              │
    /products    /orders        /users
         │           │              │
    ┌────▼────┐ ┌────▼────┐ ┌───────▼───────┐
    │Product  │ │ Order   │ │  User/Auth    │
    │Service  │ │ Service │ │  Service      │
    │:4000    │ │ :4001   │ │  :4002        │
    └─────────┘ └─────────┘ └───────────────┘`,
    answer: `USE-CASE OVERVIEW (2 marks):
An online retail platform with three microservices: Product Service, Order Service, and User/Auth Service. Without a gateway, each service would need its own security, rate-limiting, and SSL — duplicating logic across all services. A Kong API Gateway sits as the single entry point, centralising these concerns.

─────────────────────────────────────────────

ADVANTAGE 1 — Centralised Authentication (2 marks):
Without the gateway, every microservice must independently verify JWTs or check sessions. This duplicates code and creates inconsistency — one service may have a bug in its auth check. Kong intercepts every request to /products, /orders, /users and validates the JWT before the request ever reaches a service. If the token is invalid, Kong returns 401 without touching the backend. This makes the retail platform more secure and reduces dev effort per service.

ADVANTAGE 2 — Rate Limiting (2 marks):
The product listing endpoint may attract heavy traffic during a sale. Without a gateway, a spike could overwhelm the Product Service. Kong applies rate limiting (e.g. 10 req/sec per IP) before the request reaches the service. This protects all backend microservices from DDoS or accidental overload — for example, a poorly-written client polling every second. The retail business stays responsive for genuine customers.

ADVANTAGE 3 — Request Routing / Single Entry Point (2 marks):
Clients only need to know one URL (the gateway). Kong routes /products → Product Service :4000, /orders → Order Service :4001 etc. Without the gateway, clients would need to know each service's IP/port — exposing internal architecture. As services are added or ports change, only the gateway config changes, not the clients. This simplifies the client code for the retail mobile app.

ADVANTAGE 4 — SSL Termination (2 marks):
Without a gateway, each microservice must manage its own TLS certificate and handle HTTPS. With Kong, HTTPS is terminated at the gateway; internal traffic between gateway and services can use HTTP on a private network. This centralises certificate management (one cert renewal point) and reduces the computational overhead of TLS on every service, which is important when the retail platform scales horizontally.

ADVANTAGE 5 — Monitoring & Analytics (2 marks):
Without a gateway, to understand how the platform is behaving you must add logging to every microservice individually. Kong provides centralised logging of every API call — response times, error rates, traffic patterns per endpoint. The retail business can see that /orders is slow on Mondays, trigger alerts, and plan capacity — all from one dashboard without touching service code.

DISADVANTAGE (acknowledge for balance):
The gateway introduces a single point of failure — if Kong goes down, all services become unreachable. This must be mitigated with a high-availability deployment (multiple gateway instances behind a load balancer).`,
  },
  // ─────────────────────────────────────────────────────────
  {
    id: "cloud-drivers",
    topic: "Cloud Computing",
    topicColor: BLUE,
    year: "2022-23 Main · Q1b",
    marks: 10,
    question: `Provide five clearly explained and justified financial and/or operational drivers behind businesses moving their on-premises monolithic platforms to a distributed solution hosted in the cloud?`,
    markScheme: `• 5 drivers, 2 marks each: clear explanation + justification`,
    diagram: `ON-PREMISES (monolith)          CLOUD (distributed)
┌───────────────────────┐      ┌───────────────────────┐
│ Single large server   │      │  Auto-scaling group   │
│ Fixed capacity        │  →   │  Pay-as-you-go        │
│ CapEx: buy hardware   │      │  OpEx: pay monthly    │
│ Manual patching       │      │  Managed infra        │
│ Scale = buy more kit  │      │  Scale in minutes     │
└───────────────────────┘      └───────────────────────┘`,
    answer: `DRIVER 1 — CapEx to OpEx (Cost Model) (2 marks):
On-premises requires Capital Expenditure — buying servers, racks, networking equipment, and a secure data centre. These are depreciating assets (typically over 5 years) that must be paid upfront regardless of whether they are used. Cloud replaces this with Operating Expenditure — a pay-as-you-go monthly cost based on actual usage. For a retail business with seasonal peaks, this means they only pay for extra compute during the Christmas period, then scale back down, rather than owning hardware that sits idle 10 months of the year.

DRIVER 2 — Elasticity / Scalability (2 marks):
A monolithic on-premises system can only scale vertically (buy a bigger server) which takes weeks and involves procurement. Cloud enables elastic scaling — automatically adding or removing compute instances in minutes based on demand. For a business whose traffic doubles overnight due to a viral campaign, the cloud solution scales without human intervention or hardware spend, ensuring performance is maintained without over-provisioning.

DRIVER 3 — Reduced Operational Overhead / Staff Costs (2 marks):
Running on-premises infrastructure requires specialist staff for server maintenance, OS patching, hardware failure resolution, physical security, and power management. Cloud providers handle all physical infrastructure management. A business can move to a PaaS model where the provider also manages the OS and runtime. This frees the in-house team to focus on building business features rather than infrastructure management, reducing headcount costs.

DRIVER 4 — Business Continuity / Resilience (2 marks):
A monolithic on-premises system is typically hosted in one location — a single point of failure. Cloud providers offer multiple Availability Zones (geographically isolated data centres in a region). Distributing the solution across AZs means if one data centre loses power or connectivity, the system fails over automatically to another AZ. This level of resilience would be prohibitively expensive to replicate on-premises (requiring a second data centre).

DRIVER 5 — Speed to Market / Global Reach (2 marks):
On-premises provisioning of new environments for testing, staging, or new geographic regions takes weeks — ordering hardware, racking, cabling, configuring. Cloud enables new environments to be provisioned in minutes using Infrastructure as Code (Terraform). A business can launch in a new country by deploying to a new cloud region the same day. This competitive advantage — being able to experiment and deploy rapidly — directly impacts revenue and market position.`,
  },
  // ─────────────────────────────────────────────────────────
  {
    id: "event-driven-data-sharing",
    topic: "Event-Driven Architecture",
    topicColor: GREEN,
    year: "2022-23 Main · Q2a",
    marks: 10,
    question: `Ideally, a microservice and its data should be independent. However, in reality, not all services are fully decomposable with regard to data. With the aid of a diagram and simple use-case, explain how an event driven architecture can be used to share data between microservices without sharing a database.`,
    markScheme: `• Marks awarded for each key point explaining the data flow between microservices`,
    diagram: `USE-CASE: E-commerce — Order service needs product prices

WITHOUT events (BAD — shared database):
┌─────────────┐         ┌─────────────┐
│Order Service│────────▶│  Shared DB  │◀────────│Product Svc │
└─────────────┘         └─────────────┘         └────────────┘
  Problem: tight coupling, one service can corrupt the other's data

WITH events (GOOD — event-driven):
┌──────────────┐  price_updated  ┌─────────┐  price_updated  ┌─────────────┐
│Product Service│───────────────▶│ Message │────────────────▶│Order Service│
│  (producer)  │                 │ Broker  │                 │(subscriber) │
│  own DB ✓   │                 │(RabbitMQ│                 │  own DB ✓  │
└──────────────┘                 │/Kafka)  │                 │local price  │
                                 └─────────┘                 │  cached ✓  │
                                                             └─────────────┘`,
    answer: `PROBLEM — Shared Database (explain first):
Microservices should own their data. If Order Service and Product Service share a database, they are tightly coupled — a schema change in Product Service can break Order Service. Both services can directly modify each other's data, violating bounded context. This defeats the purpose of independent deployment.

EVENT-DRIVEN SOLUTION — Data flow explanation:

1. Product Service owns its own database containing product prices.
2. When a product price changes, Product Service publishes a "price_updated" event to a message broker (e.g. RabbitMQ or Kafka). The event contains: { productId: "P001", newPrice: 29.99, timestamp: "..." }
3. The message broker holds the event and delivers it to all subscribers.
4. Order Service is subscribed to "price_updated" events. On receipt, it updates its own local copy of the price in its own database.
5. Order Service now has the data it needs (current price) without ever querying Product Service's database directly.

KEY BENEFITS of this approach:
• Each service retains its own database — no shared schema, no coupling
• Order Service can still function even if Product Service is temporarily down (it has local cached data)
• Product Service doesn't need to know who is consuming its events — new subscribers can be added without changing Product Service
• Eventual consistency: the local copy in Order Service is slightly behind the source of truth — acceptable for most business use cases

CAVEAT — Eventual Consistency:
The Order Service's local price may be briefly out of sync after a price change. This is an accepted trade-off for the resilience and decoupling benefits in a distributed system.`,
  },
  // ─────────────────────────────────────────────────────────
  {
    id: "pub-sub-vs-queue",
    topic: "Event-Driven Architecture",
    topicColor: GREEN,
    year: "2022-23 Main · Q2b",
    marks: 15,
    question: `Compare and contrast the "shared message queue" pattern to the "publisher–subscriber" pattern. With the aid of a diagram, provide a microservice-based use-case for each and an explanation of why you recommend the pattern for each use-case.

Three marks awarded for each clearly explained and justified key point mapped to the appropriate use-case.`,
    markScheme: `• 5 key points × 3 marks = 15: each needs explanation + justification + mapped to use-case`,
    diagram: `MESSAGE QUEUE (Point-to-Point):
┌──────────────┐    task    ┌──────────────┐    ┌──────────────┐
│Order Service │───────────▶│    Queue     │───▶│  Payment Svc │
│  (producer)  │            └──────────────┘    │ (consumer A) │
└──────────────┘             ONE consumer       └──────────────┘
                             gets the message   Consumer B waits

PUB-SUB (Fan-out):
                            ┌──────────────────▶│ Email Service │
┌──────────────┐  user_reg  ┌──────────┐        └───────────────┘
│  User Service│───────────▶│  Topic/  │───────▶│Analytics Svc  │
│  (publisher) │            │ Exchange │        └───────────────┘
└──────────────┘            └──────────┘───────▶│ Onboarding Svc│
                            ALL subscribers      └───────────────┘
                            receive a copy`,
    answer: `─── POINT 1: Delivery Model (3 marks) ───
Message Queue: A message is placed in the queue and consumed by EXACTLY ONE consumer. If multiple consumers listen, they compete — each message goes to only one of them (competing consumers pattern).
Pub-Sub: A message published to a topic is delivered to ALL subscribers. Each subscriber gets their own copy of the message.

Mapped to use-case: For payment processing (order placed → charge card), only ONE payment processor should handle each order. A queue ensures the same order isn't charged twice. For user registration (new user → email, analytics, onboarding), ALL three services need the event — pub-sub fans it out to all simultaneously.

─── POINT 2: Coupling and Decoupling (3 marks) ───
Message Queue: Producer knows there's a consumer (though not who). Messages are held until a consumer is ready — provides temporal decoupling. Consumer can be down and messages queue up.
Pub-Sub: Producer has zero knowledge of subscribers. New subscribers can be added without any change to the publisher. Fully decoupled.

Mapped to use-case: Adding a new consumer to a queue (e.g. second payment processor) requires coordination. Adding a new subscriber to the user registration topic (e.g. a fraud-check service) requires zero changes to the User Service — it just subscribes to the existing topic.

─── POINT 3: Message Persistence / Retention (3 marks) ───
Message Queue: Message is typically deleted from the queue once successfully consumed and acknowledged.
Pub-Sub (Kafka): Events are retained in the log — new subscribers can replay historical events. RabbitMQ pub-sub: message typically not retained after delivery.

Mapped to use-case: Order processing — once paid, the payment task is done and can be deleted. Event sourcing (audit log) — retaining all user registration events allows replaying history to rebuild state, e.g. after a new analytics service is deployed.

─── POINT 4: Resilience (3 marks) ───
Message Queue: If the Payment Service is down, orders queue up and are processed when it recovers — no orders lost. Multiple consumer instances can process in parallel (load balancing).
Pub-Sub: If Email Service is down when user_reg event is published, the message may be lost (unless using durable queues/Kafka). Each subscriber must manage its own resilience.

Mapped to use-case: Recommendation — use Queue for payment as it must not lose a single transaction. Use Pub-Sub for notifications where losing one welcome email is not business-critical, but fan-out to multiple services is essential.

─── POINT 5: Use-Case Recommendation (3 marks) ───
Message Queue recommendation: Order fulfilment pipeline — order → inventory check → payment → dispatch. Each stage must complete exactly once in sequence. No two services should process the same order. Queue guarantees single delivery and maintains ordering.

Pub-Sub recommendation: Real-time data pipeline — an IoT sensor publishes temperature readings. Multiple consumers (alerting service, storage service, dashboard service) all need every reading simultaneously. Pub-sub elegantly handles this fan-out without the publisher needing to know or care about each consumer.`,
  },
  // ─────────────────────────────────────────────────────────
  {
    id: "sharding-consistent-hashing",
    topic: "Databases & Scaling",
    topicColor: ORANGE,
    year: "2022-23 Main · Q3b",
    marks: 15,
    question: `More modern NoSQL databases, such as MongoDB, overcome the scaling limitations of relational databases but introduce new challenges when scaled. Explain how "sharding" and "consistent hashing" can support database distribution and resilience.

Your explanation should include: sharding, data distribution, adding and removing nodes, resilience, and data replication.`,
    markScheme: `• Clear explanation of challenges of sharding
• How consistent hashing addresses those challenges
• Discussion of: sharding, data distribution, adding/removing nodes, resilience, replication
• Diagram is beneficial`,
    diagram: `NAIVE SHARDING (problem):
Nodes: A, B, C  →  shard key = userId % 3
Add node D: now userId % 4 → MOST data moves! Expensive.

CONSISTENT HASHING (solution):
         0
      ┌──┴──┐
  330 │     │ 30
      │ Ring│
  300 │     │ 60   Nodes at positions on ring:
      │     │        Node A: position 30
  270 └──┬──┘ 90     Node B: position 120
         │           Node C: position 240
        180
        
Data item hashed → position on ring
→ assigned to NEXT NODE clockwise

User_001 → hashes to 85 → Node B (next clockwise from 85 is 120)

ADD Node D at position 180:
  Only data between 120→180 moves from C to D
  Everything else stays put! ✓

REPLICA SETS (resilience):
┌─────────┐  replicates  ┌─────────┐  replicates  ┌─────────┐
│Shard A  │─────────────▶│Replica 1│              │Replica 2│
│(primary)│              │(secondary)              │(secondary)
└─────────┘              └─────────┘              └─────────┘
If primary fails → replica elected as new primary`,
    answer: `SHARDING — What it is:
Sharding is the horizontal partitioning of data across multiple database nodes (shards). Each shard holds a subset of the total data. For example, users with IDs 1–1000 on Shard A, 1001–2000 on Shard B. This allows the database to scale beyond the limits of a single machine — read and write load is distributed across multiple nodes.

NAIVE DATA DISTRIBUTION — The problem:
A simple approach: shard_key = userId % N (number of nodes). This works when N is fixed. However, when you add a node (N becomes N+1), almost every item's shard assignment changes — requiring massive data migration across the cluster. Similarly, removing a node causes widespread data movement. This is disruptive, slow, and risks data unavailability during rebalancing.

CONSISTENT HASHING — The solution:
Consistent hashing arranges nodes on a virtual circular ring (hash space 0 to 2^32). Each node is assigned a position on the ring by hashing its identifier. To find a data item's shard: hash the item's key → it falls at a position on the ring → assigned to the NEXT NODE clockwise.

ADDING A NODE:
A new node is inserted at a position on the ring. Only the data between the new node and its predecessor on the ring needs to move — from the successor node to the new node. All other data is unaffected. In a 1000-node ring, adding 1 node moves ~1/1000 of the data instead of nearly everything.

REMOVING A NODE:
When a node is removed, only the data it was holding moves to the next node clockwise. Again, minimal disruption to the rest of the cluster.

RESILIENCE — Replication:
Each shard (primary) replicates its data to one or more secondary nodes. If the primary shard fails, a secondary is automatically elected as the new primary (replica set election). This provides both read scalability (secondaries can serve reads) and fault tolerance (no data loss if a node fails). MongoDB uses replica sets of typically 3 nodes (1 primary + 2 secondaries) per shard.

VIRTUAL NODES (vnodes):
To ensure even data distribution even when physical nodes have different capacities, each physical node is given multiple positions on the ring (virtual nodes). This prevents "hot spots" where one node receives disproportionately more data.`,
  },
  // ─────────────────────────────────────────────────────────
  {
    id: "oidc-flow",
    topic: "Auth & Authorisation",
    topicColor: PURPLE,
    year: "2022-23 Main / 2023-24 Resit · Q4/Q6",
    marks: 15,
    question: `With the aid of a UML-style sequence diagram, explain the process for a user accessing protected resources using the OpenID Connect authorisation code flow. Explain what happens at each step up to the point the user has full access and the application has access to the user's name, email address and photo to personalise the page.`,
    markScheme: `• Clear and correct diagram: 6 marks
• Clear explanation of each key stage with reference to diagram: 9 marks`,
    diagram: `USER          BROWSER         APP SERVER         IDENTITY PROVIDER (Google)
 │               │                  │                        │
 │  Click Login  │                  │                        │
 │──────────────▶│                  │                        │
 │               │  GET /login      │                        │
 │               │─────────────────▶│                        │
 │               │  302 redirect to IdP                      │
 │               │◀─────────────────│                        │
 │               │  GET /authorize?client_id=X               │
 │               │  &redirect_uri=Y&scope=openid+email+profile
 │               │  &response_type=code&state=ABC            │
 │               │──────────────────────────────────────────▶│
 │               │  Login page                               │
 │               │◀──────────────────────────────────────────│
 │ Enter creds   │                  │                        │
 │──────────────▶│                  │                        │
 │               │  POST credentials│                        │
 │               │──────────────────────────────────────────▶│
 │               │  302 redirect to redirect_uri?code=XYZ    │
 │               │◀──────────────────────────────────────────│
 │               │  GET /callback?code=XYZ                   │
 │               │─────────────────▶│                        │
 │               │                  │  POST /token           │
 │               │                  │  {code, client_secret} │
 │               │                  │───────────────────────▶│
 │               │                  │  {access_token,        │
 │               │                  │   id_token (JWT)}      │
 │               │                  │◀───────────────────────│
 │               │                  │  Verify id_token sig   │
 │               │                  │  Decode: name,email,   │
 │               │                  │  picture               │
 │               │  Session cookie  │                        │
 │               │◀─────────────────│                        │
 │  Personalised │                  │                        │
 │  page shown   │                  │                        │`,
    answer: `STEP 1 — User initiates login:
User clicks "Login with Google". The browser makes a GET request to the app's /login endpoint.

STEP 2 — App redirects to Identity Provider (IdP):
The app server responds with a 302 redirect to the IdP (e.g. Google's /authorize endpoint) with query parameters:
• client_id: identifies the application to Google
• redirect_uri: where Google should send the user after login
• scope: openid email profile — requests ID + email + profile picture
• response_type=code: requests an authorisation code (not a token directly — more secure)
• state: random value to prevent CSRF attacks

STEP 3 — User authenticates with IdP:
The browser follows the redirect to Google. User enters their Google credentials directly on Google's login page — the app NEVER sees the user's password.

STEP 4 — IdP redirects back with authorisation code:
After successful authentication, Google redirects the browser to the app's redirect_uri with a short-lived, single-use authorisation code: /callback?code=XYZ&state=ABC

STEP 5 — Browser delivers code to app server:
The browser follows the redirect, sending the code to the app server's /callback endpoint.

STEP 6 — App server exchanges code for tokens (server-to-server):
The app server makes a direct POST request to Google's /token endpoint, sending the code + client_secret. This exchange happens server-to-server — the code and client_secret are NEVER exposed to the browser. Google returns:
• access_token: used to call Google APIs on behalf of the user
• id_token: a signed JWT containing user identity claims

STEP 7 — App verifies and decodes the ID token:
The app verifies the id_token's digital signature using Google's public key (ensures it hasn't been tampered with). It then decodes the JWT payload to extract:
{ sub: "12345", name: "Alice Smith", email: "alice@gmail.com", picture: "https://..." }

STEP 8 — Session created, personalised page returned:
The app creates a session for the user (stores user info server-side), sets an HttpOnly session cookie on the browser, and returns the personalised web page showing Alice's name, email, and profile photo.

KEY SECURITY POINTS:
• User credentials never touch the app — handled entirely by the IdP
• Authorisation code is short-lived and single-use — intercepting it is useless without client_secret
• client_secret never leaves the server — cannot be extracted from the browser`,
  },
  // ─────────────────────────────────────────────────────────
  {
    id: "tls-handshake",
    topic: "TLS / Security",
    topicColor: RED,
    year: "2022-23 Resit · Q4 (25 marks)",
    marks: 25,
    question: `With the aid of a diagram, explain how HTTPS works from requesting a web resource to the point at which a secure session is established. Your answer should include where in the process the following techniques are used and what they are used for: Symmetric Key Encryption, Asymmetric Key Encryption, HMAC, Digital Signature, Digital Certificate, Key Exchange.`,
    markScheme: `25 marks distributed across each stage of the process and its explanation. For each key point: what is transferred, to whom, what technique is used and why.`,
    diagram: `CLIENT (Browser)                              SERVER
     │                                               │
     │──── 1. TCP SYN ───────────────────────────────▶│
     │◀─── TCP SYN-ACK ──────────────────────────────│
     │──── TCP ACK ──────────────────────────────────▶│
     │                                               │
     │  ── TLS HANDSHAKE BEGINS ───────────────────  │
     │                                               │
     │──── 2. Client Hello ──────────────────────────▶│
     │   {TLS version, cipher suites, client_random} │
     │                                               │
     │◀─── 3. Server Hello ──────────────────────────│
     │   {chosen cipher, server_random}              │
     │                                               │
     │◀─── 4. Certificate ───────────────────────────│
     │   {X.509 cert: domain, public key, CA sig}    │
     │                                               │
     │  5. Client validates certificate:             │
     │   - Extract CA digital signature from cert    │
     │   - Decrypt sig with CA public key            │  [ASYMMETRIC + DIGITAL SIG]
     │   - Hash cert content independently           │  [HASHING]
     │   - Compare hashes → if match: cert genuine   │
     │   - Check chain of trust to root CA           │
     │   - Check expiry + domain match               │
     │                                               │
     │  6. KEY EXCHANGE (Diffie-Hellman):            │
     │──── DH Key Exchange params ───────────────────▶│
     │◀─── DH Key Exchange params ───────────────────│
     │                                               │
     │  Both sides independently derive:            │
     │  pre_master_secret (never transmitted!)       │  [KEY EXCHANGE]
     │                                               │
     │  7. SESSION KEYS derived from:               │
     │  pre_master_secret + client_random + server_random
     │  → 4 keys generated:                         │
     │    client_write_key  (client→server encrypt)  │  [SYMMETRIC]
     │    server_write_key  (server→client encrypt)  │  [SYMMETRIC]
     │    client_MAC_key    (client→server HMAC)     │  [HMAC]
     │    server_MAC_key    (server→client HMAC)     │  [HMAC]
     │                                               │
     │──── 8. Change Cipher Spec + Finished ────────▶│
     │   HMAC of all handshake messages              │
     │                                               │
     │◀─── 9. Change Cipher Spec + Finished ────────│
     │   HMAC of all handshake messages              │
     │                                               │
     │  ══ ENCRYPTED SESSION ESTABLISHED ══          │
     │                                               │
     │◀══ 10. Encrypted HTTP response ══════════════│
     │   AES(data) + HMAC(data) per message          │`,
    answer: `STAGE 1 — TCP Handshake:
Before TLS, a standard TCP 3-way handshake establishes a reliable connection. This is not part of TLS but is required as TLS runs over TCP.

STAGE 2 — Client Hello:
The browser sends: supported TLS version, list of supported cipher suites (e.g. TLS_AES_256_GCM), and a client_random (random number). The client_random is essential — it will be used later to generate session keys.

STAGE 3 — Server Hello:
Server selects the highest mutually supported TLS version and cipher suite and sends back a server_random. This random number also contributes to session key generation.

STAGE 4 — Server Certificate [DIGITAL CERTIFICATE]:
Server sends its X.509 digital certificate containing: the server's domain name, the server's PUBLIC KEY, the issuing Certificate Authority (CA), validity period, and the CA's DIGITAL SIGNATURE over all certificate fields.

STAGE 5 — Client Certificate Validation [ASYMMETRIC ENCRYPTION + DIGITAL SIGNATURE + HASHING]:
• The client extracts the CA's digital signature from the certificate
• The client retrieves the CA's public key (from its trusted certificate store, pre-installed in the OS/browser)
• ASYMMETRIC DECRYPTION: client decrypts the CA's signature using the CA's public key → reveals the original hash of the certificate content that the CA computed when it signed it
• HASHING: client independently hashes the certificate content using the specified algorithm (e.g. SHA-256)
• If both hashes MATCH: the certificate is genuine (DIGITAL SIGNATURE verified — proving the CA signed it and it hasn't been tampered with)
• Client also checks: chain of trust (intermediate CA → root CA), expiry date, domain name matches the URL
• This gives the client confidence the server's public key is authentic — it genuinely belongs to the domain

STAGE 6 — Key Exchange [KEY EXCHANGE — Diffie-Hellman]:
The client and server perform a Diffie-Hellman key exchange. Each party generates a public/private key pair for DH, exchanges public values, and independently computes the same pre_master_secret without ever transmitting it. An eavesdropper who intercepts all traffic cannot compute the pre_master_secret. This provides Perfect Forward Secrecy — even if the server's private key is later compromised, past sessions cannot be decrypted.

STAGE 7 — Session Key Derivation [SYMMETRIC KEY ENCRYPTION + HMAC]:
Both sides use the same inputs — pre_master_secret + client_random + server_random — to independently derive 4 session keys:
• client_write_key: SYMMETRIC key used to encrypt data from client to server (AES)
• server_write_key: SYMMETRIC key used to encrypt data from server to client (AES)
• client_MAC_key: used to generate HMAC of each client→server message
• server_MAC_key: used to generate HMAC of each server→client message

Symmetric encryption is used (not asymmetric) because it is orders of magnitude faster — suitable for bulk data transfer.

STAGE 8 & 9 — Finished Messages [HMAC]:
Both client and server send a Finished message containing an HMAC over all handshake messages. This verifies that neither side tampered with the handshake and that both now have the same session keys. The HMAC uses the MAC keys derived in Stage 7. If either Finished message fails verification, the connection is terminated.

STAGE 10 — Encrypted Application Data [SYMMETRIC + HMAC]:
All subsequent HTTP data is encrypted with AES using the write keys (confidentiality) and accompanied by an HMAC using the MAC keys (integrity — detects tampering in transit). The browser can now safely send the HTTP request and receive the response.

SUMMARY OF TECHNIQUES:
• Digital Certificate: authenticates server identity
• Asymmetric + Digital Signature: validates the certificate is genuine (CA-signed)
• Key Exchange (DH): establishes shared secret without transmitting it
• Symmetric (AES): encrypts bulk data efficiently using session keys
• HMAC: ensures integrity of every message — detects tampering`,
  },
  // ─────────────────────────────────────────────────────────
  {
    id: "kubernetes-components",
    topic: "Kubernetes & Docker",
    topicColor: CYAN,
    year: "2023-24 Main · Q4 (25 marks)",
    marks: 25,
    question: `Provide a brief explanation of the functionality of the following Kubernetes components — what is their individual role?

a) Control plane  b) Kubelet  c) Node  d) Pod  e) ReplicaSet  f) Deployment  g) ConfigMap  h) Service (include when you'd choose ClusterIP, NodePort, or LoadBalancer)`,
    markScheme: `3 marks each for a–g, 4 marks for h (Service types)`,
    diagram: `KUBERNETES CLUSTER ARCHITECTURE:

┌────────────────────────────────────────────────────────────┐
│                    CONTROL PLANE                           │
│  ┌────────────┐ ┌──────┐ ┌────────────┐ ┌──────────────┐ │
│  │ API Server │ │ etcd │ │ Scheduler  │ │  Controller  │ │
│  │(entry point│ │(state│ │(assign pods│ │  Manager     │ │
│  │ for all    │ │store)│ │ to nodes)  │ │(runs control │ │
│  │ commands)  │ │      │ │            │ │ loops)       │ │
│  └────────────┘ └──────┘ └────────────┘ └──────────────┘ │
└────────────────────────────────────────────────────────────┘
          │                    │
    ┌─────▼──────┐       ┌─────▼──────┐
    │   NODE 1   │       │   NODE 2   │
    │ ┌────────┐ │       │ ┌────────┐ │
    │ │Kubelet │ │       │ │Kubelet │ │
    │ └────────┘ │       │ └────────┘ │
    │ ┌────────────────┐ │  
    │ │   POD          │ │  
    │ │ ┌────────────┐ │ │  
    │ │ │ Container A│ │ │  
    │ │ └────────────┘ │ │  
    │ │ ┌────────────┐ │ │  
    │ │ │ Container B│ │ │  ← containers share
    │ │ └────────────┘ │ │    network namespace
    │ └────────────────┘ │
    └────────────────────┘

REPLICA SET + DEPLOYMENT:
Deployment ──manages──▶ ReplicaSet (v1) ──maintains──▶ [Pod, Pod, Pod]
     │
     └──on update──▶ ReplicaSet (v2) gradually scales up
                     while ReplicaSet (v1) scales down

SERVICE → POD routing:
Internet ──▶ LoadBalancer ──▶ Service ──▶ [Pod1, Pod2, Pod3]
                                  (stable DNS name + IP, 
                                   load balances across pods)`,
    answer: `a) CONTROL PLANE (3 marks):
The control plane is the brain of the Kubernetes cluster — it manages the desired state of the cluster. It consists of: the API Server (single entry point for all kubectl commands and cluster management), etcd (a distributed key-value store holding the complete cluster state), the Scheduler (assigns newly created pods to appropriate nodes based on resource availability), and the Controller Manager (runs control loops that watch state and act to match desired state — e.g. replaces failed pods). The control plane does not run application workloads.

b) KUBELET (3 marks):
The kubelet is an agent that runs on every worker node. It communicates with the control plane's API Server and is responsible for ensuring the containers described in Pod specifications are running and healthy on its node. It continuously monitors container health and reports status back to the control plane. If a container crashes, the kubelet restarts it. Think of it as the node's local manager executing the control plane's instructions.

c) NODE (3 marks):
A node is a worker machine in the Kubernetes cluster — either a physical server or a virtual machine. Each node runs the kubelet, a container runtime (e.g. Docker/containerd), and kube-proxy (handles networking). Nodes are where application pods actually execute. A cluster typically has multiple nodes to distribute workloads and provide resilience — if one node fails, pods are rescheduled to healthy nodes.

d) POD (3 marks):
A pod is the smallest deployable unit in Kubernetes — a wrapper around one or more containers. Containers in a pod share the same network namespace (same IP address and ports) and can communicate via localhost. They also share storage volumes. Pods are ephemeral — they can be created and destroyed. Each pod gets a unique IP address within the cluster, but this IP changes when a pod is recreated, which is why Services are needed for stable addressing.

e) REPLICA SET (3 marks):
A ReplicaSet ensures that a specified number of identical pod replicas are running at all times. It uses label selectors to identify the pods it manages. If a pod crashes or a node fails, the ReplicaSet controller detects the deficit and creates a replacement pod to restore the desired count. ReplicaSets are rarely used directly — they are managed by Deployments.

f) DEPLOYMENT (3 marks):
A Deployment is a higher-level abstraction that manages ReplicaSets. It enables you to declaratively specify the desired state of your application — which image to run, how many replicas, update strategy. When you update a Deployment (e.g. new container image), it creates a new ReplicaSet and orchestrates a rolling update: gradually scaling up the new ReplicaSet while scaling down the old one. It also enables easy rollbacks (kubectl rollout undo) by retaining the old ReplicaSet.

g) CONFIGMAP (3 marks):
A ConfigMap stores non-sensitive configuration data as key-value pairs, decoupling configuration from the container image. This is important because you want the same image to run in dev, staging, and production with different config. ConfigMap data can be injected into pods as environment variables or mounted as files. For example, a ConfigMap could hold database hostnames, feature flags, or API endpoint URLs. For sensitive data (passwords, tokens), use Secrets instead (which are base64 encoded and can be encrypted at rest).

h) SERVICE (4 marks):
A Service provides a stable network endpoint (DNS name + IP) that abstracts access to a set of pods — essential because pods are ephemeral and change IP. The Service uses label selectors to identify target pods and load balances traffic across them.

ClusterIP (default): Exposes the service on an internal cluster IP only — reachable only from within the cluster. Use when: microservices communicating with each other internally (e.g. frontend pods calling the API service). Not accessible from outside the cluster.

NodePort: Exposes the service on a static port on every node's IP address. External traffic can reach it via NodeIP:NodePort. Use when: simple external access needed for testing/development, or when you don't have a cloud load balancer. Not ideal for production — exposes a port on every node.

LoadBalancer: Provisions a cloud provider's external load balancer (e.g. Azure Load Balancer, AWS ELB) that routes external traffic to the service. Use when: production external-facing services needing a stable public IP with proper load balancing and health checks. This is the standard approach for exposing production services in cloud-hosted Kubernetes.`,
  },
  // ─────────────────────────────────────────────────────────
  {
    id: "rolling-updates",
    topic: "Kubernetes & Docker",
    topicColor: CYAN,
    year: "2024-25 Main · Q3c",
    marks: 13,
    question: `With the aid of a simple diagram, explain how Kubernetes enables rolling updates with no downtime using a Deployment object and a ReplicaSet object. You should explain the function of a ReplicaSet object then explain how the Deployment object can use it to perform rolling updates.`,
    markScheme: `• Function of ReplicaSet: marks for explanation
• Deployment orchestrating rolling update: marks for step-by-step process with diagram`,
    diagram: `ROLLING UPDATE PROCESS (updating from v1 to v2, 3 replicas):

BEFORE UPDATE:
Deployment
└── ReplicaSet (v1)  replicas=3
    ├── Pod [v1] ✓ serving traffic
    ├── Pod [v1] ✓ serving traffic
    └── Pod [v1] ✓ serving traffic

STEP 1: Deployment creates new ReplicaSet (v2)
└── ReplicaSet (v1)  replicas=3  [Pod v1, Pod v1, Pod v1]
└── ReplicaSet (v2)  replicas=0  []

STEP 2: Scale up v2, scale down v1 (maxUnavailable=1, maxSurge=1)
└── ReplicaSet (v1)  replicas=2  [Pod v1, Pod v1]
└── ReplicaSet (v2)  replicas=1  [Pod v2] ← passes health check, joins traffic

STEP 3: Continue rolling
└── ReplicaSet (v1)  replicas=1  [Pod v1]
└── ReplicaSet (v2)  replicas=2  [Pod v2, Pod v2]

STEP 4: Complete
└── ReplicaSet (v1)  replicas=0  [] (kept for rollback)
└── ReplicaSet (v2)  replicas=3  [Pod v2, Pod v2, Pod v2]

ROLLBACK (kubectl rollout undo):
└── ReplicaSet (v1) scales back up, ReplicaSet (v2) scales down`,
    answer: `REPLICASET FUNCTION:
A ReplicaSet's job is to ensure a specified number of pod replicas are always running. It continuously monitors the cluster using a label selector, counting pods that match. If the actual count drops below the desired count (due to a pod crash or node failure), it immediately creates replacement pods. If there are too many (e.g. after manual pod creation), it deletes the excess. ReplicaSets make pods resilient and self-healing, but they only manage a fixed pod specification — they cannot orchestrate updates between versions.

DEPLOYMENT FOR ROLLING UPDATES (zero downtime):

The Deployment object manages one or more ReplicaSets and orchestrates the transition between versions:

1. You update the Deployment spec (e.g. new container image tag). kubectl apply -f deployment.yaml

2. Deployment creates a NEW ReplicaSet (v2) starting with 0 replicas. The old ReplicaSet (v1) continues running all 3 pods — full traffic continues.

3. Deployment scales v2 up by 1: creates 1 new pod (v2). The pod must pass readiness probe before joining the Service's load balancer pool. At this point: 3 v1 pods + 1 v2 pod — 4 total (maxSurge=1 allows this temporarily).

4. Once v2 pod is healthy and serving traffic: Deployment scales v1 down by 1. Now: 2 v1 + 1 v2 = 3 total. Traffic continues uninterrupted.

5. Steps 3–4 repeat until v2 has all 3 replicas and v1 has 0.

6. The old v1 ReplicaSet is kept at 0 replicas (not deleted) — this enables instant rollback.

CONFIGURATION PARAMETERS:
• maxUnavailable: max pods that can be unavailable during update (e.g. 1 means at least 2 always serving)
• maxSurge: max extra pods above desired count (e.g. 1 means up to 4 pods temporarily)

ROLLBACK:
kubectl rollout undo deployment/myapp → Deployment simply scales v1 back up and v2 back down using the same rolling mechanism. Fast and zero downtime.

KEY BENEFIT: At every point during the update, the Service continues routing to healthy pods (mix of old and new versions). Users experience no downtime.`,
  },
  // ─────────────────────────────────────────────────────────
  {
    id: "messaging-patterns-compare",
    topic: "Event-Driven Architecture",
    topicColor: GREEN,
    year: "2024-25 Main · Q4b",
    marks: 15,
    question: `Microservices in a distributed system often need to communicate with each other. Discuss ONE advantage, ONE disadvantage and ONE potential use case for each of the following messaging patterns: HTTP, message queue and event messaging.

Up to five marks available for each messaging pattern.`,
    markScheme: `• 3 patterns × 5 marks = 15: 1 advantage + 1 disadvantage + 1 use case, each clearly justified`,
    diagram: `HTTP (Synchronous):
┌─────────┐ ──request──▶ ┌─────────┐
│Service A│              │Service B│
│  waits  │ ◀──response─ │         │
└─────────┘              └─────────┘
A is BLOCKED until B responds

MESSAGE QUEUE (Async, point-to-point):
┌─────────┐  msg  ┌───────┐  msg  ┌─────────┐
│Service A│──────▶│ Queue │──────▶│Service B│
│continues│       └───────┘       │(when    │
└─────────┘  A not blocked         │ ready)  │
                                  └─────────┘

EVENT MESSAGING (Pub-Sub):
                         ┌───────────────▶│Service B│
┌─────────┐  event  ┌──────────┐          └─────────┘
│Service A│────────▶│  Topic   │──────────▶│Service C│
└─────────┘         └──────────┘           └─────────┘
                                ──────────▶│Service D│
                                           └─────────┘`,
    answer: `─── HTTP (Synchronous Request-Response) ───

ADVANTAGE — Simplicity and immediate feedback (justified):
HTTP is the simplest pattern — standard REST calls with immediate responses. The calling service knows instantly whether the request succeeded (200), failed (500), or was rejected (400). This is essential for operations where the caller needs the result to continue — e.g. checking if a user exists before creating an order. No additional infrastructure (broker) is needed, reducing operational complexity.

DISADVANTAGE — Tight coupling and reduced resilience (justified):
If Service B is down or slow, Service A is blocked and may time out. This creates a cascading failure — if the payment service is slow, the order service stops working too. The services are temporally coupled: both must be available simultaneously. In a distributed system with many services, this can make the overall system fragile.

USE CASE — User authentication (justified):
When a client logs in, the auth service must return a JWT immediately — the user is waiting. HTTP synchronous call is the right pattern here because: the result is needed instantly, the operation is simple (validate credentials, return token), and the service is expected to be highly available and fast.

─── MESSAGE QUEUE (Asynchronous, Point-to-Point) ───

ADVANTAGE — Resilience and decoupling (justified):
The message is stored in the queue even if the consumer is temporarily down. When the consumer recovers, it processes the queued messages — no data is lost and the producer was not blocked. This temporal decoupling means the producer and consumer don't need to be available simultaneously, dramatically improving resilience.

DISADVANTAGE — No immediate confirmation of processing (justified):
The producer receives acknowledgement that the message was accepted by the queue, not that it was successfully processed by the consumer. For business-critical operations (e.g. payment), you need additional mechanisms (e.g. reply queues, status polling, or events) to know if processing succeeded. This adds complexity compared to a synchronous HTTP call that returns success/failure directly.

USE CASE — Order fulfilment pipeline (justified):
Customer places order → Order Service puts a message in the "process-payment" queue → Payment Service processes it when available. If Payment Service is momentarily overloaded, orders queue up and are processed in order without loss. Only ONE payment service instance should process each order — queue ensures single delivery.

─── EVENT MESSAGING (Pub-Sub) ───

ADVANTAGE — Fan-out to multiple consumers without code changes (justified):
When an event is published to a topic, ALL subscribers receive it simultaneously. Adding a new subscriber (e.g. a new fraud-detection service) requires zero changes to the publisher. This open/closed principle means the system is highly extensible — new business capabilities can be added by subscribing to existing events.

DISADVANTAGE — Complexity of managing eventual consistency (justified):
Each subscriber maintains its own copy of the data from events. There is no guarantee all subscribers have processed the event at the same time — the system is eventually consistent. If a subscriber fails mid-processing, the event may be missed (unless durable topics/Kafka used). Debugging "why did service D not reflect the latest state" is harder than in a synchronous call where you can trace the failure immediately.

USE CASE — User registration notification (justified):
When a user registers, a "user_registered" event is published. Email service subscribes to send welcome email. Analytics service subscribes to track new user. Onboarding service subscribes to create their starter profile. All three happen simultaneously without the User Service knowing or caring about any of them — perfect fan-out use case.`,
  },
  // ─────────────────────────────────────────────────────────
  {
    id: "digital-cert",
    topic: "TLS / Security",
    topicColor: RED,
    year: "2023-24 Resit · Q5b / 2023-24 Main · Q5b",
    marks: 10,
    question: `Explain the structure and purpose of a digital certificate. Your answer should include:
• Three key components of the certificate
• The process involved to create one signed by a Certificate Authority
• An example of its use — what is it protecting and how does it enable that?`,
    markScheme: `• 3 components: 3 marks · CSR/CA process: 3 marks · Use example: 4 marks`,
    diagram: `CERTIFICATE CREATION:

YOU (server admin)                    CERTIFICATE AUTHORITY (e.g. Let's Encrypt)
     │                                           │
     │  1. Generate key pair locally             │
     │     private_key (KEEP SECRET)             │
     │     public_key                            │
     │                                           │
     │  2. Create CSR containing:                │
     │     - public_key                          │
     │     - domain: api.myshop.com              │
     │     - organisation details                │
     │──────────── POST /sign-csr ──────────────▶│
     │                                           │  3. CA verifies you own
     │                                           │     the domain (DNS check)
     │                                           │  4. CA signs: 
     │                                           │     sig = encrypt(hash(cert), CA_private_key)
     │◀────────── Signed Certificate ────────────│
     │  { domain, public_key, issuer,            │
     │    expiry, CA_digital_signature }         │
     │                                           │
     │  5. Deploy cert + private_key to server   │

HOW BROWSER USES IT:
Browser gets cert → extracts CA sig → decrypts with CA public key → 
gets original hash → hashes cert content → MATCH = cert genuine ✓
Browser now trusts the server's public key → TLS handshake proceeds`,
    answer: `WHAT IS A DIGITAL CERTIFICATE:
An X.509 digital certificate is a digital document that binds a public key to an identity (a domain name, organisation, or person). It is issued and signed by a trusted Certificate Authority (CA), allowing others to verify the identity without trusting the key-holder directly.

THREE KEY COMPONENTS:

1. Subject: Who the certificate belongs to — typically a domain name (e.g. api.myshop.com) and/or organisation details. This is what the browser checks against the URL being visited.

2. Public Key: The server's public key, embedded in the certificate. Once the browser trusts the certificate (via the CA signature), it can trust that this public key genuinely belongs to the stated domain — essential for secure key exchange.

3. CA Digital Signature: The Certificate Authority's digital signature over all certificate fields. Created by hashing the certificate content and encrypting that hash with the CA's private key. Anyone with the CA's public key (pre-installed in every browser/OS) can verify this signature — proving the certificate is genuine and unmodified.

CERTIFICATE CREATION PROCESS:

1. The server administrator generates an asymmetric key pair: a private key (kept secret on the server) and a public key.
2. A Certificate Signing Request (CSR) is created containing the public key and identity information (domain name, organisation).
3. The CSR is submitted to a CA (e.g. Let's Encrypt, DigiCert).
4. The CA verifies the requester actually controls the domain (e.g. via DNS challenge or HTTP file challenge).
5. The CA hashes the certificate content and encrypts the hash with its private key — creating the CA's digital signature.
6. The CA returns the signed certificate, which the admin deploys to the web server alongside the private key.

USE-CASE EXAMPLE — HTTPS for a web API:
api.myshop.com serves customer order data. Without a certificate, an attacker could intercept traffic and read order details (no encryption), or impersonate the server (serve a fake api.myshop.com and steal credentials).

The certificate protects by enabling TLS:
• Authenticity: when a browser connects to api.myshop.com, the server presents its certificate. The browser verifies the CA signature — confirming the server is genuinely api.myshop.com and not an impersonator.
• Key exchange: once the browser trusts the certificate, it trusts the server's public key and uses it to securely establish session keys via Diffie-Hellman.
• Encryption: session keys encrypt all data in transit — customer order data cannot be read by anyone intercepting the network traffic.`,
  },
  // ─────────────────────────────────────────────────────────
  {
    id: "terraform",
    topic: "Networking & IaC",
    topicColor: CYAN,
    year: "2024-25 Main · Q2",
    marks: 20,
    question: `a) What is the difference between imperative and declarative programming? Why is declarative programming favoured for infrastructure as code (IaC)?  (5 marks)

b–e) With reference to Terraform code, explain: null_resource, triggers/depends_on, file provisioner, and remote-exec provisioner.  (5 marks each)`,
    markScheme: `• Imperative vs declarative: 5 marks
• Each Terraform concept: 5 marks each — purpose + operation clearly explained`,
    diagram: `IMPERATIVE vs DECLARATIVE:

IMPERATIVE (shell script):
  Step 1: if VM doesn't exist, create it
  Step 2: if firewall rule doesn't exist, add it
  Step 3: if app not installed, install it
  Problem: what if Step 1 partially failed? Script may fail or duplicate

DECLARATIVE (Terraform):
  resource "vm" "webserver" { ... }
  resource "firewall_rule" "http" { ... }
  resource "null_resource" "deploy_app" { ... }
  → You describe WHAT you want
  → Terraform figures out HOW and in what order
  → Idempotent: safe to run again — only changes what's different

TERRAFORM NULL_RESOURCE + PROVISIONERS:
┌─────────────────────────────────────────────────────┐
│ resource "null_resource" "deploy_app" {             │
│   triggers = { script = filemd5("deploy.sh") }   ← re-runs if file changes
│                                                     │
│   depends_on = [azurerm_linux_virtual_machine.vm] ← waits for VM to exist
│                                                     │
│   provisioner "file" {                            ← copies file to VM
│     source      = "deploy.sh"                      │
│     destination = "/tmp/deploy.sh"                 │
│     connection { type = "ssh", host = vm.public_ip }│
│   }                                                 │
│                                                     │
│   provisioner "remote-exec" {                     ← runs commands on VM
│     inline = [                                      │
│       "chmod +x /tmp/deploy.sh",                   │
│       "/tmp/deploy.sh"                             │
│     ]                                               │
│   }                                                 │
│ }                                                   │
└─────────────────────────────────────────────────────┘`,
    answer: `PART A — IMPERATIVE vs DECLARATIVE (5 marks):

Imperative programming: you specify HOW to achieve the desired state, step by step. A shell script to provision a VM lists each command in sequence — create VM, open port, install app. The problem is idempotency: if the script is run again when some steps are already complete, it may fail (e.g. "VM already exists") or duplicate resources. The script must also handle all possible current states.

Declarative programming: you specify WHAT the desired end state looks like. You declare "I want a VM of type X with these properties." The tool (Terraform) compares the declared desired state against the current actual state and figures out what actions are needed. Running it again when nothing has changed makes no changes — it is idempotent.

Why declarative is favoured for IaC: infrastructure changes constantly and environments need to be created/destroyed frequently. Declarative IaC is version-controlled (desired state is in a file), reproducible (same file produces the same infrastructure every time), and safe to re-run (idempotent). It also enables drift detection — Terraform can identify when actual infrastructure no longer matches declared state.

PART B — null_resource (5 marks):
A null_resource is a Terraform resource that creates no actual cloud infrastructure — it has no physical representation. Its purpose is to act as an anchor for provisioners (scripts that run during deployment) that don't logically belong to a specific resource, or to run actions that can't be expressed as standard Terraform resources (e.g. copying files, running shell commands after a VM is created, executing database migrations). It is essentially a lifecycle hook within the Terraform workflow.

PART C — triggers and depends_on (5 marks):
depends_on: forces Terraform to create the null_resource only AFTER specified resources exist. For example, depends_on = [azurerm_linux_virtual_machine.vm] ensures the VM is fully provisioned before any provisioner attempts to SSH into it. Without this, Terraform might try to connect to a VM that doesn't exist yet.

triggers: a map of values that, when they change, force the null_resource to be re-created (re-running its provisioners). For example, triggers = { script_hash = filemd5("deploy.sh") } — if the deploy.sh file changes, the hash changes, Terraform detects the trigger changed, and re-runs the provisioners. Without triggers, null_resource only runs once (on initial creation) — triggers are what make it respond to updates.

PART D — file provisioner (5 marks):
The file provisioner copies files or directories from the local machine (where Terraform is running) to the remote VM via SSH (or WinRM for Windows). It requires a connection block specifying how to connect: host (VM's public IP), username, and authentication (SSH private key). Example use: copying a deployment script (deploy.sh) to /tmp/deploy.sh on the VM, so it can then be executed remotely. The file provisioner runs after the resource (or null_resource) is created. It only copies — it does not execute.

PART E — remote-exec provisioner (5 marks):
The remote-exec provisioner executes commands directly on the remote VM via SSH after connection is established. It can use inline (list of shell commands) or script (a local script file to upload and execute). Example use: chmod +x /tmp/deploy.sh then /tmp/deploy.sh — making the copied script executable and running it to install the application. It runs sequentially after the file provisioner. If any command fails (non-zero exit code), Terraform marks the resource as failed. This enables full automated application deployment as part of the terraform apply process — from infrastructure creation to application running — in a single declarative workflow.`,
  },
];

// ─── MARK SCHEME COLOUR ────────────────────────────────────────────────────
const topicColors = {
  "API Gateway (Kong)": ORANGE,
  "Cloud Computing": BLUE,
  "Event-Driven Architecture": GREEN,
  "Auth & Authorisation": PURPLE,
  "TLS / Security": RED,
  "Kubernetes & Docker": CYAN,
  "Databases & Scaling": ORANGE,
  "Networking & IaC": CYAN,
};

const allTopics = [...new Set(examBank.map((q) => q.topic))];

export default function App() {
  const [filter, setFilter] = useState("All");
  const [openQuestion, setOpenQuestion] = useState(null);
  const [showDiagram, setShowDiagram] = useState({});
  const [showAnswer, setShowAnswer] = useState({});
  const [attempted, setAttempted] = useState({});

  const filtered = filter === "All" ? examBank : examBank.filter((q) => q.topic === filter);

  const toggle = (id, type) => {
    if (type === "diagram") setShowDiagram((p) => ({ ...p, [id]: !p[id] }));
    if (type === "answer") setShowAnswer((p) => ({ ...p, [id]: !p[id] }));
    if (type === "attempted") setAttempted((p) => ({ ...p, [id]: !p[id] }));
  };

  return (
    
    <div style={{ minHeight: "100vh", background: "#0d1117", color: "#e6edf3", fontFamily: "'Georgia', serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #161b22, #1c2333)", borderBottom: "1px solid #30363d", padding: "28px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontSize: 11, color: "#8b949e", letterSpacing: 4, textTransform: "uppercase", marginBottom: 6 }}>UCLan · CO3404 · Exam Revision</div>
          <h1 style={{ margin: 0, fontSize: 30, color: "#f0f6fc", letterSpacing: -1 }}>Distributed Systems — Full Exam Q&A Guide</h1>
          <p style={{ margin: "8px 0 0", color: "#8b949e", fontSize: 14 }}>
            {examBank.length} past-paper questions · Full model answers · Diagrams · Mark schemes · 1.5 hrs · Answer 3 of 5 · 25 marks each
          </p>
        </div>
      </div>

      {/* Exam format banner */}
      <div style={{ background: "#1c2333", borderBottom: "1px solid #30363d", padding: "12px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[["⏱ Duration", "1.5 hours"], ["📝 Answer", "3 of 5 questions"], ["📊 Per question", "25 marks"], ["🎯 Rate", "~1 mark/min"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ color: "#8b949e", fontSize: 13 }}>{k}:</span>
              <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: 13 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 32px" }}>

        {/* Topic filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {["All", ...allTopics].map((t) => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: "7px 14px", borderRadius: 20,
              background: filter === t ? (topicColors[t] || AMBER) : "transparent",
              border: `1px solid ${filter === t ? (topicColors[t] || AMBER) : "#30363d"}`,
              color: filter === t ? "#000" : "#8b949e",
              cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit"
            }}>{t}</button>
          ))}
        </div>

        {/* Question Cards */}
        {filtered.map((q) => {
          const isOpen = openQuestion === q.id;
          const color = q.topicColor;
          const done = attempted[q.id];
          return (
            <div key={q.id} style={{
              marginBottom: 16, background: "#161b22",
              border: `1px solid ${isOpen ? color + "66" : "#30363d"}`,
              borderLeft: `4px solid ${color}`, borderRadius: 8, overflow: "hidden",
              opacity: done ? 0.7 : 1
            }}>
              {/* Card Header */}
              <div style={{ padding: "18px 20px", cursor: "pointer" }} onClick={() => setOpenQuestion(isOpen ? null : q.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ background: color + "22", color: color, padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>{q.topic}</span>
                      <span style={{ color: "#8b949e", fontSize: 12 }}>{q.year}</span>
                      <span style={{ background: "#30363d", color: "#e6edf3", padding: "2px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>{q.marks} marks</span>
                      {done && <span style={{ background: "#10b98122", color: "#10b981", padding: "2px 10px", borderRadius: 12, fontSize: 11 }}>✓ Attempted</span>}
                    </div>
                    <div style={{ fontSize: 15, color: "#f0f6fc", lineHeight: 1.6, whiteSpace: "pre-line" }}>{q.question}</div>
                  </div>
                  <span style={{ color: "#8b949e", fontSize: 18, flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Expanded Content */}
              {isOpen && (
                <div style={{ borderTop: "1px solid #30363d" }}>
                  {/* Mark scheme hint */}
                  <div style={{ padding: "12px 20px", background: "#0d1117", borderBottom: "1px solid #30363d" }}>
                    <span style={{ color: "#8b949e", fontSize: 12 }}>📊 MARK SCHEME GUIDE: </span>
                    <span style={{ color: "#e6edf3", fontSize: 12 }}>{q.markScheme}</span>
                  </div>

                  {/* Action buttons */}
                  <div style={{ padding: "16px 20px", display: "flex", gap: 10, flexWrap: "wrap", borderBottom: "1px solid #30363d" }}>
                    <button onClick={() => toggle(q.id, "diagram")} style={{
                      padding: "8px 16px", borderRadius: 6, border: `1px solid ${color}`,
                      background: showDiagram[q.id] ? color : "transparent",
                      color: showDiagram[q.id] ? "#000" : color, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit"
                    }}>
                      {showDiagram[q.id] ? "Hide Diagram" : "📐 Show Diagram"}
                    </button>
                    <button onClick={() => toggle(q.id, "answer")} style={{
                      padding: "8px 16px", borderRadius: 6, border: `1px solid ${GREEN}`,
                      background: showAnswer[q.id] ? GREEN : "transparent",
                      color: showAnswer[q.id] ? "#000" : GREEN, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit"
                    }}>
                      {showAnswer[q.id] ? "Hide Model Answer" : "📝 Show Model Answer"}
                    </button>
                    <button onClick={() => toggle(q.id, "attempted")} style={{
                      padding: "8px 16px", borderRadius: 6, border: "1px solid #30363d",
                      background: "transparent", color: "#8b949e", cursor: "pointer", fontSize: 13, fontFamily: "inherit", marginLeft: "auto"
                    }}>
                      {done ? "✓ Mark as not done" : "Mark as attempted"}
                    </button>
                  </div>

                  {/* Diagram */}
                  {showDiagram[q.id] && (
                    <div style={{ padding: "20px", background: "#0d1117", borderBottom: "1px solid #30363d" }}>
                      <div style={{ fontSize: 12, color: color, fontWeight: 700, marginBottom: 10 }}>📐 DIAGRAM</div>
                      <pre style={{
                        margin: 0, fontSize: 12, lineHeight: 1.6, color: "#e6edf3",
                        whiteSpace: "pre", overflowX: "auto", fontFamily: "'Courier New', monospace",
                        background: "#161b22", padding: "16px", borderRadius: 6, border: `1px solid ${color}33`
                      }}>{q.diagram}</pre>
                      <div style={{ fontSize: 11, color: "#8b949e", marginTop: 8 }}>
                        💡 In the exam: freehand is fine — label each component and reference labels in your answer
                      </div>
                    </div>
                  )}

                  {/* Model Answer */}
                  {showAnswer[q.id] && (
                    <div style={{ padding: "20px", background: "#0a0e15" }}>
                      <div style={{ fontSize: 12, color: GREEN, fontWeight: 700, marginBottom: 12 }}>📝 MODEL ANSWER</div>
                      <pre style={{
                        margin: 0, fontSize: 13, lineHeight: 1.8, color: "#e6edf3",
                        whiteSpace: "pre-wrap", fontFamily: "inherit"
                      }}>{q.answer}</pre>
                      <div style={{ marginTop: 16, padding: "12px 16px", background: "#161b22", borderRadius: 6, borderLeft: `3px solid ${AMBER}` }}>
                        <span style={{ color: AMBER, fontSize: 12 }}>✍️ EXAM TIP: </span>
                        <span style={{ color: "#8b949e", fontSize: 12 }}>
                          Don't copy this word-for-word — use it as a structure. In the exam, write in your own words, reference your diagram at each key point, and always justify every statement. ~1 mark per minute.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer tip */}
        <div style={{ marginTop: 32, padding: "20px", background: "#161b22", border: "1px solid #30363d", borderRadius: 8 }}>
          <div style={{ color: AMBER, fontWeight: 700, marginBottom: 8 }}>📌 Tutor's Revision Strategy (from your revision doc)</div>
          <div style={{ color: "#e6edf3", fontSize: 13, lineHeight: 1.8 }}>
            1. Read the notes for a topic<br/>
            2. Attempt the answer yourself (timed — ~1 mark per minute)<br/>
            3. Then reveal the model answer and compare<br/>
            4. Copy question + your answer into an AI, ask it to review against the mark scheme<br/>
            5. Apply learnings to the next question
          </div>
        </div>
      </div>
    
  {/* 3. ADD THE BUTTON HERE (Fixed to bottom right) */}
      <Link 
        to="/guide" 
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full shadow-2xl font-bold flex items-center gap-2 transition-all hover:scale-105 z-50"
      >
        <span>View Full Study Guide</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>

    </div>
);
}