goog.provide('Blockly.Python.custom');
goog.require('Blockly.Python');
goog.require('Blockly.Extensions');
goog.require('Blockly.Extensions.custom');

Blockly.Python['string_conversion'] = function(block) {
  var text_name = Blockly.Python.quote_(block.getFieldValue('NAME'));
  // TODO: Assemble Python into code variable.
  return  ['list(' + text_name + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

/*
Blockly.Python['music'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble Python into code variable.
  if(dropdown_type == 'Power up'){
    var power_up = new Audio('/javascripts/powerup.mp3');
    power_up.play();
      
  }
  
  if(dropdown_type == 'Power down' )
  {
    var power_down = new Audio('/javascripts/powerdown.mp3');
    power_down.play();
  }
    
  
 if(dropdown_type == 'ringtone'){
    var ringtone = new Audio('/javascripts/ringtone.mp3');
    ringtone.play();
      
  }
  if(dropdown_type == 'Wedding'){
    var wedding = new Audio('/javascripts/wedding.mp3');
    wedding.play();
      
  }
  if(dropdown_type == 'Birthday'){
    var birthday = new Audio('/javascripts/birthday.mp3');
    birthday.play();
      
  }
  var code = '("' + dropdown_type + '") music is selected played once!! \n';
  return code;
};

Blockly.Python['music_repeat'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var dropdown_name = block.getFieldValue('NAME');
  // TODO: Assemble Python into code variable.
  if(dropdown_type == 'Power up'){
    var power_up = new Audio('/javascripts/powerup.mp3');
    power_up.loop=true;
    power_up.play();
      
  }
  
  if(dropdown_type == 'Power down' )
  {
    var power_down = new Audio('/javascripts/powerdown.mp3');
    power_down.loop = true;
    power_down.play();
  }
    
  
 if(dropdown_type == 'ringtone'){
    var ringtone = new Audio('/javascripts/ringtone.mp3');
    ringtone.loop = true;
    ringtone.play();
      
  }
  if(dropdown_type == 'Wedding'){
    var wedding = new Audio('/javascripts/wedding.mp3');
    wedding.loop = true;
    wedding.play();
      
  }
  if(dropdown_type == 'Birthday'){
    var birthday = new Audio('/javascripts/birthday.mp3');
    birthday.loop = true;
    birthday.play();
      
  }
  var code = '("' + dropdown_type + '") music is selected played repeated!! \n';
  return code;
};
*/