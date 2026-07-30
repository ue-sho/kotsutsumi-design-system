# kotsutsmi Design System

個人サイト kotsutsmi のデザインシステム。

## 構成

```
packages/
├─ tokens/   @kotsutsmi/tokens  デザイントークン (Style Dictionary)
└─ ui/       @kotsutsmi/ui      React コンポーネント + Storybook
```

pnpm workspace + Turborepo。`ui` のビルドは `tokens/dist` を必要とするため、
`turbo.json` の `build` タスクに `dependsOn: ["^build"]` を置いて順序を保証している。

## 技術選定

| 領域          | 採用                                          |
| ------------- | --------------------------------------------- |
| トークン      | Style Dictionary（JSON → CSS 変数 + TS 定数） |
| スタイリング  | CSS Modules + PostCSS（autoprefixer）         |
| ビルド        | Vite library mode                             |
| カタログ      | Storybook 10 (React + Vite)                   |
| Lint / Format | oxlint / oxfmt                                |
| Git hooks     | lefthook + commitlint (Conventional Commits)  |

## セットアップ

```sh
pnpm install
pnpm build
pnpm storybook   # http://localhost:6006
```

## コマンド

ルートから実行するとどちらのパッケージにも伝播する。

| コマンド               | 内容                   |
| ---------------------- | ---------------------- |
| `pnpm build`           | 全パッケージをビルド   |
| `pnpm storybook`       | Storybook 開発サーバ   |
| `pnpm build-storybook` | Storybook を静的ビルド |
| `pnpm lint`            | oxlint + oxfmt + tsc   |
| `pnpm lint-fix`        | 自動修正               |

個別のパッケージを叩く場合。

```sh
pnpm tokens build
pnpm ui storybook
```

## 設計の要点

### トークンは 2 層構造

プリミティブ（素の色値）とセマンティック（用途で命名）を分ける。

```
--kt-color-primitive-brand-600: #5940a8;
--kt-color-semantic-bg-accent: var(--kt-color-primitive-brand-600);
```

コンポーネントはセマンティック層のみを参照する。この層があるため、
ダークモードの追加は `[data-theme="dark"]` でセマンティック変数を
再定義するだけで済む。

### CSS Modules は構造にのみ使う

ビルド後のクラス名はハッシュ化されるため、利用側から狙って上書きできない。
色や余白は CSS 変数を経由させることで、変数の再定義によるテーマ変更を可能にしている。

詳細は [packages/ui/README.md](packages/ui/README.md) を参照。

## Storybook の公開

Cloudflare Pages または Vercel のダッシュボードから GitHub 連携で設定する。
デプロイ用の GitHub Actions は置かない（ダッシュボード連携と二重管理になる）。

| 項目             | 値                                     |
| ---------------- | -------------------------------------- |
| Build command    | `pnpm install && pnpm build-storybook` |
| Output directory | `packages/ui/storybook-static`         |
| Node version     | 22 以上                                |

`build-storybook` タスクは `dependsOn: ["build"]` を持つため、トークンと
コンポーネントのビルドが先に走る。

## コミット

Conventional Commits に従う。lefthook が commit-msg で検証する。

```
feat(ui): Button に loading 状態を追加
fix(tokens): セマンティック変数の参照切れを修正
```

pre-commit で staged ファイルに oxfmt、pre-push で全体 lint が走る。
