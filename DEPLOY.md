# NTD Bid Tracker — Deployment Guide

## What's included
- index.html  — the full app
- manifest.json — PWA install config
- sw.js — service worker (offline support)
- icons/ — place your icon files here (see below)

---

## Step 1: Icons (optional but recommended)
Add two PNG icons to the /icons folder:
- icon-192.png (192x192px)
- icon-512.png (512x512px)

You can use any NTD logo or a simple placeholder. Without icons, the app still works but uses a default browser icon on the home screen.

---

## Step 2: Deploy to GitHub Pages

1. Go to github.com and sign in (create a free account if needed)
2. Click "New repository"
   - Name it: ntd-bid-tracker
   - Set to Private (keeps it out of your team's view)
   - Click "Create repository"
3. Upload all files (index.html, manifest.json, sw.js, icons folder)
   - Use "uploading an existing file" link on the repo page
   - Drag all files in, click "Commit changes"
4. Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / root
   - Click Save
5. After ~60 seconds your app is live at:
   https://YOUR-USERNAME.github.io/ntd-bid-tracker/

---

## Step 3: Install on iPad (Safari)

1. Open Safari on the iPad
2. Go to your GitHub Pages URL above
3. Tap the Share button (box with arrow)
4. Tap "Add to Home Screen"
5. Name it "NTD Bids" → tap Add

The app installs to the iPad home screen and runs fullscreen like a native app. Data saves to the device locally and persists between sessions.

---

## Notes
- Works completely offline once installed
- Data is stored on the device — it does not sync across devices
- To use on multiple devices, each device needs to be set up separately
- When Outlook/M365 is connected in the future, data sync can be added
