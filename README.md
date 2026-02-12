# 🌽 Bob Sells Corn: A Technical Showcase

Welcome to the Corn Distribution System. This project was developed as a technical challenge to help Bob the farmer scale his business while enforcing strict fairness rules (1 purchase per minute) and maintaining a high-performance, leak-free frontend architecture.

Beyond solving the tasks, the intention of this project is to **showcase my decision-making process and architectural thinking**.  
Rather than relying on copy-paste snippets, I spent time studying Backbone’s lifecycle, event system, and view management so the architecture choices are intentional and explainable.

---

## 🚀 Quick Start

This project is containerized for a **zero-friction reviewer experience**.

```bash
# To get Bob's shop running immediately:
docker compose up --build
```

**Frontend:** http://localhost  
**Backend API:** http://localhost:3000

---

## 🛠️ Engineering Decisions & Rationale

### Type Safety First — Progressive TypeScript Adoption

**Decision:** Gradually migrated both Backend and Frontend to TypeScript instead of starting with it from day one.

**Why:**  
The initial focus was delivering the core rate-limiting logic quickly to satisfy the primary business rule. Once the main flow was stable, TypeScript was introduced to:

- Prevent runtime edge-case bugs (e.g., undefined IPs, duplicate map checks).
- Standardize data contracts between frontend and backend.
- Improve refactor safety as project complexity increased.

This reflects a **progressive hardening strategy**: prioritize functionality first, then strengthen reliability and maintainability.

---

### Backend–Frontend Separation & Project Restructure

**Decision:** Moved frontend and backend into structured `src` folders and introduced Docker with Nginx.

**Why:**  
As the project evolved from prototype to multi-layer application, clearer structure became necessary to:

- Avoid path ambiguity and tight coupling.
- Enable cleaner imports and scalability.
- Simulate a production-like environment for reviewers.

Docker ensures reproducible environments, while Nginx mirrors real-world routing and deployment patterns, reducing “it works on my machine” issues.

---

### Defensive Backend Rate Limiting

**Decision:** Implemented middleware-based rate limiting and later addressed environment and edge-case failures (missing `.env`, undefined IP handling).

**Why:**  
The “1 corn per minute” rule is fundamentally a **server responsibility**.  
Frontend safeguards improve UX, but backend safeguards ensure **fairness and security**.

Subsequent fixes demonstrate attention to:

- Crash resilience.
- Reviewer environment variability.
- Non-ideal or malformed client requests.

This shows a **production-mindset approach** rather than only handling the happy path.

---

### Frontend Logic Isolation & Scenario Modes

**Decision:** Decoupled purchase logic from UI controls and introduced three observable scenarios.

**Why:**  
Instead of hiding complexity, the UI intentionally exposes different behavioral modes to demonstrate architectural awareness and Backbone lifecycle understanding:

- **Zombie View:** Illustrates memory leaks and improper view cleanup.
- **Spam Mode:** Intentionally bypasses frontend throttles to prove backend limiter integrity.
- **Ideal Mode:** Represents a production-ready, state-synchronized interface.

This approach highlights understanding of trade-offs and system behavior, not just polished UI outcomes.

---

### Testing & Linting Introduction

**Decision:** Added API and view tests, ESLint configuration, and stricter TypeScript rules (avoiding `any`, enforcing interfaces).

**Why:**  
Once the core logic stabilized, tests were introduced to ensure:

- Rate-limiter correctness under rapid request conditions.
- UI logic reliability independent of rendering.
- Long-term maintainability.

Linting and standardized interfaces reduce stylistic drift and improve readability for external reviewers.

---

### UI Refinement & Purchase Logic Refactor

**Decision:** Enhanced CSS styling and expanded `handlePurchaseMethod` to support three behavioral scenarios.

**Why:**  
The UI began as intentionally minimal to validate logic first.  
Styling and method refactors were introduced **after functional correctness**, mirroring real production workflows where UX polish follows system validation.

---

## 📈 Development Evolution

### Feb 10 — Backend Foundation (JavaScript)

- Initial backend API, middleware, and rate-limiting logic implemented in JavaScript.
- Primary objective: fulfill the first business rule quickly.
- Focus on correctness and functional delivery over tooling.

---

### Feb 11 — Frontend Introduction & Type Safety Migration

- Basic frontend purchase flow added.
- Backend migrated to **TypeScript** to reduce runtime risks and handle edge cases such as:
  - Undefined IP handling.
  - Duplicate map checks.
  - Removal of unnecessary development dependencies.
- Frontend later migrated to **TypeScript** for stack consistency.

This phase reflects a deliberate **“stabilize then harden”** strategy rather than starting with strict tooling before proving functionality.

---

### Feb 11 (Later) — Testing, Linting & Standards

- Added API and view tests.
- Introduced ESLint and stricter TypeScript configurations.
- Standardized interfaces across frontend and backend.

Goal: increase confidence, maintainability, and readability once the core system proved stable.

---

### Feb 11–12 — Structural Refactor & Environment Parity

- Major refactor moving Backend and Frontend into structured `src` folders.
- Docker and Nginx introduced to provide reproducible environments and realistic deployment routing.

This marked the transition from **prototype → structured application**.

---

### Feb 12 — UX Refinement & Scenario Expansion

- CSS styling improvements.
- Refactored frontend purchase handler to support **three behavioral scenarios**.
- Focus shifted from pure correctness to **observability and user experience**.

---

### Feb 12 — Final Hardening

- Fixed crash scenarios related to missing `.env` defaults and container configuration.
- Ensured the project runs smoothly in reviewer environments without manual setup.

---

**Progression Pattern:**  
**Functionality → Type Safety → Testing → Architecture → UX → Hardening**

---

## 🔮 Future Roadmap

This project’s primary goal is to **showcase my decision-making process and architectural thinking**, not to build an endlessly expanding system. The complexity of this application could grow indefinitely, but I intentionally chose to stop at a point where the core requirements are fully met without drifting into over-engineering.

If this were to evolve beyond a technical challenge and move toward a production scenario, the next logical improvements would be:

**Persistent Purchase Cache (DB / Redis)**  
Store user purchase history so refreshes or server restarts do not reset state. This would also enable horizontal scaling while preserving fairness tracking across instances.

**API Health Check Endpoint**  
A lightweight `/health` or `/status` route returning uptime and service status to simplify monitoring, load-balancer checks, and deployment validation.

These additions were deliberately left out of the current submission to keep the scope aligned with the challenge objectives while still demonstrating awareness of how the system could mature into a more production-ready architecture.
