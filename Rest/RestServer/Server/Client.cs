using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Sockets;
using System.Threading.Tasks;
using System.Threading;

namespace RestServer.Server
{
    class Client
    {
        public Socket client;
        public Player character;
        private IDictionary<int, Action<object>> processor;
        private DateTime lastUpdate;

        public Client(Socket client)
        {
            lastUpdate = DateTime.Now;
            this.processor = new Dictionary<int, Action<object>>
            {
                { 1, SaveCoords },
                { 2, SaveMap },
                { 3, Message },
                { 4, Pokemons },
                { 5, CharName }
            };

            this.client = client;
            this.character = new Player()
            {
                Coords = new Coords()
            };

            new Thread(() =>
            {
                Receive();
            }).Start();

            new Thread(() =>
            {
                while (true)
                {
                    SendPlayerCoords();
                    SendMessages();
                    lastUpdate = DateTime.Now;
                    Thread.Sleep(100);
                };
            }).Start();
        }

        private void Receive()
        {
            while (true)
            {
                try
                {
                    string received;
                    string[] receivedsplt;

                    received = Main.ReadFromSocket(client);
                    receivedsplt = received.Split('$');
                    processor[Convert.ToInt16(receivedsplt[0])](receivedsplt[1]);
                }
                catch (Exception e) { }
            }
        }

        private void SendPlayerCoords()
        {
            string sendStr  = "1$";
            List<string> playerCoords = new List<string>();
            List<Client> players = (
                    from i in Data.clients 
                    where i.character.Map == this.character.Map 
                    && this.character.Coords != i.character.Coords 
                    select i
                ).ToList();

            foreach (Client player in players)
            {
               playerCoords.Add(player.character.Coords.X + "," + player.character.Coords.Y);
            }

            sendStr += string.Join(".", playerCoords);
            Send(sendStr);
        }

        private void SendMessages()
        {
            string sendStr = "3$";
            List<string> messages = new List<string>();
            messages = (
                    from i in Data.messages 
                    where i.Item1 > lastUpdate
                    select "[" + i.Item1.ToShortTimeString() + "] " + i.Item2
                ).ToList();
            sendStr += string.Join(".", messages);
            Send(sendStr);
        }

        private void Send(string sendData)
        {
            int size;
            List<byte> lb = new List<byte>();
            lb.Add(0x81);
            size = sendData.Length;
            lb.Add((byte)size);
            lb.AddRange(Encoding.UTF8.GetBytes(sendData));
            try
            {
                client.Send(Main.SubArray<byte>(lb.ToArray(), 0, size + 2));
            }
            catch (Exception e) { };
        }

        private void SaveCoords(object coords)
        {
            string coordstr = (string)coords;
            character.Coords.X = Convert.ToInt16(coordstr.Split(',')[0]);
            character.Coords.Y = Convert.ToInt16(coordstr.Split(',')[1]);
        }

        private void SaveMap(object mapId)
        {
            character.Map = Convert.ToInt16(mapId);
        }

        private void Message(object message)
        {
            Data.messages.Add(new Tuple<DateTime, string>(DateTime.Now, this.character.Name + ": " + (string)message));
        }

        private void Pokemons(object message)
        {
            this.character.pokemons = message.ToString();
        }

        private void CharName(object message)
        {
            this.character.Name = message.ToString();
        }
    }
}
