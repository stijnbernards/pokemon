using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace RestServer.Server
{
    class Data
    {
        public static List<Client> clients = new List<Client>();
        public static List<Tuple<DateTime, string>> messages = new List<Tuple<DateTime, string>>();
    }
}
