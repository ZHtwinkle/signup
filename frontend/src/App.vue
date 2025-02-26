<template>
  <v-app>
    <!-- 现代化导航栏 -->
    <v-app-bar app color="primary" elevation="2" class="corporate-navbar">
      <v-container class="d-flex align-center px-4">
        <div class="d-flex align-center">
          <v-icon size="x-large" class="mr-2">mdi-account-group</v-icon>
          <v-app-bar-title class="text-h5 font-weight-bold">用户管理系统</v-app-bar-title>
        </div>
        
        <v-spacer></v-spacer>
        
        <!-- 桌面导航菜单 -->
        <div class="d-none d-sm-flex">
          <v-btn variant="text" to="/" class="mx-1 text-subtitle-2 font-weight-medium">
            <v-icon class="mr-1">mdi-home</v-icon>
            首页
          </v-btn>
          
          <template v-if="isLoggedIn">
            <v-btn variant="text" @click="goToProfile" class="mx-1 text-subtitle-2 font-weight-medium">
              <v-icon class="mr-1">mdi-account</v-icon>
              个人中心
            </v-btn>
            <v-btn variant="outlined" color="white" @click="logout" class="ml-2 text-subtitle-2 font-weight-medium">
              <v-icon class="mr-1">mdi-logout</v-icon>
              退出登录
            </v-btn>
          </template>
          
          <template v-else>
            <v-btn variant="text" to="/login" class="mx-1 text-subtitle-2 font-weight-medium">
              <v-icon class="mr-1">mdi-login</v-icon>
              登录
            </v-btn>
            <v-btn variant="outlined" color="white" to="/register" class="ml-2 text-subtitle-2 font-weight-medium">
              <v-icon class="mr-1">mdi-account-plus</v-icon>
              注册
            </v-btn>
          </template>
        </div>
        
        <!-- 移动端菜单 -->
        <div class="d-flex d-sm-none">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item to="/" prepend-icon="mdi-home" title="首页"></v-list-item>
              <v-divider v-if="isLoggedIn"></v-divider>
              <v-list-item 
                v-if="isLoggedIn" 
                @click="goToProfile" 
                prepend-icon="mdi-account" 
                title="个人中心"
              ></v-list-item>
              <v-list-item 
                v-if="isLoggedIn" 
                @click="logout" 
                prepend-icon="mdi-logout" 
                title="退出登录"
              ></v-list-item>
              <v-divider v-if="!isLoggedIn"></v-divider>
              <v-list-item 
                v-if="!isLoggedIn" 
                to="/login" 
                prepend-icon="mdi-login" 
                title="登录"
              ></v-list-item>
              <v-list-item 
                v-if="!isLoggedIn" 
                to="/register" 
                prepend-icon="mdi-account-plus" 
                title="注册"
              ></v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>

    <!-- 页面内容 -->
    <v-main>
      <v-container fluid class="pa-0 pa-sm-4">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>

    <!-- 现代化页脚 -->
    <v-footer app color="primary" class="py-2 corporate-footer">
      <v-container class="py-0">
        <v-row class="align-center" dense>
          <v-col cols="12" md="4" class="text-center text-md-left py-1">
            <div class="d-flex align-center justify-center justify-md-start">
              <v-icon size="small" class="mr-2">mdi-account-group</v-icon>
              <span class="text-subtitle-2 font-weight-bold white--text">用户管理系统</span>
            </div>
            <div class="text-caption text-grey-lighten-3">
              一个现代化的用户注册与登录系统
            </div>
          </v-col>
          
          <v-col cols="12" md="4" class="text-center py-1">
            <div class="text-caption text-grey-lighten-3">
              <v-icon size="x-small" class="mr-1">mdi-copyright</v-icon>
              {{ new Date().getFullYear() }} — 版权所有
            </div>
          </v-col>
          
          <v-col cols="12" md="4" class="text-center text-md-right py-1">
            <div class="d-flex align-center justify-center justify-md-end">
              <span class="text-caption text-grey-lighten-3 mr-2">关注我们</span>
              <v-btn icon variant="text" color="white" class="mx-1" size="small">
                <v-icon size="small">mdi-github</v-icon>
              </v-btn>
              <v-btn icon variant="text" color="white" class="mx-1" size="small">
                <v-icon size="small">mdi-linkedin</v-icon>
              </v-btn>
              <v-btn icon variant="text" color="white" class="mx-1" size="small">
                <v-icon size="small">mdi-twitter</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser']),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    goToProfile() {
      this.$router.push('/profile');
    }
  }
};
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 添加全局样式 */
.v-btn {
  letter-spacing: 0.5px;
  text-transform: none !important;
}

.v-card {
  transition: all 0.3s;
}

.v-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}
</style>