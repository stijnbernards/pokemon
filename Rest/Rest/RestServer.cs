using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Reflection;
using System.IO.Compression;
using System.Threading;
using System.Threading.Tasks;
using Rest.Server;
using Rest.Web;
using System.Security;
using System.Diagnostics;

namespace Rest
{
    public class RestServer
    {
        #region members

        private string BaseUrl = null;
        private string Suffix = null;
        private string Port = null;
        private int urlSplit = 0;
        public MemoryStream MsPHP = new MemoryStream();
        
        private HttpListener Server = new HttpListener();
        private Router router = new Router();


        #endregion

        public RestServer(string baseurl, string suffix, int port = 0)
        {
            this.BaseUrl = baseurl;
            
            if(port != 0)
                this.Port = string.Format(":{0}/", port);
            this.Suffix = suffix;
            this.urlSplit = BaseUrl.Split('/').Count();
        }

        public void Start()
        {
            Console.WriteLine("Done!");
            Console.WriteLine("Started server!");
            this.Server.Prefixes.Add(string.Format("{0}{1}", BaseUrl, Port));
            this.Server.Start();

            new Thread(
                () => {
                    while (true)
                    {
                        HttpListenerContext ctx = this.Server.GetContext();
                        ThreadPool.QueueUserWorkItem((_) => ProcessRequest(ctx));
                    }                        
                }
            ).Start(); 
        }

        private void ProcessRequest(HttpListenerContext ctx)
        {
            List<string> splitUrl = ctx.Request.Url.ToString().Split('/').ToList<string>();
#if DEBUG
            Console.WriteLine("Requested url: " + ctx.Request.Url);
#endif
            for (int i = 1; i < urlSplit; i++)
                splitUrl.RemoveAt(0);

            router.Call(string.Join("/", splitUrl), ctx);
        }

        public void AddRouting<T>(string url) where T : Page, new()
        {
            this.router.Add(url, new T());
        }
    }
}
