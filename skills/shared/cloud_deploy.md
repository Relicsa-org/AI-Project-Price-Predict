---
skill_id: shared_deploy_001
name: Cloud Deployment & DevOps
domain: shared
complexity: medium
base_hours: 4
roles_required:
  - role: senior_dev
    percentage: 80
  - role: mid_dev
    percentage: 20
dependencies: []
risk_buffer: 20
tags:
  - deployment
  - aws
  - vercel
  - docker
  - ci-cd
  - devops
pricing_model: one-time
---

# Cloud Deployment & DevOps

## Description
Setup of cloud infrastructure, CI/CD pipelines, and production deployment.

## Scope Includes
- Server/Hosting Setup (AWS, Vercel, Heroku, etc.)
- Domain & SSL Configuration
- CI/CD Pipeline (GitHub Actions, GitLab CI)
- Environment Variables Setup
- Basic Monitoring & Logging

## Scope Excludes
- Kubernetes orchestration
- Auto-scaling configuration
- 24/7 DevOps support

## Risk Factors
- Cloud provider approval delays
- DNS propagation issues
- Compliance requirements (data residency)

## Notes for Agent
If client mentions "Kubernetes", add 40 hours.
If client mentions "Auto-scaling", add 20 hours.
Includes 1-month post-deployment support.
