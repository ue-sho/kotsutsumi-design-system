# @uesho/kotsutsumi-ui

## 0.3.0

### Minor Changes

- c5106d4: Alert を追加。保存結果や契約更新など、理由と次の行動を示すまとまった通知。
- 038fc45: Badge を追加。資料の分類や確認状況を短い文字で示すインラインラベル。
- 125cb5f: Checkbox を追加。確認済みの記録や複数項目の選択に使う、ネイティブのチェックボックス。
- 1a83442: RadioGroup を追加。集計期間など、複数の選択肢から一つを選ぶフォーム部品。
- fdb202f: Select を追加。可視ラベル、補足、必須表示、エラー、無効状態を備えたネイティブのフォーム部品。
- 7aa962b: Table を追加。金額・使用量など、列と行の関係を伝えるセマンティックな表。
- 3f968ed: Tabs を追加。同一画面内で関連する情報を切り替えるタブ。
- e172846: Textarea を追加。可視ラベル、補足、必須表示、エラー、無効状態を備えたネイティブのフォーム部品。
- a67ea08: TextField を追加。可視ラベル、補足、必須表示、エラー、無効状態を備えたネイティブのフォーム部品。

### Patch Changes

- 342caaf: Civic Blue に合わせて青・ニュートラルの配色、文字サイズ、余白、角丸を統一し、状態色とグラフ色のセマンティックトークンを追加。
  既存トークン名は維持するが値が変わるため、利用側の密度・折り返し・テーマ上書きを確認すること。

## 0.2.0

### Minor Changes

- c2bcea1: Add the journal UI primitives `Text`, `Heading`, `Card`, `Inline`, `Divider`, and `EmptyState`, all sharing the `primary | secondary | muted` tone API.

  Refine `Prose` selector specificity so composed primitives can keep their own `size` and `tone` styles.

## 0.1.0

### Minor Changes

- e1852db: Initialize public package release workflow with changesets and npm publishing.
