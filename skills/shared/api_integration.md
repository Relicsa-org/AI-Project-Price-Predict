---
skill_id: shared_api_001
name: API Integration
domain: shared
complexity: low
base_hours: 3
roles_required:
  - role: mid_dev
    percentage: 100
dependencies: []
risk_buffer: 10
tags:
  - api
  - rest
  - graphql
  - integration
  - third-party
pricing_model: one-time
---

# API Integration

## Description
Integration with third-party APIs (REST, GraphQL, or WebSocket).

## Scope Includes
- API Authentication Setup
- Data Fetching & Parsing
- Error Handling
- Rate Limiting Management
- Basic Caching

## Scope Excludes
- Building custom APIs (backend development)
- Complex data transformation
- Real-time WebSocket implementation

## Risk Factors
- Third-party API rate limits
- API version changes
- Documentation quality issues

## Notes for Agent
Price is per API integration.
If client mentions multiple APIs, multiply by count.
If WebSocket/Real-time, add 50% to base hours.
