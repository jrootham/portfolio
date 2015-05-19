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

    var SIZE = 2;
    var RATE = 200;
    var INTERVAL = 20;

    var box;

    function computeSpeed (target, position, acceleration) {
        return (target - position) * acceleration;
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
        },

        componentWillUpdate: function() {
            var position = this.state.position;
            if (this.state.target){
                var target = this.state.target;
                var speed = {
                    x: computeSpeed(target.x, position.x, this.props.accleration.x),
                    y: computeSpeed(target.y, position.y, this.props.accleration.y)
                }

                this.setState({speed:speed});
            }

            var newPosition = {
                position: {
                    x : position.x + this.state.speed.x,
                    y : position.y + this.state.speed.y
                }
            }
            this.setState(newPosition);

        }

    })

    var Box = React.createClass({
        render: function() {
            var propList = makePropList();

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
                                    />)
                            }
                        )
                    }
                </div>
            )
        },

        componentWillUpdate: function () {
            React.Children.forEach(function (child){
                child.setState({target:this.state.target});
            })
        }
    })

    function makePropList() {
        var spacing = $('#container').width() / 10;

        var list = [];

        for (var i = 1 ; i < 10 ; i+= 1) {
            for (var j = 1 ; j < 10 ; j+= 1) {
                var pos = {x: i * spacing, y: j * spacing};
                var acceleration = {x : i / RATE, y: j / RATE}
                list.push({position:pos, acceleration: acceleration});
            }
        }

        return list;
    }

    function launch() {
        box = <Box />
        React.render(box, document.getElementById("container"));

        box.setState({target:{x:10, y:10}});

    }

    window.onload = launch;
})()