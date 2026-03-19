---
skill_id: shared_maint_001
name: Ongoing Maintenance Retainer
domain: shared
complexity: low
base_hours: 6
roles_required:
  - role: mid_dev
    percentage: 70
  - role: project_manager
    percentage: 30
dependencies: []
risk_buffer: 10
tags:
  - maintenance
  - support
  - retainer
  - bugfix
  - monthly
pricing_model: monthly
---

# Ongoing Maintenance Retainer

## Description
Monthly post-launch support covering bug fixes, server maintenance, security updates, and minor feature additions.

## Scope Includes
- Server monitoring and scaling
- Dependency and security patch updates
- Bug fixing (up to allocated hours)
- Monthly health report
- Priority emergency support SLA

## Scope Excludes
- Large new feature development (quoted separately)
- Total application rewrite
- 24/7 Phone support

## Risk Factors
- Unpredictable third-party API breaking changes
- Legacy technical debt causing cascading issues

## Notes for Agent
This is a **MONTHLY RETAINER** price.
Base package includes 20 hours/month.
If client needs faster SLA, double the hours.
