import { toast } from "@shared/lib/hooks/use-toast";

export const checkFileExtantion = (selectedFile: File | null) => {
  const extension = selectedFile?.name.split(".").at(-1);
  const imageExtensions = ["jpg", "jpeg", "pdf", "png", "webp"];
  if (extension && !imageExtensions.includes(extension)) {
    toast({
      className: "bg-red-800 text-white hover:bg-red-700",
      title: "Невалидное расширение",
      description: ".jpg .jpeg .pdf .png, .webp"
    });
    return;
  }
};
