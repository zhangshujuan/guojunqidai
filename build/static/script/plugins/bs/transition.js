/**
 * @author 
 * @email 
 * @descrip guojunqidai
 * @version v1.0.0
 */
define(function(require,exports,module){function n(){var n=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in t)if(void 0!==n.style[i])return{end:t[i]};return!1}$.fn.emulateTransitionEnd=function(n){var t=!1,i=this;$(this).one("bsTransitionEnd",function(){t=!0});var r=function(){t||$(i).trigger($.support.transition.end)};return setTimeout(r,n),this},$(function(){$.support.transition=n(),$.support.transition&&($.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(n){if($(n.target).is(this))return n.handleObj.handler.apply(this,arguments)}})})});