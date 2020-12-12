import axios from "./fetcher";

import { addItem, getItem } from "./localStorageAPI";

// const basicOptions = {
//   params: { timezone: "Europe/London" },
//   headers: {
//     "x-rapidapi-key": process.env.REACT_APP_FOOTBALL_API,
//     "x-rapidapi-host": process.env.REACT_APP_FOOTBALL_API_HOST,
//   },
// };

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
  // const result = getItem(`fixture${fixtureId}`);
  // if (!result) {
  try {
    const { data } = await axios.request(`fixtures/stats/${fixtureId}`);
    //addItem(`fixture${fixtureId}`, data.api.predictions[0]);
    return data;
  } catch (e) {
    console.error("getFixtureStats error", e);
    throw e;
  }
};

// return result;
// };

const getFixtureInfo = async (fixtureId) => {
  // const result = getItem(`fixtureInfo${fixtureId}`);
  // if (!result) {
  try {
    const { data } = await axios.request(`fixtures/${fixtureId}`);
    // addItem(`fixtureInfo${fixtureId}`, data);
    return data;
  } catch (e) {
    console.error("getFixtureInfo error", e);
    throw e;
  }
  // }

  // return result;
};
const getStandings = async (leagueId) => {
  // const result = getItem(`standings${leagueId}`);
  // if (!result) {
  try {
    const { data } = await axios.request(`fixtures/standings/${leagueId}`);
    //addItem(`standings${leagueId}`, data.api.standings[0]);
    return data;
  } catch (e) {
    console.error("getStandings error", e);
    throw e;
  }
};

// return result;
// };

const addNewAnalysis = async (analysis) => {
  //const analysisArr = getItem(`fixtureAnalysis${fixtureId}`);
  // if (!analysisArr) {

  try {
    const response = await axios.post(`new-analysis`, {
      analysis: analysis,
    });
    return response;
  } catch (e) {
    console.error("addNewAnalysis error", e);
    throw e;
  }
  // }
  //  else {
  //   analysisArr.push({
  //     ...analysis,
  //     userId,
  //     fixtureId,
  //   });
  //   addItem(`fixtureAnalysis${fixtureId}`, analysisArr);
  // }
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
  //send credentials
  try {
    const data = await axios.post(`users/sign-in`, {
      email: email,
      password: password,
    });
    console.log(data);
    return data;
  } catch (e) {
    console.error("getNextFixture error", e);
  }
};

const logout = async () => {
  //send credentials
  try {
    const data = await axios.post(`users/logout`);
    console.log(data);
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
