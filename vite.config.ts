import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, presetWind } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
        'pinia',
      ],
      dts: 'src/autoImports.d.ts',
      dirs: [
        'src/server/api',
        'src/composables',
        'src/stores',
      ],
      vueTemplate: true,
    }),

    // your plugin installation
    Components({
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      shortcuts: {
        'border-base': 'border-gray/20 dark:border-gray/15',
        'bg-base': 'bg-gray:15 dark:bg-[#17171A]',
        'bg-card': 'bg-white dark:bg-[#2A2A2B]',
        'bg-header': 'bg-white dark:bg-[#232324]',
        'bg-sider': 'bg-white dark:bg-[#232324]',
        'icon-btn': 'op30 hover:op100]',
      },
      presets: [
        presetAttributify(),
        presetUno(),
        presetIcons({
          scale: 1.2,
        }),
        presetWind(),
      ],
    }),
  ],
})

