# @ue-sho/kotsutsumi-ui

kotsutsumi デザインシステムの UI コンポーネント。

## 使い方

コンポーネント CSS にトークンを内包しているため、基本は `@ue-sho/kotsutsumi-ui/styles.css`
だけを読み込めば動く。

```ts
import '@ue-sho/kotsutsumi-ui/styles.css';
import { Button } from '@ue-sho/kotsutsumi-ui';

<Button variant="primary" size="md">送信</Button>;
```

トークン値を TypeScript から参照したい場合だけ、`@ue-sho/kotsutsumi-tokens` を追加で import
する。

## スタイリングの方針

CSS Modules を使うが、**構造にのみ**使う。色・余白・角丸・書体は必ず
`--kt-*` のセマンティックトークンを経由する。

理由はビルド後のクラス名がハッシュ化される（`kt-button-2ZuB7`）ため、
利用側から特定のクラスを狙って上書きできないこと。トークンを CSS 変数として
公開しておけば、利用側は変数の再定義でテーマを変更できる。

```css
/* 利用側でブランド色を差し替える */
:root {
  --kt-color-primitive-brand-600: #0f766e;
}
```

## コンポーネントの構成

1 コンポーネント 1 ディレクトリ、5 ファイルで固定する。

```
src/components/Button/
├─ Button.tsx                実装
├─ Button.module.css         スタイル（構造のみ）
├─ Button.module.css.d.ts    クラス名の型定義
├─ Button.stories.tsx        Storybook
└─ index.ts                  re-export
```

`*.module.css.d.ts` を手書きする理由は、`noUncheckedIndexedAccess` の下では
自動生成される `Record<string, string>` 型が全ての参照を
`string | undefined` に広げてしまうこと。クラス名を明示すると型が `string` に
保たれ、CSS 側から消したクラスを参照し続けているミスも型エラーになる。

CSS のクラスを追加・削除したら `.d.ts` も更新する。

## Button

```tsx
<Button
  variant="primary" | "secondary" | "ghost"   // 既定: primary
  size="sm" | "md" | "lg"                     // 既定: md
  fullWidth                                    // 既定: false
/>
```

`ButtonHTMLAttributes<HTMLButtonElement>` を継承するので `onClick` や
`aria-*` はそのまま渡せる。`ref` は `forwardRef` で透過する。

`type` の既定値は `"button"`。React の既定は `"submit"` で、form の中に置くと
クリックで意図せず送信されるため上書きしている。送信ボタンにしたい場合は
`type="submit"` を明示する。

## コマンド

| コマンド               | 内容                                       |
| ---------------------- | ------------------------------------------ |
| `pnpm storybook`       | 開発サーバ (http://localhost:6006)         |
| `pnpm build`           | `dist/{index.js,styles.css,*.d.ts}` を生成 |
| `pnpm build-storybook` | `storybook-static/` に静的出力             |
| `pnpm lint`            | oxlint + oxfmt + tsc                       |

## ビルドについて

`tsc` は CSS Modules を出力できないため Vite の library mode を使う。

CSS の出力名は `build.lib.cssFileName: 'styles'` で明示している。既定では
`dist/style.css`（単数）になり、`package.json` の `"./styles.css"` エクスポート
と食い違って 404 になる。
