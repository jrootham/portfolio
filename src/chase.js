/** @jsx React.DOM */

/**
 * chase.js
 *
 * Created by jrootham on 18/05/15.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    $ = require('jquery');
    var React = require('react');

    var SIZE = 4;
    var RATE = 200;
    var INTERVAL = 20;
    var XCOUNT = 15;
    var YCOUNT = 10;

    var target = undefined;

    function computeSpeed (target, position, acceleration) {
        var delta = target - position;

        if (Math.abs(delta) < .25) {
            delta = 0;
        }

        var speed = delta * acceleration;

        if (speed > 0) {
            speed = Math.max(speed, 1);
        }

        if (speed < 0) {
            speed = Math.min(speed, -1);
        }

        return speed;
    }

    function limit(limit, position, speed) {
        var next = position + speed;

        if (next < 0 || next > limit) {
            speed = -speed;
        }

        return speed;
    }

    var Dust = React.createClass({
        componentWillMount: function() {
            var openingState = {
                position: {
                    x: this.props.position.x,
                    y: this.props.position.y
                },
                speed: {
                    x: 0,
                    y: 0
                }
            }

            this.setState(openingState);
        },

        componentWillReceiveProps: function() {
            var position = this.state.position;
            var speed = this.state.speed;

            if (this.props.target){
                var target = this.props.target;
                var acceleration = this.props.acceleration;

                speed = {
                    x: computeSpeed(target.x, position.x, acceleration.x),
                    y: computeSpeed(target.y, position.y, acceleration.y)
                }

                this.setState({speed:speed});
            }


            var xLimit = $('#container').width();
            var yLimit = $('#container').height();

            speed.x = limit(xLimit, position.x, speed.x);
            speed.y = limit(yLimit, position.y, speed.y);

            this.setState({speed:speed});

            var newPosition = {
                position: {
                    x : position.x + speed.x,
                    y : position.y + speed.y
                }
            }
            this.setState(newPosition);

        },

        render: function() {
            var position = this.state.position;

            var style = {
                backgroundColor:    "black",
                width:              SIZE,
                height:             SIZE,
                position:           "absolute",
                left:               position.x - SIZE / 2,
                top:                position.y - SIZE / 2
            }

            return (
                <div style={style}></div>
            )
        }

    })

    var Box = React.createClass({
        render: function() {
            var propList = makePropList();

            var target = this.props.target;

            var style = {
                width:      '100%',
                height:     '100%',
                position:   'relative'
            }

            return (
                <div style={style}>
                    {
                        propList.map( function(currentValue) {
                                return (<Dust
                                        position={currentValue.position}
                                        acceleration={currentValue.acceleration}
                                        target={target}
                                    />)
                            }
                        )
                    }
                </div>
            )
        }
    })

    function makePropList() {
        var spaceX = $('#container').width() / XCOUNT;
        var spaceY = $('#container').height() / YCOUNT;

        var list = [];

        for (var i = 1 ; i < XCOUNT ; i+= 1) {
            for (var j = 1 ; j < YCOUNT ; j+= 1) {
                var pos = {x: i * spaceX, y: j * spaceY};
                var acceleration = {x : i / RATE, y: j / RATE}
                list.push({position:pos, acceleration: acceleration});
            }
        }

        return list;
    }

    function startTarget(event) {
        setTarget(event);
        $('#container').mousemove(setTarget);
    }

    function endTarget(event) {
        clearTarget(event);
        $('#container').off('mousemove');
    }

    function setTarget(event) {
        var location = $('#container').position();
        target = {x:event.clientX - location.left, y:event.clientY - location.top};
    }

    function clearTarget(event) {
        target = undefined;
    }

    function box() {
        React.render(<Box target = {target} />, document.getElementById("container"));
    }

    function launch() {
        $('#container')
            .mousedown(startTarget)
            .mouseup(endTarget)
            .mouseleave(endTarget);

        setInterval(box, INTERVAL);
    }

    window.onload = launch;
})()