import React, { createContext, useState, FC } from "react";
import { FeedersWithReport } from "../../Config/typescript/interfaces";

interface contextDefaultValues {
  selectedFeeder: FeedersWithReport | null;
  setSelectedFeeder: (feeders: FeedersWithReport | null) => void;

  // Update stuff
  selectedOption: "UPDATE" | "REPORT" | null;
  setSelectedOption: (selectedOption: "UPDATE" | "REPORT" | null) => void;
}

export const updateContext = createContext<contextDefaultValues>({
  selectedFeeder: null,
  setSelectedFeeder: () => {},
  selectedOption: null,
  setSelectedOption: () => {},
});

const ContextProviderUpdate: FC = ({ children }) => {
  const [selectedFeeder, setFeeder] = useState<FeedersWithReport | null>(null);

  const setSelectedFeeder = (feeder: FeedersWithReport | null) =>
    setFeeder(feeder);

  const [selectedOption, setOption] = useState<"UPDATE" | "REPORT" | null>(
    null
  );

  const setSelectedOption = (selectedOption: "UPDATE" | "REPORT" | null) =>
    setOption(selectedOption);

  return (
    <updateContext.Provider
      value={{
        selectedFeeder,
        setSelectedFeeder,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </updateContext.Provider>
  );
};

export default ContextProviderUpdate;
