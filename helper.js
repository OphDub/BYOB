export const fetchAndParse = async (url) => {
  try {
    const initialFetch = await fetch(url);
    const data = await initialFetch.json();
    return data._embedded.events;
  } catch (error) {
    throw error;
  }
};

