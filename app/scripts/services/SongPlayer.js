(function() {
    function SongPlayer($rootScope, Fixtures) {
        /**
        @desc Private functions
        **/
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();
        var currentBuzzObject = null;

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            /**
             * @desc Buzz object audio file
             * @type {Object}
             */
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            /**
             *
             * @desc This will update the song's playback progress from anywhere in the application
             * @type {Object} event
             */

            currentBuzzObject.bind('timeupdate', function() {
                    $rootScope.$apply(function() {
                        SongPlayer.currentTime = currentBuzzObject.getTime();
                    });
                });

          
            SongPlayer.currentSong = song;
        };
        /**

        /**
         * @function playSong
         * @desc Plays the currentBuzzObject and sets the property of the song Object to true
         * @param {Object} song
         */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        }

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
         * @desc Active public song object from list of songs
         * @type {Object}
         */
        SongPlayer.currentSong = null;
        /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
        SongPlayer.currentTime = null;
        /**
    * @desc private volume setting properties
    * @type {number}
    **/
        SongPlayer.volume = 75;
        SongPlayer.maxVolume = 100;


        /**
         * @function SongPlayer.play
         * @desc Public method that takes a song object parameter. If the buzz object Song is not the same as the current
         * then a new song will load and play. If the buzz object Song is the same, and if it is paused, then the song will play.
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
         * @function SongPlayer.previous
         * @desc A Public Method that uses the  getSongIndex object to get the index of the currently
           playing song and then decrease that index by one.
         * @type {Object}
         */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex === currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
       * @function setVolume
      * @desc Set current Volume of song
       * @param {number}

        **/
        SongPlayer.setVolume = function(volume){
             if(currentBuzzObject){
                currentBuzzObject.setVolume(volume);
             }
        };


        return SongPlayer;
    }

    angular
        .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
