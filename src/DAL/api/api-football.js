import axios from "./fetcher";

import { addItem, getItem } from "./localStorageAPI";

const basicOptions = {
  params: { timezone: "Europe/London" },
  headers: {
    "x-rapidapi-key": "",
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

export { getNextFixture };

/*
  {
    fixture_id: 605176,
    league_id: 2833,
    league: {
      name: "Primera Division",
      country: "Spain",
      logo: "https://media.api-sports.io/football/leagues/140.png",
      flag: "https://media.api-sports.io/flags/es.svg",
    },
    event_date: "2020-12-04T20:00:00+00:00",
    event_timestamp: 1607112000,
    firstHalfStart: null,
    secondHalfStart: null,
    round: "Regular Season - 12",
    status: "Not Started",
    statusShort: "NS",
    elapsed: 0,
    venue: "San Mamés Barria",
    referee: null,
    homeTeam: {
      team_id: 531,
      team_name: "Athletic Club",
      logo: "https://media.api-sports.io/football/teams/531.png",
    },
    awayTeam: {
      team_id: 538,
      team_name: "Celta Vigo",
      logo: "https://media.api-sports.io/football/teams/538.png",
    },
    goalsHomeTeam: null,
    goalsAwayTeam: null,
    score: { halftime: null, fulltime: null, extratime: null, penalty: null },
  }
*/