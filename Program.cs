using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using Fizzler.Systems.HtmlAgilityPack;
using System.Linq;
using Newtonsoft.Json;
using System.Net;
using Mapbox.Vector.Tile;
using System.Threading.Tasks;

namespace FBI_Test_zone
{
    class Species
    {
        public string scientificName { get; set; }
        public int usageKey { get; set; }
        public string status { get; set; }
        public string VNName { get; set; }
    }
    class Program
    {
        public static readonly int zoom = 14;
        static void Main(string[] args)
        {
            FindSpeciesInArea();
            //GetAllMapSpeciesData();
        }
        //Scrap json từ wiki và gbif
        static void GetData()
        {
            Dictionary<string, (string, string)> nameAndStatus = new();
            List<Species> species = new();
            HtmlWeb web = new();
            HtmlDocument document = web.Load("https://vi.wikipedia.org/wiki/Danh_mục_sách_đỏ_động_vật_Việt_Nam");
            var v = document.DocumentNode.QuerySelectorAll(".wikitable tbody td").ToList();
            for (int i = 0; i < v.Count; i += 3)
            {
                nameAndStatus.Add(v[i + 1].InnerText, (v[i].InnerText, v[i + 2].InnerText));
            }
            WebClient wc = new();

            foreach (string scientificName in nameAndStatus.Keys)
            {
                Species s = JsonConvert.DeserializeObject<Species>(wc.DownloadString("https://api.gbif.org/v1/species/match?name=" + scientificName));
                s.status = nameAndStatus[scientificName].Item2.Remove(1);
                s.VNName = nameAndStatus[scientificName].Item1;
                species.Add(s);
            }
            File.WriteAllText("data.json", JsonConvert.SerializeObject(species, Formatting.Indented));
        }
        //Toạ độ các ô tiếp giáp
        static readonly int[,] tiepGiap = { { 0, 0 }, { 1, -1 }, { 1, 0 },{1,1 },{0,1 },{ -1, 1 },{ -1, 0 },{ -1, -1 },{ 0, -1 } };
        static void FindSpeciesInArea()
        {
            
            //Cho toạ độ vào đây, giữ nguyên tham số cuối
            PointF point = WorldToTilePos(105.794779, 20.962152, 14);

            //Lấy dữ liệu loài
            List<Species> species;
            species = JsonConvert.DeserializeObject<List<Species>>(File.ReadAllText("data.json"));

            //Các loài sẽ xuất hiện
            List<Species> occurence = new();
            int counter = 0;
            
            List<Task> tasks = new();
            foreach (Species s in species)
            {
                if (s.usageKey == 0) continue;
                tasks.Add(Task.Run(() =>
                {
                    for (int i = 0; i < 9; i++)
                    {                     
                        if (Directory.Exists($@"./mapData/{s.usageKey}/14/{(int)point.X + tiepGiap[i, 0]}/{(int)point.Y + tiepGiap[i, 1]}.mvt");)
                        {
                            occurence.Add(s);
                            break;
                        }
                    }
                    Console.WriteLine("Done check no." + ++counter);
                }));  
            }
            Task.WaitAll(tasks.ToArray());
        }
        static void GetAllMapSpeciesData()
        {
            PointF TopCorner = WorldToTilePos(102.14394, 23.392505, zoom);
            PointF BotCorner = WorldToTilePos(109.4616339, 8.5624409, zoom);
            List<Task> tasks = new();
            //Lấy dữ liệu loài
            List<Species> species;
            species = JsonConvert.DeserializeObject<List<Species>>(File.ReadAllText("data.json"));

            int total = species.Count * ((int)BotCorner.X - (int)TopCorner.X) * ((int)BotCorner.Y - (int)TopCorner.Y);
            int count = 0;
            List<(string, byte[])> records = new();
            foreach (Species s in species)
            {
                if (s.usageKey == 0) continue;
                tasks.Add(Task.Run(() => { 
                for (int i = (int)TopCorner.X; i <= (int)BotCorner.X; i++)
                {  
                    for (int j = (int)TopCorner.Y; j <= (int)BotCorner.Y; j++)
                    {
                        WriteToFile(i, j, s); 
                        Console.WriteLine($@"{++count}/{total}    {s.usageKey}/{zoom}/{i}/{j}"); 
                    }
                }
                }));
            }
            while (tasks.Any())
            {
                tasks.RemoveAt(Task.WaitAny(tasks.ToArray()));              
            }           
        }
        public static void WriteToFile(int i, int j, Species s)
        {
            using WebClient wc = new();
            try
            {
                byte[] data = wc.DownloadData(@$"https://api.gbif.org/v2/map/occurrence/density/{zoom}/{i}/{j}.mvt?taxonKey={s.usageKey}");
                if (data.Length == 0) return;
                Directory.CreateDirectory($@"./mapData/{s.usageKey}/{zoom}/{i}/");
                using FileStream fs = File.Open($@"./mapData/{s.usageKey}/{zoom}/{i}/{j}.mvt", FileMode.OpenOrCreate, FileAccess.Write, FileShare.Write);
                fs.Write(data);
            }
            catch (WebException) { }
            //File.WriteAllBytes($@"./mapData/{s.usageKey}/{zoom}/{i}/{j}.mvt", data);
            //records.Add(($@"./ mapData /{ s.usageKey}/{ zoom}/{ i}/{ j}.mvt", data));
        }
        //Chuyển toạ độ gps sang toạ độ vector
        public static PointF WorldToTilePos(double lon, double lat, int zoom)
        {
            PointF p = new Point();
            p.X = (float)((lon + 180.0) / 360.0 * (1 << zoom));
            p.Y = (float)((1.0 - Math.Log(Math.Tan(lat * Math.PI / 180.0) +
                1.0 / Math.Cos(lat * Math.PI / 180.0)) / Math.PI) / 2.0 * (1 << zoom));

            return p;
        }

        public PointF TileToWorldPos(double tile_x, double tile_y, int zoom)
        {
            PointF p = new Point();
            double n = Math.PI - ((2.0 * Math.PI * tile_y) / Math.Pow(2.0, zoom));

            p.X = (float)((tile_x / Math.Pow(2.0, zoom) * 360.0) - 180.0);
            p.Y = (float)(180.0 / Math.PI * Math.Atan(Math.Sinh(n)));

            return p;
        }
    }
}
