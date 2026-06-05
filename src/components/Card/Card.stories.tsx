import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardBody } from "./Card";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>디자인 시스템</CardTitle>
      </CardHeader>
      <CardBody>토큰을 기반으로 일관된 UI를 빠르게 구성할 수 있습니다.</CardBody>
    </Card>
  ),
};

export const Composed: Story = {
  render: () => (
    <Card elevated style={{ maxWidth: 360 }}>
      <CardHeader>
        <Badge tone="primary">NEW</Badge>
        <CardTitle style={{ marginTop: 8 }}>Nova UI 0.1</CardTitle>
      </CardHeader>
      <CardBody>첫 릴리스가 npm에 게시되었습니다.</CardBody>
      <div style={{ marginTop: 16 }}>
        <Button size="sm">자세히 보기</Button>
      </div>
    </Card>
  ),
};
