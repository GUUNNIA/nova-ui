import type { Preview } from "@storybook/react";
// 모든 스토리에서 디자인 토큰을 사용할 수 있도록 전역 로드합니다.
import "../src/tokens/tokens.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    backgrounds: {
      default: "paper",
      values: [
        { name: "paper", value: "#faf7f2" },
        { name: "surface", value: "#ffffff" },
      ],
    },
  },
};

export default preview;
