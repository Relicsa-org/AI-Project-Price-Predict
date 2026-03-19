---
skill_id: shared_auth_001
name: Authentication System
domain: shared
complexity: medium
base_hours: 5
roles_required:
  - role: senior_dev
    percentage: 70
  - role: mid_dev
    percentage: 30
dependencies: []
risk_buffer: 15
tags:
  - auth
  - login
  - signup
  - security
  - jwt
  - oauth
pricing_model: one-time
---

# Authentication System

## Description
Secure user authentication system with login, signup, password reset, and session management.

## Scope Includes
- User Registration & Login
- Password Hashing (bcrypt)
- JWT Token Management
- Email Verification
- Password Reset Flow
- Session Management

## Scope Excludes
- Social Login (Google/Facebook) - Add separately
- Multi-Factor Authentication (MFA)
- SSO Integration

## Risk Factors
- Security compliance requirements (GDPR, HIPAA)
- Custom user roles complexity

## Notes for Agent
If client mentions "Social Login", add 8 hours per provider.
If client mentions "MFA", add 12 hours.
