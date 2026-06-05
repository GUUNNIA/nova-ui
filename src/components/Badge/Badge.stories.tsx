import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Badge" },
  argTypes: {
    tone: { control: "select", options: ["neutral", "primary", "success", "danger", "info"] },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { tone: "neutral", children: "기본" } };
export const Primary: Story = { args: { tone: "primary", children: "강조" } };

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge tone="neutral">neutral</Badge>
      <Badge tone="primary">primary</Badge>
      <Badge tone="success">success</Badge>
      <Badge tone="danger">danger</Badge>
      <Badge tone="info">info</Badge>
    </div>
  ),
};
