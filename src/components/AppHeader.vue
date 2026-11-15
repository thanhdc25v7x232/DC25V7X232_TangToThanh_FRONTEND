<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'contactbook' }" class="nav-link">
          Danh bạ
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'contact.favorites' }" class="nav-link">
          Yêu thích
          <i class="fas fa-heart"></i>
        </router-link>
      </li>
    </div>
    <div class="navbar-nav">
      <template v-if="user">
        <span class="navbar-text mr-3">
          <i class="fas fa-user"></i> Xin chào, {{ user.name || user.username }}
        </span>
        <li class="nav-item">
          <a href="#" class="nav-link" @click.prevent="logout">
            Thoát <i class="fas fa-sign-out-alt"></i>
          </a>
        </li>
      </template>
      <template v-else>
        <li class="nav-item">
          <router-link :to="{ name: 'login' }" class="nav-link"
            >Đăng nhập</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'register' }" class="nav-link"
            >Đăng ký</router-link
          >
        </li>
      </template>
    </div>
  </nav>
</template>

<script>
import AuthService from "@/services/auth.service";
export default {
  computed: {
    user() {
      // Đọc $route để tính lại mỗi khi chuyển trang (sau khi đăng nhập/thoát)
      this.$route;
      return AuthService.getUser();
    },
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
