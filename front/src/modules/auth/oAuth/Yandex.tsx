import { useEffect } from "react";

import { postYandexoAuth } from "./api/postYandexoAuth";

export const YandexCallback = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const cid = new URLSearchParams(window.location.search).get("cid");

    if (code) {
      postYandexoAuth({
        params: {
          code: `${code}&cid=${cid}`
        }
      });
    }
  }, []);

  return <div>Авторизация через Яндекс...</div>;
};
