---
skill_id: ai_data_001
name: AI Data Pipeline
domain: ai
complexity: high
base_hours: 14
roles_required:
  - role: ai_engineer
    percentage: 60
  - role: senior_dev
    percentage: 40
dependencies:
  - shared_cloud_deploy
risk_buffer: 25
tags:
  - ai
  - data
  - pipeline
  - etl
  - ml
  - processing
pricing_model: one-time
---

# AI Data Pipeline

## Description
End-to-end data pipeline for AI/ML applications including ingestion, processing, storage, and retrieval.

## Scope Includes
- Data Source Integration
- ETL/ELT Pipeline Setup
- Data Cleaning & Transformation
- Vector Embedding Generation
- Database Setup (SQL + Vector DB)
- Monitoring & Alerting

## Scope Excludes
- Data collection/scraping
- Manual data labeling
- Real-time streaming (add separately)

## Risk Factors
- Data quality inconsistencies
- Schema changes from source systems
- Large data volume performance
- Data privacy & compliance (GDPR, etc.)

## Notes for Agent
If real-time streaming needed, add 40 hours.
If > 1M records, add 20 hours for optimization.
Ensure client has data rights/permissions.
Add 25% buffer for data quality issues.
