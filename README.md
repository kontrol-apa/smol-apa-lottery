## Smol APA Lottery

This repository provides the means to recreate the lottery process by running the scripts provided. 

### Steps:
1. Generate a random seed from the contract that have been used for the APA Gals whitelisting before (https://snowtrace.io/tx/0x453d962e2bc8455ea0624a11b5e2e131080703525519c1c161d1b11c1874e5bd)
2. Take a snapshot of APA and APA Gal holders at the same block (17393489)
3. Filter the holders by the number of NFT's held: 
    1. APA Gals: People with 2 or more APA Gals qualify.
    2. APA : People with 4 or more APA qualify.
4. Use the random seed with sha256 to generate a psuedo-random sequence to pick 10 people from APA Gals holders and 51 people (against 1 duplicate) from APA holders.
5. Duplicates are not allowed.

### How to run the scripts
1. Get node on your machine
2. `npm install`
3. `node getContenders.js` 
4. `python3 python/main.py` -> creates the winner.txt