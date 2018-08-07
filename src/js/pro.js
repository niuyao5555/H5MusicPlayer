(function ($, root) {
  var $scope = $(document.body);
  var curDuration;
  var frameID;
  var lastPer=0;
  var startTime;
  function renderAllTime (time) {
    lastPer =0;
    curDuration = time;
    formatTime(time);
    $scope.find('.all-time').html(formatTime(time)); 
   
  }
  function formatTime (t) {
    t=Math.round(t);
    var m = Math.floor(t / 60);
    var s = t - m*60;
    if( m < 10 ) {
      m = '0' + m;
    }
    if( s < 10 ) {
        s = '0' + s;
      }
    return m + ':' +s;
  }
  function start (per) {
    per = undefined ? lastPer : per;
    startTime = new Date().getTime();
    function frame(){
      var curTime = new Date().getTime();
      var percent = (curTime - startTime) / (curDuration * 1000)+per;
      if(percent<=1){
        frameID = requestAnimationFrame(frame);
        update(percent);
      }else{
        cancelAnimationFrame(frameID);
      }
     
    }
    frame();
    
  }
  function stop(){
    cancelAnimationFrame(frameID);
    var stopTime = new Date().getTime();
    lastPer = lastPer+(stopTime-startTime) / (curDuration *1000);
  }
  function update (per) {
    var curTime = curDuration * per;
    curTime = formatTime(curTime);
    $scope.find('.cur-time').html(curTime);
    var perX = (per -1)*100+'%';
    $scope.find('.pro-top').css({
      transform:'translateX('+perX+')'
    });

  }
  root.pro = {
      renderAllTime: renderAllTime,
      start: start,
      stop: stop,
      update: update
  }
})(window.Zepto,window.player)