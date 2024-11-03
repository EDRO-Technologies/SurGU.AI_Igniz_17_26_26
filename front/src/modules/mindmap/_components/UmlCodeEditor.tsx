import { CopyIcon, SaveIcon } from "lucide-react";
import { useRef, useState } from "react";

import { setTotTadeBuffer } from "@shared/lib/setTotTadeBuffer";
import { Button } from "@shared/ui/button";
import { Textarea } from "@shared/ui/textarea";

interface IUmlCodeEditorProps {
  plantuml_code: string;
}

export const UmlCodeEditor = ({ plantuml_code }: IUmlCodeEditorProps) => {
  const [value, setValue] = useState(plantuml_code);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value);

  return (
    <div className='relative max-h-[250px]'>
      <Textarea ref={textareaRef} className='h-64' value={value} onChange={handleChange} />
      <div className='absolute top-1 right-5'>
        <Button variant='ghost' size='icon'>
          <SaveIcon />
        </Button>
        <Button onClick={() => setTotTadeBuffer(value)} variant='ghost' size='icon'>
          <CopyIcon />
        </Button>
      </div>
    </div>
  );
};
