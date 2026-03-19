---
skill_id: web_saas_001
name: SaaS Dashboard
domain: web
complexity: high
base_hours: 24
roles_required:
  - role: senior_dev
    percentage: 70
  - role: mid_dev
    percentage: 30
  - role: ui_ux_designer
    percentage: 40
dependencies:
  - shared_auth_001
  - shared_api_integration
risk_buffer: 20
tags:
  - saas
  - dashboard
  - analytics
  - web
  - subscription
  - admin
pricing_model: one-time
---

# SaaS Dashboard

## Description
Complex web application dashboard with user management, analytics, and subscription handling.

## Scope Includes
- User Dashboard & Profile
- Admin Panel
- Analytics & Charts
- Subscription/Billing Integration
- Role-Based Access Control
- Data Export (CSV, PDF)
- Notification System

## Scope Excludes
- Mobile app version
- Advanced AI features
- Real-time collaboration features

## Risk Factors
- Complex data visualization requirements
- Multi-tenant architecture
- Compliance requirements (GDPR, SOC2)

## Notes for Agent
If client mentions "Multi-tenant", add 30 hours.
If client mentions "Real-time", add 25 hours.
This is typically paired with `shared_cloud_deploy.md`.
