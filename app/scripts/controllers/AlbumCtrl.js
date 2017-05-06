(function() {
    function AlbumCtrl(Fixtures, SongPlayer) {


      //this.albumData = angular.copy(albumPicasso);
      /** Now that this is using a service
       it does not need the above code because we injected the
       service here
     **/
      this.albumData = Fixtures.getAlbum();
      this.songPlayer = SongPlayer;
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures','SongPlayer', AlbumCtrl]);
})();
