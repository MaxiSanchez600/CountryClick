import React, { createContext, useState, FC } from "react";
import { FeedersWithReport } from "../../Config/typescript/interfaces";

interface contextDefaultValues {
  feedersList: FeedersWithReport[] | null;
  setFeedersList: (feeders: FeedersWithReport[] | null) => void;
  selectedFeeder: FeedersWithReport | null;
  setSelectedFeeder: (feeders: FeedersWithReport | null) => void;
}

export const contextFeeders = createContext<contextDefaultValues>({
  feedersList: null,
  setFeedersList: () => {},
  selectedFeeder: null,
  setSelectedFeeder: () => {},
});

const ContextProvider: FC = ({ children }) => {
  const [feedersList, setFeeders] = useState<FeedersWithReport[] | null>(null);

  const [selectedFeeder, setFeeder] = useState<FeedersWithReport | null>(null);

  const setFeedersList = (feeders: FeedersWithReport[] | null) =>
    setFeeders(feeders);

  const setSelectedFeeder = (feeder: FeedersWithReport | null) =>
    setFeeder(feeder);

  return (
    <contextFeeders.Provider
      value={{
        feedersList,
        setFeedersList,
        selectedFeeder,
        setSelectedFeeder,
      }}
    >
      {children}
    </contextFeeders.Provider>
  );
};

export default ContextProvider;
