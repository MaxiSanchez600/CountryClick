import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Componentes/NavBar/NavBar";
import Hero from "./Componentes/Hero/Hero";
import PlaySection from "./Componentes/PlaySection/PlaySection";
import Footer from "./Componentes/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StatusPage from "./Componentes/Status/StatusPage";
import Web3 from "web3";
import { context } from "./Componentes/PlaySection/Context/ReactContext";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils/types";
import MaxiContract from "./contracts/DespertaMaxi.json";
import maxiContract from "./maxiContract";
import "./app.scss";

declare var window: any;

function App() {
  const { SetAccount, account, SetContract } = useContext(context);

  const web3: Web3 = new Web3(Web3.givenProvider);

  window.ethereum.on("accountsChanged", (accounts: string[]) => {
    connectToWeb3(accounts);
  });

  useEffect(() => {
    connectToWeb3();
  }, []);

  const connectToWeb3 = async (selectedAccount?: string[]): Promise<void> => {
    const accounts: string[] = selectedAccount
      ? selectedAccount
      : await web3.eth.getAccounts();
    if (accounts[0] === undefined) return;

    SetAccount(accounts[0].toLowerCase());
    console.log("ETH ACCOUNT WAS CHANGED TO: ", accounts[0].toLowerCase());
    setContract(accounts[0].toLowerCase());
  };

  const setContract = async (account: string) => {
    console.log("Setting a contract for ETH Account: ", account);
    console.log("Setting a contract for PROVIDER: ", web3.eth.currentProvider);
    const contractInstance = await maxiContract(web3.eth.currentProvider);
    console.log("NEW CONTRACT CREATED: ", contractInstance);
    SetContract(contractInstance);
    // let maxiContract: Contract;
    // maxiContract = new web3.eth.Contract(
    //   MaxiContract.abi as AbiItem[],
    //   "0x8A8e2f6f160A0Fb2f01e4f9950b228FA018B5d5c"
    // );
    // SetContract(maxiContract);
    // console.log("Contract setted: ", maxiContract);
  };

  return (
    <Router>
      <Route path="/" component={Navbar}></Route>
      <Switch>
        <Route exact path="/" component={Hero}></Route>
        <Route path="/juga" component={PlaySection}></Route>
        <Route path="/status" component={StatusPage}></Route>
      </Switch>
      <Route path="/" component={Footer}></Route>
    </Router>
  );
}

export default App;
