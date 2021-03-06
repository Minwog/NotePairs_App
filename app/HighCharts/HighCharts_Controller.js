angular.module('NotePairApp')
    .controller('HighChartsController',function () {

        /*------------ Diagramme de Fiabilité (Line => Fiabilité & Column => Notes) ----------------*/

        $(function () {
            $('#container').highcharts({
                chart: {
                    renderTo: 'container',
                    animation: false
                },

                title: {
                    text: 'Diagramme de fiabilité'
                },

                xAxis: {
                    labels:{padding:0,step: 2},
                    title:{
                        text: 'Note'
                    },
                    categories: ['0','0.5', '1','1.5', '2','2.5' ,'3','3.5', '4','4.5' ,'5','5.5' ,'6','6.5', '7','7.5' ,'8','8.5' ,'9','9.5' ,'10','10.5' ,'11','11.5' ,'12','12.5', '13','13.5', '14','14.5', '15','15.5', '16','16.5', '17','17.5' ,'18','18.5','19','19.5' ,'20']
                },
                yAxis: {
                    title:{
                        text:'Nombre d\'occurences de la note'
                    }
                },
                plotOptions: {
                    series: {
                        connectNulls: true,
                        pointPadding: -0.3,
                        groupPadding: -0,
                        borderWidth: 0.1,
                        point: {
                            events: {

                                drag: function (e) {
                                    // Returning false stops the drag and drops. Example:
                                    /*
                                    console.log(e)
                                     if (e.newY > 13) {
                                     this.y = 300;
                                     return false;
                                     }
                                     */


                                },
                                drop: function () {
                                    $('#drop').html(
                                        'Dans la série <b>' + this.series.name + '</b>, la donnée a bien été déplacée à une abscisse de <b>' + this.category + '</b> pour une ordonnée à <b>' + Highcharts.numberFormat(this.y, 2) + '</b>');
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
                    data: [0, null, 0, null, 0, null, 0, null, 0, null, 1, null, 0, null, 3, null, 5, null, 7, null, 6,
                        null, 7, null, 2, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 0, null, 1],
                    name:"Notes attribuées",
                    dragMinY: 0,
                    type: 'column',
                    minPointLength: 2
                },
                    {
                        data: [0, null, null, null, null, null, null, null, null, null, null, null, null, 0, null, null, null, 7, null, null,
                            null, 7, null, null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0],
                        name: "Jauge de fiabilité",
                        draggableX: true,
                        dragPrecisionX:0.5
                    }]
            });
        });



        /*------------ Module Drag & Drop ----------------*/

        (function (factory) {
            if (typeof module === 'object' && module.exports) {
                module.exports = factory;
            } else {
                factory(Highcharts);
            }
        }(function (Highcharts) {

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

                if(!isNaN(precision)) {
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
                            point.handle.attr({ d: path });
                        }
                    });
                }
            });

        }));
    });