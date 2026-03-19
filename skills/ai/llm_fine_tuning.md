---
skill_id: ai_finetune_001
name: LLM Fine-Tuning
domain: ai
complexity: high
base_hours: 18
roles_required:
  - role: ai_engineer
    percentage: 100
dependencies:
  - shared_cloud_deploy
risk_buffer: 30
tags:
  - ai
  - llm
  - fine-tuning
  - training
  - model
  - ml
pricing_model: one-time
---

# LLM Fine-Tuning

## Description
Custom fine-tuning of Large Language Models on client-specific data for specialized use cases.

## Scope Includes
- Data Collection & Cleaning
- Dataset Preparation & Formatting
- Model Selection (Llama, Mistral, GPT, etc.)
- Fine-Tuning Process
- Evaluation & Testing
- Deployment Pipeline

## Scope Excludes
- Building model from scratch
- Hardware/GPU infrastructure (client provides)
- Ongoing model maintenance

## Risk Factors
- Data quality significantly impacts results
- GPU compute costs can vary
- Model may not meet accuracy expectations
- Regulatory compliance for AI models

## Notes for Agent
Requires significant data preparation.
Inform client about GPU/training costs separately.
If > 100k training samples, add 40 hours.
Add 30% buffer for iteration cycles.
