import { useState } from "react";
import { Link } from "react-router-dom";

export default function Guide() {
  const [activeQ, setActiveQ] = useState("q1");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300&display=swap');

        :root {
          --bg: #0d0f14;
          --surface: #13161e;
          --surface2: #1a1f2e;
          --border: #252b3b;
          --accent: #4f9cf9;
          --accent2: #7c6af7;
          --accent3: #3ecf8e;
          --accent4: #f7c948;
          --accent5: #f96b4f;
          --text: #e8eaf0;
          --text-muted: #8892a4;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Source Serif 4', Georgia, serif;
          font-weight: 300;
          line-height: 1.8;
          font-size: 16px;
        }

        .hero {
          background: linear-gradient(135deg, #0d0f14 0%, #131a2e 50%, #0d0f14 100%);
          border-bottom: 1px solid var(--border);
          padding: 48px 32px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -60px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(79,156,249,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-badge {
          display: inline-block;
          background: rgba(79,156,249,0.1);
          border: 1px solid rgba(79,156,249,0.3);
          color: var(--accent);
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 20px;
          margin-bottom: 20px;
        }
        .hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -1px;
          margin-bottom: 12px;
        }
        .hero h1 span { color: var(--accent); }
        .hero p { color: var(--text-muted); font-size: 15px; max-width: 500px; margin: 0 auto 24px; }
        .hero-meta { display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; }
        .meta-item { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
        .meta-item strong { color: var(--accent3); margin-right: 6px; }

        .guide-nav {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 0 32px;
          display: flex;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .guide-nav::-webkit-scrollbar { display: none; }
        .nav-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 16px 14px;
          cursor: pointer;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .nav-btn:hover { color: var(--text); }
        .nav-btn.active { color: var(--accent); border-bottom-color: var(--accent); }

        .container { max-width: 900px; margin: 0 auto; padding: 0 24px 80px; }

        .q-section { display: none; animation: fadeIn 0.3s ease; }
        .q-section.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

        .q-header { padding: 48px 0 32px; border-bottom: 1px solid var(--border); margin-bottom: 40px; }
        .q-tag { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
        .q-header h2 { font-family: 'Syne', sans-serif; font-size: clamp(22px, 3vw, 32px); font-weight: 800; color: #fff; letter-spacing: -0.5px; margin-bottom: 8px; }
        .q-header p { color: var(--text-muted); font-size: 14px; }

        .part { margin-bottom: 48px; }
        .part-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px; padding: 20px 24px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; flex-wrap: wrap; }
        .part-letter { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; flex-shrink: 0; margin-top: 2px; }
        .part-header h3 { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #fff; line-height: 1.5; flex: 1; min-width: 200px; }
        .marks { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; flex-shrink: 0; margin-top: 2px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--text-muted); }

        .answer-box { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .answer-box-header { display: flex; align-items: center; gap: 10px; padding: 14px 20px; background: var(--surface2); border-bottom: 1px solid var(--border); }
        .answer-box-header span { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .answer-content { padding: 24px; }

        h4 { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #fff; margin: 24px 0 12px; letter-spacing: 0.3px; }
        h4:first-child { margin-top: 0; }

        p { margin-bottom: 14px; color: var(--text); }
        p:last-child { margin-bottom: 0; }

        ul, ol { padding-left: 20px; margin-bottom: 14px; }
        li { margin-bottom: 8px; color: var(--text); }
        li strong { color: #fff; }

        .diagram { background: #080a10; border: 1px solid var(--border); border-radius: 10px; padding: 24px; margin: 16px 0; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.6; color: #a8b4cc; overflow-x: auto; white-space: pre; }

        .callout { border-left: 3px solid; padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 16px 0; font-size: 14.5px; }
        .callout.tip { border-color: var(--accent3); background: rgba(62,207,142,0.06); }
        .callout.info { border-color: var(--accent); background: rgba(79,156,249,0.06); }
        .callout.warn { border-color: var(--accent4); background: rgba(247,201,72,0.06); }
        .callout .callout-label { font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; }
        .callout.tip .callout-label { color: var(--accent3); }
        .callout.info .callout-label { color: var(--accent); }
        .callout.warn .callout-label { color: var(--accent4); }

        .key-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; margin: 16px 0; }
        .key-card { background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
        .key-card-title { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 8px; }
        .key-card p { font-size: 13.5px; color: var(--text-muted); margin: 0; }

        table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
        th { background: var(--surface2); color: #fff; font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 12px 14px; text-align: left; border: 1px solid var(--border); }
        td { padding: 11px 14px; border: 1px solid var(--border); color: var(--text); vertical-align: top; }
        tr:nth-child(even) td { background: rgba(255,255,255,0.02); }

        .steps { margin: 16px 0; }
        .step { display: flex; gap: 16px; margin-bottom: 14px; align-items: flex-start; }
        .step-num { flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 800; margin-top: 2px; }
        .step-content { flex: 1; }
        .step-content strong { display: block; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .step-content p { font-size: 14px; color: var(--text-muted); margin: 0; }

        .q1 { --qc: var(--accent); }
        .q2 { --qc: var(--accent2); }
        .q3 { --qc: var(--accent3); }
        .q4 { --qc: var(--accent4); }
        .q5 { --qc: var(--accent5); }
        .q6 { --qc: #a78bfa; }

        .q-tag { color: var(--qc); }
        .part-letter { color: var(--qc); background: rgba(255,255,255,0.05); border: 1px solid var(--qc); }
        .dot { background: var(--qc); }
        .step-num { background: rgba(255,255,255,0.05); border: 2px solid var(--qc); color: var(--qc); }
        .key-card-title { color: var(--qc); }

        hr { border: none; border-top: 1px solid var(--border); margin: 28px 0; }

        code { background: var(--surface2); border: 1px solid var(--border); border-radius: 4px; padding: 2px 7px; font-family: 'Courier New', monospace; font-size: 13px; color: var(--accent3); }
        em { font-style: italic; color: var(--text-muted); }

        .back-bar { background: var(--surface); border-bottom: 1px solid var(--border); padding: 12px 32px; }
        .back-link { color: var(--accent); font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: opacity 0.2s; }
        .back-link:hover { opacity: 0.7; }
      `}} />

      {/* ── Back button ── */}
      <div className="back-bar">
        <Link to="/" className="back-link">← Back to Revision Cards</Link>
      </div>

      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-badge">Study Guide</div>
        <h1>CO3404 <span>Distributed Systems</span></h1>
        <p>Complete exam answers for all 6 questions — 2022–2023 paper</p>
        <div className="hero-meta">
          <div className="meta-item"><strong>6</strong> Questions</div>
          <div className="meta-item"><strong>25 marks</strong> each</div>
          <div className="meta-item"><strong>Answer 4</strong> of 6</div>
          <div className="meta-item"><strong>2 hrs</strong> allowed</div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="guide-nav">
        <button className={`nav-btn ${activeQ === "q1" ? "active" : ""}`} onClick={() => setActiveQ("q1")}>Q1 – API Gateway</button>
        <button className={`nav-btn ${activeQ === "q2" ? "active" : ""}`} onClick={() => setActiveQ("q2")}>Q2 – Event-Driven</button>
        <button className={`nav-btn ${activeQ === "q3" ? "active" : ""}`} onClick={() => setActiveQ("q3")}>Q3 – DB Scaling</button>
        <button className={`nav-btn ${activeQ === "q4" ? "active" : ""}`} onClick={() => setActiveQ("q4")}>Q4 – Security</button>
        <button className={`nav-btn ${activeQ === "q5" ? "active" : ""}`} onClick={() => setActiveQ("q5")}>Q5 – Certificates</button>
        <button className={`nav-btn ${activeQ === "q6" ? "active" : ""}`} onClick={() => setActiveQ("q6")}>Q6 – Cloud Arch</button>
      </nav>

      <div className="container">

        {/* ══ Q1 ══ */}
        <div className={`q-section q1 ${activeQ === "q1" ? "active" : ""}`}>
          <div className="q-header">
            <div className="q-tag">Question 1</div>
            <h2>API Gateways &amp; Cloud Migration</h2>
            <p>Topics: microservice architecture, API gateway, cloud drivers</p>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part A</span>
              <h3>Explain why you may recommend an API Gateway for a microservice architecture — problems it solves and benefits — with diagram and use-case.</h3>
              <span className="marks">15 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>What is an API Gateway?</h4>
                <p>An <strong>API Gateway</strong> is a single entry-point server that sits between clients and a collection of backend microservices. Instead of clients calling each microservice directly, every request passes through the gateway, which routes it to the correct service and returns the response.</p>
                <h4>Use-Case: Online Food Delivery App</h4>
                <p>Consider a food delivery app with separate microservices for: <em>User Service, Restaurant Service, Order Service, Payment Service, and Notification Service</em>. Without a gateway, the mobile app must know the address of every service — a maintenance nightmare. With a gateway, the app only knows one URL.</p>
                <h4>Diagram</h4>
                <div className="diagram">{`+------------------------------------------+
|           CLIENT (Mobile App)            |
+------------------+-----------------------+
                   | Single HTTPS endpoint
                   v
         +-----------+------------+
         |       API GATEWAY      |
         |  +--------------------+|
         |  | Auth / JWT         ||
         |  | Rate Limiting      ||
         |  | Load Balancing     ||
         |  | SSL Termination    ||
         |  | Request Router     ||
         |  +--------------------+|
         +--+----+----+----+------+
            |    |    |    |
            v    v    v    v
         [User][Orders][Payment][Restaurant]
         Service Service Service  Service`}</div>
                <h4>Five Key Advantages</h4>
                <div className="key-grid">
                  <div className="key-card">
                    <div className="key-card-title">1. Single Entry Point</div>
                    <p>Clients talk to one URL. The gateway routes internally. In our food app, the mobile client doesn't need to know 5 different service URLs — only one gateway address. Reduces client complexity dramatically.</p>
                  </div>
                  <div className="key-card">
                    <div className="key-card-title">2. Centralised Authentication</div>
                    <p>JWT or OAuth token validation happens once at the gateway, not duplicated in every service. In the food app, the gateway verifies the user's token before allowing access to Order or Payment services.</p>
                  </div>
                  <div className="key-card">
                    <div className="key-card-title">3. Rate Limiting &amp; Throttling</div>
                    <p>The gateway enforces limits (e.g. 100 requests/min per user), protecting backend services from overload or abuse. Prevents one customer from hammering the Order Service and degrading everyone else's experience.</p>
                  </div>
                  <div className="key-card">
                    <div className="key-card-title">4. SSL Termination</div>
                    <p>HTTPS is handled at the gateway. Internal service-to-service communication uses plain HTTP over a private network — saving CPU overhead on each microservice. The gateway acts as the secure front door.</p>
                  </div>
                  <div className="key-card">
                    <div className="key-card-title">5. Load Balancing &amp; Scalability</div>
                    <p>The gateway distributes traffic across multiple instances of a service (e.g. 3 replicas of Order Service during peak dinner hours) for high availability and scalability, without the client being aware.</p>
                  </div>
                </div>
                <div className="callout tip">
                  <div className="callout-label">Exam Tip</div>
                  Always link each advantage back to the use-case. E.g. "In our food delivery app, rate limiting prevents a single user from sending thousands of order requests and crashing the Order Service."
                </div>
              </div>
            </div>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part B</span>
              <h3>Five financial and/or operational drivers behind moving from on-premises monolithic platforms to distributed cloud solutions.</h3>
              <span className="marks">10 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>Driver 1 — Cost Reduction (CapEx to OpEx)</h4>
                <p>On-premises requires massive upfront capital expenditure (CapEx) — buying servers, networking equipment, and data centre space. The cloud converts this to operational expenditure (OpEx) — a monthly pay-as-you-go bill. Businesses free up capital for other investments rather than owning hardware that depreciates.</p>
                <h4>Driver 2 — Elastic Scalability</h4>
                <p>An on-premises monolith must be sized for peak traffic (e.g. Black Friday). For the other 364 days, that hardware sits idle — still costing money. In the cloud, resources scale up automatically during spikes and scale down afterwards. You only pay for what you use.</p>
                <h4>Driver 3 — Faster Time to Market</h4>
                <p>Monoliths are tightly coupled — changing one feature risks breaking others, requiring lengthy testing and deployment cycles. Microservices in the cloud allow individual services to be updated and deployed independently, enabling faster releases and competitive advantage.</p>
                <h4>Driver 4 — High Availability &amp; Disaster Recovery</h4>
                <p>Cloud providers offer built-in redundancy across multiple geographic regions. An on-premises monolith is a single point of failure — if the data centre floods or power fails, the entire business goes down. Cloud deployments achieve 99.9%+ uptime SLAs automatically, with disaster recovery that would cost millions to replicate on-premises.</p>
                <h4>Driver 5 — Reduced Operational Overhead</h4>
                <p>On-premises teams must manage hardware procurement, patching, cooling, physical security, and replacement cycles. The cloud provider handles all of this under a Shared Responsibility Model. IT staff can focus on building business value rather than maintaining infrastructure, reducing headcount costs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ Q2 ══ */}
        <div className={`q-section q2 ${activeQ === "q2" ? "active" : ""}`}>
          <div className="q-header">
            <div className="q-tag">Question 2</div>
            <h2>Event-Driven Architecture &amp; Messaging Patterns</h2>
            <p>Topics: event-driven data sharing, message queues, pub-sub</p>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part A</span>
              <h3>How can event-driven architecture share data between microservices without sharing a database?</h3>
              <span className="marks">10 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>The Problem: Shared Database Anti-Pattern</h4>
                <p>Ideally each microservice owns its own database. If services share a database, a schema change in one service can break others — defeating the purpose of independent services. However, sometimes services need the same data (e.g. an Order Service needs the User's address from the User Service).</p>
                <h4>Solution: Event-Driven Architecture (EDA)</h4>
                <p>In EDA, when a service changes its data, it <strong>publishes an event</strong> to a message broker (e.g. Apache Kafka, RabbitMQ). Other services that need that data <strong>subscribe</strong> to those events and maintain their own local copy. This is called <strong>eventual consistency</strong>.</p>
                <h4>Diagram</h4>
                <div className="diagram">{`+--------------+  "UserUpdated"  +-----------------+
|  User Service | ---- event ---> | Message Broker  |
|  (DB: Users)  |                 |   (e.g. Kafka)  |
+--------------+                 +--------+--------+
                                          | subscribes
                                 +--------v--------+
                                 |  Order Service  |
                                 | (local copy of  |
                                 |  user address)  |
                                 +-----------------+`}</div>
                <h4>How the Data Flow Works</h4>
                <div className="steps">
                  <div className="step"><div className="step-num">1</div><div className="step-content"><strong>User updates their delivery address</strong><p>The User Service updates its own database and publishes a "UserAddressUpdated" event to the broker containing the userId and new address.</p></div></div>
                  <div className="step"><div className="step-num">2</div><div className="step-content"><strong>Message Broker receives and stores the event</strong><p>Kafka/RabbitMQ holds the event. The Order Service doesn't have to be online right now — this decouples producer from consumer.</p></div></div>
                  <div className="step"><div className="step-num">3</div><div className="step-content"><strong>Order Service consumes the event</strong><p>The Order Service reads the event and updates its own local copy of the user's address in its own separate database.</p></div></div>
                  <div className="step"><div className="step-num">4</div><div className="step-content"><strong>Eventual Consistency achieved</strong><p>Both services have the correct data in their own databases. Neither shares a schema. They remain independently deployable.</p></div></div>
                </div>
                <div className="callout info">
                  <div className="callout-label">Key Terms to Use in Exam</div>
                  Loose coupling · Asynchronous communication · Eventual consistency · Event sourcing · Message broker · Producer · Consumer
                </div>
              </div>
            </div>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part B</span>
              <h3>Compare the Shared Message Queue pattern vs. Publisher-Subscriber pattern with diagrams and microservice use-cases.</h3>
              <span className="marks">15 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>Pattern 1: Shared Message Queue (Point-to-Point)</h4>
                <div className="diagram">{`+--------------+  +-------------+  +---------------+
|    Order     |->|    Queue    |->|    Payment    |
|   Service    |  | (RabbitMQ)  |  |    Service    |
| (Producer)   |  +-------------+  |  (Consumer)   |
+--------------+                   +---------------+
              Only ONE consumer gets each message`}</div>
                <ul>
                  <li><strong>How it works:</strong> A producer puts a message in a queue. ONE consumer picks it up. Once consumed, the message is removed.</li>
                  <li><strong>Guarantee:</strong> Each message is processed exactly once.</li>
                  <li><strong>Use-case:</strong> Order Service sends "ProcessPayment" to Payment Service. We only want the payment processed once — not by multiple competing services.</li>
                  <li><strong>Why it fits:</strong> Financial transactions, job processing, email sending — any task that must happen exactly once.</li>
                </ul>
                <hr />
                <h4>Pattern 2: Publisher-Subscriber (Pub-Sub)</h4>
                <div className="diagram">{`                              +--> Email Service
+-----------+  event  +------+    +--> Inventory Service
|   Order   |-------->| Topic|----+
|  Service  |         +------+    +--> Analytics Service
|(Publisher)|
+-----------+
        ALL subscribers receive a copy of the event`}</div>
                <ul>
                  <li><strong>How it works:</strong> A publisher sends an event to a "topic". ALL subscribers receive their own copy simultaneously.</li>
                  <li><strong>Guarantee:</strong> Every subscriber receives every event independently.</li>
                  <li><strong>Use-case:</strong> Order Service publishes "OrderPlaced". Email Service sends confirmation, Inventory Service decrements stock, Analytics logs it — all from one event.</li>
                  <li><strong>Why it fits:</strong> Fan-out scenarios where multiple independent services react to the same event. Adding a new subscriber requires no changes to the publisher.</li>
                </ul>
                <h4>Comparison Table</h4>
                <table>
                  <tbody>
                    <tr><th>Aspect</th><th>Message Queue</th><th>Pub-Sub</th></tr>
                    <tr><td>Consumers</td><td>One consumer per message</td><td>All subscribers get a copy</td></tr>
                    <tr><td>Coupling</td><td>Producer knows consumer exists</td><td>Fully decoupled</td></tr>
                    <tr><td>Best for</td><td>Tasks, jobs, transactions</td><td>Notifications, fan-out events</td></tr>
                    <tr><td>Scaling</td><td>Competing consumers share load</td><td>Each subscriber scales independently</td></tr>
                    <tr><td>Example tool</td><td>RabbitMQ queue</td><td>Kafka topic / AWS SNS</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ══ Q3 ══ */}
        <div className={`q-section q3 ${activeQ === "q3" ? "active" : ""}`}>
          <div className="q-header">
            <div className="q-tag">Question 3</div>
            <h2>Database Scaling</h2>
            <p>Topics: relational scaling challenges, NoSQL sharding, consistent hashing</p>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part A</span>
              <h3>What challenges arise when scaling a relational database like MySQL? Provide one example of how to deal with them.</h3>
              <span className="marks">10 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>Challenge 1 — Vertical Scaling Has a Ceiling</h4>
                <p>The first instinct is to add more RAM and CPU to the single database server (vertical/scale-up). This works initially but has a hard physical and financial limit. Eventually, no single machine is powerful enough, and the cost becomes prohibitive.</p>
                <h4>Challenge 2 — ACID Transactions are Hard to Distribute</h4>
                <p>Relational databases guarantee ACID properties (Atomicity, Consistency, Isolation, Durability). When you split data across multiple servers, maintaining ACID — especially distributed transactions and complex JOIN queries across servers — becomes extremely difficult and slow.</p>
                <h4>Challenge 3 — Locking and Contention</h4>
                <p>Under high write loads, MySQL uses row/table locking to maintain consistency. Many concurrent write transactions block each other, causing queuing and latency spikes. This is a single-server bottleneck that horizontal scaling can't easily solve for relational databases.</p>
                <h4>Challenge 4 — Schema Changes are Painful</h4>
                <p>Adding a column to a table with 100 million rows in MySQL requires an ALTER TABLE operation that can lock the table and take hours — causing downtime. This is a fundamental operational challenge as data volume grows.</p>
                <h4>Solution: Read Replicas (Primary-Replica Pattern)</h4>
                <p>One practical horizontal scaling approach is <strong>read replicas</strong>: all writes go to the Primary (master) node, which replicates changes to one or more Replica (slave) nodes. Read queries are distributed across replicas.</p>
                <div className="diagram">{`             Application
                   |
       +-----------+------------------+
       |                              |
       v (Writes)              v (Reads — distributed)
  +----------+          +------------+  +------------+
  | Primary  |--------> | Replica 1  |  | Replica 2  |
  | (MySQL)  |          |  (MySQL)   |  |  (MySQL)   |
  +----------+          +------------+  +------------+`}</div>
                <p>This is suitable when the workload is <strong>read-heavy</strong> (e.g. e-commerce product browsing). It does not help with write scalability, but it's a practical, widely-used strategy that MySQL natively supports via binary log replication.</p>
              </div>
            </div>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part B</span>
              <h3>Explain how sharding and consistent hashing support database distribution and resilience in NoSQL (e.g. MongoDB).</h3>
              <span className="marks">15 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>What is Sharding?</h4>
                <p><strong>Sharding</strong> is the process of horizontally partitioning data across multiple database nodes (shards), where each shard holds a subset of the total data. This allows parallel read/write operations and effectively multiplies throughput.</p>
                <h4>The Challenge: Naive Sharding Creates Hotspots</h4>
                <p>A naive approach — like range-based sharding (users A–M on Shard 1, N–Z on Shard 2) — creates <strong>hotspots</strong>. If most users' names start with A–M, one shard gets hammered while the other sits idle. Also, adding a new shard requires <strong>re-mapping huge amounts of data</strong> — very expensive and disruptive.</p>
                <h4>Consistent Hashing — The Solution</h4>
                <p><strong>Consistent hashing</strong> maps both data keys and nodes onto a virtual ring using the same hash function. Each key is assigned to the first node it encounters when moving clockwise around the ring.</p>
                <div className="diagram">{`      Hash Ring (0 to 360 degrees)
             [Node A]
            /         \
  key "user:5"     key "user:1"
          /               \
     [Node C]           [Node B]
          \               /
  key "user:9"     key "user:3"
            \         /
             [Node D]
  Each key belongs to the nearest clockwise node.`}</div>
                <h4>Adding a New Node</h4>
                <p>When a new node is added to the ring, only the keys between the new node and its predecessor need to move. With consistent hashing, typically only <strong>1/n of the keys move</strong>. Minimal disruption to the cluster.</p>
                <h4>Removing a Node — Resilience</h4>
                <p>If a node fails or is removed, only its keys are redistributed to the next clockwise node. The rest of the ring is unaffected. The system continues operating — no complete re-sharding needed.</p>
                <h4>Data Replication within Each Shard</h4>
                <p>In MongoDB, each shard is a <strong>Replica Set</strong> — a primary node plus 2+ secondary nodes. If the primary fails, an automatic election promotes a secondary to primary. The combination of sharding (scalability) + replica sets (resilience) is MongoDB's core architecture.</p>
                <div className="callout tip">
                  <div className="callout-label">Key Points for Full Marks</div>
                  Sharding definition → challenge of naive sharding (hotspots) → consistent hashing ring → minimal data movement when adding nodes → resilience when removing nodes → replication (replica sets) within each shard.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ Q4 ══ */}
        <div className={`q-section q4 ${activeQ === "q4" ? "active" : ""}`}>
          <div className="q-header">
            <div className="q-tag">Question 4</div>
            <h2>Security — OpenID Connect &amp; CORS</h2>
            <p>Topics: SSO, Authentication Code flow, CORS in Node.js</p>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part A</span>
              <h3>Explain Web Single Sign-On using OpenID Connect "Authentication Code" grant type, with a step-by-step diagram.</h3>
              <span className="marks">15 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>What is Single Sign-On (SSO)?</h4>
                <p>SSO allows a user to authenticate once with a trusted Identity Provider (IdP) and then access multiple applications without logging in again. <strong>OpenID Connect (OIDC)</strong> is a modern identity layer built on top of OAuth 2.0 that enables SSO.</p>
                <h4>Key Actors</h4>
                <ul>
                  <li><strong>User / Resource Owner</strong> – the person logging in</li>
                  <li><strong>Client (Relying Party)</strong> – your web application</li>
                  <li><strong>Authorization Server / Identity Provider (IdP)</strong> – e.g. Google, Auth0, Azure AD</li>
                  <li><strong>Resource Server</strong> – the API being accessed</li>
                </ul>
                <h4>Authentication Code Flow — Diagram</h4>
                <div className="diagram">{`User    Client App    Authorization Server    Resource Server
 |           |                  |                      |
 |--Click-->>|                  |                      |
 |           |--(1) Auth Req--->|                      |
 |           |  client_id,      |                      |
 |           |  redirect_uri,   |                      |
 |           |  scope=openid    |                      |
 |           |<-(2) Login Page--|                      |
 |--creds--->|----------------->|                      |
 |           |<-(4) Auth Code---|                      |
 |           |--(5) Token Req-->|                      |
 |           |  code+secret     |                      |
 |           |<-(6) ID Token----|                      |
 |           |     Access Token |                      |
 |           |-----(7) Bearer Token----------------->  |
 |           |<-----------Protected Resource------------|`}</div>
                <div className="steps">
                  <div className="step"><div className="step-num">1</div><div className="step-content"><strong>Client sends Authorization Request</strong><p>The client redirects the browser to the IdP's authorization endpoint with: <code>client_id</code>, <code>redirect_uri</code>, <code>response_type=code</code>, <code>scope=openid profile email</code>, and a <code>state</code> value (CSRF protection).</p></div></div>
                  <div className="step"><div className="step-num">2</div><div className="step-content"><strong>IdP presents Login Page</strong><p>The authorization server shows the user a login form (or consent screen if already logged in).</p></div></div>
                  <div className="step"><div className="step-num">3</div><div className="step-content"><strong>User authenticates with IdP</strong><p>User enters username and password. The IdP verifies credentials against its own user store.</p></div></div>
                  <div className="step"><div className="step-num">4</div><div className="step-content"><strong>IdP redirects back with Authorization Code</strong><p>The IdP redirects to the client's <code>redirect_uri</code> with a short-lived, single-use <code>authorization_code</code> and the original <code>state</code> value (client verifies state to prevent CSRF attacks).</p></div></div>
                  <div className="step"><div className="step-num">5–6</div><div className="step-content"><strong>Client exchanges Code for Tokens (server-to-server)</strong><p>The client's <em>backend</em> makes a POST request to the IdP's token endpoint with the authorization code and the <code>client_secret</code>. This happens server-side — the secret is never exposed to the browser.</p></div></div>
                  <div className="step"><div className="step-num">7</div><div className="step-content"><strong>IdP returns Access Token + ID Token</strong><p>The <strong>ID Token</strong> (a JWT) contains the user's identity claims (name, email, subject ID). The <strong>Access Token</strong> is used to call protected APIs on behalf of the user.</p></div></div>
                  <div className="step"><div className="step-num">8–9</div><div className="step-content"><strong>Client accesses Resource Server</strong><p>The client sends the Access Token in the <code>Authorization: Bearer &lt;token&gt;</code> header. The resource server validates the token and returns the protected data.</p></div></div>
                </div>
                <div className="callout info">
                  <div className="callout-label">Why Authorization Code over Implicit Flow?</div>
                  The Authorization Code flow is more secure because tokens are returned via a back-channel (server-to-server POST), not via the browser URL. This keeps tokens out of browser history and prevents interception.
                </div>
              </div>
            </div>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part B</span>
              <h3>Explain CORS — what it is, why we need it, how browsers detect it, and how Node.js server code handles and limits it.</h3>
              <span className="marks">10 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>What is CORS and Why Do We Need It?</h4>
                <p>Browsers enforce the <strong>Same-Origin Policy (SOP)</strong> — a JavaScript script on <code>https://myapp.com</code> is blocked from making AJAX requests to <code>https://api.myapp.com</code> (different subdomain = different origin). This prevents malicious websites from making authenticated requests to other sites on behalf of users.</p>
                <p><strong>CORS (Cross-Origin Resource Sharing)</strong> is a mechanism that allows a server to explicitly tell the browser: "I permit cross-origin requests from these origins." Without it, modern single-page applications calling a separate API server would be completely blocked.</p>
                <h4>How Does a Browser Determine if CORS is Allowed?</h4>
                <div className="diagram">{`Browser --> OPTIONS /api/data --> Server
  Origin: https://myapp.com
  Access-Control-Request-Method: DELETE

Server --> Response --> Browser
  Access-Control-Allow-Origin: https://myapp.com
  Access-Control-Allow-Methods: GET, POST, DELETE
  Access-Control-Allow-Headers: Content-Type
  Access-Control-Max-Age: 86400

Browser: "OK. Now I'll send the actual DELETE request."`}</div>
                <h4>How Node.js Allows CORS</h4>
                <div className="diagram">{`const express = require('express');
const cors = require('cors');
const app = express();

// Allow ALL origins (dev only):
app.use(cors());

// Allow specific origins (production):
app.use(cors({
  origin: 'https://myapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));`}</div>
                <h4>How to Limit Which Resources are Shareable</h4>
                <div className="diagram">{`// Public endpoint — open to all origins
app.get('/public-data', cors(), (req, res) => { ... });

// Sensitive endpoint — locked to trusted origin only
app.delete('/admin/users/:id',
  cors({ origin: 'https://admin.myapp.com' }),
  (req, res) => { ... }
);`}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ Q5 ══ */}
        <div className={`q-section q5 ${activeQ === "q5" ? "active" : ""}`}>
          <div className="q-header">
            <div className="q-tag">Question 5</div>
            <h2>Digital Certificates &amp; Cloud Shared Responsibility</h2>
            <p>Topics: PKI, x.509, digital signatures, cloud service models</p>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part A</span>
              <h3>Explain creating and deploying a digital certificate and how a client verifies the server. Cover: CSR, chain of trust, x.509 properties, digital signature.</h3>
              <span className="marks">15 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>Step 1 — Generate a Key Pair</h4>
                <p>The server owner generates a <strong>public/private key pair</strong> using RSA or ECDSA. The <strong>private key</strong> is kept secret on the server. The <strong>public key</strong> is shared with the world via the certificate.</p>
                <h4>Step 2 — Create a Certificate Signing Request (CSR)</h4>
                <div className="diagram">{`CSR Contains:
|- Common Name (CN): www.mybank.com
|- Organisation:     MyBank Ltd
|- Country:          GB
|- Public Key:       [server's public key data]
|- Signature:        [signed with server's private key]`}</div>
                <h4>Step 3 — CA Validates and Signs the Certificate</h4>
                <p>The Certificate Authority (e.g. DigiCert, Let's Encrypt) verifies the applicant owns the domain (via DNS or HTTP challenge). Once verified, the CA digitally signs the certificate with its own private key, producing an x.509 certificate.</p>
                <h4>x.509 Certificate — Key Properties</h4>
                <ul>
                  <li><strong>Subject</strong> – the entity the certificate belongs to (e.g. www.mybank.com)</li>
                  <li><strong>Issuer</strong> – the CA that signed it (e.g. DigiCert Global Root)</li>
                  <li><strong>Public Key</strong> – the server's public key</li>
                  <li><strong>Serial Number</strong> – unique identifier for this certificate (used for revocation)</li>
                  <li><strong>Valid From / Valid To</strong> – validity period (e.g. 1 year)</li>
                  <li><strong>Signature Algorithm</strong> – e.g. SHA-256 with RSA</li>
                  <li><strong>Digital Signature</strong> – the CA's signature over all the above fields</li>
                </ul>
                <h4>Digital Signature — How It Works</h4>
                <div className="diagram">{`CA SIGNS the certificate:
1. CA takes all the certificate data
2. CA generates a hash: SHA-256(cert_data) = hash
3. CA encrypts the hash with its PRIVATE KEY --> Digital Signature

BROWSER VERIFIES:
1. Browser decrypts the signature using CA's PUBLIC KEY --> hash_from_sig
2. Browser independently hashes the cert data --> hash_computed
3. If hash_from_sig == hash_computed --> signature is VALID
4. Only the CA's private key could have produced this (non-repudiation)`}</div>
                <h4>Chain of Trust</h4>
                <div className="diagram">{`Root CA (pre-trusted by browser/OS)
  |
  +-- Intermediate CA (signed by Root CA)
        |
        +-- Server Certificate (signed by Intermediate CA)
                ^ What the server sends during TLS handshake`}</div>
                <h4>How a Browser Verifies the Server</h4>
                <div className="steps">
                  <div className="step"><div className="step-num">1</div><div className="step-content"><strong>Server sends its certificate chain during TLS handshake</strong><p>The server sends its certificate plus any intermediate CA certificates.</p></div></div>
                  <div className="step"><div className="step-num">2</div><div className="step-content"><strong>Browser verifies the signature chain</strong><p>Verifies each certificate's digital signature using the parent CA's public key, walking up to a trusted root.</p></div></div>
                  <div className="step"><div className="step-num">3</div><div className="step-content"><strong>Browser checks validity period</strong><p>Confirms the certificate has not expired (Valid To date is in the future).</p></div></div>
                  <div className="step"><div className="step-num">4</div><div className="step-content"><strong>Browser checks revocation (OCSP/CRL)</strong><p>Queries whether the certificate has been revoked by the CA before its expiry date.</p></div></div>
                  <div className="step"><div className="step-num">5</div><div className="step-content"><strong>Browser checks hostname matches</strong><p>Confirms the domain in the URL matches the Subject or Subject Alternative Names (SANs) in the certificate.</p></div></div>
                </div>
              </div>
            </div>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part B</span>
              <h3>What is "Shared Responsibility" in cloud computing? Explain each service model — who is responsible for what.</h3>
              <span className="marks">10 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>What is Shared Responsibility?</h4>
                <p>The <strong>Shared Responsibility Model</strong> defines who — the cloud provider or the customer — is responsible for securing and managing each layer of the technology stack. As you move from IaaS to PaaS to SaaS, the provider takes on more responsibility and the customer takes on less.</p>
                <h4>Responsibility Table</h4>
                <table>
                  <tbody>
                    <tr><th>Layer</th><th>On-Premises</th><th>IaaS (e.g. AWS EC2)</th><th>PaaS (e.g. Heroku)</th><th>SaaS (e.g. Gmail)</th></tr>
                    <tr><td>Data &amp; Content</td><td>Customer</td><td>Customer</td><td>Customer</td><td>Customer</td></tr>
                    <tr><td>Application Code</td><td>Customer</td><td>Customer</td><td>Customer</td><td>Provider</td></tr>
                    <tr><td>Runtime / Middleware</td><td>Customer</td><td>Customer</td><td>Provider</td><td>Provider</td></tr>
                    <tr><td>OS Patching</td><td>Customer</td><td>Customer</td><td>Provider</td><td>Provider</td></tr>
                    <tr><td>Virtualisation</td><td>Customer</td><td>Provider</td><td>Provider</td><td>Provider</td></tr>
                    <tr><td>Physical Hardware</td><td>Customer</td><td>Provider</td><td>Provider</td><td>Provider</td></tr>
                    <tr><td>Data Centre Facilities</td><td>Customer</td><td>Provider</td><td>Provider</td><td>Provider</td></tr>
                  </tbody>
                </table>
                <h4>IaaS — Infrastructure as a Service</h4>
                <p>The provider manages physical hardware, data centre, and the hypervisor. The customer gets virtual machines and is responsible for the OS, patching, runtime, application, and data. Example: Running your own Node.js server on AWS EC2 — you patch the Linux OS yourself.</p>
                <h4>PaaS — Platform as a Service</h4>
                <p>The provider additionally manages the OS, runtime environment, and middleware. The customer only manages the application code and data. Example: Deploying a Node.js app to Heroku — you push code, Heroku handles the rest.</p>
                <h4>SaaS — Software as a Service</h4>
                <p>The provider manages everything including the application itself. The customer only manages their data and who has access to it. Example: Google Workspace / Gmail.</p>
                <div className="callout warn">
                  <div className="callout-label">Common Exam Mistake</div>
                  Students confuse "the cloud provider handles security" with "the customer has no security responsibility." In every model — even SaaS — the customer is ALWAYS responsible for their own data, user access management, and credential security.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ Q6 ══ */}
        <div className={`q-section q6 ${activeQ === "q6" ? "active" : ""}`}>
          <div className="q-header">
            <div className="q-tag">Question 6</div>
            <h2>Cloud Architecture &amp; Virtualisation</h2>
            <p>Topics: high availability, elastic scalability, VMs vs containers</p>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part A</span>
              <h3>Propose a highly available and elastically scalable cloud architecture. Explain how it satisfies both requirements with a diagram.</h3>
              <span className="marks">15 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>Defining the Key Terms</h4>
                <ul>
                  <li><strong>High Availability (HA)</strong> means the system continues to operate even when components fail. Achieved through <em>redundancy</em> — eliminating single points of failure (SPOF). Typically measured as uptime SLA (e.g. 99.9% = ~8.7 hours downtime/year).</li>
                  <li><strong>Elastic Scalability</strong> means the system automatically adds resources when demand increases and removes them when demand decreases — ensuring performance under load while minimising cost at low traffic.</li>
                </ul>
                <h4>Proposed Architecture</h4>
                <div className="diagram">{`                  Internet
                      |
           +----------v----------+
           |   Route 53 (DNS)    | <- DNS failover between regions
           +----------+----------+
                      |
           +----------v----------+
           |   CloudFront CDN    | <- Static assets cached globally
           +----------+----------+
                      |
           +----------v--------------------+
           |    Application Load Balancer  | <- Multi-AZ, health checks
           +-------+----------------+------+
                   |                |
          +--------v----+  +-------v------+
          |    AZ-1     |  |    AZ-2      | <- Two separate AZs
          | Web Server  |  | Web Server   |
          +--------+----+  +-------+------+
                   |                |
          +--------v----------------v-------+
          |        Auto Scaling Group       | <- Min: 2, Max: 10 instances
          +---------------------------------+
                          |
          +---------------v---------------+
          |         RDS Multi-AZ          | <- Auto failover
          |  Primary (MySQL) | Standby    |
          +-------------------------------+`}</div>
                <h4>How High Availability is Achieved</h4>
                <ul>
                  <li><strong>Multi-AZ deployment</strong> — web servers run in at least 2 Availability Zones. If one AZ fails, the other continues serving traffic.</li>
                  <li><strong>Load Balancer with health checks</strong> — the ALB continuously checks server health. Unhealthy instances are automatically removed from the pool within seconds.</li>
                  <li><strong>Auto Scaling minimum of 2</strong> — the ASG ensures at least 2 instances are always running, so failure of one doesn't cause downtime.</li>
                  <li><strong>RDS Multi-AZ</strong> — the database has a synchronous standby replica in a second AZ. Failover is automatic if the primary fails (typically under 60 seconds).</li>
                </ul>
                <h4>How Elastic Scalability is Achieved</h4>
                <ul>
                  <li><strong>Auto Scaling Group (ASG)</strong> — monitors CloudWatch metrics. If CPU &gt; 70% for 5 minutes, launch 2 new instances; if CPU &lt; 30%, terminate instances down to the minimum.</li>
                  <li><strong>Scale-out, not scale-up</strong> — new identical instances are launched from an AMI automatically in minutes, with no human intervention needed.</li>
                  <li><strong>CDN (CloudFront)</strong> — static content is cached at edge locations globally, massively reducing load on origin servers.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="part">
            <div className="part-header">
              <span className="part-letter">Part B</span>
              <h3>Compare virtual machines and containers — structure, benefits, key differences, and when to use each. With a diagram.</h3>
              <span className="marks">10 marks</span>
            </div>
            <div className="answer-box">
              <div className="answer-box-header"><div className="dot" /><span>Full Answer</span></div>
              <div className="answer-content">
                <h4>Architectural Diagram</h4>
                <div className="diagram">{`VIRTUAL MACHINES:                CONTAINERS:
+------------------------+       +------------------------------+
| App A  | App B  | App C|       |  App A  |  App B  |  App C  |
+--------+--------+------+       |[Libs]   |[Libs]   |[Libs]   |
|GuestOS |GuestOS |GstOS |       +------------------------------+
|(Linux) |(Win)   |(Lin) |       |    Container Runtime        |
+--------+--------+------+       |      (e.g. Docker)          |
|      Hypervisor        |       +------------------------------+
| (VMware / Hyper-V)     |       |       Host OS (Linux)       |
+------------------------+       +------------------------------+
|   Physical Hardware    |       |      Physical Hardware      |
+------------------------+       +------------------------------+`}</div>
                <h4>Virtual Machines (VMs)</h4>
                <p>A VM emulates an entire computer including a full Guest OS, using a <strong>hypervisor</strong> (e.g. VMware ESXi, Microsoft Hyper-V). Each VM is completely isolated — it has its own operating system kernel.</p>
                <ul>
                  <li><strong>Size:</strong> Gigabytes (full OS image)</li>
                  <li><strong>Start time:</strong> Minutes (requires a full OS boot cycle)</li>
                  <li><strong>Isolation:</strong> Very strong — separate kernel per VM</li>
                  <li><strong>Portability:</strong> Less portable — depends on hypervisor compatibility</li>
                </ul>
                <h4>Containers</h4>
                <p>Containers share the host OS kernel and isolate only the application and its dependencies using Linux kernel features (<strong>namespaces</strong> for isolation, <strong>cgroups</strong> for resource limits).</p>
                <ul>
                  <li><strong>Size:</strong> Megabytes (only app + libraries, no full OS)</li>
                  <li><strong>Start time:</strong> Seconds or milliseconds</li>
                  <li><strong>Isolation:</strong> Process-level (share the host OS kernel)</li>
                  <li><strong>Portability:</strong> High — Docker image runs identically on any Linux host</li>
                </ul>
                <h4>Comparison Table</h4>
                <table>
                  <tbody>
                    <tr><th>Aspect</th><th>Virtual Machine</th><th>Container</th></tr>
                    <tr><td>Isolates</td><td>Full OS + Application</td><td>Application + Dependencies</td></tr>
                    <tr><td>Size</td><td>Gigabytes</td><td>Megabytes</td></tr>
                    <tr><td>Boot time</td><td>Minutes</td><td>Seconds</td></tr>
                    <tr><td>Resource overhead</td><td>High (full OS per VM)</td><td>Low (shared kernel)</td></tr>
                    <tr><td>Security isolation</td><td>Very strong</td><td>Good (weaker than VMs)</td></tr>
                    <tr><td>Best for</td><td>Full OS control, mixed OS types</td><td>Microservices, CI/CD pipelines</td></tr>
                  </tbody>
                </table>
                <h4>When to Use Each</h4>
                <p><strong>Use a VM when:</strong> you need to run a Windows application on a Linux host, require strong security isolation between tenants, or need full OS-level control. AWS EC2 instances are VMs.</p>
                <p><strong>Use a Container when:</strong> deploying microservices that need to start quickly and scale horizontally, you want consistent environments from development to production, or you need to run many isolated services on the same server efficiently.</p>
                <div className="callout tip">
                  <div className="callout-label">Real-World Example</div>
                  A bank might run its core banking system on VMs (strong isolation, security compliance) while deploying its mobile API microservices as containers in Kubernetes (fast deployment, elastic scaling). Both patterns can coexist in the same cloud environment.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}