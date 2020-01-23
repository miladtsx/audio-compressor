'use strict'
const Lame = require("node-lame").Lame;
const path = require('path');
const fs = require('fs');


let inputFileName, inputFilePath, bitRate,
    outputFile, instance = null;

class AudioCompressor {
    constructor(inFile, bitRate) {
        this.inputFileName = path.parse(inFile.name).name;
        this.inputFilePath = path.dirname(inFile.path);
        this.bitRate = bitRate;
        this.outputFile = this.inputFileName + '.mp3';
        this.outputPath = path.join(this.inputFilePath, '/compressed/');
        if (!fs.existsSync(this.outputPath))
            fs.mkdirSync(this.outputPath);
        this.instance = new Lame({
            output: path.join(this.outputPath, this.outputFile),
            bitrate: this.bitRate
        }).setFile(inFile.path);
    }

    addProgressCallbacks(progressCallback, finishCallback) {
        const emitter = this.instance.getEmitter();
        emitter.on('progress', progressCallback);
        emitter.on('finish', finishCallback);
    }

    compressNow() {
        return new Promise((resolve, reject) => {
            this.instance.encode()
                .then(done => {
                    resolve(true);
                })
                .catch(err => {
                    if (err.message.includes('unsupported audio format'))
                        reject('فایل با این Format رو درحال حاضر نمی‌تونم تبدیلشون کنم. فعلا فایل mp3 یا wav رو می‌تونم');
                    if(err.message.includes('spawn lame ENOENT'))
                        reject('نرم‌افزار lame رو نصب کردی رو سیستمت؟ از این لینک دانلودش کن: <a href="https://lame.buanzo.org/">اینجا</a>')
                    reject(err);
                });
        })
    }
}

module.exports = AudioCompressor;