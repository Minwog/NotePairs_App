angular.module('NotePairApp')
.controller('HighChartsController', ['$scope', '$route', function ($scope, $route) {

/*------------ Diagramme de Fiabilité (Line => Fiabilité & Column => Notes) ----------------*/

    $scope.filesrc = 'dist/question1.json'

    $scope.reloadChart = function() {
        $(document).ready(function () {
            var categoriestmp = [];
            var notestmp = [];
            var pointstmp = [];
            var noteValues = [];
            $.getJSON($scope.filesrc, function (data) {
                for (var i = 0; i < data.length; i++) {
                    noteValues.push(data[i].note)
                }
                var maxnote = Math.max.apply(Math, noteValues);
                var minnote = Math.min.apply(Math, noteValues);
                var pasnote = calculpas();

                function calculpas() {
                    var p = Infinity;
                    for (var i = 0; i < noteValues.length - 1; i++) {
                        for (var j = i + 1; j < noteValues.length; j++) {
                            if (Math.abs(noteValues[i] - noteValues[j]) < p
                                && Math.abs(noteValues[i] - noteValues[j]) > 0) {
                                p = Math.abs(noteValues[i] - noteValues[j]);
                            }
                        }
                    }
                    return p;
                };


                //console.log("pas = " + pasnote + " max = " + maxnote + " min = " + minnote)
                for (var i = minnote - 2 * pasnote; i <= maxnote + 2 * pasnote; i += pasnote / 2) {
                    categoriestmp.push(Math.round(i * 100) / 100);
                }


                notestmp = Array(categoriestmp.length).fill(null);
                for (var i = 0; i < data.length; i++) {
                    notestmp[2 * ((2 * pasnote - minnote) / pasnote + Math.floor((data[i].note) / pasnote))]++;
                }
                var m = 0;
                var s = 0;
                for (var i = 0; i < noteValues.length; i++) {
                    m += noteValues[i];
                    s += noteValues[i] * noteValues[i];
                }
                m = m / noteValues.length;
                s = Math.sqrt(s / noteValues.length - m * m);


                var A = 0.5 * s;
                var B = 2 * A + pasnote;

                pointstmp = Array(categoriestmp.length).fill(null);
                pointstmp[0] = 0;
                pointstmp[2 * ((2 * pasnote - minnote) / pasnote + Math.round((m - B) / pasnote))] = 0;
                pointstmp[2 * ((2 * pasnote - minnote) / pasnote + Math.round((m - A) / pasnote))] = Math.max.apply(Math, notestmp);
                pointstmp[2 * ((2 * pasnote - minnote) / pasnote + Math.round((m + A) / pasnote))] = Math.max.apply(Math, notestmp);
                pointstmp[2 * ((2 * pasnote - minnote) / pasnote + Math.round((m + B) / pasnote))] = 0;
                pointstmp[pointstmp.length - 1] = 0;


                /*
                console.log(2 * ((2 * pasnote - minnote) / pasnote + Math.round((m - B) / pasnote)))
                console.log(2 * ((2 * pasnote - minnote) / pasnote + Math.round((m - A) / pasnote)))
                console.log(2 * ((2 * pasnote - minnote) / pasnote + Math.round((m + A) / pasnote)))
                console.log(2 * ((2 * pasnote - minnote) / pasnote + Math.round((m + B) / pasnote)))

                console.log("m = " + m + " s = " + s + " A = " + A + " B = " + B)
                console.log(notestmp)
                console.log(categoriestmp)
                console.log(pointstmp)
                console.log(Math.max.apply(Math, notestmp));
                */



                $('#container').highcharts({
                    chart: {
                        renderTo: 'container',
                        animation: false
                    },

                    title: {
                        text: 'Diagramme de fiabilité'
                    },

                    xAxis: {
                        labels: {padding: 0, step: 2},
                        title: {
                            text: 'Note'
                        },
                        categories: categoriestmp
                    },
                    yAxis: [
                        {
                            title: {
                                text: 'Nombre d\'occurences de la note'
                            }
                        },
                        {
                            labels: {
                                format: '{value} %',
                            },
                            title: {
                                text: 'Échelle de fiabilité'
                            },
                            opposite: true
                        }
                    ],
                    plotOptions: {
                        series: {
                            connectNulls: true,
                            pointPadding: -0.35,
                            groupPadding: 0,
                            borderWidth: 0.3,
                            point: {
                                events: {
                                    drag: function (e) {
                                        // Returning false stops the drag and drops. Example:

                                    },
                                    drop: function () {
                                        $('#drop').html(
                                            'Dans la série <b>' + this.series.name + '</b>, la donnée a bien été' +
                                            ' déplacée à une abscisse de <b>' + this.category + '</b> pour une ordonnée ' +
                                            'à <b>' + Highcharts.numberFormat(this.y, 2) + '</b>');
                                    }
                                }
                            },
                            stickyTracking: false
                        },
                        column: {
                            stacking: 'normal'
                        },
                        line: {
                            cursor: 'ns-resize'
                        }
                    },

                    tooltip: {
                        yDecimals: 2
                    },

                    series: [{
                        data: notestmp,
                        name: "Nombre d'évaluateurs",
                        dragMinY: 0,
                        type: 'column',
                        yAxis: 0
                    },
                    {
                        data: pointstmp,
                        name: "Jauge de fiabilité",
                        type: "line",
                        draggableX: true,
                        dragMinX: 0,
                        dragMaxX: pointstmp.length-1,
                        dragPrecisionX: 2,
                        tooltip: {
                            pointFormatter: function() {
                                if (this.y > 0) {
                                    return this.series.name+': '+'<b>' + 100 + ' %</b>';

                                } else {
                                    return this.series.name+': '+'<b>' + this.y + ' %</b>';
                                }
                            },
                            valueSuffix: ' %'
                        },
                        yAxis: 1
                    }]
                });
            });
        });


        /*------------ Module Drag & Drop ----------------*/

        (function (factory) {
            if (typeof module === 'object' && module.exports) {
                module.exports = factory;
            } else {
                factory(Highcharts);
            }
        }
        (function (Highcharts) {

            'use strict';

            var addEvent = Highcharts.addEvent,
                each = Highcharts.each,
                pick = Highcharts.pick;


            /**
             * Filter by dragMin and dragMax
             */
            function filterRange(newY, series, XOrY) {
                var options = series.options,
                    dragMin = pick(options['dragMin' + XOrY], undefined),
                    dragMax = pick(options['dragMax' + XOrY], undefined),
                    precision = pick(options['dragPrecision' + XOrY], undefined);

                if (!isNaN(precision)) {
                    newY = Math.round(newY / precision) * precision;
                }

                if (newY < dragMin) {
                    newY = dragMin;
                } else if (newY > dragMax) {
                    newY = dragMax;
                }
                return newY;
            }


            Highcharts.Chart.prototype.callbacks.push(function (chart) {

                var container = chart.container,
                    dragPoint,
                    dragStart,
                    dragX,
                    dragY,
                    dragPlotX,
                    dragPlotY;

                /**
                 * Get the new values based on the drag event
                 */
                function getNewPos(e) {
                    var originalEvent = e.originalEvent || e,
                        pageX = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageX : e.pageX,
                        pageY = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageY : e.pageY,
                        series = dragPoint.series,
                        draggableX = series.options.draggableX && dragPoint.draggableX !== false,
                        draggableY = series.options.draggableY && dragPoint.draggableY !== false,
                        dragSensitivity = pick(series.options.dragSensitiviy, 1),
                        deltaX = draggableX ? dragX - pageX : 0,
                        deltaY = draggableY ? dragY - pageY : 0,
                        newPlotX = dragPlotX - deltaX,
                        newPlotY = dragPlotY - deltaY,
                        newX = dragX === undefined ? dragPoint.x : series.xAxis.toValue(newPlotX, true),
                        newY = dragY === undefined ? dragPoint.y : series.yAxis.toValue(newPlotY, true),
                        ret;

                    newX = filterRange(newX, series, 'X');
                    newY = filterRange(newY, series, 'Y');

                    if (Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) > dragSensitivity) {
                        return {
                            x: draggableX ? newX : dragPoint.x,
                            y: draggableY ? newY : dragPoint.y
                        };
                    } else {
                        return null;
                    }
                }

                /**
                 * Handler for mouseup
                 */
                function drop(e) {
                    var newPos;
                    if (dragPoint) {
                        if (e) {
                            newPos = getNewPos(e);
                            if (newPos) {
                                dragPoint.update(newPos);

                                // Update k-d-tree immediately to prevent tooltip jump (#43)
                                dragPoint.series.options.kdNow = true;
                                dragPoint.series.buildKDTree();
                            }
                        }
                        if (newPos) {
                            newPos.dragStart = dragStart;
                            dragPoint.firePointEvent('drop', newPos);
                        }
                    }
                    dragPoint = dragX = dragY = undefined;
                }

                /**
                 * Handler for mousedown
                 */
                function mouseDown(e) {
                    var options,
                        originalEvent = e.originalEvent || e,
                        hoverPoint,
                        series;

                    if ((originalEvent.target.getAttribute('class') || '').indexOf('highcharts-handle') !== -1) {
                        hoverPoint = originalEvent.target.point;
                    }

                    series = chart.hoverPoint && chart.hoverPoint.series;
                    if (!hoverPoint && chart.hoverPoint && (!series.useDragHandle || !series.useDragHandle())) {
                        hoverPoint = chart.hoverPoint;
                    }

                    if (hoverPoint) {
                        options = hoverPoint.series.options;
                        dragStart = {};
                        if (options.draggableX && hoverPoint.draggableX !== false) {
                            dragPoint = hoverPoint;
                            dragX = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageX : e.pageX;
                            dragPlotX = dragPoint.plotX;
                            dragStart.x = dragPoint.x;
                        }

                        if (options.draggableY && hoverPoint.draggableY !== false) {
                            dragPoint = hoverPoint;

                            dragY = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageY : e.pageY;
                            dragPlotY = dragPoint.plotY + (chart.plotHeight - (dragPoint.yBottom || chart.plotHeight));
                            dragStart.y = dragPoint.y;
                        }

                        // Disable zooming when dragging
                        if (dragPoint) {
                            chart.mouseIsDown = false;
                        }
                    }
                }

                /**
                 * Handler for mousemove. If the mouse button is pressed, drag the element.
                 */
                function mouseMove(e) {

                    e.preventDefault();

                    if (dragPoint) {

                        var evtArgs = getNewPos(e), // Gets x and y
                            proceed;

                        // Fire the 'drag' event with a default action to move the point.
                        if (evtArgs) {
                            evtArgs.dragStart = dragStart;
                            dragPoint.firePointEvent(
                                'drag',
                                evtArgs,
                                function () {

                                    var kdTree,
                                        series = dragPoint.series;

                                    proceed = true;

                                    dragPoint.update(evtArgs, false);

                                    // Hide halo while dragging (#14)
                                    if (series.halo) {
                                        series.halo = series.halo.destroy();
                                    }

                                    // Let the tooltip follow and reflect the drag point
                                    if (chart.tooltip) {
                                        chart.tooltip.refresh(chart.tooltip.shared ? [dragPoint] : dragPoint);
                                    }

                                    // Stacking requires full redraw
                                    if (series.stackKey) {
                                        chart.redraw();

                                        // Do a series redraw only. Let the k-d-tree survive the redraw in order to
                                        // prevent tooltip flickering (#43).
                                    } else {

                                        kdTree = series.kdTree;
                                        series.redraw();
                                        series.kdTree = kdTree;
                                    }
                                }
                            );


                            // The default handler has not run because of prevented default
                            if (!proceed) {
                                drop();
                            }
                        }
                    }
                }

                // Kill animation on first drag when chart.animation is set to false.
                chart.redraw();

                // Add'em
                addEvent(container, 'mousemove', mouseMove);
                addEvent(container, 'touchmove', mouseMove);
                addEvent(container, 'mousedown', mouseDown);
                addEvent(container, 'touchstart', mouseDown);
                addEvent(document, 'mouseup', drop);
                addEvent(document, 'touchend', drop);
                addEvent(container, 'mouseleave', drop);
            });

            /**
             * Extend the column chart tracker by visualizing the tracker object for small points
             */
            Highcharts.seriesTypes.column.prototype.useDragHandle = function () {
                var is3d = this.chart.is3d && this.chart.is3d();
                return !is3d;
            };

            Highcharts.seriesTypes.column.prototype.dragHandlePath = function (shapeArgs, strokeW) {
                var x1 = shapeArgs.x,
                    y = shapeArgs.y,
                    x2 = shapeArgs.x + shapeArgs.width;

                return [
                    'M', x1, y + 6 * strokeW,
                    'L', x1, y,
                    'L', x2, y,
                    'L', x2, y + 2 * strokeW,
                    'L', x1, y + 2 * strokeW,
                    'L', x2, y + 2 * strokeW,
                    'L', x2, y + 4 * strokeW,
                    'L', x1, y + 4 * strokeW,
                    'L', x2, y + 4 * strokeW,
                    'L', x2, y + 6 * strokeW
                ];
            };

            Highcharts.wrap(Highcharts.seriesTypes.column.prototype, 'drawTracker', function (proceed) {
                var series = this,
                    options = series.options,
                    strokeW = series.borderWidth || 0;

                proceed.apply(series);

                if (this.useDragHandle() && (options.draggableX || options.draggableY)) {

                    each(series.points, function (point) {

                        var path = (options.dragHandlePath || series.dragHandlePath)(point.shapeArgs, strokeW);

                        if (!point.handle) {
                            point.handle = series.chart.renderer.path(path)
                                .attr({
                                    fill: options.dragHandleFill || 'rgba(0,0,0,0.5)',
                                    'class': 'highcharts-handle',
                                    'stroke-width': strokeW,
                                    'stroke': options.dragHandleStroke || options.borderColor || 1
                                })
                                .css({
                                    cursor: 'move'
                                })
                                .add(series.group);

                            point.handle.element.point = point;
                        } else {
                            point.handle.attr({d: path});
                        }
                    });
                }
            });

        }));
    };
    $scope.reloadChart();
}]);