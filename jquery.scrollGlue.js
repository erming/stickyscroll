/*!
 * scrollGlue
 * https://github.com/erming/scrollGlue
 *
 * Copyright (c) 2014 Mattias Erming <mattias@mattiaserming.com>
 * Licensed under the MIT License.
 *
 * Version 1.0.1
 */
(function($) {
	$.fn.scrollGlue = function(options) {
		var settings = $.extend({
			speed: 0,
			scrollToBottom: true,
		}, options);

		var self = this;
		if (self.size() > 1) {
			return self.each(function() {
				$(this).scrollGlue(options);
			});
		}
		
		if (settings.scrollToBottom) {
			self.scrollToBottom();
		}

		$(window).on('resize', function() {
			self.finish();
		});

		var sticky = false;
		self.on('scroll', function() {
			sticky = self.isScrollAtBottom();
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

	var html = $.fn.html;
	$.fn.html = function(string) {
		var result = html.apply(this, arguments);
		if (typeof string !== 'undefined') {
			this.trigger('append');
		}
		return result;
	};
	
	$.fn.scrollToBottom = function(speed) {
		return this.each(function() {
			$(this).finish().animate({scrollTop: this.scrollHeight}, speed || 0);
		});
	};

	$.fn.isScrollAtBottom = function() {
		if ((this.scrollTop() + this.outerHeight() + 1) >= this.prop('scrollHeight')) {
			return true;
		}
	};
})(jQuery);
