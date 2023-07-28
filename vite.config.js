import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const path = fileURLToPath(new URL(import.meta.url));
const root = resolve(dirname(path));

export default {
  root,
  plugins: [vue()],
};
