import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default createStore({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {}
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    currentUser: state => state.user
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, { token, user }) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.user = {};
    },
    profile_update(state, user) {
      state.user = { ...state.user, ...user };
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios.post(`${API_URL}/auth/login`, user)
          .then(resp => {
            const token = resp.data.access_token;
            const user = resp.data.user;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            commit('auth_success', { token, user });
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        // 添加空的 fullName 字段以兼容后端
        const userData = {
          ...user,
          fullName: user.fullName || ''
        };
        
        axios.post(`${API_URL}/auth/register`, userData)
          .then(resp => {
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    },
    updateProfile({ commit, state }, userData) {
      return new Promise((resolve, reject) => {
        // 添加空的 fullName 字段以兼容后端
        const updateData = {
          ...userData,
          fullName: userData.fullName || ''
        };
        
        axios.put(`${API_URL}/users/${state.user.id}`, updateData, {
          headers: {
            'Authorization': `Bearer ${state.token}`
          }
        })
          .then(resp => {
            const updatedUser = resp.data;
            localStorage.setItem('user', JSON.stringify(updatedUser));
            commit('profile_update', updatedUser);
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  modules: {
  }
});
