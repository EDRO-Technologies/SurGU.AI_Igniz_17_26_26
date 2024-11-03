import { api } from "@shared/api/instance";
import { AUTH_KEY, PATHS } from "@shared/constants";

interface PostYandexoAuthParams {
  code: string;
}

export type PostYandexoAuthConfig = RequestConfig<PostYandexoAuthParams>;

export const postYandexoAuth = async ({ params, config }: PostYandexoAuthConfig) =>
  api
    .post(`auth/oAuth`, params, config)
    .then(() => {
      // console.log("Токен доступа:", res.data.access_token);
      localStorage.setItem(AUTH_KEY, "true");
      // localStorage.setItem("access-token", res.data.access_token);
      window.location.href = PATHS.PROFILE;
    })
    .catch((error) => {
      console.error(error);
    });
