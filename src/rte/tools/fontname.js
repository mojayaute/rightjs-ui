/**
 * Font-name options tool
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
Rte.Tool.Fontname = new Class(Rte.Tool.Options, {
  command: 'fontname',

  /**
   * Basic constructor
   *
   * @param Rte rte
   */
  initialize: function(rte) {
    var options = {}, name, fonts = Rte.FontNames;

    for (name in fonts) {
      options[fonts[name]] = '<div style="font-family:'+
        fonts[name]+ '">' + name + '</div>';
    }

    return this.$super(rte, options);
  }
});
