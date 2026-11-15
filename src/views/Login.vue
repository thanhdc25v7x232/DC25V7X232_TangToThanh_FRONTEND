<template>
    <div class="page">
        <h4>Đăng nhập</h4>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="username">Tên đăng nhập</label>
                <input id="username" v-model="username" type="text" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input id="password" v-model="password" type="password" class="form-control" required />
            </div>
            <button class="btn btn-primary">Đăng nhập</button>
            <router-link :to="{ name: 'register' }" class="ml-3">Chưa có tài khoản? Đăng ký</router-link>
        </form>
        <p class="mt-3 text-danger">{{ message }}</p>
    </div>
</template>

<script>
import AuthService from "@/services/auth.service";
export default {
    data() {
        return {
            username: "",
            password: "",
            message: "",
        };
    },
    methods: {
        async login() {
            try {
                await AuthService.login({
                    username: this.username,
                    password: this.password,
                });
                this.$router.push({ name: "contactbook" });
            } catch (error) {
                console.log(error);
                this.message = error.response?.data?.message || "Đăng nhập thất bại.";
            }
        },
    },
};
</script>