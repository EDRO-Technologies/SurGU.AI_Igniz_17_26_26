import plantumlEncoder from "plantuml-encoder";

export const getPlantUMLUrl = (diagramText: string) => {
  const encodedDiagram = plantumlEncoder.encode(diagramText);
  return `https://www.plantuml.com/plantuml/svg/${encodedDiagram}`;
};
