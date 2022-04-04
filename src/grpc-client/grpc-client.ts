import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";

const packageDefinition = protoLoader.loadSync(
  [
    `${__dirname}/../../DotnetSolution/GrpcService1/Protos/greet/greet.proto`,
    `${__dirname}/../../DotnetSolution/GrpcService1/Protos/greet/Rltest.proto`,
  ],
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);

const loadedDef: grpc.GrpcObject = grpc.loadPackageDefinition(packageDefinition);
const pkg_greet: any = loadedDef.greet;  // greet is the package name defined in the .proto files

function GreeterService() {
  return new pkg_greet['Greeter'](    // or return new greet.Greeter(
    "localhost:5000",
    grpc.credentials.createInsecure(),
  );
}

function RltestService() {
  return new pkg_greet.Rltest(
    "localhost:5000",
    grpc.credentials.createInsecure(),
    //grpc.credentials.createSsl(),
  );
}

function sayHello() {
  console.log("calling sayHello() ...");
  GreeterService().sayHello(
    { name: "from sayHello" }, (error, response) => {
      if (error !== null)
      {
        console.log('Error:', error);
      }
      else
      {
        console.log("Response:", response.message);
      }
    },
  );
}

function howdy() {
  console.log("calling howdy() ...");
  RltestService().howdy(
    { name: "from howdy" }, (error, response) => {
      if (error !== null)
      {
        console.log('Error:', error);
      }
      else
      {
        console.log("Response:", response.message);
      }
    }
  );
}

export const greeting = {
  sayHello,
  howdy,
};
