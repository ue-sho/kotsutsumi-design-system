# Checkbox

Checkbox を追加。確認済みの記録や複数項目の選択に使う、ネイティブのチェックボックス。

```tsx
import { Checkbox } from '@uesho/kotsutsumi-ui';
<Checkbox name="confirmed" label="確認済みにする" defaultChecked />;
```

`checked` / `onChange` と `defaultChecked` に対応。ラベル全体をクリックでき、Spaceで切り替わる。
`hint` / `error` と外部の `aria-describedby` を結合する。`ref` は input に転送する。
`indeterminate` は部分選択の視覚状態で、フォーム送信値は `checked` に従う。
クリック後も部分選択を維持する場合は、利用側で `indeterminate` を更新する。
