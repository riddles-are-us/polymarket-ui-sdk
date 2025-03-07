import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist",
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
  ],
  external: ["react", "react-dom"],
  
  // 添加选项忽略第三方库的循环依赖警告
  onwarn(warning, warn) {
    // 忽略d3-interpolate和recharts的循环依赖警告
    if (warning.code === 'CIRCULAR_DEPENDENCY' && 
        (warning.message.includes('d3-interpolate') || 
         warning.message.includes('recharts'))) {
      return;
    }
    // 对其他警告使用默认处理
    warn(warning);
  }
};
