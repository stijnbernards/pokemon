using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Rest.Web;
using Rest.Server;
using System.Text.RegularExpressions;

namespace Rest.Server
{
    class Router
    {
        private Dictionary<string, List<Page>> Routing = new Dictionary<string, List<Page>>();

        public void Add(string url, Page route)
        {
            if (Routing.ContainsKey(url))
            {
                this.Routing[url].Add(route);
            }
            else
            {
                this.Routing.Add(url, new List<Page>() { route });
            }
        }

        public void Call(string url, HttpListenerContext ctx)
        {
            string response = null;
            string guid = null;
            List<string> urlsp = url.Split('/').ToList<string>();
            if (!url.Contains("auth"))
            {
                guid = urlsp[1];
                urlsp.RemoveAt(1);
            }
            urlsp.RemoveAt(0);  
            url = string.Join("/", urlsp);
            if (url.Contains("auth") || Sessions.sessions.Any(i => i.Item1 == guid && i.Item2 == ctx.Request.RemoteEndPoint.Address.ToString()))
            {
                try
                {
                    foreach (Page page in Routing[url])
                    {
                        page.Init(ctx);
                        response += page.Send();
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    Console.WriteLine(e.StackTrace);
                    try
                    {
                        var results = Routing.Any(i => i.Key.StartsWith("rest/hoi"));
                    }
                    catch (Exception ex)
                    {

                    }
#if DEBUG
                    Console.WriteLine("Route doesn't exist!");
                    return;
#endif
                    if (Routing.ContainsKey("404"))
                    {
                        Routing["404"][0].Init();
                        response = Routing["404"][0].Send();
                    }
                }

                byte[] buf = Encoding.UTF8.GetBytes(response);

                ctx.Response.ContentEncoding = Encoding.UTF8;
                ctx.Response.ContentType = Routing[url][0].ContentType;
                ctx.Response.ContentLength64 = buf.Length;
                //ctx.Response.StatusCode = Routing[url][0].StatusCode;

                ctx.Response.OutputStream.Write(buf, 0, buf.Length);
                ctx.Response.Close();
            }
        }
    }
}
