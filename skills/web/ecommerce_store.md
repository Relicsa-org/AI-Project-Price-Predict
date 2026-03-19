---
skill_id: web_ecom_001
name: E-Commerce Storefront
domain: web
complexity: high
base_hours: 18
roles_required:
  - role: senior_dev
    percentage: 60
  - role: mid_dev
    percentage: 40
  - role: ui_ux_designer
    percentage: 30
dependencies:
  - shared_payment_001
  - shared_auth_001
risk_buffer: 15
tags:
  - ecommerce
  - cart
  - products
  - web
  - shopify
  - woocommerce
pricing_model: one-time
---

# E-Commerce Storefront

## Description
Full-featured online store with product catalog, shopping cart, checkout flow, and user accounts.

## Scope Includes
- Product Listing & Detail Pages
- Shopping Cart & Checkout
- User Authentication (Login/Signup)
- Order History Page
- Basic Admin Product Upload
- Inventory Management
- Search & Filters

## Scope Excludes
- Advanced AI Recommendations
- Multi-vendor Marketplace logic
- ERP Integration
- Custom payment gateway development

## Risk Factors
- Large catalog migration (>1000 products)
- Custom design requirements vs Template
- Tax calculation complexity

## Notes for Agent
Ask client: "How many products initially?"
If > 500 products, add 10 hours for data import.
If multi-vendor, add 100% to base hours.
