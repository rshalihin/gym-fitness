export const exerciseOptions = {
  method: "GET",
  params: { limit: "500" },
  headers: {
    "X-RapidAPI-Key": "7531e380f2mshe26041f61f1a689p11f393jsn7d673c6bb1cb",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "7531e380f2mshe26041f61f1a689p11f393jsn7d673c6bb1cb",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

export const fetchData = async (url, option) => {
  const responce = await fetch(url, option);
  const data = responce.json();
  return data;
};
