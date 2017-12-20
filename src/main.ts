import {Factorial} from './factorial';
import {FileOperator} from './fileOperator';

class Cmds {
    help() {
        console.log("Listing command methods:");

        var list_without_constructor = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).splice(1);
        console.log(list_without_constructor);
    }
    
    factorial() {
        var arg = argc[1];
        console.log(`Input number is ${arg}`);

        if(! /^\d+$/.test(arg)) {
            console.error(`Invalid input ${arg}`);
            process.exit(1);
        }

        const fact = new Factorial(+arg);
        console.log(`Factorial of ${arg} is ${fact.getFactorial()}`);

    }

    operateFile(){
        var arg = argc[1];
        var file_operator = new FileOperator();

        if(file_operator[arg] == null) {
            console.log("There in no such command: ${arg};");
        }else{
            console.log(`Executing command: ${file_operator.constructor.name}.${arg}`);
            console.log("-----------------------------");
            file_operator[arg]();
        }
    }
}

export class Main{
    static main(argc:string[]){

        if(argc.length < 1){
            console.error(`Invalid number of arguments ${argc}`);
            process.exit(1);
        }
        
        var arg = argc[0];

        //this[arg]();
        var cmd = new Cmds();

        if(cmd[arg] == null) {
            console.log("There in no such command: ${arg}; Try command 'help' for more info.");
        }else{
            console.log(`Executing command: ${cmd.constructor.name}.${arg}`);
            console.log("-----------------------------");
            cmd[arg]();
        }
    }
}

export const argc = process.argv.splice(2);
Main.main(argc);