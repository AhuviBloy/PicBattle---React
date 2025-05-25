import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class UserStore {
  users = [];
  currentUser: any | null = null;
  apiUrl = process.env.REACT_APP_API_apiUrl;

  token = sessionStorage.getItem("token") || "";

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser(userId:number) {
    try {
      const res = await axios.get(`${this.apiUrl}/api/user/userId/${userId}`, {
        // headers: { Authorization: `Bearer ${this.token}` }
      });
      runInAction(() => {
        this.currentUser = res.data;
      });
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  }

  async login(email:any, password:any) {
    try {
      const res = await axios.post(`${this.apiUrl}/api/auth/login`, { email, password });
      runInAction(() => {
        this.token = res.data.token;
        sessionStorage.setItem("token", this.token);
      });
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  async register(userData:any) {
    try {
      const res = await axios.post(`${this.apiUrl}/api/auth/register`, userData);
      runInAction(() => {
        this.token = res.data.token;
        sessionStorage.setItem("token", this.token);
      });
    } catch (err) {
      console.error("Register failed", err);
    }
  }

  logout() {
    this.token = "";
    sessionStorage.removeItem("token");
  }
}

export const userStore = new UserStore();
