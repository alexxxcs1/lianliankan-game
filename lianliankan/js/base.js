var ScreenSize = {width:640,height:1040};

var BaseUrl = 'http://packy.club/pinganh5/';

// var load_list={
//     'img':[
//         {'name':'frame1bkg','src':'frame1bkg.jpg'},
//     ],
//     'group':[
//         // {'name':'bkg','type':'.jpg','endid':'4','srcname':'bkg'},
//     ]
// };

var pageLock=true;
function pageScoll(e)
{
    if(pageLock)
    {
        e.preventDefault(); //阻止页面滑动动作
    }
}

function randomsort(a, b) {
    return Math.random()>.5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
};

var ItemMap =
{
    acreage:[6,4],                  //设定宽高
    map:[],
    init:function()
    {
        ItemMap.map = [];
        for (var i = 0; i < ItemMap.acreage[0]; i++) {
            for (var j = 0; j < ItemMap.acreage[1]; j++) {
                var tmpArray = [];
                tmpArray[j] = 0;
            }
            ItemMap.map.push(tmpArray);
        }
    },
    randomMap:function()
    {
        ItemMap.init();
        for (var i = 0; i < ItemMap.map.length; i++) {
            for (var j = 0; j < ItemMap.map[i].length; j+=2) {
                    var num = parseInt(Math.random()*8+1);


                    ItemMap.map[i][j] = num;
                    ItemMap.map[i][j+1] = num;

            }
            ItemMap.map[i].sort(randomsort);
            ItemMap.map[i].sort(randomsort);
            ItemMap.map[i].sort(randomsort);

        }
        var tempArray = new Array();
        for (var j = 0; j < ItemMap.map[0].length; j++) {

            for (var i = 0; i < ItemMap.map.length; i++) {
              tempArray[i] = ItemMap.map[i][j];
            }
            tempArray.sort(randomsort);
            tempArray.sort(randomsort);
            tempArray.sort(randomsort);
            for (var i = 0; i < ItemMap.map.length; i++) {
              ItemMap.map[i][j] = tempArray[i];
            }
        }
    },
    getColor:function(num)
    {
        switch (num) {
            case 0:
                    return 'null';

            case 1:
                    return '#FFA500';

            case 2:
                    return '#EE2C2C';

            case 3:
                    return '#D3D3D3';

            case 4:
                    return '#CD6889';

            case 5:
                    return '#C0FF3E';

            case 6:
                    return '#8A2BE2';

            case 7:
                    return '#00B2EE';

            case 8:
                    return '#228B22';

            case 9:
                    return '#999999';
        }
    },
    overCheck:function()
    {
        for (var i = 0; i < ItemMap.map.length; i++) {
            for (var j = 0; j < ItemMap.map[i].length; j++) {
                if (ItemMap.map[i][j]) return false;
            }
        }
        return true;
    },
    findPath:function(map,row,col,selectNum,line=0)
    {
        var PathArray = new Array();
        switch (row) {
            case 0:
                var pathEnd = [-1];
                PathArray.push(pathEnd);
                break;
            case ItemMap.map.length-1:
                var pathEnd = [-3];
                PathArray.push(pathEnd);
                break;
        }
        switch (col) {
            case 0:
                var pathEnd = [-4];
                PathArray.push(pathEnd);
                break;
            case ItemMap.map[0].length-1:
                var pathEnd = [-2];
                PathArray.push(pathEnd);
                break;
        }



        //查找向上的路径
        function findUp(row,col,loop=1)
        {
            for (var i = row-1 ; i >= 0 ; i--) {
                if (map[i][col]) {
                    if (map[i][col]==selectNum) {
                        var pathPoint = [i,col];
                        PathArray.push(pathPoint);
                    }
                    break;
                }else {
                    if (i-1<0) {
                        var pathPoint = [i,col];
                        var pathEnd = [-1];
                        if (loop == 1 || loop == 3) {
                            PathArray.push(pathPoint,pathEnd);
                        }else {
                            PathArray.push(pathPoint);
                        }
                    }else {
                        var pathPoint = [i,col];

                        PathArray.push(pathPoint);
                    }
                    switch (loop) {
                        case 1:
                            findLeft(i,col,2);
                            findRight(i,col,2);
                            break;
                        case 2:
                            findLeft(i,col,0);
                            findRight(i,col,0);
                            break;

                    }


                }
            }
        };

        //查找向下的路径
        function findDown(row,col,loop=1)
        {
            for (var i = row+1; i < ItemMap.map.length; i++) {
                if (map[i][col]) {
                    if (map[i][col]==selectNum) {
                        var pathPoint = [i,col];
                        PathArray.push(pathPoint);
                    }
                    break;
                }else{
                    if (i+1>=ItemMap.map.length) {
                        var pathPoint = [i,col];
                        var pathEnd = [-3];
                        if (loop == 1 || loop == 3) {
                            PathArray.push(pathPoint,pathEnd);
                        }else {
                            PathArray.push(pathPoint);
                        }
                    }else {
                        var pathPoint = [i,col];

                        PathArray.push(pathPoint);
                    }
                    switch (loop) {
                        case 1:
                            findLeft(i,col,2);
                            findRight(i,col,2);
                            break;
                        case 2:
                            findLeft(i,col,0);
                            findRight(i,col,0);
                            break;
                    }
                }
            }
        }

        //查找向左的路径
        function findLeft(row,col,loop=1)
        {
            for (var i = col-1; i >= 0; i--) {
                if (map[row][i]) {
                    if (map[row][i]==selectNum) {
                        var pathPoint = [row,i];
                        PathArray.push(pathPoint);
                    }
                    break;
                }else {
                    if (i-1<0) {
                        var pathPoint = [row,i];
                        var pathEnd = [-4];
                        if (loop == 1 || loop == 3) {
                            PathArray.push(pathPoint,pathEnd);
                        }else {
                            PathArray.push(pathPoint);
                        }
                    }else {
                        var pathPoint = [row,i];

                        PathArray.push(pathPoint);
                    }
                    switch (loop) {
                        case 1:
                            findUp(row,i,2);
                            findDown(row,i,2);
                            break;
                        case 2:
                            findUp(row,i,0);
                            findDown(row,i,0);
                            break;
                    }

                }
            }
        }

        //查找向右的路径
        function findRight(row,col,loop=1)
        {
            for (var i = col+1; i < ItemMap.map[0].length; i++) {
                if (map[row][i]) {
                    if (map[row][i]==selectNum) {
                        var pathPoint = [row,i];
                        PathArray.push(pathPoint);
                    }
                    break;
                }else {
                    if (i+1>=ItemMap.map[0].length) {
                        var pathPoint = [row,i];
                        var pathEnd = [-2];
                        if (loop == 1 || loop == 3) {
                            PathArray.push(pathPoint,pathEnd);
                        }else {
                            PathArray.push(pathPoint);
                        }



                    }else {
                        var pathPoint = [row,i];

                        PathArray.push(pathPoint);
                    }
                    switch (loop) {
                        case 1:
                            findUp(row,i,2);
                            findDown(row,i,2);
                            break;
                        case 2:
                            findUp(row,i,0);
                            findDown(row,i,0);
                            break;
                    }
                }
            }
        }

        function clearArray(arr)
        {
            var hash = {};
            var result = [];
            for(var i = 0, len = arr.length; i < len; i++){
                if(!hash[arr[i]]){
                    result.push(arr[i]);
                    hash[arr[i]] = true;
                }
            }
            return result;
        }
        if (line) {
            findUp(row,col,3);
            findRight(row,col,3);
            findDown(row,col,3);
            findLeft(row,col,3);

        }else {
            findUp(row,col);
            findRight(row,col);
            findDown(row,col);
            findLeft(row,col);
        }


        var Result = clearArray(PathArray);
        return Result;
    },

    checkCover:function(arr,pos)
    {
        var tempPoint = ItemMap.findPath(ItemMap.map,pos[0],pos[1],ItemMap.map[pos[0]][pos[1]],1);
        var linePoint =[];
        for (var i = 0; i < tempPoint.length; i++) {
            if (tempPoint[i].length==1) {
                linePoint.push(tempPoint[i]);
            }
        }

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].length==2) {
                if (arr[i][0] == pos[0]&&arr[i][1] == pos[1]) {
                    return true;
                }
            }else if(arr[i].length==1){

                for (var j = 0; j < linePoint.length; j++) {
                    if (arr[i][0] == linePoint[j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

var stage =
{
    Width:640,
    Height:1040,
    Base:null,
    ElementMap:[],
    blinkTween:null,
    firClickID:-1,
    secClickID:-1,
    round:0,
    pathArray:null,
    oldArear:[0,0],
    endChildIndex:0,
    NowIDbegin:0,
    init:function()
    {
        $('#mycanvas').attr('width',$('#stageSection').width());
        $('#mycanvas').attr('height',$('#stageSection').height());

        stage.Base = new createjs.Stage('mycanvas');

        stage.Width = ScreenSize.width;
        stage.Height = ScreenSize.height;

        stage.Already();
    },
    Already:function()
    {
        stage.ElementMap = [];
        for (var i = 0; i < ItemMap.acreage[0]; i++) {
            for (var j = 0; j < ItemMap.acreage[1]; j++) {
                var tmpArray = [];
                tmpArray[j] = null;
            }
            stage.ElementMap.push(tmpArray);
        }
        ItemMap.randomMap();
        // var light=[2,3,4];
        // ItemMap.map[light[0]][light[1]] = light[2];
        // var findpath = ItemMap.findPath(ItemMap.map,light[0],light[1],light[2])
        // console.log('findUp:',findpath);
        // for (var i = 0; i < findpath.length; i++) {
        //         if (findpath[i].length==2) {
        //             ItemMap.map[findpath[i][0]][findpath[i][1]] = 3;
        //         }
        //
        // }

        // ItemMap.acreage[0] = ItemMap.map.length;
        // ItemMap.acreage[1] = ItemMap.map[0].length
        console.log(stage.oldArear[0],stage.oldArear[1]);
        stage.NowIDbegin += (stage.oldArear[0]*stage.oldArear[1]);
        console.log(stage.NowIDbegin);
         for (var i = 0; i < ItemMap.map.length; i++) {
             for (var j = 0; j < ItemMap.map[i].length; j++) {

                var color = ItemMap.getColor(ItemMap.map[i][j]);


                var rectWidth = ($('#stageSection').width()-80)/ItemMap.acreage[1];
                var rectHeight = ($('#stageSection').width()-80)/ItemMap.acreage[1];
                if (color) {
                    if (color=='null') {
                        var graphics = new createjs.Graphics().beginFill('#333333').drawRect(0, 0, rectWidth, rectHeight);
                        stage.ElementMap[i][j]= new createjs.Shape(graphics);
                        stage.ElementMap[i][j].set(
                            {
                                x:rectWidth/2+rectWidth*j+40,
                                y:rectHeight/2+rectHeight*i+40,
                                regX:rectWidth/2,
                                regY:rectHeight/2,
                                alpha:0
                            });
                    }else {
                        var graphics = new createjs.Graphics().beginFill(color).drawRect(0, 0, rectWidth, rectHeight);
                        stage.ElementMap[i][j]= new createjs.Shape(graphics);
                        stage.ElementMap[i][j].set(
                            {
                                x:rectWidth/2+rectWidth*j+40,
                                y:rectHeight/2+rectHeight*i+40,
                                regX:rectWidth/2,
                                regY:rectHeight/2,
                            });
                            stage.ElementMap[i][j].addEventListener("click", handleClick);
                                function handleClick(event) {
                                    console.log(ItemMap.map);
                                    var posRow = parseInt((event.currentTarget.id-1-stage.NowIDbegin)/ItemMap.acreage[1]);
                                    var posCol = (event.currentTarget.id-1-stage.NowIDbegin)%ItemMap.acreage[1];

                                    var shapetemp = stage.Base.getChildByName (event.currentTarget.id);

                                    if (stage.firClickID>-1) {
                                        var firshape = stage.Base.getChildByName (stage.firClickID);
                                        stage.secClickID = event.currentTarget.id-1;
                                        var firRow = parseInt((stage.firClickID-1-stage.NowIDbegin)/ItemMap.acreage[1]);
                                        var firCol = (stage.firClickID-1-stage.NowIDbegin)%ItemMap.acreage[1];

                                        if (ItemMap.map[firRow][firCol]!=ItemMap.map[posRow][posCol]||firRow==posRow&&firCol==posCol) {
                                            console.log('log',firRow,firCol,posRow,posCol);
                                            createjs.Tween.removeTweens(firshape)
                                            createjs.Tween.removeTweens(shapetemp)
                                            stage.Base.setChildIndex(firshape,-firshape.id);
                                            stage.Base.setChildIndex(shapetemp,-shapetemp.id);
                                            firshape.set({scaleX:1,scaleY:1});
                                            shapetemp.set({scaleX:1,scaleY:1});
                                            // firshape.removeAllTweens();
                                            stage.secClickID = -1;
                                            stage.firClickID = -1;

                                        }else {
                                            var pos = [posRow,posCol];
                                            console.log(ItemMap.checkCover(stage.pathArray,pos));
                                            if (ItemMap.checkCover(stage.pathArray,pos)) {
                                                createjs.Tween.removeTweens(firshape);
                                                firshape.removeAllEventListeners();
                                                shapetemp.removeAllEventListeners();
                                                tmpTween1 = new createjs.Tween.get(firshape)
                                                                                .to({alpha:0,scaleX:0,scaleY:0},500);

                                                tmpTween2 = new createjs.Tween.get(shapetemp)
                                                                                .to({alpha:0,scaleX:0,scaleY:0},500);
                                                // firshape.set({alpha:0});
                                                // shapetemp.set({alpha:0});

                                                stage.secClickID = -1;
                                                stage.firClickID = -1;

                                                ItemMap.map[firRow][firCol] = 0;
                                                ItemMap.map[posRow][posCol] = 0;
                                                if (ItemMap.overCheck()) {
                                                    stage.Base.removeAllChildren();
                                                    stage.round++;
                                                    stage.oldArear[0]= ItemMap.acreage[0];
                                                    stage.oldArear[1]= ItemMap.acreage[1];
                                                    ItemMap.acreage[0]++;
                                                    ItemMap.acreage[1]+=2;

                                                    stage.Already();
                                                }
                                            }else{
                                                createjs.Tween.removeTweens(firshape)
                                                createjs.Tween.removeTweens(shapetemp)
                                                stage.Base.setChildIndex(firshape,firshape.id);
                                                stage.Base.setChildIndex(shapetemp,shapetemp.id);
                                                firshape.set({scaleX:1,scaleY:1});
                                                shapetemp.set({scaleX:1,scaleY:1});
                                                // firshape.removeAllTweens();
                                                stage.secClickID = -1;
                                                stage.firClickID = -1;

                                            }

                                        }
                                    }else {
                                        console.log(posRow,posCol,stage.NowIDbegin,event.currentTarget.id);
                                        stage.pathArray = ItemMap.findPath(ItemMap.map,posRow,posCol,ItemMap.map[posRow][posCol]);
                                        console.log(stage.pathArray);
                                        console.log(event.currentTarget.id);
                                        stage.firClickID = event.currentTarget.id;

                                        stage.Base.swapChildrenAt(stage.Base.getChildIndex(shapetemp),stage.endChildIndex);
                                        stage.blinkTween = new createjs.Tween.get(shapetemp,{loop:true,override:true})
                                                                            .to({scaleX:0.8,scaleY:0.8},200)
                                                                            .to({scaleX:1.2,scaleY:1.2},200)
                                                                            .to({scaleX:1,scaleY:1},300);
                                    }


                            }
                        stage.Base.addChild(stage.ElementMap[i][j]);
                        stage.Base.setChildIndex(stage.ElementMap[i][j],-(i*j));
                        stage.ElementMap[i][j].name = stage.ElementMap[i][j].id;
                        stage.endChildIndex =stage.Base.getChildIndex(stage.ElementMap[i][j]);
                    }

                }
             }
         }

         var handleTick = function(e)
         {
             stage.Base.update(e);
         };
         createjs.Ticker.addEventListener("tick",handleTick);
         createjs.Ticker.timingMode =  createjs.Ticker.RAF_SYNCHED;
         createjs.Ticker.setFPS(60);
    }
}

$(document).ready(function()
{
    document.body.addEventListener('touchmove',function(e)
    {
         pageScoll(e);
    },false);

    ScreenSize.width = window.innerWidth;
    ScreenSize.height = window.innerHeight;

    $('#stageSection').css('width',640);
    $('#stageSection').css('height',ScreenSize.height);

    $("#loaderScence").css('width',ScreenSize.width);
    $("#loaderScence").css('height',ScreenSize.height);

    stage.init();
   //  loaderClass=new ResLoader(BaseUrl);
   //
   //  loaderClass.load(load_list,function(process){
   //             $("#process").html(process+"%");				//把进度显示在id为process的section上
   //         },function(){
   //     stage.init();
   //     $("#loaderScence").fadeOut(1000);
   // });
});
