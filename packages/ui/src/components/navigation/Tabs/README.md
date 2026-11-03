# Tabs

Tabs を追加。同一画面内で関連する情報を切り替えるタブ。

```tsx
import { Tabs } from '@uesho/kotsutsumi-ui';
<Tabs
  label="エネルギーの種類"
  defaultValue="electricity"
  items={[
    { value: 'electricity', label: '電気', content: '電気の記録' },
    { value: 'water', label: '水道', content: '水道の記録' },
  ]}
/>;
```

水平タブの自動選択方式。左右矢印・Home・Endで移動と選択、無効タブをスキップ。
`value` / `onValueChange` で制御、`defaultValue` で非制御として使える。
`items[].value` は一意にする。指定値が無効・存在しない場合は最初の有効項目を表示する。
有効項目がない場合はパネルを表示しない。RTLの左右矢印にも対応。
非選択パネルはアンマウントするため、入力の保持が必要なら状態を上位で管理する。
URL遷移やページナビゲーションには使わず Link を使う。
