<template>
  <div class="login">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <v-card class="mx-auto mt-8" elevation="4" rounded="xl">
            <v-row>
              <!-- 左侧图片区域 (在中等及以上屏幕显示) -->
              <v-col cols="12" md="5" class="d-none d-md-flex pa-0">
                <v-img
                  src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg"
                  cover
                  height="100%"
                  class="rounded-l-xl"
                ></v-img>
              </v-col>
              
              <!-- 右侧登录表单区域 -->
              <v-col cols="12" md="7">
                <div class="pa-8">
                  <div class="text-center mb-6">
                    <v-avatar color="primary" size="64" class="mb-4">
                      <v-icon size="36" color="white">mdi-account</v-icon>
                    </v-avatar>
                    <h1 class="text-h4 font-weight-bold primary--text">用户登录</h1>
                    <p class="text-subtitle-1 text-medium-emphasis mt-1">
                      欢迎回来，请输入您的账号信息
                    </p>
                  </div>

                  <v-alert
                    v-if="error"
                    type="error"
                    variant="tonal"
                    class="mb-6"
                    closable
                    @click:close="error = ''"
                    density="compact"
                  >
                    {{ error }}
                  </v-alert>

                  <v-form ref="form" v-model="valid" @submit.prevent="login">
                    <v-text-field
                      v-model="username"
                      :rules="usernameRules"
                      label="用户名"
                      required
                      prepend-inner-icon="mdi-account"
                      variant="outlined"
                      class="mb-4"
                      hide-details="auto"
                      bg-color="grey-lighten-3"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="密码"
                      type="password"
                      required
                      prepend-inner-icon="mdi-lock"
                      variant="outlined"
                      class="mb-2"
                      hide-details="auto"
                      bg-color="grey-lighten-3"
                    ></v-text-field>
                    
                    <div class="d-flex justify-end mb-6">
                      <v-btn variant="text" color="primary" density="compact" class="text-caption">
                        忘记密码?
                      </v-btn>
                    </div>

                    <v-btn
                      color="primary"
                      block
                      size="large"
                      type="submit"
                      :loading="loading"
                      :disabled="!valid || loading"
                      elevation="2"
                      rounded="lg"
                      class="mb-6 py-6"
                    >
                      <v-icon left class="mr-2">mdi-login</v-icon>
                      登录
                    </v-btn>
                    
                    <div class="text-center">
                      <span class="text-body-2 text-medium-emphasis">还没有账号? </span>
                      <v-btn
                        variant="text"
                        color="primary"
                        to="/register"
                        class="text-decoration-none text-body-2 font-weight-bold"
                      >
                        立即注册
                      </v-btn>
                    </div>
                  </v-form>
                </div>
              </v-col>
            </v-row>
          </v-card>
          
          <!-- 社交媒体登录选项 -->
          <v-card class="mx-auto mt-4 pa-4" elevation="2" rounded="lg">
            <div class="text-center">
              <p class="text-body-2 text-medium-emphasis mb-4">或使用社交账号登录</p>
              <div class="d-flex justify-center">
                <v-btn icon variant="text" color="primary" class="mx-2">
                  <v-icon>mdi-google</v-icon>
                </v-btn>
                <v-btn icon variant="text" color="primary" class="mx-2">
                  <v-icon>mdi-facebook</v-icon>
                </v-btn>
                <v-btn icon variant="text" color="primary" class="mx-2">
                  <v-icon>mdi-github</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      valid: false,
      loading: false,
      username: '',
      password: '',
      error: '',
      usernameRules: [
        v => !!v || '请输入用户名',
        v => v.length >= 3 || '用户名必须至少3个字符'
      ],
      passwordRules: [
        v => !!v || '请输入密码',
        v => v.length >= 6 || '密码必须至少6个字符'
      ]
    }
  },
  methods: {
    async login() {
      if (!this.$refs.form.validate()) return;
      
      this.loading = true;
      this.error = '';
      
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        });
        this.$router.push('/profile');
      } catch (error) {
        this.error = error.response?.data?.message || '登录失败，请检查您的用户名和密码';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.login {
  min-height: calc(100vh - 128px);
  display: flex;
  align-items: center;
}
</style>