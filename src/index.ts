import { Factorial } from './factorial';
import { greeting } from './grpc-client/grpc-client';
import rltest from './libs/lib1/rltest';
import lib2 from './libs/lib2';  // _note_: no need to add file name

class Cmds {
    help() {
        console.log("Available local commands:");

        // the first one is 'constructor()' if instance is an instance of a class
        var list_without_constructor = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).splice(1); 
        console.log(list_without_constructor);
    }
    
    factorial(argSubCmd) {
        console.log(`Input number is ${argSubCmd}`);

        if(! /^\d+$/.test(argSubCmd)) {
            console.error(`Invalid input ${argSubCmd}`);
            process.exit(1);
        }

        const fact = new Factorial(+argSubCmd);
        console.log(`Factorial of ${argSubCmd} is ${fact.getFactorial()}`);

    }

    lib1() {
        rltest.fn1();
    }

    lib2() {
        lib2.foo();
    }

    foo() {
        console.log("Cmds.foo() called - example of dynamic importing");
        import('./fileOperator').then(m => m.default.testFoo());
    }
    
    express() {
        console.log("Cmds.express() called");
        import('./express').then(m => m.default.default());
    }

    grpc() {
        console.log("Cmds.grpc() called");
        greeting.sayHello();
        greeting.howdy();
    }
}

function executeCommand(cmd) {

    var argCmd = argc[0];

    if(cmd[argCmd] != null) {
        console.log(`Executing command: ${cmd.constructor.name}.${argCmd}`);
        console.log("-----------------------------");
        cmd[argCmd]();
    }else{
        console.log(`Not a local command: ${argCmd}; Please execute command 'help' for all available local commands.`);
        console.log("Trying to load the command from modules ...");
        import(`./${argCmd}`).then((m) => {
            console.log(`Module './${argCmd}' loaded`);
            var argSubCmd = argc[1];
            if(argSubCmd == null) {
                argSubCmd = "default";
            }
            console.log(`Executing command: ${argCmd}.${argSubCmd}`);
            console.log("-----------------------------");
            m.default[argSubCmd](argc.splice(2));
        }).catch((err) => {
            console.error(err);
        });
    }
}

const argc = process.argv.splice(2);

function main(argc:string[]) {
    if(argc.length < 1){
        console.error(`Insufficient number of arguments ${argc}`);
        process.exit(1);
    } 

    executeCommand(new Cmds());
}

main(argc);