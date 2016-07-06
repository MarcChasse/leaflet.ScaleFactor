(function (factory, window) {

    // define an AMD module that relies on 'leaflet'
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], factory);

    // define a Common JS module that relies on 'leaflet'
    } else if (typeof exports === 'object') {
        module.exports = factory(require('leaflet'));
    }

    // attach your plugin to the global 'L' variable
    if (typeof window !== 'undefined' && window.L) {
        window.L.Control.ScaleFactor = factory(L);
        L.control.scalefactor = function (options) {
            return new window.L.Control.ScaleFactor(options);
        };
    }
}(function (L) {
    var ScaleFactor = L.Control.extend({
        options: {
            position: 'bottomleft',
            updateWhenIdle: true
        },

        onAdd: function (map) {
            var className = 'leaflet-control-scalefactor',
                container = L.DomUtil.create('div', className),
                options = this.options;

            this._mScale = L.DomUtil.create('div', className + '-line', container);

            map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
            map.whenReady(this._update, this);

            return container;
        },

        onRemove: function (map) {
            map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
        },

        _pxTOmm: (function () {
            var heightRef = document.createElement('div');
            heightRef.style = 'height:1mm;display:none';
            heightRef.id = 'heightRef';
            document.body.appendChild(heightRef);

            heightRef = document.getElementById('heightRef');
            var pxPermm = $('#heightRef').height();

            heightRef.parentNode.removeChild(heightRef);

            return function pxTOmm(px) {
                return px / pxPermm;
            }
        })(),

        _update: function () {
            var map = this._map;

            var CenterOfMap = map.getSize().y / 2;

            var RealWorlMetersPer100Pixels = map.distance(
                map.containerPointToLatLng([0, CenterOfMap]),
                map.containerPointToLatLng([100, CenterOfMap])
            );

            var ScreenMetersPer100Pixels = this._pxTOmm(100) / 1000;

            var scaleFactor = RealWorlMetersPer100Pixels / ScreenMetersPer100Pixels;

            //.replace formats the scale with commas 50000 -> 50,000
            this._mScale.innerHTML = '1:' + Math.round(scaleFactor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

    });

    return ScaleFactor;
}, window));