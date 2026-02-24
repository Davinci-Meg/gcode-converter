# G-code Converter

[gcoordinator](https://github.com/search?q=gcoordinator) で生成した G-code を **Bambu Lab A1** で印刷できる形式に変換する Web アプリケーションです。ファイルのアップロードから 3D プレビュー、安全性チェック、ダウンロードまでブラウザ上で完結します。

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-yellow)

> **Live Demo:** https://gcode-converter.vercel.app

## ✨ Features

- **G-code 自動変換** — gcoordinator の出力を Bambu Lab A1 用ヘッダー/フッター付き G-code に変換
- **3D プレビュー** — Three.js によるリアルタイムツールパス表示、レイヤースライダーで層ごとに確認
- **安全性チェック** — 座標範囲・温度・速度などのバリデーション警告を自動検出
- **フィラメントプリセット** — PLA / PETG / TPU / ABS 等の温度・速度を自動設定
- **自動センタリング** — ビルドボリューム (256 x 256 x 256 mm) に合わせたオフセット調整
- **カスタム G-code** — 開始/終了 G-code テンプレートの上書きに対応
- **7 言語対応** — 日本語 / English / 简体中文 / 한국어 / Español / Deutsch / Français
- **ブラウザ完結** — ファイルはサーバーに送信されず、すべてクライアント側で処理

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui |
| 3D | Three.js, React Three Fiber, React Three Drei |
| State | Zustand |
| Testing | Vitest, Playwright |
| Deploy | Vercel |

## 📦 Installation

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/Davinci-Meg/gcode-converter.git
   cd gcode-converter
   ```
2. **依存関係をインストール**
   ```bash
   pnpm install
   ```
3. **開発サーバーを起動**
   ```bash
   pnpm dev
   ```
4. http://localhost:3000 を開く

## 🚀 Usage

1. `.gcode` / `.gc` / `.g` ファイルをドラッグ＆ドロップでアップロード（最大 50 MB）
2. 「材料」タブでフィラメント種類・温度を設定、「印刷」タブで速度・オフセットを調整
3. 右側の 3D ビューでツールパスを確認、レイヤースライダーで層ごとに表示
4. 「Bambu A1 用に変換」ボタンで変換し、ファイルをダウンロード
5. FAT32 フォーマットの microSD にコピーして Bambu Lab A1 に挿入して印刷

## 🌐 Supported Languages

| Language | Code |
|---|---|
| 日本語 | `ja` |
| English | `en` |
| 简体中文 | `zh-CN` |
| 한국어 | `ko` |
| Español | `es` |
| Deutsch | `de` |
| Français | `fr` |

> 日本語以外の翻訳は AI によって生成されています。

## 📁 Project Structure

```
src/
├── app/                # Next.js App Router pages
├── components/
│   ├── layout/         # Header, Footer, StatusBar, LanguageSwitcher
│   ├── upload/         # File upload (drag & drop)
│   ├── settings/       # Filament / Print / Advanced tabs
│   ├── preview/        # 3D viewer (Three.js)
│   ├── convert/        # Convert & Download buttons
│   ├── warnings/       # Safety warnings display
│   └── ui/             # shadcn/ui components
├── lib/
│   ├── gcode/          # Parser, Converter, Validator
│   ├── i18n/           # Internationalization (7 locales)
│   ├── filament-presets/
│   ├── printer-profiles/
│   └── templates/      # Start/End G-code templates
├── stores/             # Zustand stores
└── hooks/              # Custom React hooks
```

## ⚠️ Disclaimer

- This tool is **not** an official Bambu Lab product. It has no affiliation with Bambu Lab.
- Use converted G-code **at your own risk**. The developer assumes no responsibility for any damage caused by use of this tool.
- Always supervise the first print with converted G-code. Stop the printer immediately if you observe any abnormal behavior.

## 📄 License

MIT License
