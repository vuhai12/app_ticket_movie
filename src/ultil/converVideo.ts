export const convertYoutubeUrlToEmbed = (url: string) => {
  if (url.includes("embed")) return url;

  const videoId = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${videoId}`;
};