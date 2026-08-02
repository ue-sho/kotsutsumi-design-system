import { Container } from './Container';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Layout/Container',
  component: Container,
  args: {
    size: 'lg',
    px: 'md',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    px: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

const Panel = () => (
  <div
    style={{
      background: 'var(--kt-color-semantic-bg-subtle)',
      border:
        'var(--kt-border-width-thin) solid var(--kt-color-semantic-border-default)',
      borderRadius: 'var(--kt-radius-md)',
      padding: 'var(--kt-spacing-lg)',
    }}
  >
    Container content
  </div>
);

export const Playground: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <Container {...args}>
      <Panel />
    </Container>
  ),
};
