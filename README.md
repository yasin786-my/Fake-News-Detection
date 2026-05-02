# FakeScope — RAG Fake News Detector

## Project Structure
```
fake-news-rag/
├── backend/
│   ├── data/
│   │   ├── Fake.csv          ← YOUR FILE (from Kaggle)
│   │   ├── True.csv          ← YOUR FILE (from Kaggle)
│   │   ├── news.csv          ← Auto-generated
│   │   └── merge_dataset.py
│   ├── models/               ← Auto-generated after build_rag.py
│   ├── build_rag.py          ← Step 1: Build knowledge base
│   ├── app_rag.py            ← Step 2: Run Flask API
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/       ← All React components
    │   ├── utils/storage.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## Setup Instructions
### Dataset Recommendation
- Dataset Name: Fake and Real News Dataset
- Where to Download:
- Go to Kaggle: https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset
  Or
- search: "fake and real news dataset kaggle"
### Backend Setup
```powershell
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Step 1: Make sure your CSV files are in data/ folder
# Then merge them:
cd data
python merge_dataset.py
cd ..

# Step 2: Build RAG knowledge base (~5-10 minutes)
python build_rag.py

# Step 3: Start Flask API
python app_rag.py
```

### Frontend Setup
```powershell
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
# Opens http://localhost:5173
```

## How RAG Works

1. User inputs news text
2. Sentence Transformer encodes it to a 384-dim vector
3. FAISS searches 2000-article knowledge base
4. Top 5 most similar articles retrieved
5. Their fake/real ratio = prediction
6. Confidence = weighted similarity score

## API Endpoints

- `GET /` — Health check
- `GET /model-info` — Model information  
- `POST /predict` — Analyze news text
  - Body: `{ "text": "news article..." }`
  - Returns: `{ "prediction", "confidence", "reasons", "retrieved_articles", "breakdown" }`
## 📜 License
Copyright (c) 2024
This project is open-source and available under the MIT License.

---

### 📝 Note
This project was built for educational purposes to understand the "behind the scenes" of web development before moving on to more advanced frameworks.
