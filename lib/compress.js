'use strict'
const Lame = require("node-lame").Lame;

class CompressHelper {
    constructor(inFile, outFile, bitRate) {
        this.inFile = inFile;
        this.bitRate = bitRate;

        this.instance = null;
    }

    init() {
        if (this.instance)
            return this.instance;

        this.instance = new Lame({
            output: this.outputFile,
            bitrate: this.bitRate
        }).setFile(this.inputFile);

        return this.instance;
    }

    compressNow() {
        this.instance.encode()
            .then(done => {
                console.log('Done');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = CompressHelper;