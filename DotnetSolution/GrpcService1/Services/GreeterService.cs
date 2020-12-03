using Grpc.Core;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrpcService1
{
    public class GreeterService : Greeter.GreeterBase
    {
        private readonly ILogger<GreeterService> _logger;
        public GreeterService(ILogger<GreeterService> logger)
        {
            _logger = logger;
        }

        public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
        {
            Console.WriteLine("GreeterService.SayHello() called()");

            return Task.FromResult(new HelloReply
            {
                Message = $"Hello {request.Name}!!!"
            });
        }
    }

    public class RltestService : Rltest.RltestBase
    {
        public override Task<HowdyReply> Howdy(HowdyRequest request, ServerCallContext context)
        {
            Console.WriteLine("RLtestService.Howdy() called()");

            //return base.Howdy(request, context);
            return Task.FromResult(new HowdyReply
            {
                Message = $"Howdy {request.Name}!!!"
            });
        }
    }
}
