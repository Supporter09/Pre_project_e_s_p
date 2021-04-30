let data = require('../../db/sample.json')
// function FindSpeciesInArea(positionX,positionY){
//     var point = WorldToTilePos( positionX, positionY, 14);
//     let counter = 0;
//     for
// }
let tiepGiap= new Array();
tiepGiap[1] = new Array(0,0);
tiepGiap[2] = new Array(1,-1);
tiepGiap[3] = new Array(1,0);
tiepGiap[4] = new Array(1,1);
tiepGiap[5] = new Array(0,1);
tiepGiap[6] = new Array(-1,1);
tiepGiap[7] = new Array(-1,0);
tiepGiap[8] = new Array(-1,-1);
tiepGiap[9] = new Array(0,-1);
export default function findSpeciesInArea(posX,posY)
{
    // console.log("RUN FIND SPECIES IN AREA")
    //Cho toạ độ vào đây, giữ nguyên tham số cuối
    // var point = WorldToTilePos(105.794779, 20.962152, 14);
    var point = WorldToTilePos(posX, posY, 14);

    //Lấy dữ liệu loài
    // var species = JSON.parse("../../db/data.json");
    var species = data;

    //Các loài sẽ xuất hiện
    var occurrence = [];
    var counter = 0;
    function LinkCheck(url)
    {
        var http = new XMLHttpRequest();
        http.open('HEAD', url);
        http.send();
        return http.status!=404;
    }
    
    for(var j=0;j<data.length;j++)
    {
        if (data[j].usageKey == 0) continue;
        for (var i = 0; i < 9; i+=1)
            {                     
                console.log("are u there",j)
                let url=`./mapData/${data[j].usageKey}/14/`+point.X + tiepGiap[i, 0]/point.Y + tiepGiap[i, 1]+".mvt";
                let checkFile = LinkCheck(url)
                console.log(checkFile)
                if(checkFile){
                    // console.log(data[j]);
                    occurrence.push(data[j]);
                    break;
                }
            }
    } 
    // console.log(occurrence)
    return occurrence;
}

function WorldToTilePos(lon, lat, zoom){
    var x;
    var y;
    x = (lon + 180.0) / 360.0 * (1 << zoom);
    y = (1.0 - Math.log(Math.tan(lat * Math.PI / 180.0) +
    1.0 / Math.cos(lat * Math.PI / 180.0)) / Math.PI) / 2.0 * (1 << zoom);
    return {X:x,Y:y};
}