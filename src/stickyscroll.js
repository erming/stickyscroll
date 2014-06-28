/*!
 * stickyscroll
 * https://github.com/erming/stickyscroll
 * v2.0.0
 */
(function($) {
	$.fn.sticky = function() {
		var self = this;
		if (self.size() > 1) {
			return self.each(function() {
				$(this).sticky(options);
			});
		}

		self.data("sticky", true);
		if (self.css("overflow-y") == "visible") {
			self.css("overflow-y", "auto");
		}
	};

	$.fn.scrollBottom = function() {
		return this.each(function() {
			$(this).animate({scrollTop: this.scrollHeight}, 0);
		});
	};

	function isScrollBottom() {
		if ((this.scrollTop() + this.outerHeight() + 1) >= this.prop('scrollHeight')) {
			return true;
		}
	};

	var append = $.fn.append;
	$.fn.append = function() {
		var scroll = false;
		var sticky = this.data("sticky");
		if (sticky && isScrollBottom.call(this)) {
			scroll = true;
		}
		append.apply(this, arguments);
		if (scroll) {
			this.scrollBottom();
		}
		return this;
	};
})(jQuery);
