/*!
 * jquery-scroll-glue
 * https://github.com/erming/jquery-scroll-glue
 *
 * Copyright 2014 Mattias Erming <mattias@mattiaserming.com>
 * MIT License
 */

(function($) {
	var append = $.fn.append;
	$.fn.append = function() {
		return append.apply(this, arguments).trigger("append");
	};

	var html = $.fn.html;
	$.fn.html = function() {
		var result = html.apply(this, arguments);
		if (arguments.length) {
			// Only trigger this event when something
			// has been inserted.
			this.trigger("html");
		}
		return result;
	};

	$.fn.scrollGlue = function() {
		var self = this;
		if (self.size() > 1) {
			return self.each(function() {
				$(this).sticky();
			});
		}

		var timer;
		var resizing = false;
		$(window).on("resize", function() {
			// This will prevent the scroll event from triggering
			// while resizing the window.
			resizing = true;

			clearTimeout(timer);
			timer = setTimeout(function() {
				resizing = false;
			}, 100);

			if (sticky) {
				self.scrollToBottom();
			}
		});

		var sticky = false;
		self.on("scroll", function() {
			if (!resizing) {
				sticky = self.isScrollAtBottom();
			}
		});
		self.trigger("scroll");
		self.on("append html", function() {
			if (sticky) {
				self.scrollToBottom();
			}
		});

		return this;
	};

	$.fn.scrollToBottom = function() {
		return this.each(function() {
			this.scrollTop = this.scrollHeight;
		});
	};

	$.fn.isScrollAtBottom = function() {
		if ((this.scrollTop() + this.outerHeight() + 1) >= this.prop("scrollHeight")) {
			return true;
		}
	};
})(jQuery);
