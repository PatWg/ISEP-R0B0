'use strict';

goog.provide('Blockly.Blocks.custom');  // Deprecated
goog.provide('Blockly.Constants.Custom');
goog.require('Blockly.Blocks');
Blockly.Constants.Custom.HUE = 250;
Blockly.Blocks.custom.HUE = Blockly.Constants.Custom.HUE;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT 
      {
        "type": "string_conversion",
        "message0": "Enter the text %1",
        "args0": [
          {
            "type": "field_input",
            "name": "NAME",
            "text": ""
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
      }   
]); // END JSON EXTRACT (Do not delete this comment.)
