import axios from "./fetcher";

import { addItem, getItem } from "./localStorageAPI";

const basicOptions = {
  params: { timezone: "Europe/London" },
  headers: {
    "x-rapidapi-key": "dc11f843f2mshfd6c8fc3cbc3d35p1342e8jsn4835f270c82a",
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
  },
};

const getNextFixture = async (leagueId, limit) => {
  const result = getItem(leagueId);
  if (!result) {
    try {
      const { data } = await axios.request({
        ...basicOptions,
        url: `fixtures/league/${leagueId}/next/${limit}`,
      });
      addItem(leagueId, data.api.fixtures);
      return data.api.fixtures;
    } catch (e) {
      console.error("getNextFixture error", e);
    }
  }

  return result;
};

const getFixtureStats = async (fixtureId) => {
  const result = getItem(`fixture${fixtureId}`);
  if (!result) {
    try {
      const { data } = await axios.request({
        ...basicOptions,
        url: `predictions/${fixtureId}`,
      });
      addItem(`fixture${fixtureId}`, data.api.predictions[0]);
      return data.api.predictions[0];
    } catch (e) {
      console.error("getFixtureStats error", e);
    }
  }

  return result;
};

const addNewAnalysis = (fixtureId, userId, analysis) => {
  const analysisArr = getItem(`fixtureAnalysis${fixtureId}`);
  if (!analysisArr) {
    try {
      addItem(`fixtureAnalysis${fixtureId}`, [
        {
          ...analysis,
          userId,
          fixtureId,
        },
      ]);
      return true;
    } catch (e) {
      console.error("addNewAnalysis error", e);
    }
  } else {
    analysisArr.push({
      ...analysis,
      userId,
      fixtureId,
    });
    addItem(`fixtureAnalysis${fixtureId}`, analysisArr);
  }
};

const getUsersFixtureAnalysis = (fixtureId) => {
  return getItem(`fixtureAnalysis${fixtureId}`);
};

const addNewUser = (userInfo) => {
  const previousUsers = getItem("users");
  if (!previousUsers) {
    try {
      addItem("users", [{ userInfo }]);
      return true;
    } catch (e) {
      console.error("addNewUser error", e);
    }
  } else {
    previousUsers.push(userInfo);
  }
  addItem('users', previousUsers);
};

export {
  getNextFixture,
  getFixtureStats,
  addNewAnalysis,
  getUsersFixtureAnalysis,
  addNewUser
};
