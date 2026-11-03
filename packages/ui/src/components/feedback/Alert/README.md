# Alert

Alert を追加。保存結果や契約更新など、理由と次の行動を示すまとまった通知。

```tsx
import { Alert } from '@uesho/kotsutsumi-ui';
<Alert tone="warning" title="契約の更新時期が近づいています">
  11月15日までに補償内容を確認してください。
</Alert>;
```

`tone` は info / success / warning / danger。見出しと本文で理由・次の行動を説明する。
静的な案内は `live="off"`（既定）、既存領域を動的に更新する通知は `live="polite"`。
緊急で作業を中断する必要がある場合のみ assertive を使う。
ライブ領域は通知前からDOMに配置し、本文を更新する。自動フォーカスや自動消去は行わない。
