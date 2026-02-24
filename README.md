# G-code Converter

[gcoordinator](https://github.com/search?q=gcoordinator) で生成した G-code を **Bambu Lab A1** で印刷できる形式に変換する Web アプリケーションです。

**Live Demo:** <https://gcode-converter.vercel.app>

---

## Features

- **G-code 変換** — gcoordinator の出力を Bambu Lab A1 用ヘッダー/フッター付き G-code に自動変換
- **3D プレビュー** — Three.js によるリアルタイムツールパス表示、レイヤースライダー対応
- **安全性チェック** — 座標範囲・温度・速度などのバリデーション警告
- **フィラメントプリセット** — PLA / PETG / TPU / ABS 等の温度・速度を自動設定
- **自動センタリング** — ビルドボリューム (256 x 256 x 256 mm) に合わせたオフセット調整
- **カスタム G-code** — 開始/終了 G-code テンプレートの上書き
- **7 言語対応** — 日本語 / English / 简体中文 / 한국어 / Español / Deutsch / Français
- **ブラウザ完結** — ファイルはサーバーに送信されず、すべてクライアント側で処理

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5, Tailwind CSS 4, shadcn/ui |
| 3D | Three.js, React Three Fiber, React Three Drei |
| State | Zustand |
| Testing | Vitest, Playwright |
| Deploy | Vercel |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

Open <http://localhost:3000> to use the app.

## Usage

1. **G-code をアップロード** — .gcode / .gc / .g ファイルをドラッグ＆ドロップ (最大 50 MB)
2. **設定を調整** — フィラメント種類・温度・速度・ベッドオフセットなどを設定
3. **プレビュー確認** — 3D ビューでツールパスを確認、レイヤーごとに表示可能
4. **変換＆ダウンロード** — 「Bambu A1 用に変換」ボタンで変換し、ファイルを保存
5. **SD カードに転送** — FAT32 フォーマットの microSD にコピーして A1 に挿入

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── layout/       # Header, Footer, StatusBar, LanguageSwitcher
│   ├── upload/       # File upload (drag & drop)
│   ├── settings/     # Filament / Print / Advanced tabs
│   ├── preview/      # 3D viewer (Three.js)
│   ├── convert/      # Convert & Download buttons
│   ├── warnings/     # Safety warnings display
│   └── ui/           # shadcn/ui components
├── lib/
│   ├── gcode/        # Parser, Converter, Validator
│   ├── i18n/         # Internationalization (7 locales)
│   ├── filament-presets/
│   ├── printer-profiles/
│   └── templates/    # Start/End G-code templates
├── stores/           # Zustand stores
└── hooks/            # Custom React hooks
```

## Disclaimer

This tool is **not** an official Bambu Lab product. Use converted G-code **at your own risk**. Always supervise the first print and stop immediately if any abnormal behavior occurs.

## License

MIT
