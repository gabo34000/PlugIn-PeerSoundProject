SC.initialize({
    client_id: 'nYw8DGbKym7Ph6LR1EaSxD8Dmj5rkCwa'
  });

  jQuery.get('https://api.soundcloud.com/resolve.json?url=https%3A%2F%2Fsoundcloud.com%2F' + 'msmrsounds' + '%2F' + 'ms-mr-hurricane-chvrches-remix' + '&client_id=' + 'nYw8DGbKym7Ph6LR1EaSxD8Dmj5rkCwa',
  function (data){
      if (data){
        console.log(data);
    }
  });/*
  // stream track id 293/*
  SC.stream('/tracks/90787841').then(function(player){
    player.play().then(function(){
      console.log('Playback started!');
    }).catch(function(e){
      console.error('Playback rejected. Try calling play() from a user interaction.', e);
    });
  });*/

  /*
  SC.sound.play();
SC.sound.pause();
SC.sound.stop();
SC.sound.pause();
SC.sound.playState;*
*/

  //var stream;
  SC.stream('/tracks/90787841').then(function(player){
  $(document).ready(function(){
    $("#Continue").click(function(){
        player.play().then(function(){
          console.log('Playback started!' + player.playState);
        }).catch(function(e){
          console.error('Playback rejected. Try calling play() from a user interaction.', e);
        });
      });
      $("#Pause").click(function(){
        player.pause().then(function(){
          console.log('Playback pause!' + player.playState);
        }).catch(function(e){
          console.error('Playback rejected. Try calling play() from a user interaction.', e);
        });
      });
      
    });
});
/*
  function playTrack(event) {
    e.preventDefault();
    if(!stream) {
      SC.stream("/tracks/90787841", function(sound){
          stream = sound;
          stream.play();
      });
    }
    else {
     stream.play();
    }
  }
  function pauseTrack(event) {
    if(stream) {
      stream.pause();
    }
  }

  playTrack();*/