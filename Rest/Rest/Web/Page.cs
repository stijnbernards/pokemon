using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Threading.Tasks;

namespace Rest.Web
{
    public class Page
    {
        public object _POST { get; set; }
        public object _GET { get; set; }
        public object Headers { get; set; }
        public string ContentType { get; set; }
        public int StatusCode = 200;

        public virtual void Init(HttpListenerContext ctx = null) { }

        public virtual void Load() { }

        public virtual string Send() { return ""; }
        public virtual string Send(string response) { return ""; }
    }
}
