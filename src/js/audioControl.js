(function($,root){
    function audioControl(){
        this.audio=new Audio();
        this.status="play";
    }
    audioControl.prototype={
        play:function(){
         this.audio.play();
         this.status="play";
        },
        pause:function(){
            this.audio.pause();
            this.status="pause";
        },
        getAudio:function(src){
            this.status="play";
           this.audio.src=src;
           this.audio.load();
           console.log(111)
        },
        playTo:function(time){
            this.audio.currentTime=time;
            this.play();
        }
    }
    root.audioControl=audioControl;
})(window.Zepto,window.player)