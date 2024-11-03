import { toast } from "@shared/lib/hooks/use-toast";

export const setTotTadeBuffer = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Скопировано!"
      });
    })
    .catch((err) => {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось скопировать текст",
        description: `${err.response.data.message}`
      });
    });
};
