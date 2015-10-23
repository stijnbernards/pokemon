using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Net;
using System.Security.Cryptography;
using System.Threading;
using System.Text;
using System.Threading.Tasks;

namespace RestServer.Server
{
    class Main
    {
        private static Socket socketServer = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.IP);
        private static string guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
        
        public static void Start()
        {
            Console.WriteLine("Started server!");

            socketServer.Bind(new IPEndPoint(IPAddress.Any, 8080));
            socketServer.Listen(128);
            socketServer.BeginAccept(null, 0, OnAccept, null);
        }

        private static void OnAccept(IAsyncResult result)
        {
            byte[] buffer = new byte[1024];
            try
            {
                Socket client = null;
                string headerResponse = "";
                if (socketServer != null && socketServer.IsBound)
                {
                    client = socketServer.EndAccept(result);
                    var i = client.Receive(buffer);
                    headerResponse = (System.Text.Encoding.UTF8.GetString(buffer)).Substring(0, i);
                }
                if (client != null)
                {
                    string key = headerResponse.Replace("ey:", "`")
                              .Split('`')[1]
                              .Replace("\r", "").Split('\n')[0]
                              .Trim();
                    string acceptKey = AcceptKey(ref key);

                    string newLine = "\r\n";

                    string response = "HTTP/1.1 101 Switching Protocols" + newLine
                         + "Upgrade: websocket" + newLine
                         + "Connection: Upgrade" + newLine
                         + "Sec-WebSocket-Accept: " + acceptKey + newLine + newLine;

                    client.Send(System.Text.Encoding.UTF8.GetBytes(response));
                    string recieved = ReadFromSocket(client);
                    if (recieved != null)
                    {
                        Thread.Sleep(2000);
                        new Thread(
                            () =>
                            {
                                Data.clients.Add(new Client(client));
                            }
                        ).Start(); 
                    }
                }
            }
            catch (SocketException exception)
            {
                throw exception;
            }
            finally
            {
                if (socketServer != null && socketServer.IsBound)
                {
                    socketServer.BeginAccept(null, 0, OnAccept, null);
                }
            }
        }

        public static T[] SubArray<T>(T[] data, int index, int length)
        {
            T[] result = new T[length];
            Array.Copy(data, index, result, 0, length);
            return result;
        }

        private static string AcceptKey(ref string key)
        {
            string longKey = key + guid;
            SHA1 sha1 = SHA1CryptoServiceProvider.Create();
            byte[] hashBytes = sha1.ComputeHash(System.Text.Encoding.ASCII.GetBytes(longKey));
            return Convert.ToBase64String(hashBytes);
        }

        static SHA1 sha1 = SHA1CryptoServiceProvider.Create();
        private static byte[] ComputeHash(string str)
        {
            return sha1.ComputeHash(System.Text.Encoding.ASCII.GetBytes(str));
        }

        public static string ReadFromSocket(Socket client)
        {
            byte[] bytes = new byte[1024];
            int bytesRec = client.Receive(bytes);


            int second = bytes[1] & 127;
            int maskIndex = 2;
            if (second < 126)
            {
                maskIndex = 2;
            }
            else if (second == 126)
            {
                maskIndex = 4;
            }
            else if (second == 127)
            {
                maskIndex = 10;
            }
            byte[] mask = { bytes[maskIndex], 
                                  bytes[maskIndex+1], 
                                  bytes[maskIndex+2], 
                                  bytes[maskIndex+3]};
            int contentIndex = maskIndex + 4;
            byte[] decoded = new byte[bytesRec - contentIndex];
            for (int i = contentIndex, k = 0; i < bytesRec; i++, k++)
            {
                decoded[k] = (byte)(bytes[i] ^ mask[k % 4]);
            }
            return Encoding.UTF8.GetString(decoded, 0, decoded.Length);
        }
    }
}
