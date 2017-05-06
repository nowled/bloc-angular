(function() {
     function SongPlayer() {
          var SongPlayer = {};
          var currentSong = null;
          var currentBuzzObject = null;

          SongPlayer.play = function(song) {
            if (currentSong !== song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            /**
            If the currently playing song is not the same as the song the user
            clicks on, then we want to:

             Stop the currently playing song, if there is one.
             Set a new Buzz sound object.
             Set the newly chosen song object as the currentSong.
              Play the new Buzz sound object.
            **/
          } else if (currentSong === song) {
     if (currentBuzzObject.isPaused()) {
         currentBuzzObject.play();
     }
 }
         currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });

         currentSong = song;

        currentBuzzObject.play();
      }
    };
          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
