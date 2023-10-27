import type { Meta, StoryObj } from '@storybook/react';
import { AtlusButton } from './atlus-button';
import { HiShare } from 'react-icons/hi2';

const atlusButtonClassesOptions = {
  className: {
    control: { type: 'select' },
    options: ['atlus-btn-36', 'atlus-btn-38', 'atlus-btn-40', 'atlus-btn-45', 'atlus-btn-53'],
    if: { arg: 'variant', neq: 'icon-only' },
  },
};

const atlusButtonClassesIconOnlyOptions = {
  className: {
    control: { type: 'select' },
    options: ['atlus-btn-18', 'atlus-btn-20', 'atlus-btn-24', 'atlus-btn-30'],
    if: { arg: 'variant', eq: 'icon-only' },
  },
};

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
  argTypes: {},
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
  argTypes: {
    ...atlusButtonClassesOptions,
  },
};

export const IconOnly: Story = {
  args: {
    iconOnlyIcon: <HiShare />,
    variant: 'icon-only',
    className: 'atlus-btn-18',
  },
  argTypes: {
    ...atlusButtonClassesIconOnlyOptions,
  },
};

export const IconLeft: Story = {
  args: {
    leftIcon: <HiShare />,
    children: 'Share',
    variant: 'solid',
  },
  argTypes: {
    ...atlusButtonClassesOptions,
  },
};

export const IconRight: Story = {
  args: {
    rightIcon: <HiShare />,
    children: 'Share',
    variant: 'solid',
  },
  argTypes: {
    ...atlusButtonClassesOptions,
  },
};
