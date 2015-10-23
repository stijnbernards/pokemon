using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestServer.Pokemon
{
    class Player
    {
        public Coords coords;
    }

    class Coords
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
}
