
$(document).ready(function () {
// menu
$(window).click(function (event) {
if(event.target.className != "hamburger" && event.target.parentElement.className != "hamburger"){
$(this).removeClass("is-active");
$('.hamburger').removeClass("is-active");
$("#menu-item,body,html").removeClass("is-active");
$(".menu-activebg").removeClass("is-active"); 
$(".menu-overle").removeClass("is-active"); 
}else{
$(this).toggleClass("is-active");
$('.hamburger').toggleClass("is-active");
$("#menu-item,body,html").toggleClass("is-active");
$(".menu-activebg").toggleClass("is-active");  
$(".menu-overle").toggleClass("is-active"); 
}
});

// animation
new WOW().init();

//Menu Item Active Js
$(".menu_listing li a").click(function () {
$(".menu_listing a").removeClass("menu-item_active");
$(this).addClass("menu-item_active");
});
});
// loader
$(window).on('load', function() { // makes sure the whole site is loaded 
   // $('#overlayer').fadeOut();
   $('#overlayer').delay(100).fadeOut('slow');
   $('.loader').delay(100).fadeOut('slow');
   $('#loader-inner').delay(100).fadeOut('slow'); // will fade out the white DIV that covers the website. 
 });
$(document).ready(function () {
$(document).on("scroll", function(event){
var scrollPos = $(document).scrollTop();
$('.menu_listing li a.smooth_section').each(function () {
var currLink = $(this);
var refElement = $(currLink.attr("href"));
if(refElement.position() != undefined){
   if (refElement.position().top - 125 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
       $('.menu_listing li a.smooth_section').removeClass("menu-item_active");
       currLink.addClass("menu-item_active");
   }else{
       currLink.removeClass("menu-item_active");
   }
}
});
});
});


