<template>
  <div class="register">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6" xl="4">
          <v-card class="mx-auto mt-8" elevation="4" rounded="xl">
            <v-row>
              <!-- 左侧图片区域 (在中等及以上屏幕显示) -->
              <v-col cols="12" md="5" class="d-none d-md-flex pa-0">
                <v-img
                  src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg"
                  cover
                  height="100%"
                  class="rounded-l-xl"
                ></v-img>
              </v-col>
              
              <!-- 右侧注册表单区域 -->
              <v-col cols="12" md="7">
                <div class="pa-8">
                  <div class="text-center mb-6">
                    <v-avatar color="primary" size="64" class="mb-4">
                      <v-icon size="36" color="white">mdi-account-plus</v-icon>
                    </v-avatar>
                    <h1 class="text-h4 font-weight-bold primary--text">用户注册</h1>
                    <p class="text-subtitle-1 text-medium-emphasis mt-1">
                      创建您的账号，开始使用我们的服务
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

                  <v-alert
                    v-if="success"
                    type="success"
                    variant="tonal"
                    class="mb-6"
                    closable
                    @click:close="success = ''"
                    density="compact"
                  >
                    {{ success }}
                  </v-alert>

                  <v-form ref="form" v-model="valid" @submit.prevent="register">
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
                      v-model="email"
                      :rules="emailRules"
                      label="电子邮箱"
                      required
                      prepend-inner-icon="mdi-email"
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
                      class="mb-4"
                      hide-details="auto"
                      bg-color="grey-lighten-3"
                    ></v-text-field>

                    <v-text-field
                      v-model="confirmPassword"
                      :rules="confirmPasswordRules"
                      label="确认密码"
                      type="password"
                      required
                      prepend-inner-icon="mdi-lock-check"
                      variant="outlined"
                      class="mb-6"
                      hide-details="auto"
                      bg-color="grey-lighten-3"
                    ></v-text-field>

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
                      <v-icon left class="mr-2">mdi-account-plus</v-icon>
                      注册
                    </v-btn>
                    
                    <div class="text-center">
                      <span class="text-body-2 text-medium-emphasis">已有账号? </span>
                      <v-btn
                        variant="text"
                        color="primary"
                        to="/login"
                        class="text-decoration-none text-body-2 font-weight-bold"
                      >
                        立即登录
                      </v-btn>
                    </div>
                  </v-form>
                </div>
              </v-col>
            </v-row>
          </v-card>
          
          <!-- 用户协议 -->
          <v-card class="mx-auto mt-4 pa-4" elevation="2" rounded="lg">
            <div class="text-center">
              <p class="text-body-2 text-medium-emphasis">
                注册即表示您同意我们的
                <v-btn variant="text" color="primary" density="compact" class="text-caption px-1">
                  服务条款
                </v-btn>
                和
                <v-btn variant="text" color="primary" density="compact" class="text-caption px-1">
                  隐私政策
                </v-btn>
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      valid: false,
      loading: false,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      success: '',
      usernameRules: [
        v => !!v || '请输入用户名',
        v => v.length >= 3 || '用户名必须至少3个字符',
        v => /^[a-zA-Z0-9_]+$/.test(v) || '用户名只能包含字母、数字和下划线'
      ],
      emailRules: [
        v => !!v || '请输入电子邮箱',
        v => /.+@.+\..+/.test(v) || '请输入有效的电子邮箱地址'
      ],
      passwordRules: [
        v => !!v || '请输入密码',
        v => v.length >= 6 || '密码必须至少6个字符'
      ],
      confirmPasswordRules: [
        v => !!v || '请确认密码',
        v => v === this.password || '两次输入的密码不一致'
      ]
    }
  },
  methods: {
    async register() {
      if (!this.$refs.form.validate()) return;
      
      this.loading = true;
      this.error = '';
      this.success = '';
      
      try {
        await this.$store.dispatch('register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        
        this.success = '注册成功！请登录您的账号';
        this.$refs.form.reset();
        
        // 注册成功后3秒跳转到登录页
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
      } catch (error) {
        this.error = error.response?.data?.message || '注册失败，请稍后重试';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.register {
  min-height: calc(100vh - 128px);
  display: flex;
  align-items: center;
}
</style>