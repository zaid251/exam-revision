import { useState } from "react";

const ANSWERS = [
  {
    id: "messaging-patterns",
    topic: "📨 Messaging",
    color: "#10b981",
    papers: ["2022-23 Main Q2b", "2024-25 Main Q4b", "2024-25 Resit Q3b+c"],
    question: "Compare message queue and pub-sub patterns. Discuss advantages, disadvantages, and use-cases for HTTP, message queue, and event messaging.",
    sections: [
      {
        heading: "1. HTTP (Synchronous Messaging)",
        content: `HTTP is a synchronous, point-to-point request-response protocol. Service A sends a request directly to Service B and waits (blocks) until it receives a response before continuing.

DIAGRAM:
  Service A ──[HTTP Request]──▶ Service B
            ◀──[HTTP Response]──

ADVANTAGE: Simple to implement and reason about. The calling service knows immediately whether the request succeeded or failed. Ideal for operations where you need the result before continuing — e.g. a payment service querying a fraud-check service before approving a transaction.

DISADVANTAGE: Tight coupling and availability dependency. If Service B is down or slow, Service A is also blocked and effectively down. This creates a fragile chain — one slow service can cascade failures across the whole system.

USE-CASE: A product search API. A user's browser sends an HTTP GET request to the product service and waits for the JSON response to render the page. The synchronous nature is required here — the user cannot see anything until the data arrives.`
      },
      {
        heading: "2. Message Queue (Asynchronous, Point-to-Point)",
        content: `A message queue decouples the producer (sender) from the consumer (receiver). The producer places a message on a queue and immediately continues — it does NOT wait. The consumer reads from the queue at its own pace. Each message is consumed by exactly ONE consumer, and deleted from the queue after acknowledgement.

DIAGRAM:
  Producer ──[message]──▶ [  Q U E U E  ] ──[message]──▶ Consumer A
                                              (Consumer B waits — no copy)

ADVANTAGE: Loose coupling and resilience. The producer and consumer are independent — if the consumer is temporarily offline, messages accumulate in the queue and are processed when it comes back up. No data is lost. E.g., an order service can place orders on a queue even if the warehouse service is down for maintenance.

DISADVANTAGE: Eventual consistency — the producer does not know when, or if, the message was successfully processed. This makes error handling more complex. You need dead-letter queues and retry logic for failed messages.

USE-CASE: An e-commerce order processing system. When a customer places an order, the order service publishes a message to a queue. The warehouse service consumes each message to pick and pack. The order service doesn't need to wait — it can immediately confirm to the customer. Point-to-point ensures each order is processed exactly once.`
      },
      {
        heading: "3. Pub-Sub / Event Messaging (Asynchronous, Fan-Out)",
        content: `In the publisher-subscriber (pub-sub) pattern, a publisher emits an event to a topic (or event bus), and ALL subscribed consumers receive their own copy of the event simultaneously. There is no direct relationship between the publisher and any subscriber.

DIAGRAM:
  Publisher ──[event]──▶ [  T O P I C  ] ──▶ Consumer A (own copy)
                                          ──▶ Consumer B (own copy)
                                          ──▶ Consumer C (own copy)

ADVANTAGE: Maximum decoupling and extensibility. The publisher has no knowledge of who is consuming the event. New consumers can subscribe without changing the publisher at all. For example, adding an analytics service to listen to order events requires zero changes to the order service.

DISADVANTAGE: Complexity in guaranteeing processing order and handling failures across multiple consumers. If Consumer B fails halfway through, Consumer A may have already completed its work — distributed rollback is very difficult. Also, high fan-out increases message broker load.

USE-CASE: A user registration event. When a new user signs up, the user service publishes a "UserRegistered" event. The email service subscribes to send a welcome email, the analytics service subscribes to update the user count dashboard, and the loyalty service subscribes to create a points account. All three react independently — neither the publisher nor any subscriber is coupled to the others.

KEY DIFFERENCE SUMMARY:
• Queue: ONE consumer per message. Use when a task must be done exactly once (order processing, payment).
• Pub-Sub: ALL subscribers get a copy. Use when multiple independent systems need to react to the same event (notifications, analytics, auditing).`
      }
    ]
  },
  {
    id: "cloud-benefits",
    topic: "☁️ Cloud",
    color: "#3b82f6",
    papers: ["2022-23 Main Q1b", "2023-24 Main Q2b", "2024-25 Resit Q4b"],
    question: "Provide five financial/operational/business drivers or benefits behind businesses moving their on-premises systems to the cloud.",
    sections: [
      {
        heading: "Five Business/Financial Drivers for Moving to Cloud",
        content: `1. CAPEX TO OPEX (Capital Expenditure → Operational Expenditure)
On-premises infrastructure requires large upfront capital investment — purchasing servers, networking equipment, storage, and a data centre facility. These are fixed costs regardless of whether the capacity is used. In the cloud, you pay only for what you consume on a monthly subscription or pay-per-use basis. This converts a large, unpredictable capital outlay into a predictable, manageable operational expense. This is particularly beneficial for start-ups and growing businesses who cannot afford large upfront hardware investment.

2. ELASTICITY AND SCALABILITY
On-premises servers must be provisioned for peak load — e.g. a retailer buying enough servers for Christmas traffic, which sit idle the other 11 months. Cloud auto-scaling groups can automatically provision additional compute instances when CPU load exceeds a threshold (e.g. 70%) and terminate them when demand drops. This means you only pay for capacity when you need it, directly reducing wasted expenditure and ensuring the system handles traffic spikes without manual intervention.

3. HIGH AVAILABILITY AND RESILIENCE
Cloud providers operate across multiple geographically separate Availability Zones (AZs) within a region. An AZ is a physically separate data centre with independent power, cooling and networking. Deploying across multiple AZs means that if one data centre suffers an outage (fire, flood, power failure), traffic automatically fails over to the remaining zones. Achieving equivalent redundancy on-premises would require owning and maintaining multiple physical sites — prohibitively expensive for most organisations.

4. REDUCED OPERATIONAL OVERHEAD (MANAGED SERVICES)
Managing on-premises infrastructure requires a dedicated team of system administrators to handle patching, hardware failures, OS upgrades, security updates, and backup management. Cloud providers offer managed services (PaaS and SaaS) where the provider takes responsibility for the underlying infrastructure, OS, middleware, and runtime. This allows an organisation's IT team to focus on delivering business value (application development) rather than maintaining infrastructure plumbing.

5. GLOBAL REACH AND SPEED OF DEPLOYMENT
Deploying on-premises in a new geography requires physical hardware procurement, data centre contracts, and months of setup time. A cloud provider has data centre regions on every continent, and a new environment can be provisioned in minutes using Infrastructure as Code (IaC) tools like Terraform. This dramatically reduces time-to-market for new products and enables organisations to serve customers closer to their geographic location, reducing latency.`
      }
    ]
  },
  {
    id: "iaas-paas",
    topic: "☁️ Cloud",
    color: "#3b82f6",
    papers: ["2022-23 Resit Q1b", "2023-24 Main Q2b", "2024-25 Resit Q2a"],
    question: "Explain the key differences between IaaS and PaaS cloud service offerings. When would you choose one over the other? Reference the shared responsibility model.",
    sections: [
      {
        heading: "IaaS vs PaaS — Shared Responsibility Model",
        content: `The Shared Responsibility Model defines which parts of the technology stack the cloud PROVIDER manages, and which parts the CUSTOMER manages.

SHARED RESPONSIBILITY TABLE:
              │ On-Premises │   IaaS    │   PaaS    │   SaaS   │
──────────────┼─────────────┼───────────┼───────────┼──────────┤
 Application  │  Customer   │ Customer  │ Customer  │ Provider │
 Data         │  Customer   │ Customer  │ Customer  │ Customer │
 Runtime      │  Customer   │ Customer  │ Provider  │ Provider │
 Middleware   │  Customer   │ Customer  │ Provider  │ Provider │
 OS           │  Customer   │ Customer  │ Provider  │ Provider │
 Virtualisation│ Customer   │ Provider  │ Provider  │ Provider │
 Servers      │  Customer   │ Provider  │ Provider  │ Provider │
 Networking   │  Customer   │ Provider  │ Provider  │ Provider │
 Data Centre  │  Customer   │ Provider  │ Provider  │ Provider │

IaaS (Infrastructure as a Service):
The cloud provider delivers virtualised compute (VMs), storage, and networking. The customer is responsible for everything above the hypervisor: the operating system, middleware, runtime, and application. The customer installs and manages the OS, applies patches, installs Node.js or Java runtimes, and deploys their application.

EXAMPLE: Azure Virtual Machines or AWS EC2. You provision a Linux VM, SSH into it, install Node.js, pull your code from GitHub, and run it yourself.

WHEN TO CHOOSE IaaS: When you need maximum control over the environment — e.g. you have a legacy application with specific OS configuration requirements, or you need to install custom software that a managed platform does not support.

PaaS (Platform as a Service):
The cloud provider manages the OS, runtime, middleware, and infrastructure. The customer only deploys their APPLICATION CODE and manages their DATA. The platform handles scaling, patching, load balancing, and availability automatically.

EXAMPLE: Azure App Service or AWS Elastic Beanstalk. You push your Node.js application code and the platform automatically deploys it, scales it, and keeps the runtime updated.

WHEN TO CHOOSE PaaS: When you want to focus on writing application code and let the provider handle infrastructure management. Ideal for web APIs, web applications, and microservices where you do not need custom OS configuration. Reduces operational burden significantly — no server patching or OS management.`
      }
    ]
  },
  {
    id: "tls-digital-cert",
    topic: "🔐 Security",
    color: "#ef4444",
    papers: ["2022-23 Main Q5a", "2023-24 Main Q5b", "2024-25 Main Q4a"],
    question: "Explain how a digital certificate protects a web user. Include what a certificate is, the CSR process, chain of trust, and how the browser validates it.",
    sections: [
      {
        heading: "1. What is a Digital Certificate?",
        content: `A digital certificate (X.509 standard) is a digitally signed document that binds a public key to an identity (domain name). It is issued and digitally signed by a trusted third party called a Certification Authority (CA) — e.g. DigiCert, Let's Encrypt, or GlobalSign.

THREE KEY COMPONENTS OF AN X.509 CERTIFICATE:
• Subject: The identity it belongs to — e.g. CN=www.mybank.com (the domain name being certified).
• Public Key: The server's public key, used by the client to encrypt the pre-master secret during the TLS handshake.
• CA's Digital Signature: The CA's cryptographic signature over the certificate content, proving the CA verified and vouches for the identity.`
      },
      {
        heading: "2. The CSR Process (How a Certificate is Created)",
        content: `Step 1 — Key Generation: The web server generates an asymmetric key pair: a private key (kept secret on the server, never leaves) and a public key.

Step 2 — Certificate Signing Request (CSR): The server creates a CSR file containing: the domain name (CN), organisation details, and the public key. The CSR is signed with the server's private key to prove the requester holds the corresponding private key.

Step 3 — CA Verification: The server operator submits the CSR to a CA. The CA verifies that the requester actually owns/controls the domain (e.g. by checking a DNS record or uploading a verification file to the web server).

Step 4 — CA Signs the Certificate: The CA creates the X.509 certificate from the CSR data and digitally signs it using the CA's own private key. The signed certificate is returned to the server operator for installation.`
      },
      {
        heading: "3. Chain of Trust — How the Browser Validates",
        content: `When a user visits https://www.mybank.com, the server presents its certificate. The browser must decide: "Can I trust this certificate?"

CHAIN OF TRUST:
  Root CA (self-signed, pre-installed in OS/browser)
      └── Intermediate CA (signed by Root CA)
              └── Server Certificate (signed by Intermediate CA)

Browsers ship with a built-in trust store containing ~100 pre-trusted Root CA certificates. The browser validates the chain from the server certificate up to a trusted root:

Step 1 — Get the CA's public key: The browser retrieves the Intermediate CA certificate (usually bundled with the server cert). It uses the Root CA's public key (from its trust store) to verify the Intermediate CA certificate.

Step 2 — Verify the server certificate's digital signature:
  a. The browser takes the content of the server certificate and hashes it (e.g. SHA-256) → produces hash A.
  b. The browser decrypts the CA's digital signature on the cert using the CA's PUBLIC KEY (asymmetric decryption) → produces hash B.
  c. If hash A == hash B → the certificate content has not been tampered with AND was signed by that CA. This is digital signature verification.

Step 3 — Additional Checks:
  • Is the certificate expired? (check validity period)
  • Does the domain name in the cert match the URL?
  • Has the certificate been revoked? (check CRL or OCSP)

If all checks pass, the browser shows the padlock 🔒. If any check fails, the browser shows a security warning and blocks access.

WHY THIS PROTECTS THE USER: An attacker cannot create a valid certificate for www.mybank.com because they cannot forge the CA's signature (they don't have the CA's private key). Even if an attacker intercepts the connection, the browser's validation ensures the user is communicating with the real server.`
      }
    ]
  },
  {
    id: "tls-handshake",
    topic: "🔐 Security",
    color: "#ef4444",
    papers: ["2022-23 Resit Q4", "2023-24 Resit Q4b"],
    question: "Explain the full TLS handshake process from TCP connection through to a fully encrypted session. Name every technique used and why it is used at each step.",
    sections: [
      {
        heading: "The Full TLS Handshake — All 9 Steps",
        content: `STEP 1 — TCP Connection (3-Way Handshake)
The browser establishes a TCP connection to the server on port 443. This is the underlying transport before TLS begins. No encryption yet.

STEP 2 — Client Hello
The client sends: TLS version (e.g. 1.3), list of supported cipher suites (e.g. AES-256 + SHA-256), and a client_random (a random 32-byte nonce).
→ PURPOSE: The client_random is used later as an input to key derivation. It ensures each session's keys are unique even if the same server and client communicate again.

STEP 3 — Server Hello
The server responds with: its chosen TLS version and cipher suite, and a server_random (another random nonce).
→ PURPOSE: The server_random, combined with client_random, ensures both sides contribute randomness so neither side alone can predict the session keys.

STEP 4 — Certificate
The server sends its X.509 digital certificate (and any intermediate CA certificates).
→ PURPOSE: The client must verify the server's identity before trusting it.

STEP 5 — Client Validates Certificate (DIGITAL SIGNATURE + ASYMMETRIC ENCRYPTION)
The browser performs the chain of trust validation:
  a. Hash the certificate content → hash A  [HASHING]
  b. Decrypt the CA's signature on the cert using the CA's public key → hash B  [ASYMMETRIC DECRYPTION]
  c. If hash A == hash B → certificate is genuine and unmodified  [DIGITAL SIGNATURE VERIFICATION]
  d. Check expiry, domain name, revocation status.
→ PURPOSE: Proves the server is who it claims to be. An attacker cannot forge this.

STEP 6 — Key Exchange (DIFFIE-HELLMAN KEY EXCHANGE)
Both sides use the Diffie-Hellman algorithm to independently derive the same pre_master_secret WITHOUT transmitting it over the network. Each side sends their DH public values to each other and performs the computation locally.
→ PURPOSE: The pre_master_secret is NEVER transmitted — it cannot be intercepted. This provides "perfect forward secrecy" — even if the server's private key is later compromised, past sessions cannot be decrypted.

STEP 7 — Session Key Derivation (SYMMETRIC + HMAC KEYS)
Both sides independently derive FOUR session keys from: pre_master_secret + client_random + server_random:

  client_write_key  → AES symmetric encryption of data sent from Client → Server  [SYMMETRIC]
  server_write_key  → AES symmetric encryption of data sent from Server → Client  [SYMMETRIC]
  client_write_MAC  → HMAC of messages from Client → Server (integrity check)  [HMAC]
  server_write_MAC  → HMAC of messages from Server → Client (integrity check)  [HMAC]

→ WHY SYMMETRIC FOR DATA: Symmetric encryption (AES) is orders of magnitude faster than asymmetric. Once both sides share the same key securely (via DH), symmetric is used for bulk data transfer performance.
→ WHY HMAC: Detects tampering. Each message is sent with an HMAC tag. If an attacker modifies even one byte of the ciphertext in transit, the HMAC will not match and the message is rejected.

STEP 8 — Client Finished
The client sends a "Finished" message: an HMAC over the entire handshake transcript (all messages from steps 2–7), encrypted with client_write_key.
→ PURPOSE: Proves to the server that the client derived the correct keys, and that the handshake itself was not tampered with by a man-in-the-middle.

STEP 9 — Server Finished
The server sends a "Finished" message: HMAC over the handshake transcript, encrypted with server_write_key.
→ PURPOSE: Same as step 8 but from the server's side. After both Finished messages are verified, the encrypted session is established.

RESULT: All subsequent HTTP data is encrypted with the session keys. The connection is:
• CONFIDENTIAL (AES encryption — cannot be read by third parties)
• AUTHENTICATED (digital certificate — server identity verified)
• INTEGRITY PROTECTED (HMAC — tampering detected)`
      }
    ]
  },
  {
    id: "digital-signature",
    topic: "🔐 Security",
    color: "#ef4444",
    papers: ["2024-25 Resit Q5b", "2023-24 Main Q2c"],
    question: "Bob sends a digitally signed contract to Alice. Explain how the digital signature provides authenticity, integrity, and non-repudiation.",
    sections: [
      {
        heading: "Digital Signatures — Authenticity, Integrity, Non-Repudiation",
        content: `BACKGROUND — ASYMMETRIC KEY PAIRS:
Bob has an asymmetric key pair: a PRIVATE KEY (secret, only Bob has it) and a PUBLIC KEY (shared with everyone, including Alice). The fundamental property is: anything encrypted/signed with the private key can only be verified with the corresponding public key, and vice versa.

HOW BOB SIGNS THE CONTRACT:
Step 1 — Bob hashes the contract document: Bob runs the contract through a hash function (e.g. SHA-256). This produces a fixed-length digest — e.g. "a3f7...". The hash is unique to the exact content of the document. [HASHING — ensures integrity]

Step 2 — Bob encrypts the hash with his PRIVATE KEY: This encrypted hash IS the digital signature. [ASYMMETRIC ENCRYPTION with private key]

Step 3 — Bob sends Alice: the original contract document + the digital signature.

HOW ALICE VERIFIES:
Step 1 — Alice hashes the received contract → produces hash A.

Step 2 — Alice decrypts the digital signature using Bob's PUBLIC KEY → produces hash B (the original hash Bob computed).

Step 3 — Alice compares hash A and hash B:
  • If equal → the signature is valid.

WHAT EACH PROPERTY PROVES:

AUTHENTICITY: Only Bob possesses Bob's private key. Therefore, only Bob could have produced a signature that decrypts correctly with Bob's public key. If the decryption works, Alice knows with certainty the document came from Bob — not from an impersonator.

INTEGRITY: Hash A (Alice's hash of the received document) must exactly match Hash B (Bob's original hash, extracted from the signature). Hash functions are deterministic — even changing one character in the contract produces a completely different hash. If a man-in-the-middle modified the contract in transit, hash A ≠ hash B, and Alice knows the document was tampered with.

NON-REPUDIATION: Bob CANNOT later deny signing the contract. The signature was produced using Bob's private key, which only he possesses. This is the legal equivalent of a handwritten signature — it is uniquely attributable to Bob. In a legal dispute, Alice can present the signed document and demonstrate that the signature verifies correctly with Bob's public key. Bob cannot claim someone else signed it because no one else has his private key.`
      }
    ]
  },
  {
    id: "api-gateway",
    topic: "🧩 API Gateway",
    color: "#f59e0b",
    papers: ["2022-23 Main Q1a", "2023-24 Main Q5a", "2024-25 Main Q5a"],
    question: "Explain the purpose and five key benefits/properties of an API gateway in a microservice architecture. Include a use-case and diagram.",
    sections: [
      {
        heading: "API Gateway — Purpose, Architecture, and 5 Key Benefits",
        content: `PURPOSE:
An API gateway is a single entry point that sits between external clients (browsers, mobile apps, third-party services) and the internal microservices of a distributed system. Rather than exposing every microservice directly, all external traffic is routed through the gateway, which enforces cross-cutting concerns centrally.

USE-CASE: An online retail platform with separate microservices for products, orders, users, and payments.

ARCHITECTURE DIAGRAM:
  Internet / Client
         │
         ▼
  [ A P I   G A T E W A Y ]   ← single entry point
    auth | rate-limit | SSL termination | routing | logging
         │          │          │          │
    /products   /orders    /users    /payments
         │          │          │          │
   [Product    [Order     [User      [Payment
    Service]    Service]   Service]   Service]

FIVE KEY BENEFITS:

1. AUTHENTICATION & AUTHORISATION (SECURITY)
Without a gateway, every microservice would need to independently validate JWT tokens or API keys — duplicating logic across all services. The gateway intercepts every request and validates the bearer token (e.g. JWT) before forwarding. If the token is invalid or expired, the request is rejected at the gateway — the microservices never see it. This centralises security policy and reduces the attack surface. Applied to our retail platform: a customer's login token is validated once at the gateway; the product, order, and payment services can trust that any request they receive is already authenticated.

2. RATE LIMITING (PROTECTION FROM ABUSE)
The gateway can track request rates per API key or IP address and enforce limits — e.g. 1000 requests/minute per customer. Excess requests are rejected with HTTP 429 Too Many Requests. This protects microservices from being overwhelmed by abusive clients or denial-of-service attacks. Without this, a badly behaved client could send thousands of requests per second directly to the order service, crashing it.

3. REQUEST ROUTING
The gateway maps external URL paths to the appropriate internal microservice. A client calls /api/products and the gateway routes to the Product Service internally. The client has no knowledge of internal service URLs, ports, or IP addresses. This means internal services can be refactored, renamed, or moved without affecting external clients — the gateway absorbs the change.

4. SSL TERMINATION (PERFORMANCE + SIMPLIFICATION)
HTTPS encryption/decryption (TLS) is computationally expensive. The gateway handles the SSL handshake with external clients and forwards traffic to internal services over HTTP on the private network (which is already secured at the network level). This offloads TLS processing from every individual microservice and simplifies their implementation.

5. CENTRALISED LOGGING AND MONITORING
Every request passes through the gateway, giving a single point to log all traffic: request timestamps, endpoints called, response times, status codes, and client identities. This makes debugging, auditing, and performance monitoring straightforward. Without a gateway, logs would be scattered across every microservice.`
      }
    ]
  },
  {
    id: "elastic-compute",
    topic: "☁️ Cloud",
    color: "#3b82f6",
    papers: ["2024-25 Resit Q2b+c", "2022-23 Main Q6a"],
    question: "Explain resilience in cloud systems, and explain elastic compute with a load balancer. Include a diagram.",
    sections: [
      {
        heading: "Resilience in Cloud Systems — 3 Examples",
        content: `DEFINITION: Resilience is the ability of a system to continue operating (or recover quickly) in the face of failures — hardware failures, software crashes, network outages, or traffic spikes.

EXAMPLE 1 — MULTI-AVAILABILITY ZONE DEPLOYMENT:
An Availability Zone (AZ) is a physically separate data centre within a cloud region, with independent power, cooling, and networking. Deploying resources across multiple AZs means that if one data centre suffers a complete failure (fire, power outage), the application continues running in the other AZs. Traffic is automatically rerouted. This provides resilience against data centre-level failures with no manual intervention.

EXAMPLE 2 — AUTO-SCALING GROUPS:
An auto-scaling group monitors metrics such as CPU utilisation. If average CPU exceeds 70%, it automatically provisions additional VM instances. If demand drops, it terminates excess instances. This provides resilience against traffic spikes — the system scales OUT to handle load rather than becoming overloaded and crashing. On-premises, a traffic spike beyond server capacity causes downtime; in the cloud, the system adapts automatically.

EXAMPLE 3 — MANAGED DATABASE WITH READ REPLICAS:
A primary database with read replicas distributes query load. If the primary fails, a replica can be promoted to primary (failover) with minimal downtime. Backups are automated and geo-redundant. This provides resilience for the data tier — one of the most critical and most difficult to recover manually.`
      },
      {
        heading: "Elastic Compute with Load Balancer",
        content: `ELASTIC COMPUTE means the system's compute capacity automatically expands and contracts in response to actual demand — like an elastic band — rather than being fixed.

DIAGRAM:
  Internet
     │
     ▼
  [ Load Balancer ]  ← health checks every 30s
     │       │       │
    VM1     VM2     VM3   ← auto-scaling group (min 1, max 10)
     │       │       │
     └───────┴───────┘
                │
          [ Database ]

HOW IT WORKS:

1. LOAD BALANCER: The load balancer receives all incoming requests and distributes them across available VM instances using a round-robin or least-connections algorithm. It continuously performs health checks on each VM (e.g. HTTP GET /health every 30 seconds). If a VM fails to respond, the load balancer automatically removes it from the pool and stops sending traffic to it. Remaining healthy VMs absorb the load. The client never knows a VM failed.

2. AUTO-SCALING (ELASTIC): The auto-scaling group is configured with scale-out and scale-in policies. For example: if average CPU > 70% for 5 minutes → add 2 VMs. If average CPU < 30% for 10 minutes → remove 1 VM. New VMs are automatically registered with the load balancer once healthy. 

3. COMBINED EFFECT: The system is both resilient (handles VM failures transparently) and elastic (handles traffic fluctuations automatically). A retailer facing 10x normal traffic on Black Friday needs no manual intervention — the system scales out automatically, serves all customers, then scales back down overnight to reduce cost.

BUSINESS BENEFIT: You only pay for the compute you actually use. No over-provisioning for peak loads that rarely occur.`
      }
    ]
  },
  {
    id: "monolith-microservice",
    topic: "🧩 Microservices",
    color: "#8b5cf6",
    papers: ["2022-23 Resit Q1a", "2024-25 Resit Q4c"],
    question: "Compare and contrast a monolithic architecture with a microservice-based distributed system. Provide advantages and disadvantages of each.",
    sections: [
      {
        heading: "Monolith vs Microservices — Full Comparison",
        content: `MONOLITHIC ARCHITECTURE:
All application functionality (user interface, business logic, data access) is packaged and deployed as a single, unified unit. One codebase, one deployment, one database.

MICROSERVICE ARCHITECTURE:
The application is decomposed into small, independently deployable services, each owning its own data, implementing a single bounded business domain (e.g. Orders, Products, Users), and communicating over APIs or messaging.

MONOLITH — ADVANTAGES:
1. SIMPLICITY OF DEVELOPMENT: One codebase is easier to develop, debug, and test for small teams or early-stage products. No network calls between components — everything is in-process and fast. The full application can be run locally on a developer's machine with a single command.

2. PERFORMANCE FOR INTERNAL CALLS: Function calls within a monolith are in-memory (nanoseconds). Microservices communicate over a network (milliseconds), introducing latency for every inter-service call.

MONOLITH — DISADVANTAGES:
1. SCALING LIMITATIONS: The entire application must be scaled as one unit. If only the product search feature is under heavy load, you must provision extra servers running ALL the application code — even the parts that are idle. You cannot scale individual components independently.

2. DEPLOYMENT RISK: Any change to any part of the codebase requires redeploying the entire application. A bug in an unrelated module can bring down the whole system. Release cycles become slow and risky.

MICROSERVICES — ADVANTAGES:
1. INDEPENDENT SCALABILITY: Each microservice can be scaled independently based on its own load. The product search service can have 10 instances while the user profile service has 1. This is far more cost-efficient and avoids bottlenecks.

2. INDEPENDENT DEPLOYMENT AND RESILIENCE: Each microservice is deployed independently. A bug in the reviews service can be fixed and redeployed without touching the orders service. A failure in one service does not necessarily bring down others — the circuit breaker pattern can isolate failures. Faster release cycles.

3. TECHNOLOGY FLEXIBILITY: Each team can choose the best language and database for their service. The orders service can use a relational database for ACID transactions while the product catalogue uses a document database for flexible schemas.

MICROSERVICES — DISADVANTAGES:
1. OPERATIONAL COMPLEXITY: Dozens of services require complex infrastructure for deployment, service discovery, load balancing, monitoring, and distributed tracing. A simple on-premises monolith becomes a Kubernetes cluster with an API gateway, message broker, and observability stack.

2. DISTRIBUTED TRANSACTIONS: Maintaining data consistency across service boundaries is fundamentally hard. You lose ACID transactions. A multi-step business process spanning three services (order, payment, warehouse) requires complex patterns like SAGA with compensating transactions to handle partial failures.`
      }
    ]
  },
  {
    id: "oidc-flow",
    topic: "🧩 Microservices",
    color: "#8b5cf6",
    papers: ["2023-24 Main Q6a", "2022-23 Main Q4a"],
    question: "Explain the OpenID Connect (OIDC) authorisation code flow. Draw a sequence diagram and explain each step up to the user seeing their personalised page.",
    sections: [
      {
        heading: "OIDC Authorisation Code Flow — Full Sequence",
        content: `CONTEXT: A user visits myapp.com, which requires authentication. The app uses Google as its Identity Provider (IdP) via OIDC. The user's credentials NEVER touch myapp.com — Google handles authentication.

SEQUENCE DIAGRAM:
  [Browser]          [My App Server]        [Google IdP]
      │                    │                     │
  1.  │─── Visit /profile ─▶│                     │
      │                    │                     │
  2.  │◀── Redirect to ────│                     │
      │    Google + client_id, scope, redirect_uri│
      │                    │                     │
  3.  │─────────────────── Login page ──────────▶│
      │◀────────────────── Enter credentials ────│
      │                    │                     │
  4.  │◀── Redirect back ──────────────────────── │
      │    with ?code=AUTH_CODE                   │
      │                    │                     │
  5.  │─── Send AUTH_CODE ─▶│                     │
      │                    │─── Exchange code ──▶│
      │                    │    + client_secret   │
      │                    │◀── id_token (JWT) ──│
      │                    │    access_token      │
  6.  │                    │ Decode JWT → name,   │
      │                    │ email, photo         │
  7.  │◀── Personalised ───│                     │
      │    page rendered   │                     │

EXPLANATION OF EACH STEP:

STEP 1 — User requests a protected resource: The user visits /profile. My App Server checks for a valid session — none exists.

STEP 2 — App redirects to Google (IdP): The server sends an HTTP 302 redirect to the browser. The URL points to Google's authorisation endpoint with parameters: client_id (identifies My App), redirect_uri (where Google should send the user back), scope=openid profile email (what info is being requested), and a state parameter (CSRF protection token).

STEP 3 — User authenticates at Google: The browser follows the redirect to Google. The user sees Google's login page and enters their Google credentials. The app NEVER sees these credentials — authentication is entirely handled by Google. Google may also enforce MFA here.

STEP 4 — Google redirects back with authorisation code: After successful authentication, Google redirects the browser back to the app's redirect_uri with a short-lived authorisation code as a URL query parameter. This code is single-use and expires in seconds.

STEP 5 — Server-side code exchange (BACK CHANNEL): The browser delivers the auth code to My App Server. Critically, the next step happens server-to-server (not via the browser): My App exchanges the auth code + client_secret for tokens by calling Google's token endpoint directly. The client_secret is never exposed to the browser. This back-channel exchange prevents token theft via browser history or referrer headers.

STEP 6 — Decode the ID Token (JWT): Google returns an id_token (a signed JWT) and an access_token. The id_token contains claims: the user's name, email address, profile photo URL, and a unique user ID (sub). The server decodes and verifies the JWT signature (using Google's public keys) to confirm it is genuine.

STEP 7 — Personalised page is rendered: My App creates a server-side session, stores the user's details, and returns the personalised page with the user's name, email, and photo. Subsequent requests use the session cookie — OIDC is not repeated until the session expires.

WHY OIDC IS BETTER THAN STORING PASSWORDS:
The app never handles or stores user passwords, eliminating the risk of credential theft from My App's database. All authentication risk is delegated to Google, which has enterprise-grade security. Users can also revoke access at any time from their Google account.`
      }
    ]
  },
  {
    id: "event-driven",
    topic: "📨 Messaging",
    color: "#10b981",
    papers: ["2022-23 Main Q2a", "2023-24 Main Q3c"],
    question: "Explain how event-driven architecture enables data sharing between microservices WITHOUT sharing a database. Include thick vs thin events.",
    sections: [
      {
        heading: "Event-Driven Data Sharing and Thick vs Thin Events",
        content: `THE PROBLEM — SHARED DATABASE ANTI-PATTERN:
If Service A and Service B share a database, they are tightly coupled. A schema change in the shared table breaks both services. Scaling the database is difficult when both services have different load characteristics. It also violates microservice principles — each service should own its data.

EVENT-DRIVEN SOLUTION — NO SHARED DATABASE:

DIAGRAM:
  [Order Service] ──publishes──▶ [Event Bus / Message Broker]
       │ (owns Orders DB)                    │
       │                         ┌───────────┴────────────┐
       │                    subscribes               subscribes
       │                         │                        │
  [Orders DB]           [Warehouse Service]    [Analytics Service]
                          (owns Warehouse DB)   (owns Analytics DB)
                                 │
                          updates local copy
                          of order data

HOW IT WORKS:
When a customer places an order, the Order Service saves the order to its own database and publishes an OrderPlaced event to the event bus. The Warehouse Service subscribes to OrderPlaced events and updates its own local copy of the data needed to fulfil the order (e.g. which products, which address). The Analytics Service subscribes to the same event and updates its own reporting database. Neither service shares a database — they each maintain a local copy of only the data they need, kept up to date by consuming events.

THICK EVENTS (Event Carried State Transfer — ECST):
A thick event contains ALL the data needed by consumers within the event payload itself. For example, an OrderPlaced event might contain: order ID, customer name, delivery address, list of items, quantities, and prices.

ADVANTAGE: Consumers are self-sufficient — they have everything they need without making additional API calls. Reduces inter-service coupling further. More resilient — the consumer can process the event even if the publishing service is temporarily down.

DISADVANTAGE: Events become large. If the payload changes frequently, consumers must handle schema evolution carefully. Sensitive data in event payloads may be a security concern.

THIN EVENTS (Event Notification):
A thin event contains only the minimum information needed to notify consumers that something happened — typically just an ID. For example: { "eventType": "OrderPlaced", "orderId": "12345" }. Consumers must then call back to the Order Service API to retrieve the full order details they need.

ADVANTAGE: Events are small and simple. Consumers only fetch the specific data they need. The authoritative data source remains the owning service.

DISADVANTAGE: Consumers must make additional synchronous API calls to get data. If the Order Service is down when the consumer processes the event, the consumer cannot retrieve the data and fails. Creates a runtime dependency.

WHEN TO CHOOSE THICK: Use when downstream consumers need significant amounts of data immediately and you want to maximise resilience and decoupling. Good for audit logs and analytics.

WHEN TO CHOOSE THIN: Use when events are purely notifications, the payload data is large or sensitive, or you want the consumer to always get fresh data from the source of truth.`
      }
    ]
  }
];

