﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestServer.Server
{
    class Player
    {
        public Coords Coords { get; set; }
        public int Map { get; set; }
        public string Name { get; set; }
        public string Pokemon { get; set; }
        public string Bag { get; set; }
        public string BagPokemon { get; set; }
    }

    class Coords
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
}
