import { useEffect, useState } from "react";

import { getPlantUMLUrl } from "../utils/getPlantUMLUrl";

export const Diagram = ({ plantuml_code }: { plantuml_code: string }) => {
  const [diagramUrl, setDiagramUrl] = useState("");

  useEffect(() => {
    const url = getPlantUMLUrl(plantuml_code);
    setDiagramUrl(url);
  }, []);

  return (
    <div>
      {diagramUrl ? <img src={diagramUrl} alt='PlantUML Diagram' /> : <p>Загрузка диаграммы...</p>}
    </div>
  );
};
