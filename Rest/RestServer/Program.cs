using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Rest;
using Rest.Web;
using RestServer.Server;
using System.Reflection;
using System.IO;
using System.Net;
using RestServer.Pokemon;

namespace RestServer
{
    class Program
    {
        static void Main(string[] args)
        {
            Rest.RestServer rs = new Rest.RestServer("http://localhost", "pokemon", 25565);
            //rs.Start();

            rs.AddRouting<Hoi>("functions");
            rs.AddRouting<CreateSession>("auth");

            Server.Main.Start();
            Console.ReadKey();
        }
    }

    class Hoi : Page
    {
        private string result;

        public override void Init(HttpListenerContext ctx)
        {
            this.ContentType = "application/javascript";
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "RestServer.Resources.functions.txt";

            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            using (StreamReader reader = new StreamReader(stream))
            {
                result = reader.ReadToEnd();
            }
        }

        public override string Send()
        {
            return result;
        }

        public override void Load()
        {

        }
    }
}
