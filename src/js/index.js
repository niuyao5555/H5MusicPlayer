var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);

var index = 0;
var songList;
var audio=new root.audioControl();
function bindEvent() {
    $scope.on("play:change",function(event,index,flag){
        console.log(songList[index].audio);
      audio.getAudio(songList[index].audio);
      if(audio.status == "play"){
          audio.play();
          
      }
      root.pro.start(); 
      
      root.pro.renderAllTime(songList[index].duration);
      root.render(songList[index]);
    })
    $scope.on("click", ".prev-btn", function () {
        //    if(index==0){
        //        index=3;
        //    }
        //    index--;
        $scope.find(".play-btn").removeClass("pause");
        var index = controlManger.prev();
        audio.getAudio(songList[index].audio);
        if(audio.status=="play"){
            audio.play();
            
            
        }
        root.pro.start(0);
        root.pro.renderAllTime(songList[index].duration);
        root.render(songList[index]);
    })
    $scope.on("click", ".next-btn", function (index) {
        // if(index==songList.length){
        //     index=0;
        // }
        // index++;
        $scope.find(".play-btn").removeClass("pause");
        var index = controlManger.next();
        audio.getAudio(songList[index].audio);
        if(audio.status=="play"){
            audio.play();
        }
        root.pro.start(0);
        root.pro.renderAllTime(songList[index].duration);
        root.render(songList[index]);
    })
    $scope.on("click",".play-btn",function(){
        console.log(audio.status);
        if(audio.status=="play"){
            audio.pause();
            $(this).toggleClass("pause");
            
            root.pro.stop();
        }else{
            audio.play();
            $(this).toggleClass("pause");
            root.pro.start();
            
            
           
            
        }
      
    })

}

function bindTouch () {
  var $slider = $scope.find('.slider-point');
  var offset = $scope.find('.pro-bottom').offset();
  var left = offset.left;
  var width = offset.width;
  $slider.on('touchstart',function(){
    root.pro.stop();
    
    console.log(678);
    if(audio.status == 'play'){
        $scope.find('.play-btn').toggleClass("pause");
    }
    
    audio.pause();
  }).on('touchmove',function(e){
     var x=e.changedTouches[0].clientX;
     var per = (x-left)/width;
     if(per<0){
         per=0;
     }
     if(per>1){
         per=1;
     }
     
        root.pro.update(per);
     
   
  }).on('touchend',function(e){
    var x=e.changedTouches[0].clientX;
    var per = (x-left)/width;
    if(per<0){
        per=0;
    }
    if(per>1){
        per=1;
    }
    var curTime=per*songList[controlManger.index].duration;
    $scope.find('.play-btn').toggleClass("pause");
    root.pro.start(per);
    audio.playTo(curTime);
  })
}
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            root.render(data[0]);
            songList = data;
            bindEvent();
            bindTouch();
            console.log(data);
            controlManger = new root.controlManger(data.length);
            $scope.trigger("play:change",index);
            root.pro.renderAllTime(songList[0].duration);
            root.pro.start();
        },
        error: function () {
            console.log("err");
        }
    })
}
getData("../mock/data.json");