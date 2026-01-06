import { useEffect, useState } from "react";

export const useDebond = (searchString: string | undefined) => {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  useEffect(() => {
    const time = setTimeout(() => {
      setKeyword(searchString);
    }, 1000);

    return () => clearTimeout(time);
  }, [searchString]);
  return keyword;
};
