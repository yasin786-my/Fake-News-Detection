<p align="center">
  <img src="https://img.shields.io/badge/FakeScope-RAG_Fake_News_Detector-FF4D4D?style=for-the-badge&logo=shield&logoColor=white" alt="FakeScope" />
</p>

<h1 align="center">🔍 FakeScope — RAG Fake News Detector</h1>

<p align="center">
  <strong>AI-powered fake news detection using Retrieval-Augmented Generation (RAG) with FAISS vector search.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Flask-2.3-000000?style=flat-square&logo=flask" />
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python" />
  <img src="https://img.shields.io/badge/FAISS-Vector_DB-000000?style=flat-square" />
  <img src="https://img.shields.io/badge/Sentence_Transformers-Embeddings-FF6F00?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" />
</p>

---

## 🏗️ Architecture
```
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (React 19 + Vite)                                  │
│ Tailwind CSS · Modern UI                                    │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP
┌──────────────────────▼──────────────────────────────────────┐
│ FLASK BACKEND + RAG PIPELINE                                │
│ Sentence Transformers · FAISS · Pandas                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Tech Stack

| Layer         | Technology                                      |
|---------------|-------------------------------------------------|
| **Frontend**  | React 19, Vite, Tailwind CSS                    |
| **Backend**   | Flask (Python 3.10+)                            |
| **AI/ML**     | Sentence-Transformers, FAISS, NumPy, Pandas     |
| **Vector DB** | FAISS                                           |

---

## ✨ Features
- 📝 Real-time news article analysis
- 🔎 Retrieval-Augmented Generation (RAG) approach
- 📊 Confidence score with detailed explanation
- 📚 Shows top similar articles from knowledge base
- 🎨 Clean, modern, and responsive UI
- 💾 Fully local processing (works offline after setup)

---

## 📋 Important - Dataset Requirement

This project **only works with** the following dataset:

**Dataset Name:** Fake and Real News Dataset  
**Kaggle Link:** [https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset](https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset)

> **Note:** You must download `Fake.csv` and `True.csv` and place them in the `backend/data/` folder.

---

## 📁 Project Structure
```
fake-scope/
├── README.md
├── backend/
│   ├── data/
│   │   ├── Fake.csv
│   │   ├── True.csv
│   │   ├── news.csv
│   │   └── merge_dataset.py
│   ├── models/                  # Auto-generated (FAISS index)
│   ├── build_rag.py
│   ├── app_rag.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## ⚙️ Setup Instructions

### 1. Download Dataset
1. Go to [Kaggle Dataset](https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset)
2. Download `Fake.csv` and `True.csv`
3. Place both files inside `backend/data/` folder

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate environment
# Windows:
venv\Scripts\activate
# macOS / Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Merge dataset
cd data
python merge_dataset.py
cd ..

# Build RAG Knowledge Base (Run only once - takes 5-10 minutes)
python build_rag.py

# Start Flask Server
python app_rag.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

> Frontend will be available at: `http://localhost:5173`

---

## 🧠 How It Works
1. User pastes a news article
2. Text is converted into embedding using Sentence Transformers
3. FAISS searches the knowledge base for similar articles
4. Prediction is made based on real/fake ratio of retrieved articles
5. Confidence score and supporting articles are shown

---

## 🔌 API Endpoints

| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| GET    | `/`            | Health Check                 |
| GET    | `/model-info`  | Dataset & Model Information  |
| POST   | `/predict`     | Predict fake/real news       |

---

## 📄 License
This project is licensed under the **MIT License**.

---

<p align="center">
  Built with ❤️ for educational purposes<br/>
  <sub>Learning RAG systems through Fake News Detection</sub>
</p>
