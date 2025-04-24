import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class CreationStore {
  url = "https://localhost:7143";
  creations = [];
  currentCreation = null;
  creationsByChallenge = [];
  

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCreations() {
    try {
      const res = await axios.get(`${this.url}/api/creation`);
      runInAction(() => {
        this.creations = res.data;
      });
    } catch (err) {
      console.error("Failed to fetch creations", err);
    }
  }

  async fetchCreationById(id: any) {
    try {
      const res = await axios.get(`${this.url}/api/creation/${id}`);
      runInAction(() => {
        this.currentCreation = res.data;
      });
    } catch (err) {
      console.error("Failed to fetch creation", err);
    }
  }

  async addCreation(newCreation: any) {
    try {
      await axios.post(`${this.url}/api/creation`, newCreation);
      await this.fetchCreations();
    } catch (err) {
      console.error("Failed to add creation", err);
    }
  }

  async vote(creationId: number, userId: any, challengeId: number,ip:any,star:number) {
    try {
      const rating = {
        CreationId: creationId,
        ChallengeId: challengeId,
        UserId: userId | 0,
        Stars: star, 
        IpAddress: ip || ""
      };
  
      if(star==-1){
        const res = await axios.delete(`${this.url}/api/rating/${ip}/${creationId}`);
        if (res.status === 200) {
          await this.fetchCreations(); // עדכון הסטור
        }
      }else{
        const res = await axios.post(`${this.url}/api/rating`, rating);
        if (res.status === 200) {
          await this.fetchCreations(); // עדכון הסטור
        }
      }
      
    } catch (err) {
      console.error("Failed to vote", err);
    }
  }
  

  async getVotedCreationsByUser(userId: any) {
    try {
     console.log(userId);

      const res = await axios.get(`${this.url}/api/rating/user/${userId}`);
      console.log(res.data);
      return res.data; // מחזיר את היצירות שהמשתמש הצביע להן
    } catch (err) {
      console.error("Failed to fetch voted creations by user", err);
      return [];
    }
  }

  async getVotedCreationsByIp(ipAddress: string) {
    try {
      console.log("IP Address in srote:");
      console.log(ipAddress);
      
      const res = await axios.get(`${this.url}/api/rating/ip/${ipAddress}`);
      console.log(res.data);
      return res.data; // מחזיר את המזהים של היצירות שהצביעו להן לפי ה-IP
    } catch (err) {
      console.error("Failed to fetch voted creations by IP", err);
      return [];
    }
  }

  async getDownloadUrl(fileName: any) {
    try {
      const res = await axios.get(`${this.url}/api/creation/download-url/${fileName}`);
      return res.data.downloadUrl;
    } catch (err) {
      console.error("Failed to get download URL", err);
      return null;
    }
  }

  async fetchCreationsByChallengeId(challengeId: any) {
    try {
      const res = await axios.get(`${this.url}/api/challenge/creations-for-challenge/${challengeId}`);
      console.log(res.data);
      
      return res.data;
      runInAction(() => {
      });
    } catch (err) {
      console.error(`Failed to fetch creations for challenge ${challengeId}`, err);
    }
  }
  

//קבלת שם יוצר היצירה
  async getCreatorOfCreation(userId: any) {
    try {
     console.log(userId);

      const res = await axios.get(`${this.url}/api/rating/user/${userId}`);
      console.log(res.data);
      return res.data; // מחזיר את היצירות שהמשתמש הצביע להן
    } catch (err) {
      console.error("Failed to fetch voted creations by user", err);
      return [];
    }
  }


  //קבלת תאור היצירה
  async getDescriptionOfCreation(userId: any) {
    try {
     console.log(userId);

      const res = await axios.get(`${this.url}/api/rating/user/${userId}`);
      console.log(res.data);
      return res.data; // מחזיר את היצירות שהמשתמש הצביע להן
    } catch (err) {
      console.error("Failed to fetch voted creations by user", err);
      return [];
    }
  }
}



export const creationStore = new CreationStore();
