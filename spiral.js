/**
 * spiral.js
 *
 * Created by jrootham on 16/05/15.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    $ = require("jquery");
    var mat4 = require('gl-matrix').mat4;
    var vec3 = require('gl-matrix').vec3;
    var matrixToCSS = require('matrix-to-css');

    var TOTAL_SECONDS = 40;
    var STEP_MILLISECONDS = 10;
    var ORBITS = 5;
    var DAYS = 4;

    var step = 1.0;
    var intervalId;

    function show (theta, scale, x, y) {
        var thing = $('#thing');
        var delta = thing.width() / 2;

        var output = mat4.create();
        var origin = mat4.create();

        mat4.translate(output, origin, vec3.fromValues(x - delta, y - delta, 0));
        mat4.rotateZ(output, output, theta);
        mat4.scale(output, output, vec3.fromValues(scale, scale, 1));

        thing.css('transform', matrixToCSS(output));
        thing.show();
    }

    function place(t) {

        t = Math.max(0, t);
        var mid = $('#background').width() / 2
        var theta = ORBITS * 2 * Math.PI * t;

        var x = mid + t * mid * Math.cos(theta);
        var y = mid + t * mid * Math.sin(theta);

        show(t * DAYS * ORBITS * 2 * Math.PI, 1 - t, x, y);
    }

    function doStep() {
        if (step < 0) {
            clearInterval(intervalId);
        }
        place(Math.sqrt(step));
        step -= STEP_MILLISECONDS / (TOTAL_SECONDS * 1000);
    }

    window.onload = function() {
        intervalId = setInterval(doStep, STEP_MILLISECONDS);
    }
})()