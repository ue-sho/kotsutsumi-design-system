# TextField

TextField を追加。可視ラベル、補足、必須表示、エラー、無効状態を備えたネイティブのフォーム部品。

```tsx
import { TextField } from '@uesho/kotsutsumi-ui';
<TextField label="内容" name="description" hint="入力の手がかり" />;
```

`value` / `onChange` と `defaultValue` の両方に対応。`ref` はネイティブ要素に転送する。
`id` 省略時は `useId` で生成し、ラベル・補足・エラーを関連づける。
外部の `aria-describedby` と内部説明を結合する。検証は利用側で行い、`error` に訂正方法を渡す。
`className` はコントロールに適用する。色・余白・フォーカスは Civic Blue トークンを使う。
