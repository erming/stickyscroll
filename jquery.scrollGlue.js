/*!
 * scrollGlue
 * https://github.com/erming/scrollGlue
 *
 * Copyright (c) 2014 Mattias Erming <mattias@mattiaserming.com>
 * Licensed under the MIT License.
 *
 * Version 1.1.0
 */
(function($) {
	$.fn.scrollGlue = function(options) {
		var settings = $.extend({
			disableManualScroll: false,
			overflow: 'scroll',
			scrollToBottom: true,
			speed: 0
		}, options);

		var self = this;
		if (self.size() > 1) {
			return self.each(function() {
				$(this).scrollGlue(options);
			});
		}
		
		self.css('overflow-y', settings.overflow);
		if (settings.scrollToBottom) {
			self.scrollToBottom();
		}

		var timer;
		var resizing = false;
		$(window).on('resize', function() {
			self.finish();
			
			// This will prevent the scroll event from triggering
			// while resizing the browser.
			resizing = true;
			
			clearTimeout(timer);
			timer = setTimeout(function() {
				resizing = false;
			}, 100);
			
			if (sticky) {
				self.scrollToBottom();
			}
		});

		var sticky = true;
		self.on('scroll', function() {
			if (settings.disableManualScroll) {
				self.scrollToBottom();
			} else if (!resizing) {
				sticky = self.isScrollAtBottom();
			}
		});
		self.trigger('scroll');
		self.on('append', function() {
			if (sticky) {
				self.scrollToBottom(settings.speed);
			}
		});

		return this;
	};

	var prepend = $.fn.prepend;
	$.fn.prepend = function() {
		return prepend.apply(this, arguments).trigger('append');
	};
	
	var append = $.fn.append;
	$.fn.append = function() {
		return append.apply(this, arguments).trigger('append');
	};
	
	$.extend($.fn, {
		scrollToBottom: function(speed) {
			return this.each(function() {
				$(this).finish().animate({scrollTop: this.scrollHeight}, speed || 0);
			});
		},
		isScrollAtBottom: function() {
			if ((this.scrollTop() + this.outerHeight() + 1) >= this.prop('scrollHeight')) {
				return true;
			}
		}
	});
})(jQuery);
