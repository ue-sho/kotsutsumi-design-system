# @kotsutsmi/tokens

kotsutsmi デザインシステムのデザイントークン。

## 構成

`tokens/**/*.json` が単一の真実。Style Dictionary が CSS 変数と TypeScript 定数を生成する。

```
tokens/
├─ color/
│  ├─ primitive/     素の色値
│  └─ semantic/      用途で命名し primitive を参照
├─ spacing.json
├─ border.json       radius, borderWidth
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

## 使い方

```ts
// CSS 変数
import '@kotsutsmi/tokens/tokens.css';

// TypeScript から値を参照
import { tokens } from '@kotsutsmi/tokens';
```

## コマンド

| コマンド     | 内容                                             |
| ------------ | ------------------------------------------------ |
| `pnpm build` | JSON → `dist/{tokens.css,tokens.js,tokens.d.ts}` |
| `pnpm lint`  | oxlint + oxfmt + tsc                             |
| `pnpm clean` | `dist` を削除                                    |

## ダークモードの追加方法

セマンティック層があるため、テーマ追加は変数の再定義だけで済む。

```css
[data-theme='dark'] {
  --kt-color-semantic-bg-base: var(--kt-color-primitive-gray-900);
  --kt-color-semantic-text-primary: var(--kt-color-primitive-gray-0);
}
```

## 既知の制約

`--kt-font-family-sans` の値は空白を含むフォント名（`Hiragino Sans` 等）がクォートされずに出力される。全ブラウザが解釈するため実害はないが、厳密には CSS 仕様に沿わない。クォートが必要になった場合は Style Dictionary に custom transform を追加する。
