# 🌍 CarbonReducer

**Optimising Carbon Footprint in Smart Homes: A Machine Learning Approach Using IoT-Based Energy Monitoring**

---

### 🚀 Overview
**CarbonReducer** is an IoT-driven smart home application designed to **monitor, predict, and optimize household carbon footprint** using **real-time energy data** and **machine learning models**.  
The system aims to promote **sustainable energy usage** by offering intelligent insights, carbon intensity predictions, and energy-saving recommendations via an interactive dashboard.

> Currently under active development — focusing on dashboard implementation, secure authentication (MFA), and API integration.

---

### 🧠 Core Features (Planned & In Progress)
| Status | Feature | Description |
|:-------:|----------|-------------|
| ⭕ | **IoT Data Pipeline** | Collects and transmits real-time energy usage data from smart home devices. |
| ✅ | **Machine Learning Engine** | Uses models like **Random Forest**, **XGBoost**, and **LSTM** to predict consumption and optimize carbon impact. |
| ✅ | **Optimization Layer** | Employs **Optuna** for hyperparameter tuning and **OR-Tools** for scheduling optimization. |
| ✅ | **Dashboard** | User-facing dashboard with data visualization, analytics, and recommendation widgets. |
| ✅ | **Authentication & MFA** | Implements secure login using **JWT**, **SMS-based verification**, and **Authenticator App MFA**. |
| 🔄 | **Backend API (Current Phase)** | RESTful APIs for model serving, IoT data ingestion, and dashboard integration. |

---

### 🧩 Tech Stack
**Frontend:**
- React + TypeScript (template-based UI)
- Tailwind CSS / shadcn/ui components
- Chart.js or Recharts for visualizations

**Backend:**
- FastAPI (Python)
- PostgreSQL / MongoDB (depending on module)
- Redis (for caching)
- OR-Tools + Optuna (optimization)
- TensorFlow / Scikit-learn / XGBoost (ML models)

**IoT Integration:**
- MQTT or HTTP-based IoT data pipeline
- Edge data preprocessing (NodeMCU / Raspberry Pi)

**Authentication:**
- JWT tokens + OAuth2
- Twilio / MessageBird for SMS verification
- Google Authenticator or Authy for MFA

---

### 📊 Dashboard Modules (Planned)
- **Energy Monitoring** – Real-time device-level usage visualization  
- **Carbon Forecasting** – Predictive carbon intensity per hour/day  
- **Smart Scheduling** – Optimal appliance runtime recommendations  
- **User Insights** – Personalized suggestions and energy goals  

---

### 📁 Project Structure (Initial)
```bash
carbonreducer/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── docs/
│   ├── architecture.md
│   ├── api_spec.md
│   └── ui_wireframes.md
├── .env
├── docker-compose.yml
├── LICENSE
└── README.md
```

---

### ⚙️ Installation (Development Setup)
#### 1. Clone Repository
```bash
git clone https://github.com/ianodhiambo1/CarbonReducer.git
cd CarbonReducer
```

#### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate   # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### 4. Environment Variables
Copy `.env.example` → `.env` and configure your keys:
```
DATABASE_URL=
JWT_SECRET=
SMS_API_KEY=
AUTH_APP_SECRET=
```

---

### 🧪 Development Guidelines
- Follow **feature-branch naming**: `feature/dashboard-login`, `bugfix/mfa-logic`
- Use **Pull Requests** with clear descriptions
- Write **docstrings** and **type hints** for Python code
- Maintain consistent commit messages using [Conventional Commits](https://www.conventionalcommits.org/)
- Prefer environment-based configs (`.env.dev`, `.env.prod`)

---

### 🗂️ Documentation (WIP)
- `docs/architecture.md` – High-level system design  
- `docs/api_spec.md` – REST API endpoints and payloads  
- `docs/ml_pipeline.md` – Model training and optimization workflows  
- `docs/security.md` – MFA and encryption strategy  

---

### 🧠 Roadmap
- [ ] Implement secure login with SMS + Authenticator MFA  
- [ ] Connect backend ML predictions to dashboard  
- [ ] Integrate Optuna for energy optimization tuning  
- [ ] Deploy MQTT IoT simulation  
- [ ] Launch v1.0 on Docker + Render / Railway

---

### 🧾 License
This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

### 🤝 Contributing
Contributions are welcome!  
If you’d like to collaborate:
1. Fork the repo  
2. Create a new branch  
3. Submit a PR describing your changes  

---

### 💬 Author
**Developed by [Ian Odhiambo](https://github.com/ianodhiambo1)**  
📧 Contact: *coming soon*  
🌱 “Smarter homes for a greener planet.”
