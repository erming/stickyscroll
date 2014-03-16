(function($) {
	var append = $.fn.append;
	$.fn.append = function() {
		return append.apply(this, arguments).trigger("append");
	};

	$.fn.sticky = function() {
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
		self.on("append", function() {
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
