<template>
  <div class="profile">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="mt-5" elevation="3" rounded="lg">
            <v-card-title class="text-h4 text-center primary--text pt-6 pb-2">
              <v-icon large color="primary" class="mr-2">mdi-account-circle</v-icon>
              个人中心
            </v-card-title>
            
            <v-card-subtitle class="text-center pb-0">
              管理您的个人信息
            </v-card-subtitle>

            <v-card-text>
              <v-alert
                v-if="error"
                type="error"
                variant="tonal"
                class="mb-4"
                closable
                @click:close="error = ''"
              >
                {{ error }}
              </v-alert>

              <v-alert
                v-if="success"
                type="success"
                variant="tonal"
                class="mb-4"
                closable
                @click:close="success = ''"
              >
                {{ success }}
              </v-alert>

              <v-row>
                <v-col cols="12" md="4" class="text-center">
                  <v-avatar size="150" color="primary" class="mb-4">
                    <span class="text-h3 white--text">{{ avatarText }}</span>
                  </v-avatar>
                  <h3 class="text-h5 font-weight-medium">{{ currentUser.username }}</h3>
                  <p class="text-subtitle-1 text-medium-emphasis">{{ currentUser.email }}</p>
                  <p class="text-caption text-medium-emphasis">
                    注册时间: {{ formatDate(currentUser.createdAt) }}
                  </p>
                </v-col>
                
                <v-col cols="12" md="8">
                  <v-form ref="form" v-model="valid" @submit.prevent="updateProfile">
                    <v-text-field
                      v-model="profileData.username"
                      :rules="usernameRules"
                      label="用户名"
                      required
                      prepend-icon="mdi-account"
                      variant="outlined"
                      class="mb-2"
                    ></v-text-field>

                    <v-text-field
                      v-model="profileData.email"
                      :rules="emailRules"
                      label="电子邮箱"
                      required
                      prepend-icon="mdi-email"
                      variant="outlined"
                      class="mb-4"
                    ></v-text-field>

                    <v-divider class="mb-4"></v-divider>
                    <v-subheader class="px-0 mb-2">修改密码（可选）</v-subheader>

                    <v-text-field
                      v-model="profileData.currentPassword"
                      :rules="currentPasswordRules"
                      label="当前密码"
                      type="password"
                      prepend-icon="mdi-lock"
                      variant="outlined"
                      class="mb-2"
                    ></v-text-field>

                    <v-text-field
                      v-model="profileData.newPassword"
                      :rules="newPasswordRules"
                      label="新密码"
                      type="password"
                      prepend-icon="mdi-lock-reset"
                      variant="outlined"
                      class="mb-2"
                      :disabled="!profileData.currentPassword"
                    ></v-text-field>

                    <v-text-field
                      v-model="profileData.confirmPassword"
                      :rules="confirmPasswordRules"
                      label="确认新密码"
                      type="password"
                      prepend-icon="mdi-lock-check"
                      variant="outlined"
                      class="mb-4"
                      :disabled="!profileData.newPassword"
                    ></v-text-field>

                    <v-btn
                      color="primary"
                      block
                      size="large"
                      type="submit"
                      :loading="loading"
                      :disabled="!valid || loading"
                      elevation="2"
                      rounded
                      class="mb-4"
                    >
                      <v-icon left class="mr-2">mdi-content-save</v-icon>
                      保存修改
                    </v-btn>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProfileView',
  data() {
    return {
      valid: true,
      loading: false,
      error: '',
      success: '',
      profileData: {
        username: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      usernameRules: [
        v => !!v || '请输入用户名',
        v => v.length >= 3 || '用户名必须至少3个字符',
        v => /^[a-zA-Z0-9_]+$/.test(v) || '用户名只能包含字母、数字和下划线'
      ],
      emailRules: [
        v => !!v || '请输入电子邮箱',
        v => /.+@.+\..+/.test(v) || '请输入有效的电子邮箱地址'
      ],
      currentPasswordRules: [
        v => !v || v.length >= 6 || '密码必须至少6个字符'
      ],
      newPasswordRules: [
        v => !v || v.length >= 6 || '密码必须至少6个字符'
      ],
      confirmPasswordRules: [
        v => !v || v === this.profileData.newPassword || '两次输入的密码不一致'
      ]
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isLoggedIn']),
    avatarText() {
      return this.currentUser.username ? this.currentUser.username.charAt(0).toUpperCase() : '?';
    }
  },
  created() {
    if (!this.isLoggedIn) {
      this.$router.push('/login');
      return;
    }
    
    this.profileData.username = this.currentUser.username;
    this.profileData.email = this.currentUser.email;
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '未知';
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    async updateProfile() {
      if (!this.$refs.form.validate()) return;
      
      this.loading = true;
      this.error = '';
      this.success = '';
      
      const updateData = {
        username: this.profileData.username,
        email: this.profileData.email
      };
      
      // 如果用户输入了当前密码和新密码，则添加到更新数据中
      if (this.profileData.currentPassword && this.profileData.newPassword) {
        updateData.currentPassword = this.profileData.currentPassword;
        updateData.newPassword = this.profileData.newPassword;
      }
      
      try {
        await this.$store.dispatch('updateProfile', updateData);
        this.success = '个人信息更新成功！';
        
        // 清空密码字段
        this.profileData.currentPassword = '';
        this.profileData.newPassword = '';
        this.profileData.confirmPassword = '';
      } catch (error) {
        this.error = error.response?.data?.message || '更新失败，请稍后重试';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
