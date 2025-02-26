<template>
  <div class="home">
    <v-container>
      <!-- 主要横幅区域 -->
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-card class="mt-4 overflow-hidden" elevation="4" rounded="lg">
            <v-img
              src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4582.jpg"
              height="300"
              cover
              class="align-end"
              gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)"
            >
              <v-card-title class="text-h3 font-weight-bold white--text pb-12 px-6">
                欢迎使用用户管理系统
              </v-card-title>
              <v-card-subtitle class="text-h6 white--text px-6 pb-6">
                安全、高效、易用的企业级用户认证解决方案
              </v-card-subtitle>
            </v-img>
            
            <v-card-text class="text-center pa-6">
              <p class="text-body-1 mt-4">
                基于最新技术栈构建的现代化用户认证系统，为企业提供安全可靠的身份验证服务。
              </p>
              <v-row justify="center" class="mt-6">
                <v-col cols="12" sm="8" md="6" class="text-center">
                  <v-btn
                    color="primary"
                    size="large"
                    block
                    to="/register"
                    v-if="!isLoggedIn"
                    elevation="2"
                    rounded
                    class="text-subtitle-1 py-6"
                  >
                    <v-icon left class="mr-2">mdi-account-plus</v-icon>
                    立即注册
                  </v-btn>
                  <v-btn
                    color="primary"
                    size="large"
                    block
                    to="/profile"
                    v-else
                    elevation="2"
                    rounded
                    class="text-subtitle-1 py-6"
                  >
                    <v-icon left class="mr-2">mdi-account</v-icon>
                    进入个人中心
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 系统特点区域 -->
      <v-row justify="center" class="mt-8">
        <v-col cols="12" md="10">
          <div class="text-h4 font-weight-bold text-center mb-8 primary--text">
            <v-icon large color="primary" class="mr-2">mdi-star</v-icon>
            系统特点
          </div>
          
          <v-row>
            <v-col cols="12" md="4">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  elevation="3"
                  :class="{ 'on-hover': isHovering }"
                  class="pa-6 h-100 transition-swing rounded-xl"
                >
                  <div class="d-flex justify-center mb-4">
                    <v-avatar color="primary" size="64" class="elevation-2">
                      <v-icon size="36" color="white">mdi-shield-lock</v-icon>
                    </v-avatar>
                  </div>
                  <v-card-title class="text-h5 d-flex justify-center font-weight-bold">
                    安全认证
                  </v-card-title>
                  <v-card-text class="text-center">
                    采用业界标准的 bcrypt 加密算法保护用户密码安全，JWT 令牌确保身份验证过程可靠无虞。
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  elevation="3"
                  :class="{ 'on-hover': isHovering }"
                  class="pa-6 h-100 transition-swing rounded-xl"
                >
                  <div class="d-flex justify-center mb-4">
                    <v-avatar color="primary" size="64" class="elevation-2">
                      <v-icon size="36" color="white">mdi-palette</v-icon>
                    </v-avatar>
                  </div>
                  <v-card-title class="text-h5 d-flex justify-center font-weight-bold">
                    现代界面
                  </v-card-title>
                  <v-card-text class="text-center">
                    基于 Vue.js 和 Vuetify 构建的美观响应式用户界面，提供卓越的用户体验和视觉效果。
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  elevation="3"
                  :class="{ 'on-hover': isHovering }"
                  class="pa-6 h-100 transition-swing rounded-xl"
                >
                  <div class="d-flex justify-center mb-4">
                    <v-avatar color="primary" size="64" class="elevation-2">
                      <v-icon size="36" color="white">mdi-database</v-icon>
                    </v-avatar>
                  </div>
                  <v-card-title class="text-h5 d-flex justify-center font-weight-bold">
                    数据存储
                  </v-card-title>
                  <v-card-text class="text-center">
                    采用高效的数据库技术，确保用户数据安全存储，支持高并发访问和快速检索。
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      
      <!-- 技术栈展示区域 -->
      <v-row justify="center" class="mt-12 mb-8">
        <v-col cols="12" md="10">
          <v-card elevation="3" rounded="lg" class="pa-6">
            <v-card-title class="text-h4 font-weight-bold text-center mb-6 primary--text">
              <v-icon large color="primary" class="mr-2">mdi-code-tags</v-icon>
              技术栈
            </v-card-title>
            
            <v-row justify="center" align="center">
              <v-col cols="6" sm="4" md="2" class="text-center">
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    :elevation="isHovering ? 8 : 2"
                    class="pa-4 transition-swing"
                    rounded="lg"
                  >
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                      height="60"
                      contain
                      class="mb-2"
                    ></v-img>
                    <div class="text-subtitle-2 font-weight-medium">Vuetify</div>
                  </v-card>
                </v-hover>
              </v-col>
              
              <v-col cols="6" sm="4" md="2" class="text-center">
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    :elevation="isHovering ? 8 : 2"
                    class="pa-4 transition-swing"
                    rounded="lg"
                  >
                    <v-img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"
                      height="60"
                      contain
                      class="mb-2"
                    ></v-img>
                    <div class="text-subtitle-2 font-weight-medium">Vue.js</div>
                  </v-card>
                </v-hover>
              </v-col>
              
              <v-col cols="6" sm="4" md="2" class="text-center">
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    :elevation="isHovering ? 8 : 2"
                    class="pa-4 transition-swing"
                    rounded="lg"
                  >
                    <v-img
                      src="https://docs.nestjs.com/assets/logo-small.svg"
                      height="60"
                      contain
                      class="mb-2"
                    ></v-img>
                    <div class="text-subtitle-2 font-weight-medium">NestJS</div>
                  </v-card>
                </v-hover>
              </v-col>
              
              <v-col cols="6" sm="4" md="2" class="text-center">
                <v-hover v-slot="{ isHovering, props }">
                  <v-card
                    v-bind="props"
                    :elevation="isHovering ? 8 : 2"
                    class="pa-4 transition-swing"
                    rounded="lg"
                  >
                    <v-img
                      src="https://www.sqlite.org/images/sqlite370_banner.gif"
                      height="60"
                      contain
                      class="mb-2"
                    ></v-img>
                    <div class="text-subtitle-2 font-weight-medium">SQLite</div>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style scoped>
.on-hover {
  transform: translateY(-8px);
}

.transition-swing {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.v-card.on-hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}
</style>