# Pocket Lingo - Chrome Extension

A vocabulary bank for language learners.

## Chrome Extension File Structure
```
chrome-extension/
├── background/
│   └── background.js 
├── content/
│   └── content.js 
├── popup/
│   ├── popup.html 
│   ├── popup.css 
│   └── popup.js 
├── icons/
│   ├── icon16.png 
│   ├── icon48.png 
│   └── icon128.png 
├── manifest.json  

```

## Features

### V1
- User can save words and phrases they encounter while browsing the web
- User can view their saved vocabulary
- User can clear all vocabulary
- User can export their vocabulary to a JSON file
![Demo](./docs/demo_v1.gif)

### V2 (Building...)
- User can sync their vocabulary with mobile app
  - Backend API to handle syncing
    - [x] Create User
    - [x] Authenticate User
    - [] Create Vocabulary
- User can view their saved vocabulary on mobile app
  - Backend API to handle fetching vocabulary
    - [] Get Vocabulary
  - Frontend to display vocabulary
    - [] Very simple UI to display vocabulary as flash cards

### Tech Stack
- Chrome Extension
- React Native (Expo)
- FeatherJS
- SQLite
- JWT for authentication