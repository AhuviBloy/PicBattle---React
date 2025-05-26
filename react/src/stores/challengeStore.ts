import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class ChallengeStore {
  challenges = [];
  currentChallenge = null;
  creationsByChallenge = [];
  winnerCreation = {};
  apiUrl = import.meta.env.VITE_API_URL;



  constructor() {
    makeAutoObservable(this);
    this.fetchChallenges();
  }

  async fetchChallenges() {
    try {
      const res = await axios.get(`${this.apiUrl}/api/challenge`);
      runInAction(() => {
        this.challenges = res.data;
      });
    } catch (err) {
      console.error("Failed to fetch challenges", err);
    }
  }

  async fetchChallengeById(id:any) {
    try {
      const res = await axios.get(`${this.apiUrl}/api/challenge/${id}`);
        this.currentChallenge = res.data;
        return res.data;
    } catch (err) {
      console.error("Failed to fetch challenge by ID", err);
    }
  }

  async fetchCreationsByChallenge(challengeId:any) {
    try {
      const res = await axios.get(`${this.apiUrl}/api/Challenge/creationByChallenge/${challengeId}`);
      runInAction(() => {
        this.creationsByChallenge = res.data;
      });
    } catch (err) {
      console.error("Failed to fetch creations by challenge", err);
    }
  }

  async fetchWinner(challengeId: any) {
    try {
      const res = await axios.get(`${this.apiUrl}/api/Challenge/winner/${challengeId}`);
      runInAction(() => {
        this.winnerCreation = res.data;
      });
      return res.data; 
    } catch (err) {
      console.error("Failed to fetch winner creation", err);
      return null;
    }
  }
  

  async addChallenge(newChallenge:any) {
    try {
      await axios.post(`${this.apiUrl}/api/Challenge`, newChallenge);
      await this.fetchChallenges();
    } catch (err) {
      console.error("Failed to add challenge", err);
    }
  }
}

export default new ChallengeStore();
