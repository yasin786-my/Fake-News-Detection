"""
merge_dataset.py
Merge Fake.csv and True.csv into news.csv
"""
import pandas as pd
import os

print("Merging dataset...")

if not os.path.exists('Fake.csv') or not os.path.exists('True.csv'):
    print("ERROR: Fake.csv and True.csv must be in the data/ folder!")
    exit(1)

fake = pd.read_csv('Fake.csv')
real = pd.read_csv('True.csv')

# Create text column (combine title + text if available)
for df in [fake, real]:
    if 'title' in df.columns and 'text' in df.columns:
        df['text'] = df['title'] + ' ' + df['text']
    elif 'title' in df.columns:
        df['text'] = df['title']

# Label: 0 = REAL, 1 = FAKE
real['label'] = 0
fake['label'] = 1

# Combine
news = pd.concat([real[['text', 'label']], fake[['text', 'label']]], ignore_index=True)
news = news.dropna(subset=['text'])
news = news.sample(frac=1, random_state=42).reset_index(drop=True)

# Save
news.to_csv('news.csv', index=False)
print(f"Saved news.csv: {len(news)} articles")
print(f"  REAL: {(news['label']==0).sum()}")
print(f"  FAKE: {(news['label']==1).sum()}")
