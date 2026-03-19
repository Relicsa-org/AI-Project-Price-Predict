---
skill_id: web_migration_001
name: Data Migration
domain: web
complexity: high
base_hours: 9
roles_required:
  - role: senior_dev
    percentage: 100
dependencies: []
risk_buffer: 25
tags:
  - migration
  - data
  - database
  - transfer
  - etl
pricing_model: one-time
---

# Data Migration

## Description
Transfer of existing users, products, or content from a legacy system (like WooCommerce, Shopify, legacy SQL) to the new platform.

## Scope Includes
- Schema mapping and data transformation
- Custom ETL script development
- Test migration runs to staging environment
- Final production sync during downtime
- Post-migration data validation

## Scope Excludes
- Cleaning severely corrupted legacy data
- Re-creating deleted historical data from backups
- Migrating physical files/assets over 100GB

## Risk Factors
- Undocumented legacy database schemas
- Data corruption in source
- Downtime constraints from the client

## Notes for Agent
If data volume is over 100,000 records, add 20 hours.
Add 25% buffer because migrations always reveal hidden data issues.
