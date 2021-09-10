"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// `index`, `prevHash`, `data`, and `timestamp`
// first trial
// const createBlock = (_data) => ({
//     index: Blockchain.blocks.length-1,
//     prevHash: Blockchain.blocks,
//     data: _data,
//     timestamp: Date.now(),
// })

// second trial
// function createBlock(_data) {
//     let block = {
//         index: Blockchain.blocks.length,
//         prevHash: Blockchain.blocks[Blockchain.blocks.length-1].hash,
//         data: _data,
//         timestamp: Date.now(),
//     };

// third trial
const createBlock = (_data) => {
    let block = {
        index: Blockchain.blocks.length,
        prevHash: Blockchain.blocks[Blockchain.blocks.length-1].hash,
        data: _data,
        timestamp: Date.now(),
    }

    block.hash = blockHash(block);
    Blockchain.blocks.push(block)
    console.log(Blockchain.blocks);
    return block;
}

// TODO: insert each line into blockchain
// poem.forEach(createBlock());
// for (let line of poem) {
// 	createBlock(line)
// }

poem.forEach(createBlock);

// console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
        `${bl.index}; ${bl.prevHash}; ${bl.data}; ${bl.timestamp}`
	).digest("hex");
}


function verfyChain() {

    if (verifyBlock() === true) {
        console.log("Blockchain seems to be valid!!!")
        return 
    } else {
        console.log("Blockchain not valid")
    }
}

function verifyBlock() {
    let prevBlock = Blockchain.blocks[Blockchain.blocks.length - 2];
    let nowBlock = Blockchain.blocks[Blockchain.blocks.length - 1 ];
    let genBlock = Blockchain.blocks[0];
    let bl = nowBlock;

    if (
        genBlock.hash === "000000"
        &&nowBlock.data !== 'undefined' 
        && nowBlock.prevHash !== 'undefined' 
        && nowBlock.index >= 0
        && prevBlock.hash === nowBlock.prevHash
        && nowBlock.hash === blockHash(bl)
    ) {
        // console.log("nice");
        return true;
    } else {
        // console.log("not so nice");
        return false;
    }   
}

Blockchain.blocks.forEach(verifyBlock);
verfyChain();

// Did I really check if the hashes match?
