/**
 * lump.js
 *
 * Created by jrootham on 17/05/15.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    $ = require("jquery");

    function transform(data, next) {
        $("#lump").animate(data ,2000, "linear", next);
    }

    window.onload = function() {
        var width = $("#container").width();
        var large = width / 3;
        var small = $("#lump").height();
        var position = $("#lump").position();
        var low = position.top;
        var high = low - large / 2;

        function first() {
            transform({width:large, height:large, top:high}, second);
        }

        function second() {
            transform({left: large, width:small, height:small, top:low}, third);
        }

        function third() {
            transform({width:large, height:large, top:high}, fourth);
        }

        function fourth() {
            transform({left: 2 * large, width:small, height:small, top:low}, fifth);
        }

        function fifth() {
            transform({width:large, height:large, top:high}, sixth);
        }

        function sixth() {
            transform({left: 3 * large, width:small, height:small, top:low}, undefined);
        }

        first();
    }

})()