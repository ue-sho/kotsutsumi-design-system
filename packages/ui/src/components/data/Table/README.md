# Table

Table を追加。金額・使用量など、列と行の関係を伝えるセマンティックな表。

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '@uesho/kotsutsumi-ui';
<Table caption="2026年10月の支出（税込・円）">
  <TableHead>
    <TableRow>
      <TableHeaderCell>内容</TableHeaderCell>
      <TableHeaderCell numeric>金額</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableHeaderCell scope="row">食費</TableHeaderCell>
      <TableCell numeric>6,480</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

`caption` は必須。見出しセルの既定は `scope="col"`、行見出しは `scope="row"`。
`numeric` で右寄せ・等幅数字を適用する。横幅が足りない場合は、フォーカス可能な領域内で横スクロールする。
ソート・ページ送り・データ取得は含まない。空状態や合計行は利用側でセマンティクスに沿って構成する。
