import {Factorial} from './factorial';
import {FileNavigator} from './fileNavigator';

export class Main{
    static main(){
        const argc = process.argv.splice(2);

        if(argc.length != 1){
            console.error(`Invalid number of arguments ${argc}`);
            process.exit(1);
        }

        var arg = argc[0];

        // const fact = new Factorial(this.getNumberFromArgs(arg));
        // console.log(`Factorial of ${arg} is ${fact.getFactorial()}`);

        new FileNavigator().listFiles(arg);
    }

    static getNumberFromArgs(arg:string):number{
        if(! /^\d+$/.test(arg)) {
            console.error(`Invalid input ${arg}`);
            process.exit(1);
        }

        return +arg;
    }
}

Main.main();