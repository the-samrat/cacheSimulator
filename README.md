Cache Memory Simulator with Dynamic Replacement Policy Switching
📌 Project Overview

This project is a web-based simulation of a single-level cache memory system.
It implements two replacement policies:

FIFO (First In First Out)

LRU (Least Recently Used)

The simulator dynamically switches between these policies based on cache hit rate to improve performance.

🎯 Objective

To compare FIFO and LRU replacement policies and automatically switch between them when performance drops below a defined threshold.

Switching Rule:

After every N accesses:
If hit rate < 60% → Switch policy (FIFO ↔ LRU)

⚙ Features

Single-level cache simulation

Configurable cache size

FIFO implementation

LRU implementation

Rule-based dynamic switching

Live hit/miss tracking

Final performance metrics

Web-based visual interface

🧠 How It Works

User enters:

Cache size

Address sequence

Initial policy

N (switch check interval)

For each memory access:

Check for HIT or MISS

Update cache

Apply replacement policy if needed

After every N accesses:

Calculate hit rate

Switch policy if hit rate < 60%

📊 Metrics Displayed

Total Accesses

Hits

Misses

Final Hit Rate

Number of Policy Switches

Current Active Policy

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