// nice select
(function($) {

$.fn.niceSelect = function(method) {

// Methods
if (typeof method == 'string') {
if (method == 'update') {
this.each(function() {
   var $select = $(this);
   var $dropdown = $(this).next('.nice-select');
   var open = $dropdown.hasClass('open');

   if ($dropdown.length) {
       $dropdown.remove();
       create_nice_select($select);

       if (open) {
           $select.next().trigger('click');
       }
   }
});
} else if (method == 'destroy') {
this.each(function() {
   var $select = $(this);
   var $dropdown = $(this).next('.nice-select');

   if ($dropdown.length) {
       $dropdown.remove();
       $select.css('display', '');
   }
});
if ($('.nice-select').length == 0) {
   $(document).off('.nice_select');
}
} else {
console.log('Method "' + method + '" does not exist.')
}
return this;
}

// Hide native select
this.hide();

// Create custom markup
this.each(function() {
var $select = $(this);

if (!$select.next().hasClass('nice-select')) {
create_nice_select($select);
}
});

function create_nice_select($select) {
$select.after($('<div></div>')
.addClass('nice-select')
.addClass($select.attr('class') || '')
.addClass($select.attr('disabled') ? 'disabled' : '')
.addClass($select.attr('multiple') ? 'has-multiple' : '')
.attr('tabindex', $select.attr('disabled') ? null : '0')
.html($select.attr('multiple') ? '<span class="multiple-options"></span><div class="nice-select-search-box"><input type="text" class="nice-select-search" placeholder="Поиск..."/></div><ul class="list"></ul>' : '<span class="current"></span><div class="nice-select-search-box"><input type="text" class="nice-select-search" placeholder="Поиск..."/></div><ul class="list"></ul>')
);

var $dropdown = $select.next();
var $options = $select.find('option');
if ($select.attr('multiple')) {
var $selected = $select.find('option:selected');
var $selected_html = '';
$selected.each(function() {
   $selected_option = $(this);
   $selected_text = $selected_option.data('display') ||  $selected_option.text();

   if (!$selected_option.val()) {
       return;
   }

   $selected_html += '<span class="current">' + $selected_text + '</span>';
});
$select_placeholder = $select.data('js-placeholder') || $select.attr('js-placeholder');
$select_placeholder = !$select_placeholder ? 'Select' : $select_placeholder;
$selected_html = $selected_html === '' ? $select_placeholder : $selected_html;
$dropdown.find('.multiple-options').html($selected_html);
} else {
var $selected = $select.find('option:selected');
$dropdown.find('.current').html($selected.data('display') ||  $selected.text());
}


$options.each(function(i) {
var $option = $(this);
var display = $option.data('display');

$dropdown.find('ul').append($('<li></li>')
   .attr('data-value', $option.val())
   .attr('data-display', (display || null))
   .addClass('option' +
       ($option.is(':selected') ? ' selected' : '') +
       ($option.is(':disabled') ? ' disabled' : ''))
   .html($option.text())
);
});
}

/* Event listeners */

// Unbind existing events in case that the plugin has been initialized before
$(document).off('.nice_select');

// Open/close
$(document).on('click.nice_select', '.nice-select', function(event) {
var $dropdown = $(this);

$('.nice-select').not($dropdown).removeClass('open');
$dropdown.toggleClass('open');

if ($dropdown.hasClass('open')) {
$dropdown.find('.option');
$dropdown.find('.nice-select-search').val('');
$dropdown.find('.nice-select-search').focus();
$dropdown.find('.focus').removeClass('focus');
$dropdown.find('.selected').addClass('focus');
$dropdown.find('ul li').show();
} else {
$dropdown.focus();
}
});

$(document).on('click', '.nice-select-search-box', function(event) {
event.stopPropagation();
return false;
});
$(document).on('keyup.nice-select-search', '.nice-select', function() {
var $self = $(this);
var $text = $self.find('.nice-select-search').val();
var $options = $self.find('ul li');
if ($text == '')
$options.show();
else if ($self.hasClass('open')) {
$text = $text.toLowerCase();
var $matchReg = new RegExp($text);
if (0 < $options.length) {
   $options.each(function() {
       var $this = $(this);
       var $optionText = $this.text().toLowerCase();
       var $matchCheck = $matchReg.test($optionText);
       $matchCheck ? $this.show() : $this.hide();
   })
} else {
   $options.show();
}
}
$self.find('.option'),
$self.find('.focus').removeClass('focus'),
$self.find('.selected').addClass('focus');
});

// Close when clicking outside
$(document).on('click.nice_select', function(event) {
if ($(event.target).closest('.nice-select').length === 0) {
$('.nice-select').removeClass('open').find('.option');
}
});

// Option click
$(document).on('click.nice_select', '.nice-select .option:not(.disabled)', function(event) {

var $option = $(this);
var $dropdown = $option.closest('.nice-select');
if ($dropdown.hasClass('has-multiple')) {
if ($option.hasClass('selected')) {
   $option.removeClass('selected');
} else {
   $option.addClass('selected');
}
$selected_html = '';
$selected_values = [];
$dropdown.find('.selected').each(function() {
   $selected_option = $(this);
   var attrValue = $selected_option.data('value');
   var text = $selected_option.data('display') ||  $selected_option.text();
   $selected_html += (`<span class="current" data-id=${attrValue}> ${text} <span class="remove">X</span></span>`);
   $selected_values.push($selected_option.data('value'));
});
$select_placeholder = $dropdown.prev('select').data('js-placeholder') ||                                   $dropdown.prev('select').attr('js-placeholder');
$select_placeholder = !$select_placeholder ? 'Select' : $select_placeholder;
$selected_html = $selected_html === '' ? $select_placeholder : $selected_html;
$dropdown.find('.multiple-options').html($selected_html);
$dropdown.prev('select').val($selected_values).trigger('change');
} else {
$dropdown.find('.selected').removeClass('selected');
$option.addClass('selected');
var text = $option.data('display') || $option.text();
$dropdown.find('.current').text(text);
$dropdown.prev('select').val($option.data('value')).trigger('change');
}
console.log($('.mySelect').val())
});
//---------remove item
$(document).on('click','.remove', function(){
var $dropdown = $(this).parents('.nice-select');
var clickedId = $(this).parent().data('id')
$dropdown.find('.list li').each(function(index,item){
if(clickedId == $(item).attr('data-value')) {
$(item).removeClass('selected')
}
})
$selected_values.forEach(function(item, index, object) {
if (item === clickedId) {
object.splice(index, 1);
}
});
$(this).parent().remove();
console.log($('.mySelect').val())
})

// Keyboard events
$(document).on('keydown.nice_select', '.nice-select', function(event) {
var $dropdown = $(this);
var $focused_option = $($dropdown.find('.focus') || $dropdown.find('.list .option.selected'));

// Space or Enter
if (event.keyCode == 32 || event.keyCode == 13) {
if ($dropdown.hasClass('open')) {
   $focused_option.trigger('click');
} else {
   $dropdown.trigger('click');
}
return false;
// Down
} else if (event.keyCode == 40) {
if (!$dropdown.hasClass('open')) {
   $dropdown.trigger('click');
} else {
   var $next = $focused_option.nextAll('.option:not(.disabled)').first();
   if ($next.length > 0) {
       $dropdown.find('.focus').removeClass('focus');
       $next.addClass('focus');
   }
}
return false;
// Up
} else if (event.keyCode == 38) {
if (!$dropdown.hasClass('open')) {
   $dropdown.trigger('click');
} else {
   var $prev = $focused_option.prevAll('.option:not(.disabled)').first();
   if ($prev.length > 0) {
       $dropdown.find('.focus').removeClass('focus');
       $prev.addClass('focus');
   }
}
return false;
// Esc
} else if (event.keyCode == 27) {
if ($dropdown.hasClass('open')) {
   $dropdown.trigger('click');
}
// Tab
} else if (event.keyCode == 9) {
if ($dropdown.hasClass('open')) {
   return false;
}
}
});

// Detect CSS pointer-events support, for IE <= 10. From Modernizr.
var style = document.createElement('a').style;
style.cssText = 'pointer-events:auto';
if (style.pointerEvents !== 'auto') {
$('html').addClass('no-csspointerevents');
}

return this;

};

}(jQuery));


