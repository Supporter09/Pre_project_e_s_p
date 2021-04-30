import $ from 'jquery'; 
let data = require('../../db/sample.json')

// function FindSpeciesInArea(positionX,positionY){
//     var point = WorldToTilePos( positionX, positionY, 14);
//     let counter = 0;
//     for
// }

export default function findSpeciesInArea(posX,posY)
{
    // console.log("RUN FIND SPECIES IN AREA")
    //Cho toạ độ vào đây, giữ nguyên tham số cuối
    // var point = WorldToTilePos(105.794779, 20.962152, 14);
    console.log("posY: ",posY,"posX",posX)
    var point = WorldToTilePos(posX, posY, 14);
    // console.log("pointX: ",point.X,"pointY",point.Y)

    //Lấy dữ liệu loài
    // var species = JSON.parse("../../db/data.json");
    var species = data;

    //Các loài sẽ xuất hiện
    var occurrence = [];
    var counter = 0;
    // function doesFileExist(urlToFile) {
    //     var myLog = new File([""],urlToFile);

    //     // See if the file exists
    //     if(myLog.exists()){
    //         console.log('The file exists');
    //     }else{
    //         console.log('The file does not exist');
    //     }
    // }  
    const checkFileExist= async (url) => {
        // var result = await fetch('http://127.0.0.1:5000/checkExistFile?url='+url);
        // const myJson = await result.json();      
        // return myJson  
        // $.ajax({
        //     type:"GET",
        //     dataType: "json",
        //     url: 'http://127.0.0.1:5000/checkExistFile?url='+url,
        //     success: function(data){
        //         var buf1=data;
        //         console.log(data);
        //         return data
        //     }
        // })
        $.ajax({
            type:"GET",
            dataType: "json",
            url: 'https://projectespapi.herokuapp.com/checkExistFile?url='+url,
            success: function(data){
                var buf1=data;
                console.log(data);
                return data
            }
        })
    }
    var tiepGiap= new Array( );
    tiepGiap[0] = new Array (0,0);
    tiepGiap[1] = new Array (1,-1);
    tiepGiap[2] = new Array (1,0);
    tiepGiap[3] = new Array (1,1);
    tiepGiap[4] = new Array (0,1);
    tiepGiap[5] = new Array (-1,1);
    tiepGiap[6] = new Array (-1,0);
    tiepGiap[7] = new Array (-1,-1);
    tiepGiap[8] = new Array (0,-1);
    for(var j=0;j<data.length;j++)
    {
        if (data[j].usageKey == 0) continue;
        for (var i = 0; i < 9; i++)
            {                     
                // console.log("are u there",j)
                var firstX = point.X + tiepGiap[i][0];
                var secondY = point.Y + tiepGiap[i][1];
                // console.log(firstX ," " , point.Y)
                let url=`./mapData/${data[j].usageKey}/14/`+firstX+'/'+secondY+".mvt";
                // console.log(url)
                // let checkFile = 
                // let checkFile = checkFileExist(j)
                // console.log(checkFile)
                
                if(checkFileExist(String(url))==true){
                    // console.log("PUSH!")
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
    x = Math.round((lon + 180.0) / 360.0 * (1 << zoom));
    y = Math.round((1.0 - Math.log(Math.tan(lat * Math.PI / 180.0) +
    1.0 / Math.cos(lat * Math.PI / 180.0)) / Math.PI) / 2.0 * (1 << zoom));  
    return {X:x,Y:y};
}