export default function ModelAnswers() {
  const [selected, setSelected] = useState(null);
  const [openSection, setOpenSection] = useState({});

  const current = ANSWERS.find(a => a.id === selected);

  const toggleSection = (idx) => {
    setOpenSection(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#f0f0f5",
      fontFamily: "'Georgia', 'Times New Roman', serif"
    }}>
      {/* HEADER */}
      <div style={{
        background: "linear-gradient(180deg, #111118 0%, #0a0a0f 100%)",
        borderBottom: "1px solid #1e1e2e",
        padding: "32px 24px 24px"
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: 6, color: "#555570", textTransform: "uppercase", marginBottom: 10 }}>CO3404 Distributed Systems</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#f0f0f5", letterSpacing: -0.5, lineHeight: 1.2 }}>
            Model Answers
          </h1>
          <p style={{ margin: "8px 0 0", color: "#666680", fontSize: 13, lineHeight: 1.6 }}>
            Full exam-grade answers for every repeating question — pulled from the actual past papers.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            {[["📨 Messaging", "#10b981"], ["☁️ Cloud", "#3b82f6"], ["🔐 Security", "#ef4444"], ["🧩 Microservices", "#8b5cf6"]].map(([t, c]) => (
              <div key={t} style={{
                padding: "3px 11px", borderRadius: 20,
                border: `1px solid ${c}44`,
                background: `${c}12`,
                color: c, fontSize: 11, fontWeight: 700
              }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
        {!selected ? (
          <>
            <p style={{ color: "#555570", fontSize: 13, marginBottom: 20 }}>Select a question to see the full model answer:</p>
            <div style={{ display: "grid", gap: 12 }}>
              {ANSWERS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => { setSelected(a.id); setOpenSection({}); }}
                  style={{
                    background: "#111118",
                    border: `1px solid #1e1e2e`,
                    borderLeft: `4px solid ${a.color}`,
                    borderRadius: 10,
                    padding: "16px 18px",
                    textAlign: "left",
                    cursor: "pointer",
                    color: "#f0f0f5",
                    fontFamily: "inherit",
                    transition: "all 0.15s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = a.color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e2e"}
                >
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                    <span style={{
                      background: `${a.color}18`, color: a.color,
                      padding: "2px 9px", borderRadius: 10, fontSize: 11, fontWeight: 700
                    }}>{a.topic}</span>
                    {a.papers.map(p => (
                      <span key={p} style={{
                        background: "#1e1e2e", color: "#888898",
                        padding: "2px 9px", borderRadius: 10, fontSize: 10
                      }}>{p}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 14, color: "#d0d0e0", lineHeight: 1.5, fontWeight: 600 }}>{a.question}</div>
                  <div style={{ marginTop: 8, color: "#555570", fontSize: 12 }}>
                    {a.sections.length} section{a.sections.length > 1 ? "s" : ""} · Click to read full answer →
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={() => setSelected(null)}
              style={{
                background: "none", border: "none", color: "#555570",
                cursor: "pointer", fontSize: 13, marginBottom: 20,
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "inherit", padding: 0
              }}
            >← Back to all questions</button>

            <div style={{
              background: "#111118",
              border: `1px solid ${current.color}33`,
              borderLeft: `5px solid ${current.color}`,
              borderRadius: 10, padding: "18px 20px", marginBottom: 24
            }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                <span style={{
                  background: `${current.color}18`, color: current.color,
                  padding: "3px 11px", borderRadius: 12, fontSize: 12, fontWeight: 700
                }}>{current.topic}</span>
                {current.papers.map(p => (
                  <span key={p} style={{
                    background: "#1e1e2e", color: "#888898",
                    padding: "3px 11px", borderRadius: 12, fontSize: 11
                  }}>{p}</span>
                ))}
              </div>
              <div style={{ fontSize: 15, color: "#d0d0e0", lineHeight: 1.6, fontWeight: 600 }}>{current.question}</div>
            </div>

            <div style={{
              background: "#0d0d14", border: "1px solid #1e1e2e",
              borderRadius: 8, padding: "12px 16px", marginBottom: 24,
              fontSize: 12, color: "#888898", lineHeight: 1.7
            }}>
              💡 <strong style={{ color: "#aaaacc" }}>Exam tip:</strong> For a 10-mark question spend ~10 minutes. For a 15-mark question spend ~15 minutes. Every statement needs justification — don't make claims without explaining WHY. Diagrams don't need to be perfect — label every box and arrow.
            </div>

            {current.sections.map((s, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <button
                  onClick={() => toggleSection(i)}
                  style={{
                    width: "100%", background: "#111118",
                    border: `1px solid ${openSection[i] ? current.color + "66" : "#1e1e2e"}`,
                    borderRadius: openSection[i] ? "8px 8px 0 0" : "8px",
                    padding: "14px 18px", textAlign: "left",
                    cursor: "pointer", color: "#f0f0f5",
                    fontFamily: "inherit",
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 14, color: openSection[i] ? current.color : "#d0d0e0" }}>
                    {s.heading}
                  </span>
                  <span style={{ color: "#555570", fontSize: 16 }}>{openSection[i] ? "▲" : "▼"}</span>
                </button>
                {openSection[i] && (
                  <div style={{
                    background: "#0d0d14",
                    border: `1px solid ${current.color}44`,
                    borderTop: "none",
                    borderRadius: "0 0 8px 8px",
                    padding: "20px 22px"
                  }}>
                    <pre style={{
                      margin: 0,
                      fontSize: 13,
                      lineHeight: 1.85,
                      color: "#c8c8dc",
                      whiteSpace: "pre-wrap",
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      wordBreak: "break-word"
                    }}>{s.content}</pre>
                  </div>
                )}
              </div>
            ))}

            <div style={{
              marginTop: 28, background: "#111118",
              border: `1px solid #1e1e2e`,
              borderRadius: 8, padding: "14px 18px"
            }}>
              <div style={{ color: "#555570", fontSize: 12, marginBottom: 8, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Also appears in</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {current.papers.map(p => (
                  <span key={p} style={{
                    background: `${current.color}15`, color: current.color,
                    padding: "4px 12px", borderRadius: 10, fontSize: 12, fontWeight: 600
                  }}>{p}</span>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setSelected(null); window.scrollTo(0,0); }}
              style={{
                marginTop: 20, background: "#1e1e2e", border: "none",
                borderRadius: 8, padding: "12px 22px",
                color: "#aaaacc", cursor: "pointer", fontSize: 13,
                fontFamily: "inherit", fontWeight: 600
              }}
            >← See all model answers</button>
          </div>
        )}
      </div>
    </div>
  );
}