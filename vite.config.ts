import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

// Storybook이 이 설정을 함께 읽기 때문에,
// 라이브러리 빌드일 때만 타입 이름표(dts) 기계를 켭니다.
const isStorybook = process.argv.some((arg) => arg.includes("storybook"));

export default defineConfig({
  plugins: [react(), ...(isStorybook ? [] : [dts({ include: ["src"] })])],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "NovaUI",
      fileName: "nova-ui",
    },
    rollupOptions: {
      // peerDependency는 번들에 포함하지 않습니다.
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});