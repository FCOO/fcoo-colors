/****************************************************************************
	fcoo-colors.js,

	(c) 2021, FCOO

	https://github.com/FCOO/fcoo-colors
	https://github.com/FCOO

    Constants and methods to name, get and modify different colors used by FCOO Web Applications

****************************************************************************/

(function ($, window/*, document, undefined*/) {
	"use strict";

	//Create fcoo-namespace
    var ns = window.fcoo = window.fcoo || {},
        nsColor = ns.color = ns.color || {};

    //nsColor.colorNames = {id}{da:STRING, en:STRING}
    nsColor.colorNames = {
        blue    : {da: 'blå',    en: 'blue'     },
        purple  : {da: 'lilla',  en: 'purple'   },
        red     : {da: 'rød',    en: 'red'      },
        orange  : {da: 'orange', en: 'orange'   },
        cyan    : {da: 'cyan',   en: 'cyan'     },
        yellow  : {da: 'Gul',    en: 'yellow'   },
        pink    : {da: 'pink',   en: 'pink'     },
        green   : {da: 'grøn',   en: 'green'    },
        gray    : {da: 'grå',    en: 'gray'     }
        };

    //nsColor.colorList  = []{id, name: {da:STRING, en:STRING}} ordred by nsColor.defaultOrder
    nsColor.colorList  = [];

    $.each(nsColor.defaultOrder, function(index, colorId){
        nsColor.colorList.push({
            id  : colorId,
            name: nsColor.colorNames[colorId]
        });
    });


    //The color scheme is from LinkedIn and shown in linkedin-palette-screen.pdf
    //nsColor.colorArray = The colors defined in linkedin-palette-screen.pdf = [gradiant][color]. Eg. colorArray[3, 4] = gradiant 3 of orange
    nsColor.colorArray = [
        //0:Blue    1:Purple    2:Red      3:Orange   4:Cyan     5:Yellow   6:Pink     7:Green    8:Gray
        ['#CFEDFB', '#EBE4FF', '#FFE0DA', '#FFE7BB', '#D2ECEB', '#FFF2B6', '#FFDFF2', '#E0F4BE', '#E6E9EC'],
        ['#9BDAF3', '#D8CCF4', '#FAC2BB', '#F8CD94', '#9EDDDD', '#FBE491', '#FFC4E4', '#C7E59A', '#D0D3D6'],
        ['#68C7EC', '#BFABE6', '#F59890', '#F7B26A', '#69CDCF', '#F7D56B', '#F99ACA', '#AED677', '#B6B9BC'],
        ['#34B3E4', '#A589D9', '#F16D64', '#F59640', '#35BEC1', '#F3C746', '#F371AF', '#95C753', '#A0A3A6'],
        ['#00A0DC', '#8C68CB', '#EC4339', '#F47B16', '#00AEB3', '#EFB920', '#ED4795', '#7CB82F', '#86898C'],
        ['#008CC9', '#7C5BBB', '#DD2E1F', '#EC640C', '#009EA5', '#E6A700', '#E2247F', '#60AA14', '#737679'],
        ['#0077B5', '#6A4BA7', '#C11F1D', '#CD5308', '#008891', '#CA9400', '#C9186E', '#4E8F13', '#595C5F'],
        ['#005E93', '#573B93', '#A40F1C', '#AF4104', '#00727D', '#AA7D00', '#B10C5C', '#3B7511', '#434649'],
        ['#004471', '#452B7F', '#88001A', '#903000', '#005C69', '#8B6700', '#870044', '#295A10', '#303336']
    ];

    var colorName2Index = ['blue', 'purple', 'red', 'orange', 'cyan', 'yellow', 'pink', 'green', 'gray'];

    nsColor.defaultGradient = 4;
    nsColor.defaultOrder    = ["blue", "red", "green", "yellow", "gray", "purple", "pink", "cyan", "orange"];


    //Methods to get the value of different color-names and gradiants.
    nsColor.getColor = function(color, gradient, fromSortedList){
        var colorIndex = typeof color == 'string' ? colorName2Index.indexOf(color) : color;
        return nsColor.getColorList(fromSortedList, gradient)[colorIndex];
    };


    nsColor.getColorRGB =  function(/*color, gradient, fromSortedList*/){
        return window.hexRgb( nsColor.getColor.apply(null, arguments) );
    };

    nsColor.getColorRGBArray =  function(/*color, gradient, fromSortedList*/){
        return window.hexRgb( nsColor.getColor.apply(null, arguments), {format: 'array'} );
    };


    nsColor.getDeltaColor = function(color, deltaGradient = 0, fromSortedList){
        return nsColor.getColor(color, nsColor.defaultGradient + deltaGradient, fromSortedList);
    };


    nsColor.getDeltaColorRGB = function(/*color, deltaGradient = 0, fromSortedList*/){
        return window.hexRgb( nsColor.getDeltaColor.apply(null, arguments) );
    };

    nsColor.getDeltaColorRGBArray =  function(/*color, deltaGradient = 0, fromSortedList*/){
        return window.hexRgb( nsColor.getDeltaColor.apply(null, arguments), {format: 'array'} );
    };


    nsColor.getColorList = function( sorted, gradient = 'DEFAULT' ){
        gradient = gradient == 'DEFAULT' ? nsColor.defaultGradient : gradient;
        var result = [];
        if (sorted){
            $.each(nsColor.defaultOrder, function(dummy, color){
                result.push( nsColor.getColor( color, gradient ) );
            });
        }
        else
            result = nsColor.colorArray[gradient];
        return result;
    };


    /****************************************************************************
    Using chroma.js (https://github.com/gka/chroma.js)
    Create js-versions of sass functions darken, lighten, tint and shade

    chromaBestContrast( color, contrastColors = ['#000000', '#ffffff'] )
    returns the color from contrastColors with the best contrast
    ****************************************************************************/

    //HSL manipulators - from https://github.com/gka/chroma.js/issues/217
    const lighten = (color, hslPercent) => color.set("hsl.l", color.get("hsl.l") + hslPercent);
    const darken = (color, hslPercent) => lighten(color, -hslPercent);
    const sassLightenDarken = (color, percent, dark) => {
        let  hslPercent = window.numeral(percent).value();
        if (hslPercent === null)
            hslPercent = 1;
        color = window.chroma(color);
        return dark ? darken(color, hslPercent).hex() : lighten(color, hslPercent).hex();
    };

    nsColor.sassLighten = ( color, percent ) => sassLightenDarken( color, percent );
    nsColor.sassDarken  = ( color, percent ) => sassLightenDarken( color, percent, true );

    const mix = (color1, color2, percent) => {
        let ratio = window.numeral(percent).value();
        if (ratio === null)
            ratio = 1;
        return window.chroma.mix(color1, color2, ratio);
    };

    nsColor.sassTintColor  = (color, weight) => mix( color, 'white', weight );
    nsColor.sassShadeColor = (color, weight) => mix( color, 'black', weight );

    //chromaBestContrast( color, contrastColors = ['#000000', '#ffffff']
    nsColor.chromaBestContrast = ( color, contrastColors = ['#000000', '#ffffff']) => {
        contrastColors = $.isArray( contrastColors ) ? contrastColors : [contrastColors];
        let bestContrast = 0, result;
        contrastColors.forEach( (textColor) => {
            const contrast = window.chroma.contrast(color, textColor);
            if (contrast > bestContrast){
                bestContrast = contrast;
                result = textColor;
            }
        });
        return window.chroma(result);
    };

    /****************************************************************************
    setRootVar(id, value)
    getRootVar(id)
    setApplicationBaseColor(baseColor)
    ****************************************************************************/
    const adjustId = (id) => id.slice(0, 2) == '--' ? id : '--'+id;
    const root = document.querySelector(':root');

    ns.setRootVar = (id, value) => {
        root.style.setProperty(adjustId(id), value);
    };

    ns.getRootVar = (id) => {
        return getComputedStyle(root).getPropertyValue( adjustId(id) );
    };

    nsColor.setApplicationBaseColor = (baseColor) => {
        baseColor = window.chroma(baseColor);
        ns.setRootVar('--_fcoo-app-base-color', baseColor.hex() );
        ns.setRootVar('--_fcoo-app-base-text-color', nsColor.chromaBestContrast(baseColor).hex() );
    };


}(jQuery, this, document));