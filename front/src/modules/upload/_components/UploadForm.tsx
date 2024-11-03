import { umlStore } from "@modules/mindmap/store";
import { postUml } from "@modules/upload/api/postUml";
import { FileIcon } from "@radix-ui/react-icons";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PATHS } from "@shared/constants";
import { toast } from "@shared/lib/hooks/use-toast";

import { checkFileExtantion } from "../lib/checkFileExtantion";

interface IFileUploadProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileUpload = ({ setLoading }: IFileUploadProps) => {
  const [isOver, setOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const formDataImage = new FormData();
  const { setUml } = umlStore((store) => store);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    let selectedFile: File | null = null;

    if ("dataTransfer" in e) {
      selectedFile = e.dataTransfer.files[0];
      checkFileExtantion(selectedFile);
      formDataImage.append("file", selectedFile!);
    } else {
      selectedFile = e.target.files && e.target.files[0];
      checkFileExtantion(selectedFile);
      formDataImage.append("file", selectedFile!);
    }
    setLoading(true);
    await postUml({ formData: formDataImage })
      .then((res) => setUml(res.data.data))
      .catch((err: any) =>
        toast({
          className: "bg-red-800 text-white hover:bg-red-700",
          title: "Не удалось обновить данные",
          description: `В ходе отправки запроса произошла ошибка: ${err.response.data.message}`
        })
      )
      .finally(() => {
        formDataImage.delete("file");
        setLoading(false);
      });
    navigate(PATHS.MINDMAP);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileChange(e);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isOver) setOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isOver) setOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onClick={handleClick}
      className={`border-[4px] border-dashed hover:bg-muted py-14 px-24 flex items-center justify-center flex-col cursor-pointer rounded-3xl ${isOver && "bg-input"} ${isOver ? "border-primary" : "border-border"}`}
    >
      <FileIcon className='size-20' />
      <p className='font-medium mb-2 mt-5'>Перетащите файл сюда или нажмите для выбора</p>
      <p className='leading-[171%] text-sm'>Максимальный размер файла: 10 МБ</p>
      <p className='leading-[171%] text-sm'>
        Поддерживаемые форматы изображений: .JPEG .JPG .PNG .WEBP .PDF
      </p>
      <input
        ref={fileInputRef}
        type='file'
        onChange={handleFileChange}
        className='hidden'
        accept='.png, .webp, .jpg, .pdf'
      />
    </div>
  );
};
