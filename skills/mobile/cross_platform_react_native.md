---
skill_id: mob_react_native_001
name: Cross-Platform App (React Native)
domain: mobile
complexity: medium
base_hours: 12
roles_required:
  - role: senior_dev
    percentage: 100
dependencies:
  - shared_api_integration
risk_buffer: 20
tags:
  - mobile
  - react-native
  - javascript
  - typescript
  - ios
  - android
pricing_model: one-time
---

# Cross-Platform App (React Native)

## Description
Development of a single codebase app deployable to both iOS and Android using React Native (JavaScript/TypeScript).

## Scope Includes
- Setup React Native Environment (CLI or Expo)
- 5 Core Screens (Home, Profile, Settings, etc.)
- API Integration (Axios/Fetch)
- State Management (Redux/Context/Zustand)
- Build & Store Submission Prep

## Scope Excludes
- Complex Native Animations (Reanimated)
- Heavy Native Hardware Access (Bluetooth/AR)
- Backend Development (Assumes API exists)
- Custom Native Module Writing (Swift/Kotlin)

## Risk Factors
- Third-party library compatibility issues
- iOS CocoaPods & Android Gradle build errors
- Apple App Store rejection loops
- OS version fragmentation (Android)

## Notes for Agent
This estimate is for the APP ONLY. Backend is separate.
Ask client: "Do you prefer Expo or Bare React Native CLI?"
If Expo Managed Workflow, reduce hours by 10%.
If Bare Workflow with custom native code, add 20% buffer.
Add 20% buffer for store compliance issues.
