'use strict';

goog.provide('Blockly.Blocks.lineintermediate');  // Deprecated
goog.provide('Blockly.Constants.Lineintermediate');
goog.require('Blockly.Blocks');
Blockly.Constants.Lineintermediate.HUE = 250;
Blockly.Blocks.lineintermediate.HUE = Blockly.Constants.Lineintermediate.HUE;
Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    {
    "type": "start",
    "message0": "Start %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "NAME"
      }
    ],
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "lineSensorleft",
    "message0": "Line_Sensor_Left %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "Left",
            "Left"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "lineSensorright",
    "message0": "Line_Sensor_Right %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "Right",
            "Right"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "curveright",
    "message0": "Movements %1 %2",
    "args0": [
     {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "Curve Right",
            "Curve Right"
          ]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "OPERATION",
        "options": [
            [
              "Turn Right",
              "Turn Right"
            ]
          ]
 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "curveleft",
    "message0": "Movements %1 %2",
    "args0": [
     {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "Curve Left",
            "Curve Left"
          ]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "OPERATION",
        "options": [
            [
              "Turn Left",
              "Turn Left"
            ]
          ]
 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "nocurve",
    "message0": "Movements %1 %2",
    "args0": [
     {
        "type": "field_dropdown",
        "name": "NAME",
        "options": [
          [
            "No Curve",
            "No Curve"
          ]
        ]
      },
      {
        "type": "field_dropdown",
        "name": "OPERATION",
        "options": [
            [
              "Straight",
              "Straight"
            ]
          ]
 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "end",
    "message0": "End",
    "previousStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
]); // END JSON EXTRACT (Do not delete this comment.)