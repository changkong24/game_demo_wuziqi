(function() {
    require.config({
        paths : {
           Game : 'Game',
           BoardModel : 'BoardModel',
           BoardRenderer : 'BoardRenderer'
        }
    });
    require(['Game', 'BoardModel', 'BoardRenderer'], function(Game, BoardModel, BoardRenderer) {
        window.CM = CM;
        $(function() {
            var app = new router();
            Backbone.history.start();
        });
    });
})();