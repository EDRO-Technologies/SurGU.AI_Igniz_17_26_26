import { ArrowLeft, CopyIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { setTotTadeBuffer } from "@shared/lib/setTotTadeBuffer";
import { Button } from "@shared/ui/button";
import { Spinner } from "@shared/ui/spinner";

import { Diagram } from "./_components/Diagram";
import { UmlCodeEditor } from "./_components/UmlCodeEditor";
import { umlStore } from "./store";

const MindMap = () => {
  const { data } = umlStore();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

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
      {data.summary && (
        <div
          className='space-y-5'
          onMouseOver={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <h1 className='text-2xl leading-[120%] font-semibold text-center'>
            Результат конвертации
          </h1>
          <div className='border border-border bg-background relative rounded-xl'>
            <p className='p-4'>{data.summary}</p>
            {isVisible && (
              <Button
                onClick={() => setTotTadeBuffer(data.summary)}
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

        <UmlCodeEditor plantuml_code={data.plantuml_code} />
        <Diagram {...data} />
      </div>
    </div>
  );
};

export default MindMap;
