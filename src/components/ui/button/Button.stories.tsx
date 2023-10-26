import type { Meta, StoryObj } from '@storybook/react';
import { AtlusButton } from './atlus-button';
import { HiShare } from 'react-icons/hi2';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Atlus/Button',
  component: AtlusButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof AtlusButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Solid: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'orange',
  },
};

export const IconOnly: Story = {
  args: {
    children: <HiShare />,
    variant: 'solid',
    className: 'atlus-btn-53',
  },
};

export const IconLeft: Story = {
  args: {
    children: (
      <>
        <HiShare /> Share
      </>
    ),
    variant: 'solid',
    className: 'atlus-btn-53',
  },
};

export const IconRight: Story = {
  args: {
    children: (
      <>
        Share
        <HiShare />
      </>
    ),
    variant: 'solid',
    className: 'atlus-btn-53',
  },
};
