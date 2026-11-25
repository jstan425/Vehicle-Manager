# Issue: Web Rendering - Touch vs Mouse Event Mismatch

## 🔍 Description
When the app runs on web browsers, touch-based gestures (swipe, pinch-to-zoom) don't translate correctly to mouse events. Users cannot swipe between tabs or zoom images.

---

## 🐛 Steps to Reproduce
1. Run `npm start` and select "Web" target
2. Open in Chrome/Firefox browser
3. Try to:
   - Swipe left/right on dashboard → **No response** (works on mobile)
   - Pinch to zoom vehicle cards → **No response**
4. Click buttons → May trigger both click AND context menu

---

## 💡 Root Cause Analysis
- React Native's `react-native-gesture-handler` uses touch event APIs that don't exist in browsers
- Expo Router's file-based routing relies on swipe gestures for navigation
- Web browsers use mouse events (`mousedown`, `mousemove`) instead of touch events

---

## 🔧 Suggested Fixes (Future Work)

### Option A: Gesture Handler Polyfill (Recommended)
```typescript
// Add to web-specific layout component
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Initialize gesture handler polyfill for web
  import('react-native-gesture-handler').then(({ GestureHandlerRootView }) => {
    // Wrap app with GestureHandlerRootView on web
  });
}
```

### Option B: Expo Router Web Configuration
```typescript
// In app.config.ts or similar config
export const config = {
  // Enable web-specific gesture handling
  webBundler: 'metro',
};
```

### Option C: Alternative Navigation Pattern
- Replace swipe-based navigation with explicit buttons on web
- Detect platform and show/hide appropriate controls

---

## 📊 Impact Assessment
| Severity | Priority | Effort |
|----------|----------|--------|
| Medium (UX broken) | High | Low-Medium |

---

## ⏰ Timeline
**When to fix:** After core features are implemented, before user testing on web platform.
