import createApiClient from "./api.service";
class AuthService {
  constructor(baseUrl = "/api/auth") {
    this.api = createApiClient(baseUrl);
  }
  async register(data) {
    return (await this.api.post("/register", data)).data;
  }
  async login(data) {
    const result = (await this.api.post("/login", data)).data;
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));
    return result;
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  isLoggedIn() {
    return !!localStorage.getItem("token");
  }
}
export default new AuthService();
