# 🏗️ CarbonReducer System Architecture

## 1. Overview
The **CarbonReducer** system integrates IoT-based data collection, a machine learning backend, and a secure web dashboard to enable **real-time carbon footprint optimization** in smart homes.

The architecture is designed for **modularity, scalability, and security**, supporting multiple IoT data sources, a distributed processing backend, and flexible cloud deployment.

---

## 2. High-Level Architecture
```
     ┌────────────────────┐        ┌────────────────────────┐        ┌────────────────────┐
     │   IoT Devices &   │  --->  │     Backend API & ML    │  --->  │   Web Dashboard    │
     │  Edge Gateways    │        │     (FastAPI, Python)   │        │  (React + Tailwind)│
     └────────────────────┘        └────────────────────────┘        └────────────────────┘
              │                               │                               │
              ▼                               ▼                               ▼
        Data Stream (MQTT)          Model Inference (LSTM/XGBoost)      Visualization + Control
```

---

## 3. Core Components

### 3.1 IoT Layer (Data Collection)
- **Devices:** Smart plugs, current sensors, temperature sensors, and carbon intensity monitors.
- **Protocol:** MQTT or HTTP POST for transmitting real-time telemetry.
- **Edge Node:** Optional Raspberry Pi or ESP32 device for pre-processing (filtering, timestamping).

**Why:** Reduces network overhead and enables local data buffering during outages.

---

### 3.2 Backend Layer (FastAPI + ML Engine)
Responsible for **data ingestion, processing, model inference, and user management.**

**Modules:**
- `/api/data`: Receives IoT data streams.
- `/api/auth`: Handles JWT login, SMS verification, and Auth App MFA.
- `/api/predict`: Provides energy and carbon predictions.
- `/api/optimize`: Suggests appliance schedules via OR-Tools optimization.

**Machine Learning Engine:**
- **Random Forest / XGBoost:** Short-term consumption prediction.
- **LSTM:** Time-series forecasting (hourly/daily carbon intensity).
- **Optuna:** Hyperparameter tuning.
- **OR-Tools:** Energy usage scheduling optimization.

**Why:** Combines interpretability (RF, XGBoost) and sequential modeling (LSTM) for accurate forecasting.

---

### 3.3 Authentication Layer
Implements **multi-factor authentication (MFA)** using:
- **JWT Tokens:** For session control.
- **SMS OTP:** via Twilio or MessageBird.
- **Authenticator App (TOTP):** For time-based MFA.

**Why:** Balances strong security with user accessibility.

---

### 3.4 Frontend Layer (Dashboard)
Built with **React + TypeScript**, using **TailwindCSS** and **shadcn/ui** components.

**Key Modules:**
- **Energy Monitoring Panel:** Real-time visualization of energy usage per device.
- **Forecasting View:** Graphs of predicted carbon intensity and consumption.
- **Optimization Console:** Recommends optimal device schedules.
- **User Settings:** MFA configuration, preferences, and reports.

**Why:** Modular dashboard allows quick iteration and scalability.

---

### 3.5 Database Layer
- **PostgreSQL:** For structured data (users, devices, predictions).
- **MongoDB (optional):** For unstructured IoT telemetry.
- **Redis:** Caching for real-time data and authentication sessions.

**Why:** Hybrid architecture provides flexibility for structured + streaming data.

---

## 4. Data Flow
1. IoT devices send data → MQTT Broker / REST API.
2. Backend ingests and validates → stores in DB.
3. ML engine processes → predicts consumption & carbon output.
4. Optimizer computes efficient schedules.
5. Dashboard visualizes results and allows user feedback.

---

## 5. Deployment & Scalability
**Containerization:** Docker + Docker Compose for service orchestration.

**CI/CD:** GitHub Actions pipeline for testing, building, and deployment.

**Hosting Options:**
- Backend: Railway / Render / AWS Lambda
- Database: Supabase / ElephantSQL
- Frontend: Vercel / Netlify

**Scalability Strategy:**
- Stateless backend (FastAPI workers + load balancing)
- Horizontal scaling for MQTT brokers and inference nodes
- Asynchronous task processing using Celery / Redis Queue

---

## 6. Security & Privacy
- HTTPS and JWT-based auth for all API endpoints.
- Encrypted environment variables using `.env` and secrets manager.
- Data anonymization for IoT device identifiers.
- Role-based access control (admin/user).

---

## 7. Future Enhancements
- Cloud-native microservices with Kubernetes.
- Integration with external Carbon Intensity APIs.
- Energy-saving leaderboard for gamification.
- Adaptive reinforcement learning models for continuous optimization.

---

**Author:** [Ian Odhiambo](https://github.com/ianodhiambo1)  
**Project:** CarbonReducer  
**License:** MIT

