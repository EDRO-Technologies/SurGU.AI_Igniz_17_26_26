import { useState } from "react";

import { Spinner } from "@shared/ui/spinner";

import { HistoryList } from "../hitsory/_components/HistoryList";
import { FileUpload } from "./_components/UploadForm";

const UploadPage = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <div className='max-w-max pt-20 space-y-16 relative'>
      {!isLoading ? (
        <>
          <FileUpload setLoading={setLoading} />
          <HistoryList />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default UploadPage;
