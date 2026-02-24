# SoundZoo — Animal & Bird Sound Explorer

A fun, interactive frontend web app that lets you click on animal and bird cards to hear their sounds — powered entirely by your browser's built-in **Speech Synthesis API**. No audio files, no backend, no external libraries.

---

## Description

SoundZoo displays a colorful grid of **15 animals** and **9 birds**. Click any card and your browser speaks the animal's sound aloud instantly. You can also upload your own animal image to preview it on the page.

---

## Features

- 🐾 **15 Animals** — Dog, Cat, Cow, Lion, Tiger, Elephant, Horse, Monkey, Goat, Sheep, Pig, Donkey, Camel, Bear, Wolf
- 🐦 **9 Birds** — Crow, Parrot, Owl, Peacock, Duck, Hen, Eagle, Sparrow, Pigeon
- 🔊 **Speech Synthesis** — Sounds spoken aloud via the Web Speech API (no audio files needed)
- 📷 **Image Upload** — Upload your own animal image and preview it on the page
- 🎨 **Colorful UI** — Vibrant gradient cards with hover lift and click animations
- 🌊 **Sound Wave Animation** — Animated wave bars play on each card while speaking
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile screens
- ♿ **Accessible** — Keyboard navigable (Tab + Enter/Space), ARIA labels on all interactive elements
- ⚡ **Zero Dependencies** — Pure HTML5, CSS3, and JavaScript

---

## Technologies Used

| Technology        | Purpose                             |
|-------------------|-------------------------------------|
| HTML5             | Semantic page structure             |
| CSS3              | Styling, animations, responsive grid|
| JavaScript (ES5+) | DOM manipulation, event handling    |
| Web Speech API    | Text-to-speech for animal sounds    |
| FileReader API    | Image upload and preview            |

---

## How to Run

### Option 1 — Open directly in browser
1. Download or clone this repository.
2. Double-click `index.html` to open it in your browser.

### Option 2 — VS Code Live Server (recommended)
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. The app opens at `http://127.0.0.1:5500`.

> **Tip:** Speech Synthesis works best in **Google Chrome** or **Microsoft Edge**.
> On Firefox, voices may load with a short delay on first click.

---

## Project Structure

```
SoundZoo/
│
├── index.html          ← Main HTML page (semantic structure)
├── style.css           ← All styles, animations, responsive layout
├── script.js           ← Data arrays, DOM generation, Speech, image upload
├── assets/
│   └── images/         ← Place your own animal images here
├── README.md           ← Project documentation (this file)
└── .gitignore          ← Files excluded from Git
```

---

## How to Push to GitHub

```bash
# 1. Initialize Git (only needed once)
git init

# 2. Stage all files
git add .

# 3. Create the first commit
git commit -m "Initial commit - SoundZoo project"

# 4. Create a new repo on GitHub, then link it
git remote add origin https://github.com/YOUR_USERNAME/soundzoo.git

# 5. Push to GitHub
git push -u origin main
```

---

## Screenshot

> *(Add a screenshot of the running app here)*

![SoundZoo Screenshot](assets/images/screenshot.png)

---

## License

This project is open source and free to use for learning and personal projects.
