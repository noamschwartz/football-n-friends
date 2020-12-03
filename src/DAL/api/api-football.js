import axios from "./fetcher";

import { addItem, getItem } from "./localStorageAPI";

const basicOptions = {
  params: { timezone: "Europe/London" },
  headers: {
    "x-rapidapi-key": process.env.REACT_APP_FOOTBALL_API,
    "x-rapidapi-host": process.env.REACT_APP_FOOTBALL_API_HOST,
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
  return getItem(`fixtureAnalysis${fixtureId}`) || [];
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
