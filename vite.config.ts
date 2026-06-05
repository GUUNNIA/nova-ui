import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

// 라이브러리 빌드 설정: src/index.ts 를 진입점으로 ESM + UMD 번들과 .d.ts 타입을 생성합니다.
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["src"], rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "NovaUI",
      fileName: "nova-ui",
    },
    rollupOptions: {
      // peerDependency 는 번들에 포함하지 않습니다.
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
