import React from "react";
import { useMetaMaskStore, useGardenSetup } from "./store";
import Balances from "./Balances";
import Gamble from "./GambleComponent";
import './App.css'

const App: React.FC = () => {
  const { connectMetaMask } = useMetaMaskStore();

  useGardenSetup();

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectMetaMask}>Connect MetaMask</button>
        <Balances />
        <Gamble/>
      </header>
    </div>
  );
};

export default App;
