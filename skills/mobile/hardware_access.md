---
skill_id: mob_hardware_001
name: Native Hardware Access
domain: mobile
complexity: high
base_hours: 8
roles_required:
  - role: senior_dev
    percentage: 100
dependencies: []
risk_buffer: 30
tags:
  - mobile
  - hardware
  - bluetooth
  - camera
  - gps
  - nfc
  - native
pricing_model: one-time
---

# Native Hardware Access

## Description
Integration with device hardware features requiring native modules (Bluetooth, Camera, GPS, NFC, Sensors).

## Scope Includes
- Native Module Development (Swift/Kotlin)
- Permission Handling
- Background Processing
- Hardware Error Handling
- Testing on Physical Devices

## Scope Excludes
- Hardware manufacturing
- Firmware development
- Third-party hardware SDK licensing

## Risk Factors
- Hardware compatibility issues
- OS-level permission restrictions
- Battery optimization challenges
- Background process limitations

## Notes for Agent
This is an ADD-ON to mobile app projects.
Price per hardware feature (Bluetooth = 25h, Camera = 15h, NFC = 30h).
Requires physical device testing.
Add 30% buffer for hardware unpredictability.
