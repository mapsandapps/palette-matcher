import * as chroma from 'chroma-js';
import * as _ from 'lodash';

export class Utils {
  static convertColor(color: string) {
    const rgbArray = chroma(color).rgb()
    const rgbStringWithSpaces = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`
    return [
      {
        label: chroma(color).hex(),
        description: 'Hex'
      },{
        label: chroma(color).css(),
        description: 'RGB'
      },{
        label: rgbStringWithSpaces,
        description: 'RGB with spaces'
      },{
        label: chroma(color).css('hsl'),
        description: 'HSL'
      }
    ]
  }

  static matchColor(color: string, userPalette: Array<string>) {
    let chromaColor: object;
    try {
      chromaColor = chroma(color);
    } catch (e) {
      chromaColor = chroma.hex('#000000');
      console.log('Could not parse color', color);
    }

    const withDistance = userPalette.map(paletteColor => {
      return {
        color: paletteColor,
        distance: chroma.distance(chromaColor, paletteColor)
      };
    });
    let closest = _.minBy(withDistance, 'distance');

    // There's _always_ a closest, but it might not be a reasonable replacement. Cap it at ~25units distance.
    if (closest.distance > 25) { // TODO: change this to a user setting
      closest = null;
    }

    // TODO: might want to return full withDistance array

    // return {
    //   color,
    //   luminance: chromaColor.luminance(),
    //   hsv: chromaColor.hsv(),
    //   closest: closest
    // };
    return closest;
  }
}
