using Grpc.Core;
using System;
using System.Threading.Tasks;

namespace GrpcService1
{
    public class RltestService : Rltest.RltestBase
    {
        public override Task<HowdyReply> Howdy(HowdyRequest request, ServerCallContext context)
        {
            Console.WriteLine("RLtestService.Howdy() called()!!!");

            //return base.Howdy(request, context);
            return Task.FromResult(new HowdyReply
            {
                Message = $"Howdy {request.Name}!!!"
            });
        }
    }
}
