import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { z } from "zod";

import { AUTH_KEY, PATHS } from "@shared/constants";
import { toast } from "@shared/lib/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

import { EmailForm } from "./_components/EmailForm";
import { PhoneForm } from "./_components/PhoneForm";
import { usePostLoginMutation } from "./api/usePostLoginMutation";
import type { signInMailSchema } from "./lib/signInMailSchema";
import type { signInPhoneSchema } from "./lib/signInPhoneSchema";

export const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formType, setFormType] = useState("mail");

  const { mutateAsync, isPending } = usePostLoginMutation({
    options: {
      onSuccess: () => {
        localStorage.setItem(AUTH_KEY, "true");
        navigate(location.state?.pathname || PATHS.PROFILE);
      },
      onError(error) {
        if (error?.response?.data?.message) {
          toast({
            className: "bg-red-800 text-white hover:bg-red-700",
            title: "Ошибка авторизации",
            description: `${error.response.data.message}`
          });
        } else {
          toast({
            className: "bg-red-800 text-white hover:bg-red-700",
            title: "Не удалось выполнить запрос"
          });
        }
      }
    }
  });

  const onSubmit = async (values: z.infer<typeof signInPhoneSchema | typeof signInMailSchema>) => {
    await mutateAsync({ params: values });
  };

  return (
    <Card className='m-auto w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Вход</CardTitle>
      </CardHeader>
      <CardContent>
        {formType === "mail" && (
          <EmailForm
            onSubmit={onSubmit}
            switchForm={() => setFormType("phone")}
            isPending={isPending}
          />
        )}
        {formType === "phone" && (
          <PhoneForm
            onSubmit={onSubmit}
            switchForm={() => setFormType("mail")}
            isPending={isPending}
          />
        )}
        <Link
          className=''
          to={`${import.meta.env.BASE_YANDEX_API_URL}/authorize?response_type=code&client_id=${import.meta.env.YANDEX_CLIENT_ID}&redirect_uri=${import.meta.env.YANDEX_REDIRECT_URI}`}
        >
          <img className='size-10' src='/Yandex_icon.png' alt='yandex' />
        </Link>
        <div className='mt-4 text-center text-sm'>
          У вас нет учетной записи?{" "}
          <Link to={PATHS.SIGNUP} className='underline'>
            Зарегестрироваться
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
