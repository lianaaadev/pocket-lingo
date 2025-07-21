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

### V2: Mobile app can display a list of vocabulary 
- User can view their saved vocabulary on mobile app
  - Backend API to handle fetching vocabulary
    - [x] Get Vocabulary by user token
  - Frontend to display vocabulary
    - [x] Very simple UI to display vocabulary as flash cards

![DemoV2](./docs/demo_v2.gif)

### V3: 🚧 [ In Progress ] Mobile app basic enhancements 🚧
- User can refresh page to fetch latest vocabulary
- User can login to mobile app
  - Backend API to handle login
    - [x] Authenticate User
  - Frontend to handle login
    - [] Login screen
    - [x] Token storage
- User can create account on mobile app
  - Backend API to handle account creation
    - [x] Create User
  - Frontend to handle account creation
    - [] Register screen 
- User can create new vocabulary in mobile app
  - [x] Backend - create vocabulary
  - [] Frontend - Simple UI to create vocabulary

### V4: Chrome extension can sync with mobile app
- Create/login functionality for chrome extension
- User can sync their vocabulary from Chrome extension to mobile app

### V5: Mobile app can fetch definitions and sample sentences
- User can create vocabulary from mobile app
- User can fetch definition and sample sentences for their vocabulary list through mobile app

## Tech Stack
- Chrome Extension
- React Native (Expo)
- FeatherJS
- SQLite
- JWT for authentication