// dark mode
(function() {
// Theme switch
var themeSwitch = document.getElementById('themeSwitch');
if (themeSwitch) {
initTheme();
// if user has already selected a specific theme -> apply it
themeSwitch.addEventListener('change', function(event) {
resetTheme();
// update color theme
});

function initTheme() {
var darkThemeSelected = (localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'dark');
// update checkbox
jQuery("body").removeClass("dark-mode");
themeSwitch.checked = darkThemeSelected;
// update body data-theme attribute

darkThemeSelected ? document.body.setAttribute('id', 'dark') : document.body.removeAttribute('id');

}
;
if (jQuery('.switch input').prop("checked") == true) {
jQuery("body").addClass("dark-mode");
} else {
jQuery("body").removeClass("dark-mode");
}

function resetTheme() {
if (themeSwitch.checked) {
 // dark theme has been selected
 document.body.setAttribute('id', 'dark');
 jQuery("body").addClass("dark-mode");
 localStorage.setItem('themeSwitch', 'dark');
} else {
 document.body.removeAttribute('id');
 localStorage.removeItem('themeSwitch');
 jQuery("body").removeClass("dark-mode");
}
}
;
}
}());


           var VanillaTilt = (function () {
'use strict';

/**
 * Created by Sergiu Șandor (micku7zu) on 1/27/2017.
 * Original idea: https://github.com/gijsroge/tilt.js
 * MIT License.
 * Version 1.7.0
 */

class VanillaTilt {
  constructor(element, settings = {}) {
    if (!(element instanceof Node)) {
      throw ("Can't initialize VanillaTilt because " + element + " is not a Node.");
    }

    this.width = null;
    this.height = null;
    this.clientWidth = null;
    this.clientHeight = null;
    this.left = null;
    this.top = null;

    // for Gyroscope sampling
    this.gammazero = null;
    this.betazero = null;
    this.lastgammazero = null;
    this.lastbetazero = null;

    this.transitionTimeout = null;
    this.updateCall = null;
    this.event = null;

    this.updateBind = this.update.bind(this);
    this.resetBind = this.reset.bind(this);

    this.element = element;
    this.settings = this.extendSettings(settings);

    this.reverse = this.settings.reverse ? -1 : 1;
    this.glare = VanillaTilt.isSettingTrue(this.settings.glare);
    this.glarePrerender = VanillaTilt.isSettingTrue(this.settings["glare-prerender"]);
    this.fullPageListening = VanillaTilt.isSettingTrue(this.settings["full-page-listening"]);
    this.gyroscope = VanillaTilt.isSettingTrue(this.settings.gyroscope);
    this.gyroscopeSamples = this.settings.gyroscopeSamples;

    this.elementListener = this.getElementListener();

    if (this.glare) {
      this.prepareGlare();
    }

    if (this.fullPageListening) {
      this.updateClientSize();
    }

    this.addEventListeners();
    this.updateInitialPosition();
  }

  static isSettingTrue(setting) {
    return setting === "" || setting === true || setting === 1;
  }

  /**
   * Method returns element what will be listen mouse events
   * @return {Node}
   */
  getElementListener() {
    if (this.fullPageListening) {
      return window.document;
    }

    if (typeof this.settings["mouse-event-element"] === "string") {
      const mouseEventElement = document.querySelector(this.settings["mouse-event-element"]);

      if (mouseEventElement) {
        return mouseEventElement;
      }
    }

    if (this.settings["mouse-event-element"] instanceof Node) {
      return this.settings["mouse-event-element"];
    }

    return this.element;
  }

  /**
   * Method set listen methods for this.elementListener
   * @return {Node}
   */
  addEventListeners() {
    this.onMouseEnterBind = this.onMouseEnter.bind(this);
    this.onMouseMoveBind = this.onMouseMove.bind(this);
    this.onMouseLeaveBind = this.onMouseLeave.bind(this);
    this.onWindowResizeBind = this.onWindowResize.bind(this);
    this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);

    this.elementListener.addEventListener("mouseenter", this.onMouseEnterBind);
    this.elementListener.addEventListener("mouseleave", this.onMouseLeaveBind);
    this.elementListener.addEventListener("mousemove", this.onMouseMoveBind);

    if (this.glare || this.fullPageListening) {
      window.addEventListener("resize", this.onWindowResizeBind);
    }

    if (this.gyroscope) {
      window.addEventListener("deviceorientation", this.onDeviceOrientationBind);
    }
  }

  /**
   * Method remove event listeners from current this.elementListener
   */
  removeEventListeners() {
    this.elementListener.removeEventListener("mouseenter", this.onMouseEnterBind);
    this.elementListener.removeEventListener("mouseleave", this.onMouseLeaveBind);
    this.elementListener.removeEventListener("mousemove", this.onMouseMoveBind);

    if (this.gyroscope) {
      window.removeEventListener("deviceorientation", this.onDeviceOrientationBind);
    }

    if (this.glare || this.fullPageListening) {
      window.removeEventListener("resize", this.onWindowResizeBind);
    }
  }

  destroy() {
    clearTimeout(this.transitionTimeout);
    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.reset();

    this.removeEventListeners();
    this.element.vanillaTilt = null;
    delete this.element.vanillaTilt;

    this.element = null;
  }

  onDeviceOrientation(event) {
    if (event.gamma === null || event.beta === null) {
      return;
    }

    this.updateElementPosition();

    if (this.gyroscopeSamples > 0) {
      this.lastgammazero = this.gammazero;
      this.lastbetazero = this.betazero;

      if (this.gammazero === null) {
        this.gammazero = event.gamma;
        this.betazero = event.beta;
      } else {
        this.gammazero = (event.gamma + this.lastgammazero) / 2;
        this.betazero = (event.beta + this.lastbetazero) / 2;
      }

      this.gyroscopeSamples -= 1;
    }

    const totalAngleX = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
    const totalAngleY = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;

    const degreesPerPixelX = totalAngleX / this.width;
    const degreesPerPixelY = totalAngleY / this.height;

    const angleX = event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
    const angleY = event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);

    const posX = angleX / degreesPerPixelX;
    const posY = angleY / degreesPerPixelY;

    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.event = {
      clientX: posX + this.left,
      clientY: posY + this.top,
    };

    this.updateCall = requestAnimationFrame(this.updateBind);
  }

  onMouseEnter() {
    this.updateElementPosition();
    this.element.style.willChange = "transform";
    this.setTransition();
  }

  onMouseMove(event) {
    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.event = event;
    this.updateCall = requestAnimationFrame(this.updateBind);
  }

  onMouseLeave() {
    this.setTransition();

    if (this.settings.reset) {
      requestAnimationFrame(this.resetBind);
    }
  }

  reset() {
    this.event = {
      clientX: this.left + this.width / 2,
      clientY: this.top + this.height / 2
    };

    if (this.element && this.element.style) {
      this.element.style.transform = `perspective(${this.settings.perspective}px) ` +
        `rotateX(0deg) ` +
        `rotateY(0deg) ` +
        `scale3d(1, 1, 1)`;
    }

    this.resetGlare();
  }

  resetGlare() {
    if (this.glare) {
      this.glareElement.style.transform = "rotate(180deg) translate(-50%, -50%)";
      this.glareElement.style.opacity = "0";
    }
  }

  updateInitialPosition() {
    if (this.settings.startX === 0 && this.settings.startY === 0) {
      return;
    }

    this.onMouseEnter();

    if (this.fullPageListening) {
      this.event = {
        clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,
        clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight
      };
    } else {
      this.event = {
        clientX: this.left + ((this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width),
        clientY: this.top + ((this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height)
      };
    }


    let backupScale = this.settings.scale;
    this.settings.scale = 1;
    this.update();
    this.settings.scale = backupScale;
    this.resetGlare();
  }

  getValues() {
    let x, y;

    if (this.fullPageListening) {
      x = this.event.clientX / this.clientWidth;
      y = this.event.clientY / this.clientHeight;
    } else {
      x = (this.event.clientX - this.left) / this.width;
      y = (this.event.clientY - this.top) / this.height;
    }

    x = Math.min(Math.max(x, 0), 1);
    y = Math.min(Math.max(y, 0), 1);

    let tiltX = (this.reverse * (this.settings.max - x * this.settings.max * 2)).toFixed(2);
    let tiltY = (this.reverse * (y * this.settings.max * 2 - this.settings.max)).toFixed(2);
    let angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);

    return {
      tiltX: tiltX,
      tiltY: tiltY,
      percentageX: x * 100,
      percentageY: y * 100,
      angle: angle
    };
  }

  updateElementPosition() {
    let rect = this.element.getBoundingClientRect();

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.left = rect.left;
    this.top = rect.top;
  }

  update() {
    let values = this.getValues();

    this.element.style.transform = "perspective(" + this.settings.perspective + "px) " +
      "rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) " +
      "rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) " +
      "scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")";

    if (this.glare) {
      this.glareElement.style.transform = `rotate(${values.angle}deg) translate(-50%, -50%)`;
      this.glareElement.style.opacity = `${values.percentageY * this.settings["max-glare"] / 100}`;
    }

    this.element.dispatchEvent(new CustomEvent("tiltChange", {
      "detail": values
    }));

    this.updateCall = null;
  }

  /**
   * Appends the glare element (if glarePrerender equals false)
   * and sets the default style
   */
  prepareGlare() {
    // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
    if (!this.glarePrerender) {
      // Create glare element
      const jsTiltGlare = document.createElement("div");
      jsTiltGlare.classList.add("js-tilt-glare");

      const jsTiltGlareInner = document.createElement("div");
      jsTiltGlareInner.classList.add("js-tilt-glare-inner");

      jsTiltGlare.appendChild(jsTiltGlareInner);
      this.element.appendChild(jsTiltGlare);
    }

    this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
    this.glareElement = this.element.querySelector(".js-tilt-glare-inner");

    if (this.glarePrerender) {
      return;
    }

    Object.assign(this.glareElementWrapper.style, {
      "position": "absolute",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%",
      "overflow": "hidden",
      "pointer-events": "none"
    });

    Object.assign(this.glareElement.style, {
      "position": "absolute",
      "top": "50%",
      "left": "50%",
      "pointer-events": "none",
      "background-image": `linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,
      "width": `${this.element.offsetWidth * 2}px`,
      "height": `${this.element.offsetWidth * 2}px`,
      "transform": "rotate(180deg) translate(-50%, -50%)",
      "transform-origin": "0% 0%",
      "opacity": "0",
    });
  }

  updateGlareSize() {
    if (this.glare) {
      Object.assign(this.glareElement.style, {
        "width": `${this.element.offsetWidth * 2}`,
        "height": `${this.element.offsetWidth * 2}`,
      });
    }
  }

  updateClientSize() {
    this.clientWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    this.clientHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
  }

  onWindowResize() {
    this.updateGlareSize();
    this.updateClientSize();
  }

  setTransition() {
    clearTimeout(this.transitionTimeout);
    this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;
    if (this.glare) this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`;

    this.transitionTimeout = setTimeout(() => {
      this.element.style.transition = "";
      if (this.glare) {
        this.glareElement.style.transition = "";
      }
    }, this.settings.speed);

  }

  /**
   * Method return patched settings of instance
   * @param {boolean} settings.reverse - reverse the tilt direction
   * @param {number} settings.max - max tilt rotation (degrees)
   * @param {startX} settings.startX - the starting tilt on the X axis, in degrees. Default: 0
   * @param {startY} settings.startY - the starting tilt on the Y axis, in degrees. Default: 0
   * @param {number} settings.perspective - Transform perspective, the lower the more extreme the tilt gets
   * @param {string} settings.easing - Easing on enter/exit
   * @param {number} settings.scale - 2 = 200%, 1.5 = 150%, etc..
   * @param {number} settings.speed - Speed of the enter/exit transition
   * @param {boolean} settings.transition - Set a transition on enter/exit
   * @param {string|null} settings.axis - What axis should be disabled. Can be X or Y
   * @param {boolean} settings.glare - What axis should be disabled. Can be X or Y
   * @param {number} settings.max-glare - the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
   * @param {boolean} settings.glare-prerender - false = VanillaTilt creates the glare elements for you, otherwise
   * @param {boolean} settings.full-page-listening - If true, parallax effect will listen to mouse move events on the whole document, not only the selected element
   * @param {string|object} settings.mouse-event-element - String selector or link to HTML-element what will be listen mouse events
   * @param {boolean} settings.reset - false = If the tilt effect has to be reset on exit
   * @param {gyroscope} settings.gyroscope - Enable tilting by deviceorientation events
   * @param {gyroscopeSensitivity} settings.gyroscopeSensitivity - Between 0 and 1 - The angle at which max tilt position is reached. 1 = 90deg, 0.5 = 45deg, etc..
   * @param {gyroscopeSamples} settings.gyroscopeSamples - How many gyroscope moves to decide the starting position.
   */
  extendSettings(settings) {
    let defaultSettings = {
      reverse: false,
      max: 15,
      startX: 0,
      startY: 0,
      perspective: 1000,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      scale: 1,
      speed: 300,
      transition: true,
      axis: null,
      glare: false,
      "max-glare": 1,
      "glare-prerender": false,
      "full-page-listening": false,
      "mouse-event-element": null,
      reset: true,
      gyroscope: true,
      gyroscopeMinAngleX: -45,
      gyroscopeMaxAngleX: 45,
      gyroscopeMinAngleY: -45,
      gyroscopeMaxAngleY: 45,
      gyroscopeSamples: 10
    };

    let newSettings = {};
    for (var property in defaultSettings) {
      if (property in settings) {
        newSettings[property] = settings[property];
      } else if (this.element.hasAttribute("data-tilt-" + property)) {
        let attribute = this.element.getAttribute("data-tilt-" + property);
        try {
          newSettings[property] = JSON.parse(attribute);
        } catch (e) {
          newSettings[property] = attribute;
        }

      } else {
        newSettings[property] = defaultSettings[property];
      }
    }

    return newSettings;
  }

  static init(elements, settings) {
    if (elements instanceof Node) {
      elements = [elements];
    }

    if (elements instanceof NodeList) {
      elements = [].slice.call(elements);
    }

    if (!(elements instanceof Array)) {
      return;
    }

    elements.forEach((element) => {
      if (!("vanillaTilt" in element)) {
        element.vanillaTilt = new VanillaTilt(element, settings);
      }
    });
  }
}

if (typeof document !== "undefined") {
  /* expose the class to window */
  window.VanillaTilt = VanillaTilt;

  /**
   * Auto load
   */
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
}

return VanillaTilt;

}());


$(document).ready(function() {
$('.mySelect').niceSelect();
});
// owl carousal
$('.owl-carousel').owlCarousel({
   loop:true,
   center:true,
   slideBy:1,
   rewind:false,
   margin:80,
   nav:true,
   responsive:{
       0:{
           items:1
       },
       768:{
           items:2
       },
       1000:{
           items:3
       }
   }
})
