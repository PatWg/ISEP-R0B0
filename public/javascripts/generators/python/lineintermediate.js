'use strict';

goog.provide('Blockly.Python.lineintermediate');

goog.require('Blockly.Python');
Blockly.Python['start'] = function(block) {
    var statements_name = Blockly.Python.statementToCode(block, 'NAME');
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };

  Blockly.Python['lineSensorleft'] = function(block) {
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    var dropdown_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = '...\n';
    return code;
  };
  Blockly.Python['lineSensorright'] = function(block) {
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    var dropdown_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = '...\n';
    return code;
  };
  Blockly.Python['curveright'] = function(block) {
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    var dropdown_name = block.getFieldValue('NAME');
    var dropdownoperation_name = block.getFieldValue('OPERATION');
    // TODO: Assemble JavaScript into code variable.
    var code = '...\n';
    return code;
  };
  Blockly.Python['curveleft'] = function(block) {
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    var dropdown_name = block.getFieldValue('NAME');
    var dropdownoperation_name = block.getFieldValue('OPERATION');
    // TODO: Assemble JavaScript into code variable.
    var code = '...\n';
    return code;
  };
  Blockly.Python['nocurve'] = function(block) {
    Blockly.Python.definitions_['import microbit'] = 'from microbit import *';
    var dropdown_name = block.getFieldValue('NAME');
    var dropdownoperation_name = block.getFieldValue('OPERATION');
    // TODO: Assemble JavaScript into code variable.
    var code = '...\n';
    return code;
  };
  Blockly.Python['end'] = function(block) {
    // TODO: Assemble Python into code variable.
    var code = '...\n';
    return code;
  };