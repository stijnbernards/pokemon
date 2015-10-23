using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Threading.Tasks;
using Rest.Web;
using Rest.Server;

namespace RestServer.Pokemon
{
    class CreateSession : Page
    {
        private String guid;

        public override void Init(HttpListenerContext ctx)
        {
            guid = Guid.NewGuid().ToString();
            Sessions.sessions.Add(Tuple.Create<string, string>(guid, ctx.Request.RemoteEndPoint.Address.ToString()));
        }

        public override string Send()
        {
            return guid;
        }

        public override void Load()
        {

        }
    }
}
