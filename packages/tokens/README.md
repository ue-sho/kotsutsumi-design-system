# @uesho/kotsutsumi-tokens

kotsutsumi デザインシステムのデザイントークン。

## 構成

`tokens/**/*.json` が単一の真実。Style Dictionary が CSS 変数と TypeScript 定数を生成する。

```
tokens/
├─ color/
│  ├─ primitive/     素の色値
│  └─ semantic/      用途で命名し primitive を参照
├─ spacing.json
├─ border.json       radius, borderWidth
├─ motion.json       duration, easing
└─ typography/       fontFamily, fontSize, fontWeight, lineHeight
```

## 2層構造

プリミティブとセマンティックを分ける。

```jsonc
// tokens/color/primitive/blue.json
{ "color": { "primitive": { "blue": { "600": { "value": "#228be6" } } } } }

// tokens/color/semantic/background.json
{ "color": { "semantic": { "bg": { "accent": { "value": "{color.primitive.blue.600}" } } } } }
```

生成される CSS はセマンティック変数がプリミティブ変数を `var()` で参照する形になる（`outputReferences: true`）。

```css
:root {
  --kt-color-primitive-blue-600: #228be6;
  --kt-color-semantic-bg-accent: var(--kt-color-primitive-blue-600);
}
```

コンポーネントは必ずセマンティック変数を参照する。プリミティブを直接参照するとテーマ切り替えができなくなる。

## Motion トークン

`motion.duration.*` と `motion.easing.*` を用意し、コンポーネントの transition は
ハードコードせずトークン経由にする。

```css
transition: background-color var(--kt-motion-duration-fast)
  var(--kt-motion-easing-standard);
```

## Civic Blue

公開比較案の [01 Civic Blue](https://kotsutsumi-design-lab.tiledcrab.chatgpt.site/#concept/civic)
を採用する。知的・継続・洗練を、次の原則として設計する。

- **迷わず把握できる**: 状態・比較対象・次の操作を明確にし、色に言葉を添える。
- **積み重ねが見える**: 日付・期間・単位を揃え、履歴や推移へつなぐ。
- **落ち着いて使える**: 文字・余白・罫線で整理し、青は操作と選択に使う。

### 配色と役割

| 用途                     | トークン                                   | 値        |
| ------------------------ | ------------------------------------------ | --------- |
| 基準背景                 | `color.semantic.bg.base`                   | `#FFFFFF` |
| 補助背景                 | `color.semantic.bg.subtle`                 | `#F1F4F8` |
| 本文・見出し             | `color.semantic.text.primary`              | `#192739` |
| 控えめな補足             | `color.semantic.text.muted`                | `#526176` |
| リンク・操作・主要ボタン | `color.semantic.text.accent` / `bg.accent` | `#1749C6` |
| 通常の区切り             | `color.semantic.border.default`            | `#D1D9E4` |
| 識別が必要な境界         | `color.semantic.border.strong`             | `#526176` |
| キーボードフォーカス     | `color.semantic.border.focus`              | `#2563EB` |

`gray` は青寄りの低彩度ランプ。本文とリンクは白・補助背景に対して
4.5:1以上、`border.strong` と `border.focus` は同じ背景に対して3:1以上を
確保する。薄い `border.default` / `border.subtle` は情報の装飾的な区切りに
使い、入力欄など識別が必要な部品の唯一の手がかりにはしない。
無効状態の文字は通常の本文に流用しない。

`color.semantic.status` は `success`（確認済み・正常）、`warning`（要確認）、
`danger`（異常・入力エラー）の文字色と、それぞれの `*-subtle` 背景を持つ。
色だけで状態を伝えず、ラベルや理由を併記する。通常の収入・支出・使用量には使わない。

`color.semantic.chart` は `electricity` / `gas` / `water` の系列色。
青が操作色と同じ値でも、グラフでは状態や操作を意味しない。
系列名・数値・凡例や表を併記し、色だけで系列を判別させない。

### 文字・余白・形

16pxを基準に、文字サイズは12 / 14 / 16 / 20 / 24 / 28 / 36px。
記事とアプリは同じ書体・サイズ体系を共有し、本文の行間は1.6、長文は1.9を使う。
日時やコードには `fontFamily.mono`、金額などの数値には利用側で
`font-variant-numeric: tabular-nums` を指定する。

余白は4pxを基本単位とする。`2xs` から `3xl` は4 / 8 / 12 / 16 / 24 /
32 / 48 / 64px。`3xs` の2pxは微調整に限定する。
既定の角丸は `radius.md` の3px、小さな部品は2px、大きな面は6px。
通常の罫線は1px、強調は2px。影は重なりを伝えるときに限定する。
書体・行間・モーション・影の既存トークンは継続する。

### 移行と確認

既存トークン名とCSS/TypeScriptの公開形式は維持する。色、文字サイズ、余白、
角丸の値は変わるため、利用画面の密度・折り返し・テーマ上書きを確認する。
デフォルトのコンポーネントにも新しい値が反映される。
Storybook の **Foundations / Civic Blue** で、原則、操作部品、配色、文字、余白を
まとめて確認できる。既存のコンポーネントStoriesでも利用状態を確認する。

これはデジタル庁の明快な情報設計に着想を得た独自のデザインであり、公式トークンの
再現や準拠認証を示すものではない。ダークテーマは含まない。

## 使い方

```ts
// CSS 変数
import '@uesho/kotsutsumi-tokens/tokens.css';

// TypeScript から値を参照
import { tokens } from '@uesho/kotsutsumi-tokens';
```

## コマンド

| コマンド     | 内容                                             |
| ------------ | ------------------------------------------------ |
| `pnpm build` | JSON → `dist/{tokens.css,tokens.js,tokens.d.ts}` |
| `pnpm lint`  | oxlint + oxfmt + tsc                             |
| `pnpm test`  | トークン参照と色のコントラストを検証             |
| `pnpm clean` | `dist` を削除                                    |

## ダークモードの追加方法

セマンティック層があるため、テーマ追加は変数の再定義だけで済む。

```css
[data-theme='dark'] {
  --kt-color-semantic-bg-base: var(--kt-color-primitive-gray-900);
  --kt-color-semantic-text-primary: var(--kt-color-primitive-gray-0);
}
```

## 備考

空白を含むフォント名（`Hiragino Sans` など）は Style Dictionary の custom
transform で自動的にクォートして出力している。`serif` や `sans-serif` などの
generic family はクォートしない。
