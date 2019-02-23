import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import ipfs from './ipfs';

import "./App.css";

class App extends Component {
  state = { ipfsHash:'', storageValue: 0, web3: null, account:null, accounts: null, contract: null, buffer:null, rhash:'' };
  /*constructor(props){
    super(props)

  this.captureFile =this.captureFile.bind(this);
  this.onSubmit =this.onSubmit.bind(this);
  }*/

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //console.log(instance);

   //console.log("helo "+JSON.parse(JSON.stringify(instance)));
      //this.setState({accounts});


      this.captureFile =this.captureFile.bind(this);
  this.onSubmit =this.onSubmit.bind(this);



      this.setState({ web3, accounts, contract: instance });//, this.runExample);
     // console.log("helo "+(JSON.stringify(instance)));
//return
 //this.contract.get.call(accounts[0]);
//return this.setState({ ipfsHash:instance[0].hash });
    } catch (error) {
       //Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async (event) => {
    const { accounts, contract,buffer,rhash } = this.state;
     event.preventDefault()
  //await ipfs.files.add(this.state.buffer,(error,result) =>{
    ipfs.files.add(this.state.buffer,(error,result) =>{  
    if(error){
     return console.log("lollllllllllllllllllll",error)
    }
    //this.methods.set(result[0].hash,{from: this.state.accounts[0]}).then((result)=>{
      //console.log(result[0].hash);
      console.log(result[0].hash);
      console.log("AAAAAAAAAAAAAAAAAaa");
    this.setState({rhash:result[0].hash})
    console.log('onSubmit...');
    });
  

  console.log('onSub');
    this.setState({rhash:'shi'})
 await contract.methods.set(rhash).send({ from: accounts[0] });
     //this.contract.get.call(accounts[0]);
     // console.log("helo "+(JSON.stringify(this.state.contract)));
    // Stores a given value, 5 by default.
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    //this.setState({ ipfsHash:response });
    return this.setState({ipfsHash:response})
  };

captureFile(event){
  event.preventDefault()
  const file = event.target.files[0]
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend= () =>{
    this.setState({buffer: Buffer(reader.result)})
    //console.log('buffer',this.state.buffer)
  }
//ipfs.types.Buffer.from(
}
onSubmit(event){
  event.preventDefault()
  ipfs.files.add(this.state.buffer,(error,result) =>{
    if(error){
      console.error(error)
      return
    }
    //await contract.methods.set(ipfsHash).send({ from: accounts[0] });
    this.methods.set(result[0].hash,{from: this.state.accounts[0]}).then((result)=>{
      console.log(result[0].hash);
      return this.setState({ipfsHash:result[0].hash})
    }).then((ipfsHash)=>{
    console.log('ipfsHash',this.state.ipfsHash)
    })
  })
  console.log('onSubmit...')
}


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>IPFS file upload</h1>
        <h2>Smart Contract</h2>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1> Your Image </h1>
              
               <script>
               document.write(https://ipfs.io/ipfs/+this.state.ipfsHash)</script>
              <h2>Upload img</h2>
              <form onSubmit={this.runExample}>
                <input type='file' onChange={this.captureFile} />
                <input type='submit' />
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
