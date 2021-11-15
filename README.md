# fcoo-colors
> JS and SCSS for colors used in FCOOs web-applications when displaying information in charts, maps, tables etc.
## Description

The colors used to display information in charts, maps, tables in FCOO web applications are the  [Linkedin Color Palettes for Screen](linkedin-palette-screen.pdf). Read more at [Linkedin's homepage](https://brand.linkedin.com/content/brand/global/en_us/index/visual-identity/color-palettes)

The colors of buttons, menus etc. are defined in [Bootstrap](https://getbootstrap.com/) and [fcoo/jquery-bootstrap ](https://github.com/FCOO/jquery-bootstrap)


The color system contains of nine colors: `0:Blue, 1:Purple, 2:Red, 3:Orange, 4:Cyan, 5:Yellow, 6:Pink, 7:Green, and 8:Gray`
Each color comes in nine different gradients: `0-8`

A `colorList` is and array of the nine colors in a specific gradient. Eq. `colorList` for gradient 2 = `['#68C7EC', '#BFABE6', '#F59890', '#F7B26A', '#69CDCF', '#F7D56B', '#F99ACA', '#AED677', '#B6B9BC']`


This packages contains JS and SCSS variables defining the different colors and a default order (`window.fcoo.color.defaultOrder = []STRING`) of colors to be used to select colors from

     window.fcoo.color.defaultOrder  = ["blue", "red", "green", "yellow", "gray",  "purple", "pink", "cyan", "orange"]

To include the variables and functions in a SCSS-file add

    @import "../bower-components/fcoo-colors/src/fcoo-colors-mixin";



## Installation
### bower
`bower install https://github.com/FCOO/fcoo-colors.git --save`

## Demo
http://FCOO.github.io/fcoo-colors/demo/

## Usage

###In SCSS-files
    @import "../bower-components/fcoo-colors/src/fcoo-colors-mixin";

    .color-pink {
        background-color: fc-get-color($fc-pink);
    }
    .color-blue-3 {
        background-color: fc-get-color($fc-blue, 3);
    }
    .color-yellow-8 {
        background-color: fc-get-color($fc-yellow, 8);
    }


### In JS-files

    window.fcoo.color   //Namespace

    window.fcoo.color.defaultGradient   // = 4;
    window.fcoo.color.defaultOrder      // = ["blue", "red", "green", "yellow", "gray", "purple", "pink", "cyan", "orange"];

    window.fcoo.color.getColor("blue")  //Return "#123456"
    window.fcoo.color.getColor(2); //Same as getColor("green")

    window.fcoo.color.getColorRGB("blue")   //Return {red:NUMBER, green:NUMBER, blue:NUMBER, alpha:NUMBER}
    window.fcoo.color.getColorRGBArray("blue")   //Return [red, green, blue, alpha]


    window.fcoo.color.getDeltaColor("blue", 3); //Return "blue" 3 gradiants darker that the default gradiant

    window.fcoo.color.getDeltaColorRGB(...)     //As getDeltaColor but returns {red:..., green:..., blue:..., alpha:...}
    window.fcoo.color.getDeltaColorRGBArray(..) //As getDeltaColor but returns []


    window.fcoo.color.getColorList( sorted, gradient )  //Return the [sorted] list of colors for gradient.


## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/fcoo-colors/LICENSE).

Copyright (c) 2021 [FCOO](https://github.com/FCOO)

## Contact information

Niels Holt nho@fcoo.dk

