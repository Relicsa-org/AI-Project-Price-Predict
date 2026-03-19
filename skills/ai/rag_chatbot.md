---
skill_id: ai_rag_001
name: RAG AI Chatbot
domain: ai
complexity: high
base_hours: 15
roles_required:
  - role: ai_engineer
    percentage: 80
  - role: senior_dev
    percentage: 20
dependencies:
  - shared_cloud_deploy
risk_buffer: 25
tags:
  - ai
  - llm
  - rag
  - chatbot
  - vector-db
  - embedding
pricing_model: one-time
---

# RAG AI Chatbot (Retrieval Augmented Generation)

## Description
Custom AI chatbot trained on client's specific data (PDFs, Website, Docs) using Vector Database and LLM.

## Scope Includes
- Data Ingestion Pipeline
- Vector Database Setup (Pinecone/Milvus/Weaviate)
- LLM Integration (OpenAI/Anthropic/Local)
- Chat Interface UI
- Basic Analytics
- Source Citation

## Scope Excludes
- Fine-tuning custom models
- Real-time voice processing
- Multi-language support (add separately)

## Risk Factors
- Data quality issues (garbage in, garbage out)
- Hallucination management requires extra testing
- Token cost variability
- Data privacy compliance

## Notes for Agent
MUST inform client about ongoing API costs.
Add 25% buffer for data cleaning efforts.
If data source is "Unstructured" (scanned PDFs), add 20 hours.
If multi-language, add 30 hours.
