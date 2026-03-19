---
skill_id: shared_payment_001
name: Payment Gateway Integration
domain: shared
complexity: medium
base_hours: 5
roles_required:
  - role: mid_dev
    percentage: 100
  - role: qa_engineer
    percentage: 50
dependencies:
  - shared_api_integration
risk_buffer: 10
tags:
  - payments
  - stripe
  - razorpay
  - paypal
  - security
pricing_model: one-time
---

# Payment Gateway Integration

## Description
Secure integration of major payment providers (Stripe, Razorpay, PayPal) including webhook handling, success/failure states, and basic refund logic.

## Scope Includes
- Frontend checkout form
- Backend payment intent creation
- Webhook listener for status updates
- Basic error handling
- Transaction logging

## Scope Excludes
- Multi-currency splitting
- Subscription billing logic
- PCI-DSS Certification consulting

## Risk Factors
- Sandbox to Production migration delays
- Third-party API downtime during testing

## Notes for Agent
If client mentions "Subscription" or "Recurring", add 50% to base hours.
If client mentions "Multi-vendor", add 100% to base hours.
One payment gateway included. Add 8 hours per additional gateway.
