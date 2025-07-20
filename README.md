![icon](./docs/icon128.png)
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

### V1: Chrome extension can save vocabulary
- User can save words and phrases they encounter while browsing the web
- User can view their saved vocabulary
- User can clear all vocabulary
- User can export their vocabulary to a JSON file

![Demo](./docs/demo_v1.gif)

### V2: 🚧 [ In Progress ] Mobile app can display a list of vocabulary 🚧
- User can create new vocabulary in mobile app
  - Backend API to handle syncing
    - [x] Create User
    - [x] Authenticate User
    - [x] Create Vocabulary
  - Frontend to create vocabulary
    - [] Simple UI to create vocabulary
- User can view their saved vocabulary on mobile app
  - Backend API to handle fetching vocabulary
    - [x] Get Vocabulary
  - Frontend to display vocabulary
    - [] Very simple UI to display vocabulary as flash cards

### V3: Chrome extension can sync with mobile app
- Create/login functionality for chrome extension
- User can sync their vocabulary from Chrome extension to mobile app

### V4: Mobile app can fetch definitions and sample sentences
- User can create vocabulary from mobile app
- User can fetch definition and sample sentences for their vocabulary list through mobile app

## Tech Stack
- Chrome Extension
- React Native (Expo)
- FeatherJS
- SQLite
- JWT for authentication