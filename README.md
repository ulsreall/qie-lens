<div align="center">

<img src="public/logo.png" alt="QIE Lens" width="120" />

# 🔍 QIE Lens

**Real-time Blockchain Explorer & Analytics Dashboard for QIE Network**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-00d4ff?style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?style=flat-square&logo=vercel)

[🚀 Live Demo](https://qie-lens.vercel.app) · [📖 QIE Docs](https://docs.qie.digital) · [🔗 Explorer](https://testnet.qie.digital) · [🐛 Report Bug](https://github.com/ulsreall/qie-lens/issues)

</div>

---

## 📸 Preview

<div align="center">
  <img src="public/preview.png" alt="QIE Lens Dashboard" width="100%" />
</div>

## 🎯 Problem

QIE Blockchain lacks a modern, user-friendly analytics dashboard. Existing explorers are functional but not optimized for quick insights — users need to dig through raw data to understand network health, transaction trends, and gas prices.

## 💡 Solution

QIE Lens provides a **clean, real-time dashboard** that surfaces the most important QIE network metrics at a glance:

- **Network health** — block time, utilization, gas prices
- **Transaction activity** — live feed with method decoding
- **Block production** — miner info, gas usage visualization
- **Market data** — QIE price, market cap, price change

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 **Network Stats** | Total blocks, transactions, addresses, market cap |
| 📈 **Area Chart** | Visual network overview with gradient fills |
| ⛽ **Gas Monitor** | Slow / Average / Fast gas price tracking with progress bars |
| 🧱 **Block Explorer** | Latest blocks with miner info and gas usage bars |
| 💸 **Transaction Feed** | Live transactions with method tags and status badges |
| 🔄 **Auto-refresh** | ISR with 30s revalidation — always fresh data |
| 📱 **Responsive** | Mobile-first design, works on all screen sizes |
| 🌙 **Dark Theme** | Navy/cyan color scheme matching QIE Lens branding |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Styling** | Tailwind CSS v4 |
| **Charts** | Recharts (AreaChart) |
| **Icons** | Lucide React |
| **Language** | TypeScript 5 |
| **API** | [QIE Blockscout API v2](https://testnet.qie.digital/api/v2/) |
| **Deployment** | Vercel |

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   QIE Lens                       │
│              (Next.js 16 App Router)             │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ StatCard │  │ Network  │  │ GasPrice │      │
│  │ (×4)     │  │ Chart    │  │ Card     │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│  ┌──────────────────┐  ┌──────────────────┐    │
│  │  BlockTable      │  │  TransactionTable │    │
│  │  (Latest 10)     │  │  (Latest 10)      │    │
│  └──────────────────┘  └──────────────────┘    │
│                                                  │
├─────────────────────────────────────────────────┤
│              QIE Blockscout API v2               │
│          https://testnet.qie.digital/api/v2      │
└─────────────────────────────────────────────────┘
```

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/ulsreall/qie-lens.git
cd qie-lens

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
qie-lens/
├── public/
│   └── logo.png              # QIE Lens logo
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind + custom utilities
│   │   ├── layout.tsx        # Root layout + metadata
│   │   └── page.tsx          # Main dashboard page
│   ├── components/
│   │   ├── StatCard.tsx      # Metric card with icon
│   │   ├── NetworkChart.tsx  # Area chart (Recharts)
│   │   ├── GasPriceCard.tsx  # Gas price monitor
│   │   ├── BlockTable.tsx    # Latest blocks table
│   │   └── TransactionTable.tsx # Latest transactions
│   └── lib/
│       └── api.ts            # QIE Blockscout API client
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

## 🔌 API Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `GET /api/v2/stats` | Network statistics |
| `GET /api/v2/blocks?limit=10` | Latest blocks |
| `GET /api/v2/transactions?limit=10` | Latest transactions |
| `GET /api/v2/tokens?limit=10` | Token list |

Base URL: `https://testnet.qie.digital/api/v2`

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#020a18` | Page background |
| Card | `#061024` | Card surfaces |
| Border | `#0c2a4a` | Card borders |
| Accent | `#00d4ff` | Primary cyan |
| Accent Light | `#5be5ff` | Hover states |
| Muted | `#3a6b8a` | Secondary text |

## 📄 License

MIT © [ulsreall](https://github.com/ulsreall)

---

<div align="center">

**Built with ❤️ for the QIE Hackathon 2026**

[![Twitter](https://img.shields.io/badge/Follow-@itseywacc-1DA1F2?style=flat-square&logo=x)](https://x.com/itseywacc)
[![GitHub](https://img.shields.io/badge/GitHub-ulsreall-181717?style=flat-square&logo=github)](https://github.com/ulsreall)

</div>
