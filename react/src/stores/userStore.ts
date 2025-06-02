import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class UserStore {
  users = [];
  currentUser: any | null = null;
  apiUrl = import.meta.env.VITE_API_URL;

  token = sessionStorage.getItem("token") || "";

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUser(userId:number) {
    try {
      const res = await axios.get(`${this.apiUrl}/api/user/userId/${userId}`, {
      });
      runInAction(() => {
        this.currentUser = res.data;
      });
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  }




  logout() {
    this.token = "";
    sessionStorage.removeItem("token");
  }
}

export const userStore = new UserStore();
