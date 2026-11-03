# RadioGroup

RadioGroup を追加。集計期間など、複数の選択肢から一つを選ぶフォーム部品。

```tsx
import { RadioGroup } from '@uesho/kotsutsumi-ui';
<RadioGroup
  label="集計期間"
  name="period"
  defaultValue="month"
  options={[
    { value: 'month', label: '月ごと' },
    { value: 'year', label: '年ごと' },
  ]}
/>;
```

`fieldset` / `legend` と同じ `name` のネイティブradioを使い、矢印キー・フォーム送信に対応。
`value` / `onValueChange` で制御、`defaultValue` で非制御として使える。
`disabled` は全体、`options[].disabled` は個別の選択肢に適用。
`required` / `hint` / `error` に対応。`value` は同一グループ内で一意、`name` は他のグループと重複させない。
