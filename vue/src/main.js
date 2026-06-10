import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/milk-tea-price/', // ⭐ 關鍵：加上這行，兩邊都要有斜線！
})