# ⚔️ Igris Soul

> Your loyal AI companion in the terminal.

Igris Soul is a personal AI assistant that lives directly in your computer's terminal.

Inspired by **Igris from Solo Leveling**, it combines **Google Gemini** with **Tavily web search** to help you ask questions, learn, search for recent information, and interact with an AI assistant without opening a browser.

You simply type:

```bash
Arise
```

And Igris awakens.

---

## ✨ What is Igris Soul?

Think of Igris Soul as your own AI assistant that runs directly from your terminal.

Instead of opening a website and starting a chat, open your terminal and type:

```bash
Arise
```

Igris comes online and waits for your commands.

For example:

```text
Who are you?
```

```text
Explain linked lists to me.
```

```text
What are the latest AI developments?
```

```text
What is happening in the Indian stock market?
```

Google Gemini handles the AI conversation, while Tavily allows Igris to search the web when fresh information is needed.

---

## 🧠 What Can Igris Do?

### 💬 AI Conversations

Have natural conversations with your AI assistant.

You can ask questions, learn concepts, brainstorm ideas, get explanations, or simply talk to Igris.

### 🌐 Fresh Web Information

Igris can search the web when you need information that may have changed recently.

For example:

```text
What are the latest AI news in India?
```

```text
What are the latest stock market trends?
```

### 👨‍💻 Programming Companion

Igris can help with:

* Programming concepts
* Data structures
* Algorithms
* Debugging
* Code explanations
* Software development
* Machine learning concepts
* Technical questions

### ⚔️ Solo Leveling Inspired Personality

Igris isn't just another terminal chatbot.

Its personality is inspired by the loyal knight **Igris** from Solo Leveling.

Expect your AI assistant to have a little more character than the average chatbot.

---

# 🚀 Getting Started

Don't worry if you're not a programmer.

If you can copy and paste commands into a terminal, you can set up Igris.

## Step 1 — Install Node.js

Igris requires **Node.js 20 or newer**.

If you already have Node.js installed, check your version:

```bash
node --version
```

If the version is `20` or higher, you're ready.

If you don't have Node.js, install it from the official Node.js website:

**https://nodejs.org/**

After installing Node.js, reopen your terminal.

---

## Step 2 — Install Igris Soul

Open your terminal and run:

```bash
npm install -g igris-soul
```

The `-g` means that Igris is installed globally.

This allows you to use the `Arise` command from anywhere on your computer.

---

## Step 3 — Awaken Igris

After installation, run:

```bash
Arise
```

You should see something similar to:

```text
+----------------------+
|        IGRIS         |
|      AGENT ONLINE    |
+----------------------+

Hi, My Lord, I am Igris, your loyal servant.
How may I assist you today?
```

Igris is now online.

---

# 🔑 First-Time Setup

The first time you run Igris, it will ask for two API keys.

Don't worry — this is a normal part of the setup.

You will be asked for:

```text
Enter your Gemini API key:
```

and:

```text
Enter your Tavily API key:
```

You only need to provide these during setup.

Igris automatically creates its own configuration folder and stores your keys locally.

You **do not need to manually create a `.env` file**.

---

# 🗝️ Getting Your API Keys

## Google Gemini API Key

Igris uses Google's Gemini models to power its AI.

You need a Gemini API key.

Create one through Google's Gemini API / AI Studio platform:

**https://aistudio.google.com/**

When Igris asks for the key, simply paste it into the terminal.

---

## 🌐 Tavily API Key

Tavily provides Igris with web-search capabilities.

Create a Tavily API key through:

**https://tavily.com/**

When Igris asks for the key, paste it into the terminal.

---

# 📁 Where Does Igris Store My Configuration?

Igris automatically creates:

```text
~/.igris/
```

Inside it, you'll find:

```text
.igris/
├── .env
└── user.json
```

### `.env`

Stores your API keys locally.

For example:

```text
GENAI_API_KEY=your_gemini_key
TAVILY_API_KEY=your_tavily_key
```

### `user.json`

Stores your name so Igris can remember how to address you.

---

# 🔐 API Key Safety

Your API keys are stored in your local Igris configuration folder.

You don't need to put your API keys inside the project source code.

**Never share your API keys publicly.**

Do not post them on:

* GitHub
* Social media
* Screenshots
* Public forums
* Public code repositories

---

# 💻 Using Igris

Once Igris is running, simply type your question.

For example:

```text
You: Explain recursion in simple terms.
```

Igris will respond directly in your terminal.

You can continue asking questions for as long as you want.

To close Igris, type:

```text
exit
```

or:

```text
quit
```

---

# ⚡ Quick Start

If Node.js is already installed:

```bash
npm install -g igris-soul
```

Then:

```bash
Arise
```

That's it.

---

# 🛠️ Available Commands

You can launch Igris using:

```bash
Arise
```

You can also use:

```bash
arise
```

```bash
igris
```

```bash
igris-soul
```

All of these launch the same Igris assistant.

---

# 🧩 How Igris Works

At a high level, Igris combines several technologies:

```text
                YOU
                 │
                 ▼
             ┌───────┐
             │ IGRIS │
             └───┬───┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
   Google Gemini       Tavily Search
   AI reasoning       Fresh web data
        │                 │
        └────────┬────────┘
                 ▼
             IGRIS RESPONSE
```

### Google Gemini

Provides the AI intelligence behind Igris.

### Tavily

Allows Igris to retrieve fresh information from the web when needed.

### Terminal CLI

Makes the entire experience available directly from your command line.

---

# 🧑‍💻 For Developers

Igris Soul is built using:

* Node.js
* Google Gemini
* LangChain
* Tavily
* Zod
* dotenv

Install it with:

```bash
npm install -g igris-soul
```

Run it with:

```bash
Arise
```

Igris Soul is primarily designed as a **global terminal AI assistant**, rather than a library that you import into another application.

---

# 📦 npm Package

Package name:

```text
igris-soul
```

Install:

```bash
npm install -g igris-soul
```

Launch:

```bash
Arise
```

---

# 🐛 Troubleshooting

## `Arise` is not recognized

Make sure Igris is installed globally:

```bash
npm install -g igris-soul
```

Then restart your terminal and run:

```bash
Arise
```

You can check whether Igris is installed with:

```bash
npm list -g igris-soul
```

---

## Igris asks for my API key again

This usually means the required API key isn't currently stored in your local Igris configuration.

Simply enter the requested API key again.

Igris will save it locally for future sessions.

---

## Igris doesn't provide recent information

Make sure your Tavily API key is configured correctly.

Tavily provides Igris's web-search capability.

---

# ❤️ Why I Built Igris

Igris Soul started as an experiment in building a personal AI assistant that doesn't live inside a browser.

The goal was simple:

> **Make AI feel like a tool that's always available on your machine.**

Open a terminal.

Type:

```bash
Arise
```

And your assistant is ready.

---

# ⚔️ The Philosophy

Igris is inspired by one simple idea:

> **An assistant should be ready when you need it.**

No browser.

No complicated interface.

Just your terminal, your commands, and your AI companion.

---

# 📜 License

ISC License

---

# ⭐ Support the Project

If you find Igris Soul useful, consider giving the project a ⭐ on GitHub and sharing it with other developers and AI enthusiasts.

Every bit of support helps the project grow.

---

# ⚔️ Arise.

Your terminal awaits.

**Igris is ready, My Lord.**
