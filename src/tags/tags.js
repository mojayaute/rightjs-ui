/**
 * The main unit for the Tags widget
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
var Tags = new Widget('INPUT', {
  extend: {
    version: '2.2.0',

    Options: {
      tags:      null,  // the tags list
      vertical:  false, // use a vertical tags list

      allowNew:  true,  // allow new tags to be created

      separator: ',',   // the tokens separator

      cssRule:   'input[data-tags]' // the autoinitialization css-rule
    },

    /**
     * Rescans and initializes the input elements in the area
     *
     * @param {Wrapper} optional scope
     * @return void
     */
    rescan: function(scope) {
      $(scope || document).find(Tags.Options.cssRule).each(function(input) {
        if (!(input instanceof Tags)) {
          input = new Tags(input);
        }
      });
    }
  },

  /**
   * Basic constructor
   *
   * @param {Input} element
   * @param {Object} options
   * @return void
   */
  initialize: function(element, options) {
    this
      .$super('tags', element)
      .setOptions(options);

    // just a relatively positioned container
    this.container = $E('div', {'class': 'rui-tags'}).insertTo(this, 'after');

    // the visible tags list
    this.list  = new Tags.List(this);
    this.input = new Tags.Input(this);

    this.onFocus(function() { this.input.focus(); });

    // reinitializing with default values
    this.setValue(this._.value);
  },

  /**
   * Overloading the method so that it updated the visible list as well
   *
   * @param {String} string tokens
   * @return {Tags} this
   */
  setValue: function(string) {
    var tags = R(string.split(this.options.separator)).map('trim').reject('blank');

    // merging the tags into the known list
    this.options.tags = R(
      this.options.tags || (this.options.tags = [])
    ).merge(tags);

    // repopulating the list
    this.list.setTags(tags);

    // setting the internal value
    return this.$super(string);
  }
});