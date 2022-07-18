const { Address } = require("ethereumjs-util");
const { ethers } = require("ethers");
const fs = require('fs');
const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');

let abiJson = fs.readFileSync('ApaAbi.json');
let apaGalsAbiJson = fs.readFileSync('ApaGals.json');
const apaAbi = JSON.parse(abiJson);
const apaGalsAbi = JSON.parse(apaGalsAbiJson);
apaContract = new ethers.Contract('0x880Fe52C6bc4FFFfb92D6C03858C97807a900691',apaAbi , provider ); // for read only, change with signer
apaGalsContract = new ethers.Contract('0x7600088fb72941a9139669d7f6cb4e717ec05c87',apaGalsAbi,provider);


async function getApaGalContendersAtAGivenBlock(start, target){
let ApaGalsUserRegistry = new Map();
let ApaGalsWhiteListAlreadyIn = new Map();
let ApaGalWhiteList = new Array();
  for (let i = start; i < target; i++) {
      try {
      const result = await apaGalsContract.ownerOf(i ,{ blockTag: 17393489 })
      if (result == "0x9615fc5890f4585b14aabf433d0f73aacffec348"){ // market
        continue;
      }
      if(ApaGalsUserRegistry.has(result)){
        const numberOfApaGals = ApaGalsUserRegistry.get(result);
        const newNumberofApaGals = numberOfApaGals + 1;
        ApaGalsUserRegistry.set(result,newNumberofApaGals);
        if(newNumberofApaGals > 1) {
          if(!ApaGalsWhiteListAlreadyIn.has(result)){
            ApaGalsWhiteListAlreadyIn.set(result, true);
            ApaGalWhiteList.push(result);
          }
          
        }
      }
      else {
        ApaGalsUserRegistry.set(result,1);
      }
    }
    catch(err) {
      console.log(i)
    }
      
  }
  console.log(ApaGalWhiteList);
  var json = JSON.stringify(ApaGalWhiteList);
  fs.writeFileSync('APAGalContenders.json', json)
}

async function getAPAContendersAtAGivenBlock(start, target){
let UserRegistry = new Map();
let WhiteListAlreadyIn = new Map();
let WhiteList = new Array();
  for (let i = start; i < target; i++) {
      const result = await apaContract.ownerOf(i ,{ blockTag: 17393489 })
      if (result == "0x770a4C7f875fb63013a6Db43fF6AF9980fcEb3b8"){ // market
        continue;
      }
      if(UserRegistry.has(result)){
        const numberOfApas = UserRegistry.get(result);
        const newNumberofApas = numberOfApas + 1;
        UserRegistry.set(result,newNumberofApas);
        if(newNumberofApas  > 3) {
          if(!WhiteListAlreadyIn.has(result)){
            WhiteListAlreadyIn.set(result, true);
            WhiteList.push(result);
          }
          
        }
      }
      else {
        UserRegistry.set(result,1);
      }
      
  }
  const sortedNumDesc = new Map([...UserRegistry].sort((a, b) => b[1] - a[1]));
  const obj = Object.fromEntries(sortedNumDesc);
  fs.writeFileSync('smollAPARegistry.json', JSON.stringify(obj));
  console.log(WhiteList);
  var json = JSON.stringify(WhiteList);
  fs.writeFileSync('APAContenders.json', json)
}
getApaGalContendersAtAGivenBlock(0,1000);
getAPAContendersAtAGivenBlock(0,10000);

