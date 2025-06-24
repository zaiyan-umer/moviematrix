const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const fetchTrailerId = async (id) => {
  const tryFetch = async (type) => {
    const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.results?.length) return null;

    const trailer = data.results.find(
      (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
    );
    return trailer?.key || null;
  };

  return (await tryFetch("movie")) || (await tryFetch("tv"));
};
