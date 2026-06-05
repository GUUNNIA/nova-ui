import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "이메일",
    placeholder: "you@example.com",
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: "회사 이메일을 입력해 주세요." },
};

export const Invalid: Story = {
  args: { invalid: true, hint: "올바른 이메일 형식이 아닙니다.", defaultValue: "not-an-email" },
};
