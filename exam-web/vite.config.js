import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// import OptimizationPersist from 'vite-plugin-optimize-persist'
// import PkgConfig from 'vite-plugin-package-config'
// import Components from 'unplugin-vue-components/vite';
// import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import vitePluginForArco from '@arco-plugins/vite-vue'
// import svgLoader from 'vite-svg-loader'
const { resolve } = require('path')
// https://vitejs.dev/config/
export default ({ mode }) => {
  const app_ip = loadEnv(mode, process.cwd()).VITE_API_HOST_IP
  const app_host = `http://${app_ip}`
  const user_path = loadEnv(mode, process.cwd()).VITE_USER_API_URL
  const exam_path = loadEnv(mode, process.cwd()).VITE_EXAM_API_URL
  const auth_path = loadEnv(mode, process.cwd()).VITE_AUTH_API_URL
  const message_path = loadEnv(mode, process.cwd()).VITE_MESSAGE_API_URL
  const file_path = loadEnv(mode, process.cwd()).VITE_FILE_API_URL
  return defineConfig({
    plugins: [
      vue(),
      // PkgConfig(),
      // OptimizationPersist()
      // svgLoader(),
      //按需加载
      vitePluginForArco({
        theme: '@arco-themes/vue-mgo-blog',
        style: 'css',
        // iconPrefix:'icon'
      }),
    ],
    server: {
      open: '/',
      port: 3030,
      host: '0.0.0.0',
      proxy: {
        //用户微服务
        '/api': {
          target: "http://localhost:1234",
          changeOrigin: true,
        },

      }
    },
    resolve: {
      alias: [//配置别名
        { find: '@', replacement: resolve(__dirname, 'src') },
        { find: '@views', replacement: resolve(__dirname, 'src/views') }
      ],
      // 情景导出 package.json 配置中的exports字段
      conditions: [],
      // 导入时想要省略的扩展名列表
      // 不建议使用 .vue 影响IDE和类型支持
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
  })
}
