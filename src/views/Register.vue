<template>
    <div class="page">
        <h4>Đăng ký tài khoản</h4>
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="name">Họ tên</label>
                <input id="name" v-model="user.name" type="text" class="form-control" />
            </div>
            <div class="form-group">
                <label for="username">Tên đăng nhập</label>
                <input id="username" v-model="user.username" type="text" class="form-control" required />
            </div>
            <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input id="password" v-model="user.password" type="password" class="form-control" required minlength="6" />
            </div>
            <div class="form-group">
                <label for="confirm">Nhập lại mật khẩu</label>
                <input id="confirm" v-model="confirmPassword" type="password" class="form-control" required />
            </div>
            <button class="btn btn-success">Đăng ký</button>
            <router-link :to="{ name: 'login' }" class="ml-3">Đã có tài khoản? Đăng nhập</router-link>
        </form>
        <p class="mt-3 text-danger">{{ message }}</p>
    </div>
</template>

<script>
import AuthService from "@/services/auth.service";
export default {
    data() {
        return {
            user: { name: "", username: "", password: "" },
            confirmPassword: "",
            message: "",
        };
    },
    methods: {
        async register() {
            if (this.user.password !== this.confirmPassword) {
                this.message = "Mật khẩu nhập lại không khớp.";
                return;
            }
            try {
                await AuthService.register(this.user);
                alert("Đăng ký thành công. Mời bạn đăng nhập.");
                this.$router.push({ name: "login" });
            } catch (error) {
                console.log(error);
                this.message = error.response?.data?.message || "Đăng ký thất bại.";
            }
        },
    },
};
</script>