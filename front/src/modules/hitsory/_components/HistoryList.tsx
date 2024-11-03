import { Cross1Icon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

import { PATHS } from "@shared/constants";
import { Button } from "@shared/ui/button";

import { useHistoryStore } from "../store";

export const HistoryList = () => {
  const { historyData } = useHistoryStore();

  return (
    <div className='container space-y-3 relative'>
      <h2 className='font-bold'>Ранее загруженные файлы</h2>
      {historyData.length > 0 ? (
        <div className='space-y-2 overflow-y-scroll h-full max-h-[190px]'>
          {historyData.map((item) => (
            <Link
              to={`${PATHS.MINDMAP}/${item.uid}`}
              key={item.uid}
              className='border cursor-pointer border-border rounded-lg flex items-center justify-center px-5 py-2'
            >
              <div className='flex items-center w-full gap-4'>
                <h4 className='text-sm'>{item.summary.slice(0, 50)}</h4>
              </div>
              <Button variant='ghost' size='icon'>
                <Cross1Icon className='size-4' />
              </Button>
            </Link>
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center pt-7'>
          <p className='opacity-70'>Не найдено загруженных файлов</p>
        </div>
      )}
    </div>
  );
};
