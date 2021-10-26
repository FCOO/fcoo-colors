/****************************************************************************
	fcoo-colors.js,

	(c) 2021, FCOO

	https://github.com/FCOO/fcoo-colors
	https://github.com/FCOO

****************************************************************************/

(function ($, window/*, document, undefined*/) {
	"use strict";

	//Create fcoo-namespace
    var ns = window.fcoo = window.fcoo || {},
        nsColor = ns.color = ns.color || {};


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


    nsColor.getColor = function(color, gradient){
        var colorIndex = typeof color == 'string' ? colorName2Index.indexOf(color) : color;
        return nsColor.getColorList(false, gradient)[colorIndex];
    };


    nsColor.getDeltaColor = function(color, deltaGradient = 0){
        return nsColor.getColor(color, nsColor.defaultGradient + deltaGradient);
    };


    nsColor.getColorList = function( sorted, gradient ){
        var result = [];
        if (sorted){
            $.each(nsColor.defaultOrder, function(dummy, color){
                result.push( nsColor.getColor( color, gradient ) );
            });
        }
        else
            result = nsColor.nsColorArray[gradient];
        return result;
    };

}(jQuery, this, document));