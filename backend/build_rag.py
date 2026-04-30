"""
build_rag.py
Build the RAG knowledge base from news dataset
using sentence embeddings + FAISS index
"""

import pandas as pd
import numpy as np
import faiss
import joblib
import os
import json
from sentence_transformers import SentenceTransformer

def build_rag_knowledge_base():
    print("=" * 70)
    print("BUILDING RAG KNOWLEDGE BASE")
    print("=" * 70)

    if not os.path.exists('models'):
        os.makedirs('models')

    # Step 1: Load dataset
    print("\n[1/5] Loading dataset...")
    dataset_path = 'data/news.csv'

    if not os.path.exists(dataset_path):
        print(f"ERROR: Dataset not found at {dataset_path}")
        return

    df = pd.read_csv(dataset_path)
    df = df.dropna(subset=['text'])

    real_df = df[df['label'] == 0].sample(n=min(1000, (df['label']==0).sum()), random_state=42)
    fake_df = df[df['label'] == 1].sample(n=min(1000, (df['label']==1).sum()), random_state=42)
    kb_df = pd.concat([real_df, fake_df]).sample(frac=1, random_state=42).reset_index(drop=True)

    print(f"Knowledge base: {len(kb_df)} articles")
    print(f"  REAL: {(kb_df['label']==0).sum()}")
    print(f"  FAKE: {(kb_df['label']==1).sum()}")

    texts = kb_df['text'].tolist()
    labels = kb_df['label'].tolist()
    texts_truncated = [t[:512] for t in texts]

    # Step 2: Load model
    print("\n[2/5] Loading sentence transformer...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("Model loaded: all-MiniLM-L6-v2")

    # Step 3: Create embeddings
    print("\n[3/5] Creating embeddings...")
    embeddings = model.encode(
        texts_truncated,
        batch_size=64,
        show_progress_bar=True,
        convert_to_numpy=True
    )
    print(f"Embeddings shape: {embeddings.shape}")

    # Step 4: Build FAISS index
    print("\n[4/5] Building FAISS index...")
    dimension = embeddings.shape[1]
    faiss.normalize_L2(embeddings)
    index = faiss.IndexFlatIP(dimension)
    index.add(embeddings.astype(np.float32))
    print(f"FAISS index built with {index.ntotal} vectors")

    # Step 5: Save
    print("\n[5/5] Saving knowledge base...")
    faiss.write_index(index, 'models/faiss_index.bin')
    metadata = {
        'texts': [t[:300] for t in texts],
        'labels': labels,
        'full_texts': texts_truncated
    }
    joblib.dump(metadata, 'models/kb_metadata.pkl')
    with open('models/model_config.json', 'w') as f:
        json.dump({'embedding_model': 'all-MiniLM-L6-v2', 'dimension': dimension}, f)

    print("\nRAG KNOWLEDGE BASE BUILT SUCCESSFULLY!")
    print("Next: Run 'python app_rag.py'")

if __name__ == "__main__":
    build_rag_knowledge_base()
