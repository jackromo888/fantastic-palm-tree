import { Button } from "antd";
import { useContractReader } from "eth-hooks";
import React, { useState } from "react";
import Lit from "../helpers/lit";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  const [message, setMessage] = useState();
  const [encryptedFile, setEncryptedFile] = useState();
  const [encryptedSymmetricKey, setEncryptedSymmetricKey] = useState();

  // Lit Encrypt
  const litProtocolEncrypt = async () => {
    await Lit.encryptString(JSON.stringify(message)).then(result => {
      console.log("Encryption of message result: ", result);
      setEncryptedFile(result.encryptedFile);
      setEncryptedSymmetricKey(result.encryptedSymmetricKey);
      console.log("Encrypted Message: ", result.encryptedFile);
    });
  };

  // Lit Decrypt
  const litProtocolDecrypt = async () => {
    console.log("Decrypting from Lit");
    let decryptedFile = await Lit.decryptString(encryptedFile, encryptedSymmetricKey);
    console.log("Decrypted message: ", JSON.parse(decryptedFile));
    document.getElementById("decrypted-message").innerHTML = "Decrypted message: " + JSON.parse(decryptedFile).alg;
  };

  const encryptMessage = async () => {
    await litProtocolEncrypt();
  };

  const decryptMessage = async () => {
    await litProtocolDecrypt();
  };

  const btnStyle = {
    padding: "5px",
  };

  const inputStyle = {
    padding: "5px",
  };

  return (
    <div className="">
      <div className="App-body">
        <h2>Lit 🔥 Protocol Starter/Example</h2>
        <br />
        <input style={inputStyle} value={message} type="text" onChange={e => setMessage(e.target.value)} />
        <span>{message}</span>
        <br />
        <Button style={btnStyle} onClick={() => encryptMessage()}>
          Save to Lit 🔥
        </Button>
        <span id="lit-saved"></span>
        <br />
        <Button style={btnStyle} onClick={() => decryptMessage()}>
          Decrypt Message
        </Button>
        <span id="decrypted-message"></span>
      </div>
    </div>
  );
}

export default Home;
