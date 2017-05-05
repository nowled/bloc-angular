(function() {
    function AlbumCtrl(Fixtures) {


      //this.albumData = angular.copy(albumPicasso);
      /** Now that this is using a service
       it does not need the above code because we injected the
       service here
     **/
      this.albumData = Fixtures.getAlbum();
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
