import React, { createContext, FC, useEffect, useState } from "react";
import axios from "axios";

type Section = "MESSAGE" | "YOUTUBE" | "SPOTIFY" | "";

interface contextDefaultValues {
  online: boolean;
  SetOnline: (online: boolean) => void;
  selected: Section;
  SetSelected: (selected: Section) => void;
  account: string;
  SetAccount: (account: string) => void;
  contract: any | null;
  SetContract: (contract: any) => void;
}

export const context = createContext<contextDefaultValues>({
  online: false,
  SetOnline: () => {},
  selected: "",
  SetSelected: () => {},
  account: "",
  SetAccount: () => {},
  contract: null,
  SetContract: () => {},
});

const ContextProvider: FC = ({ children }) => {
  const [online, useOnline] = useState<boolean>(false);
  const SetOnline = (online: boolean) => useOnline(online);

  const [selected, useSelected] = useState<Section>("");
  const SetSelected = (selected: Section) => useSelected(selected);

  const [account, setAccount] = useState<string>("");
  const SetAccount = (account: string) => setAccount(account);

  const [contract, setContract] = useState<any | null>(null);
  const SetContract = (contract: any) => setContract(contract);

  return (
    <context.Provider
      value={{
        online,
        SetOnline,
        selected,
        SetSelected,
        account,
        SetAccount,
        contract,
        SetContract,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default ContextProvider;
