# Badge

Badge を追加。資料の分類や確認状況を短い文字で示すインラインラベル。

```tsx
import { Badge } from '@uesho/kotsutsumi-ui';
<Badge tone="warning">要確認</Badge>;
```

`tone`: neutral（分類）、info（補足）、success（正常）、warning（要確認）、danger（異常）。
操作ボタンとしては使わず、色だけに意味を持たせない。通常の支出や使用量は警告色にしない。
自動読み上げは行わない。状態変化の通知には利用側のライブ領域を使う。
