import fs = require('fs');
import {argc} from './main';

export class FileOperator {
    listFiles() {
        var folder = argc[2];

        fs.readdir(folder, (err, files) => {
            files.forEach(file => {
                console.log(file);
            })
        })
    }

    testFoo(){
        console.log("testFoo() called");
    }
}