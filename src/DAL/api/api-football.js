import axios from "./fetcher";

import { addItem, getItem } from "./localStorageAPI";


const getNextFixture = async (leagueId) => {
  // const result = getItem(leagueId);
  // if (!result) {
  try {
    const { data } = await axios.get(`fixtures/league/${leagueId}`);
    // addItem(leagueId, data.api.fixtures);
    return data;
  } catch (e) {
    console.error("getNextFixture error", e);
  }
  // }

  // return result;
};

const getFixtureStats = async (fixtureId) => {
  try {
    const { data } = await axios.request(`fixtures/stats/${fixtureId}`);
    return data;
  } catch (e) {
    console.error("getFixtureStats error", e);
    throw e;
  }
};


const getFixtureInfo = async (fixtureId) => {
  try {
    const { data } = await axios.request(`fixtures/${fixtureId}`);
    return data;
  } catch (e) {
    console.error("getFixtureInfo error", e);
    throw e;
  }

};
const getStandings = async (leagueId) => {
  try {
    const { data } = await axios.request(`fixtures/standings/${leagueId}`);
    return data;
  } catch (e) {
    console.error("getStandings error", e);
    throw e;
  }
};


const addNewAnalysis = async (analysis) => {
  try {
    const response = await axios.post(`new-analysis`, {
      analysis: analysis,
    });
    return response;
  } catch (e) {
    console.error("addNewAnalysis error", e);
    throw e;
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
  addItem("users", previousUsers);
};

const login = async (email, password) => {
  try {
    const data = await axios.post(`users/sign-in`, {
      email: email,
      password: password,
    });
    return data;
  } catch (e) {
    console.error("getNextFixture error", e);
  }
};

const logout = async () => {
  try {
    const data = await axios.post(`users/logout`);
    return data;
  } catch (e) {
    console.error("getNextFixture error", e);
  }
};
//get response (true (user details)/false)
//if false -> return false
//if true -> return true

//cookie?

export {
  getNextFixture,
  getFixtureStats,
  getFixtureInfo,
  addNewAnalysis,
  getUsersFixtureAnalysis,
  getStandings,
  addNewUser,
  login,
  logout,
};
