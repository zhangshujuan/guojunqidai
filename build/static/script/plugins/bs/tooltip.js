/**
 * @author 
 * @email 
 * @descrip guojunqidai
 * @version v1.0.0
 */
define(function(require,exports,module){function t(t){return this.each(function(){var o=$(this),i=o.data("bs.tooltip"),n="object"==typeof t&&t;!i&&/destroy|hide/.test(t)||(i||o.data("bs.tooltip",i=new e(this,n)),"string"==typeof t&&i[t]())})}var e=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",t,e)};e.VERSION="3.3.4",e.TRANSITION_DURATION=150,e.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},e.prototype.init=function(t,e,o){if(this.enabled=!0,this.type=t,this.$element=$(e),this.options=this.getOptions(o),this.$viewport=this.options.viewport&&$(this.options.viewport.selector||this.options.viewport),this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var i=this.options.trigger.split(" "),n=i.length;n--;){var s=i[n];if("click"==s)this.$element.on("click."+this.type,this.options.selector,$.proxy(this.toggle,this));else if("manual"!=s){var r="hover"==s?"mouseenter":"focusin",a="hover"==s?"mouseleave":"focusout";this.$element.on(r+"."+this.type,this.options.selector,$.proxy(this.enter,this)),this.$element.on(a+"."+this.type,this.options.selector,$.proxy(this.leave,this))}}this.options.selector?this._options=$.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.getOptions=function(t){return t=$.extend({},this.getDefaults(),this.$element.data(),t),t.delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t},e.prototype.getDelegateOptions=function(){var t={},e=this.getDefaults();return this._options&&$.each(this._options,function(o,i){e[o]!=i&&(t[o]=i)}),t},e.prototype.enter=function(t){var e=t instanceof this.constructor?t:$(t.currentTarget).data("bs."+this.type);return e&&e.$tip&&e.$tip.is(":visible")?void(e.hoverState="in"):(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),$(t.currentTarget).data("bs."+this.type,e)),clearTimeout(e.timeout),e.hoverState="in",e.options.delay&&e.options.delay.show?void(e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)):e.show())},e.prototype.leave=function(t){var e=t instanceof this.constructor?t:$(t.currentTarget).data("bs."+this.type);return e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),$(t.currentTarget).data("bs."+this.type,e)),clearTimeout(e.timeout),e.hoverState="out",e.options.delay&&e.options.delay.hide?void(e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)):e.hide()},e.prototype.show=function(){var t=$.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var o=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!o)return;var i=this,n=this.tip(),s=this.getUID(this.type);this.setContent(),n.attr("id",s),this.$element.attr("aria-describedby",s),this.options.animation&&n.addClass("fade");var r="function"==typeof this.options.placement?this.options.placement.call(this,n[0],this.$element[0]):this.options.placement,a=/\s?auto?\s?/i,l=a.test(r);l&&(r=r.replace(a,"")||"top"),n.detach().css({top:0,left:0,display:"block"}).addClass(r).data("bs."+this.type,this),this.options.container?n.appendTo(this.options.container):n.insertAfter(this.$element);var p=this.getPosition(),h=n[0].offsetWidth,f=n[0].offsetHeight;if(l){var c=r,d=this.options.container?$(this.options.container):this.$element.parent(),u=this.getPosition(d);r="bottom"==r&&p.bottom+f>u.bottom?"top":"top"==r&&p.top-f<u.top?"bottom":"right"==r&&p.right+h>u.width?"left":"left"==r&&p.left-h<u.left?"right":r,n.removeClass(c).addClass(r)}var g=this.getCalculatedOffset(r,p,h,f);this.applyPlacement(g,r);var m=function(){var t=i.hoverState;i.$element.trigger("shown.bs."+i.type),i.hoverState=null,"out"==t&&i.leave(i)};$.support.transition&&this.$tip.hasClass("fade")?n.one("bsTransitionEnd",m).emulateTransitionEnd(e.TRANSITION_DURATION):m()}},e.prototype.applyPlacement=function(t,e){var o=this.tip(),i=o[0].offsetWidth,n=o[0].offsetHeight,s=parseInt(o.css("margin-top"),10),r=parseInt(o.css("margin-left"),10);isNaN(s)&&(s=0),isNaN(r)&&(r=0),t.top=t.top+s,t.left=t.left+r,$.offset.setOffset(o[0],$.extend({using:function(t){o.css({top:Math.round(t.top),left:Math.round(t.left)})}},t),0),o.addClass("in");var a=o[0].offsetWidth,l=o[0].offsetHeight;"top"==e&&l!=n&&(t.top=t.top+n-l);var p=this.getViewportAdjustedDelta(e,t,a,l);p.left?t.left+=p.left:t.top+=p.top;var h=/top|bottom/.test(e),f=h?2*p.left-i+a:2*p.top-n+l,c=h?"offsetWidth":"offsetHeight";o.offset(t),this.replaceArrow(f,o[0][c],h)},e.prototype.replaceArrow=function(t,e,o){this.arrow().css(o?"left":"top",50*(1-t/e)+"%").css(o?"top":"left","")},e.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},e.prototype.hide=function(t){function o(){"in"!=i.hoverState&&n.detach(),i.$element.removeAttr("aria-describedby").trigger("hidden.bs."+i.type),t&&t()}var i=this,n=$(this.$tip),s=$.Event("hide.bs."+this.type);if(this.$element.trigger(s),!s.isDefaultPrevented())return n.removeClass("in"),$.support.transition&&n.hasClass("fade")?n.one("bsTransitionEnd",o).emulateTransitionEnd(e.TRANSITION_DURATION):o(),this.hoverState=null,this},e.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},e.prototype.hasContent=function(){return this.getTitle()},e.prototype.getPosition=function(t){t=t||this.$element;var e=t[0],o="BODY"==e.tagName,i=e.getBoundingClientRect();null==i.width&&(i=$.extend({},i,{width:i.right-i.left,height:i.bottom-i.top}));var n=o?{top:0,left:0}:t.offset(),s={scroll:o?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},r=o?{width:$(window).width(),height:$(window).height()}:null;return $.extend({},i,s,r,n)},e.prototype.getCalculatedOffset=function(t,e,o,i){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-o/2}:"top"==t?{top:e.top-i,left:e.left+e.width/2-o/2}:"left"==t?{top:e.top+e.height/2-i/2,left:e.left-o}:{top:e.top+e.height/2-i/2,left:e.left+e.width}},e.prototype.getViewportAdjustedDelta=function(t,e,o,i){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,r=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-s-r.scroll,l=e.top+s-r.scroll+i;a<r.top?n.top=r.top-a:l>r.top+r.height&&(n.top=r.top+r.height-l)}else{var p=e.left-s,h=e.left+s+o;p<r.left?n.left=r.left-p:h>r.width&&(n.left=r.left+r.width-h)}return n},e.prototype.getTitle=function(){var t,e=this.$element,o=this.options;return t=e.attr("data-original-title")||("function"==typeof o.title?o.title.call(e[0]):o.title)},e.prototype.getUID=function(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},e.prototype.tip=function(){return this.$tip=this.$tip||$(this.options.template)},e.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},e.prototype.enable=function(){this.enabled=!0},e.prototype.disable=function(){this.enabled=!1},e.prototype.toggleEnabled=function(){this.enabled=!this.enabled},e.prototype.toggle=function(t){var e=this;t&&(e=$(t.currentTarget).data("bs."+this.type),e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),$(t.currentTarget).data("bs."+this.type,e))),e.tip().hasClass("in")?e.leave(e):e.enter(e)},e.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type)})};var o=$.fn.tooltip;$.fn.tooltip=t,$.fn.tooltip.Constructor=e,$.fn.tooltip.noConflict=function(){return $.fn.tooltip=o,this}});