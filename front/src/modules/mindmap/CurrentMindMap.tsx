import { useGetHistoryByUidQuery } from "@modules/hitsory/api/useGetHistoryByUidQuery";
import { ArrowLeft, CopyIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { setTotTadeBuffer } from "@shared/lib/setTotTadeBuffer";
import { Button } from "@shared/ui/button";
import { Spinner } from "@shared/ui/spinner";

import { Diagram } from "./_components/Diagram";
import { UmlCodeEditor } from "./_components/UmlCodeEditor";

const CurrentMindMap = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { uid } = useParams();
  const navigate = useNavigate();
  const { data } = useGetHistoryByUidQuery({
    params: {
      uid: uid!
    }
  });

  if (!data) return <Spinner />;

  return (
    <div className='gap-14 flex items-center flex-col p-16 container relative'>
      <Button
        onClick={() => navigate("/", { replace: true })}
        className='absolute left-10 top-10'
        variant='ghost'
      >
        <ArrowLeft />
      </Button>
      {data.data && (
        <div
          className='space-y-5'
          onMouseOver={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <h1 className='text-2xl leading-[120%] font-semibold text-center'>
            Результат конвертации
          </h1>
          <div className='border border-border bg-background relative rounded-xl'>
            <p className='p-4'>{data.data.summary}</p>
            {isVisible && (
              <Button
                onClick={() => setTotTadeBuffer(data.data.summary)}
                size='icon'
                variant='ghost'
                className='absolute right-1 top-1'
              >
                <CopyIcon />
              </Button>
            )}
          </div>
        </div>
      )}
      <div className='space-y-4'>
        <h1 className='text-2xl leading-[120%] font-semibold text-center'>Инфорграфика</h1>
        <h3 className='font-medium'>Код:</h3>
        <UmlCodeEditor plantuml_code={data.data.plantuml_code} />
        <h3 className='font-medium'>Результат:</h3>
        <Diagram plantuml_code={data.data.plantuml_code} />
      </div>
    </div>
  );
};

export default CurrentMindMap;
