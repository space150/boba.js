var Konami=function(){var a={addEvent:function(b,c,d,e){if(b.addEventListener)b.addEventListener(c,d,false);else if(b.attachEvent){b["e"+c+d]=d;b[c+d]=function(){b["e"+c+d](window.event,e)};b.attachEvent("on"+c,b[c+d])}},input:"",pattern:"3838404037393739666513",load:function(b){this.addEvent(document,"keydown",function(c,d){if(d)a=d;a.input+=c?c.keyCode:event.keyCode;if(a.input.length>a.pattern.length)a.input=a.input.substr(a.input.length-a.pattern.length);if(a.input==a.pattern){a.code(b);a.input=
""}},this);this.iphone.load(b)},code:function(b){window.location=b},iphone:{start_x:0,start_y:0,stop_x:0,stop_y:0,tap:false,capture:false,orig_keys:"",keys:["UP","UP","DOWN","DOWN","LEFT","RIGHT","LEFT","RIGHT","TAP","TAP","TAP"],code:function(b){a.code(b)},load:function(b){this.orig_keys=this.keys;a.addEvent(document,"touchmove",function(c){if(c.touches.length==1&&a.iphone.capture==true){c=c.touches[0];a.iphone.stop_x=c.pageX;a.iphone.stop_y=c.pageY;a.iphone.tap=false;a.iphone.capture=false;a.iphone.check_direction()}});
a.addEvent(document,"touchend",function(){a.iphone.tap==true&&a.iphone.check_direction(b)},false);a.addEvent(document,"touchstart",function(c){a.iphone.start_x=c.changedTouches[0].pageX;a.iphone.start_y=c.changedTouches[0].pageY;a.iphone.tap=true;a.iphone.capture=true})},check_direction:function(b){x_magnitude=Math.abs(this.start_x-this.stop_x);y_magnitude=Math.abs(this.start_y-this.stop_y);x=this.start_x-this.stop_x<0?"RIGHT":"LEFT";y=this.start_y-this.stop_y<0?"DOWN":"UP";result=x_magnitude>y_magnitude?
x:y;result=this.tap==true?"TAP":result;if(result==this.keys[0])this.keys=this.keys.slice(1,this.keys.length);if(this.keys.length==0){this.keys=this.orig_keys;this.code(b)}}}};return a};

(function() {
  var Boba = (function() {
    var defaults = {
      pageName: "page",
      siteName: "site",
      defaultCategory: null,
      defaultAction: null,
      defaultLabel: null
    };

    function Boba(opts) {
      this.ga = this._getGA();
      if (typeof this.ga !== "undefined") {
        // Extend defaults with options.
        this.opts = $.extend(defaults, opts);

        // Watch anything defined in the options.
        if (typeof this.opts.watch !== "undefined") {
          for (var i = this.opts.watch.length - 1; i >= 0; i--) {
            this.watch.apply(this, this.opts.watch[i]);
          };
        }

        this.pageName = this.opts.pageName;
        this.siteName = this.opts.siteName;

        this.trackLinks = $.proxy(this.trackLinks, this);
        this.push = $.proxy(this.push, this);
        this.watch = $.proxy(this.watch, this);
        this._onTrackedClick = $.proxy(this._onTrackedClick, this);
      } else {
        console.warn("Google Analytics not found. Boba could not initialize.");
      }

      return this;
    }


    //
    // Instance methods.
    //

    Boba.prototype = {
      watch: function watch(eventType, selector, func) {
        var trackingFunction = function(event) {
          this.push(func(event));
        };
        $("body").on(
          eventType + ".tracker",
          selector,
          $.proxy(trackingFunction, this)
        );
        return this;
      },

      trackLinks: function trackLinks(selector) {
        selector = selector || '.js-track';
        this.watch('click', selector, this._onTrackedClick);
        return this;
      },

      push: function bobaInstancePush(data) {
        data = [
          data.gaCategory || data.category || this.opts.defaultCategory,
          data.gaAction   || data.action   || this.opts.defaultAction,
          data.gaLabel    || data.label    || this.opts.defaultLabel
        ];
        this.ga.apply(null, data);
        return this;
      },

      _onTrackedClick: function trackClick(event) {
        if (this.ga) {
          return $(event.currentTarget).data();
        }
      },

      // Constructs a Google Analytics function.
      _getGA: function getGA() {
        var ga;
        if (typeof window.ga !== "undefined" && window.ga !== null) {
          ga = function gapush() {
            // Prepend "send" and "event" to the array and push it.
            var args = Array.prototype.slice.call(arguments);
            args.unshift("send", "event");
            window.ga.apply(window, args);
          };
        } else if (typeof window._gaq !== "undefined" && window._gaq !== null) {
          ga = function gaqpush() {
            // Prepend "_trackEvent" to the array and push it.
            var args = Array.prototype.slice.call(arguments);
            args.unshift("_trackEvent");
            window._gaq.push.apply(window, args);
          };
        }
        return ga;
      }
    };

    return Boba;
  }());
  window.Boba = Boba;
}());
