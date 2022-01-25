import contract from "@truffle/contract";
import MaxiContract from "./contracts/DespertaMaxi.json";

const maxiContract = async (provider) => {
  const maxicontract = contract(MaxiContract);
  maxicontract.setProvider(provider);

  let instance = await maxicontract.deployed();
  return instance;
};

export default maxiContract;
