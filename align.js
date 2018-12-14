module.exports = function(RED) {
  "use strict";
  const validAlign = ['left', 'center', 'right'];
  var screen_height = process.env.SCREEN_HEIGHT || "16"
  var screen_width = process.env.SCREEN_WIDTH || "32"

  function tsa_align(n) {
    RED.nodes.createNode(this, n);
    this.align = n.align;
    var node = this;

    this.on("input", function(msg) {
      var align = validAlign[0];
      if((!node.align || node.align === "setBy") && validAlign.indexOf(msg.align) !== -1){
        align = msg.align
      } else if (node.align && node.align !== "setBy"){
        align = node.align
      }

      if(validAlign.indexOf(align) !== -1){
        if(typeof msg._led_matrix === "undefined") {
          msg._led_matrix = {
            data: []
          };
        } else if(typeof msg._led_matrix.data === "undefined") {
          msg._led_matrix.data = []
        }
        msg._led_matrix.alignment = align
      }
      node.send(msg);
    });
  }
  RED.nodes.registerType("tsa_align", tsa_align);
}
