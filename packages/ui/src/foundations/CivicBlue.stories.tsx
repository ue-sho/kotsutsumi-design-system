import { tokens } from '@uesho/kotsutsumi-tokens';
import { Button } from '../components/Button';
import styles from './CivicBlue.module.css';
import type { Meta, StoryObj } from '@storybook/react-vite';

const semantic = tokens.color.semantic;
const groups = [
  ['背景', 'bg', semantic.bg],
  ['文字', 'text', semantic.text],
  ['境界', 'border', semantic.border],
  ['状態', 'status', semantic.status],
  ['グラフ', 'chart', semantic.chart],
] as const;

function CivicBlue() {
  return (
    <main className={styles.catalog}>
      <p className={styles.eyebrow}>KOTSUTSUMI / FOUNDATIONS</p>
      <h1>Civic Blue</h1>
      <p>知的・継続・洗練。暮らしの情報を整理し、日々の判断を助ける。</p>
      <div className={styles.principles}>
        <section>
          <h2>迷わず、把握できる。</h2>
          <p>状態・比較対象・次の操作を明確に。色には言葉を添えます。</p>
        </section>
        <section>
          <h2>積み重ねが、見える。</h2>
          <p>日付・期間・単位を揃え、記録から推移へつなぎます。</p>
        </section>
        <section>
          <h2>落ち着いて、使える。</h2>
          <p>文字・余白・罫線で整理し、青は操作と選択に使います。</p>
        </section>
      </div>
      <section className={styles.section}>
        <h2>操作の一貫性</h2>
        <div className={styles.actions}>
          <Button>記録を保存</Button>
          <Button variant="secondary">内容を確認</Button>
          <Button variant="ghost">履歴を見る</Button>
          <Button disabled>保存できません</Button>
        </div>
        <p>
          通常の支出や使用量は警告色にしません。状態色は異常や要確認の理由とともに表示します。
        </p>
      </section>
      {groups.map(([title, group, values]) => (
        <section className={styles.section} key={group}>
          <h2>{title}</h2>
          <div className={styles.colors}>
            {Object.entries(values).map(([name, value]) => (
              <div className={styles.color} key={name}>
                <div
                  className={styles.swatch}
                  style={{
                    backgroundColor: `var(--kt-color-semantic-${group}-${name})`,
                  }}
                />
                <strong>
                  {group}.{name}
                </strong>
                <code>{value}</code>
              </div>
            ))}
          </div>
        </section>
      ))}
      <section className={styles.section}>
        <h2>文字</h2>
        {Object.entries(tokens.fontSize).map(([name, value]) => (
          <p
            className={styles.typeSample}
            key={name}
            style={{ fontSize: `var(--kt-font-size-${name})` }}
          >
            <code>
              {name} / {value}
            </code>{' '}
            暮らしを、こつこつ整える。
          </p>
        ))}
        <p>
          本文は16px、行間1.6。長文は行間1.9、数字やコードには等幅書体を使います。
        </p>
      </section>
      <section className={styles.section}>
        <h2>余白</h2>
        <p>4pxを基本単位にし、2pxは微調整に限定します。</p>
        {Object.entries(tokens.spacing).map(([name, value]) => (
          <div className={styles.spaceSample} key={name}>
            <code>
              {name} / {value}
            </code>
            <span style={{ width: `var(--kt-spacing-${name})` }} />
          </div>
        ))}
      </section>
      <section className={styles.section}>
        <h2>角丸と罫線</h2>
        <p>
          既定の角丸は3px。通常の区切りには
          border.default、入力欄など識別が必要な境界には border.strong
          を使います。影は重なりを示す場合に限定します。
        </p>
      </section>
      <p>
        公開した「01 Civic
        Blue」を基準とする独自のデザインです。デジタル庁の公式トークンの再現や準拠認証を示すものではありません。
      </p>
    </main>
  );
}
const meta = {
  title: 'Foundations/Civic Blue',
  component: CivicBlue,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CivicBlue>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Foundations: Story = { name: '原則・トークン一覧' };
