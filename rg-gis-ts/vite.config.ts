import type { UserConfig } from "vite"

export default {
  build: {
    rollupOptions: {
      external: new RegExp("/src/tests/.*"),
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
} satisfies UserConfig
