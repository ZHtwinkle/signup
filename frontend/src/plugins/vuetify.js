// Vuetify 主题配置
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1976D2',       // 更专业的蓝色
          secondary: '#424242',     // 深灰色
          accent: '#82B1FF',        // 亮蓝色
          success: '#4CAF50',       // 绿色
          info: '#2196F3',          // 信息蓝
          warning: '#FB8C00',       // 橙色警告
          error: '#FF5252',         // 错误红
          background: '#F5F7FA',    // 浅灰背景
          surface: '#FFFFFF',       // 白色表面
          'primary-darken-1': '#1565C0', // 深蓝色
          'grey-lighten-3': '#EEEEEE',   // 浅灰色
          'grey-lighten-1': '#BDBDBD',   // 中灰色
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#2196F3',       // 蓝色
          secondary: '#424242',     // 深灰色
          accent: '#82B1FF',        // 亮蓝色
          success: '#4CAF50',       // 绿色
          info: '#2196F3',          // 信息蓝
          warning: '#FB8C00',       // 橙色警告
          error: '#FF5252',         // 错误红
          background: '#121212',    // 深色背景
          surface: '#212121',       // 表面色
          'primary-darken-1': '#1565C0', // 深蓝色
          'grey-lighten-3': '#424242',   // 深灰色
          'grey-lighten-1': '#757575',   // 中灰色
        }
      }
    }
  }
});
