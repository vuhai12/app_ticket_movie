import { convertYoutubeUrlToEmbed } from "ultil/converVideo";

const TrailerMovie = ({
  setIsShowTrailerMovie,
  url_trailer,
}: {
  setIsShowTrailerMovie: (isShowTrailerMovie: boolean) => void;
  url_trailer: string;
}) => {
  return (
    <div>
      <div className="fixed inset-0 z-[999]">
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          onClick={() => setIsShowTrailerMovie(false)}
        ></div>
        <div className="w-[70%] aspect-video rounded-[10px] relative z-[98] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <iframe
            width="100%"
            height={"100%"}
            src={convertYoutubeUrlToEmbed(url_trailer)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerMovie;
