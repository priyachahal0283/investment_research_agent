# 📈 AI Investment Research Agent

> **Research smarter. Decide with confidence.**

An intelligent **AI-powered investment research agent** that transforms a simple company name into a structured investment analysis and a clear **Invest / Pass** recommendation.

Instead of manually going through multiple sources and trying to connect the dots, the agent uses an AI-driven research workflow to analyze the available information, evaluate the company, and explain **why** the final decision was made.

---

## 🚀 What Does It Do?

The application is designed around one simple question:

### **“Should I invest in this company?”**

Just enter a company name and the agent takes care of the analysis.

It processes the request through the backend, uses an AI-powered research workflow to evaluate the company, and presents the final result through an intuitive dashboard.

The output is not just a recommendation — it also provides the **reasoning behind the decision**, making the analysis easier to understand and evaluate.

---

## ✨ Key Features

* 🔎 **Company Research** — Analyze a company from a single input.
* 🤖 **AI-Powered Analysis** — Uses LLM-based reasoning to process research.
* 📊 **Investment Decision** — Generates a clear **Invest / Pass** recommendation.
* 🧠 **Explainable Reasoning** — Understand why the agent reached its conclusion.
* ⚡ **AI Research Workflow** — Uses LangChain and LangGraph to structure the AI process.
* 🌐 **Modern Web Interface** — Interactive React-based dashboard.
* 🔗 **Frontend–Backend Integration** — REST APIs connect the application layers.
* 💾 **Database Support** — MongoDB for application data management.

---

## 🧠 How It Works

```text
             ┌─────────────────┐
             │   Enter Company │
             │      Name       │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │     Backend     │
             │  Node + Express│
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │   AI Research   │
             │ Workflow        │
             │ LangChain +     │
             │ LangGraph       │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │ Gemini LLM      │
             │ Analysis        │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │  Investment     │
             │ Decision        │
             └────────┬────────┘
                      ↓
             ┌─────────────────┐
             │ Invest / Pass   │
             │ + Reasoning     │
             └─────────────────┘
```

### The workflow

**1. Company Input**
The user enters the name of the company they want to research.

**2. Request Processing**
The React frontend sends the request to the Node.js/Express backend through REST APIs.

**3. AI Research**
The backend triggers the AI research workflow built using LangChain and LangGraph.

**4. Intelligent Analysis**
Gemini processes the available information and evaluates the company.

**5. Investment Decision**
The agent generates an **Invest** or **Pass** recommendation based on its analysis.

**6. Explainable Result**
The final recommendation and supporting reasoning are displayed in the dashboard.

---

## 🛠️ Tech Stack

| Layer             | Technology           |
| ----------------- | -------------------- |
| Frontend          | React.js             |
| Backend           | Node.js, Express.js  |
| AI / LLM          | Google Gemini API    |
| AI Framework      | LangChain, LangGraph |
| Database          | MongoDB              |
| API Communication | REST APIs            |
| Language          | JavaScript           |

---

## 📂 Project Structure

```text
investment-research-agent/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/priyachahal0283/investment_research_agent.git
cd investment_research_agent
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open the local development URL shown by the frontend development server.

---

## 🔮 Future Improvements

The project can be further evolved into a more comprehensive AI investment platform with:

* 📈 Real-time stock market and financial data
* 💰 Financial statement and valuation analysis
* 📊 Advanced investment scoring
* 📰 Multi-source financial news research
* 🔍 Source verification and citation
* 📉 Historical stock performance analysis
* 🧠 Multi-agent investment research workflows
* 👤 User authentication and personalized research history
* 📁 Automated investment research reports
* 📌 Portfolio tracking and monitoring
* 🤖 Support for multiple LLM providers
* ☁️ Scalable production deployment and monitoring

---

## 🎯 Project Goal

The goal of this project is to demonstrate how **Generative AI, agentic workflows, backend engineering, and modern web development** can be combined to build a practical investment research application.

> **From a company name to an investment decision — powered by AI.**
