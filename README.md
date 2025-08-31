# Notes App - Dicoding Submission
This repository contains the submission project for the **"Belajar Dasar Pemrograman JavaScript"** final Notes App project provided by Dicoding.
The app demonstrates fetching data from RESTful API, using Web Components, and applying animations & feedback mechanisms.

## Technologies Used
- JavaScript (ES6+)
- Web Components
- Node.js & npm
- Webpack
- GSAP (for animations)
- SweetAlert2 (for feedback messages)
- Fetch API

## Features
- Add new notes
- Display active notes from Notes API
- Archive / Unarchive notes
- Delete notes
- Loading indicators while fetching API data
- Smooth animations for adding, archiving, and unarchiving notes
- User-friendly feedback on success or error

## Project Structure
```plaintext
📂 notes-app-RESTful-API
├── src/                        # Main source code
│   ├── api/                    # All API interactions
│   │   └── notes-api.js
│   ├── components/             # Web components & reusable UI
│   │   ├── app-header.js
│   │   ├── app-loading.js
│   │   ├── form-custom-validation.js
│   │   ├── note-card.js
│   │   └── note-form.js
│   ├── styles.css              # CSS files
│   ├── index.js                # Main entry point
│   └── index.html              # Main HTML file
├── .babelrc                    # Babel configuration
├── .prettierrc                 # Prettier configuration
├── .gitignore                  # Git ignore file
├── package.json
├── package-lock.json
├── README.md
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js

```

## How to Run
1. Clone this repository:
```bash
git clone https://github.com/SltnBM/notes-app-RESTful-API.git
```
2. Navigate into the project folder:
```
cd notes-app
```
3. Install dependencies:
```bash
npm install
```
4. Run development server:
```bash
npm run start-dev
```
5. Build for production:
```bash
npm run build
```
Open browser at `http://localhost:8080` (default webpack-dev-server).

## Certificate
Successfully completed the "Belajar Fundamental Front-End Web Development" course on Dicoding.

[View Certificate](https://www.dicoding.com/certificates/6RPNG6WM9Z2M)