import axios from "./axiosInstance"; 
export const getChallenges = async () => {
  try {
    const response = await axios.get("/api/challenges/");
    return response.data;
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return [];
  }
};

export const joinChallenge = async (challengeId) => {
  try {
    const response = await axios.post(`/api/challenges/${challengeId}/join/`);
    console.log("Join Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error joining challenge:", error.response ? error.response.data : error);
    return null;
  }
};

export const updateChallengeProgress = async (challengeId) => {
  try {
    const response = await axios.post(`/api/challenges/${challengeId}/update_progress/`);
    return response.data;
  } catch (error) {
    console.error("Error updating progress:", error);
    return null;
  }
};
