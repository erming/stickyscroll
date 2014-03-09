(function($) {
	var append = $.fn.append;
	$.fn.append = function() {
		return append.apply(this, arguments).trigger("append");
	};

	$.fn.sticky = function() {
		var self = this;
		if (self.size() > 1) {
			return self.each(function() { $(this).sticky(); });
		}

		var sticky = false;
		self.on("scroll", function() {
			sticky = self.isScrollAtBottom();
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
		this.scrollTop(this.prop("scrollHeight"));
	};

	$.fn.isScrollAtBottom = function() {
		if ((this.scrollTop() + this.outerHeight()) >= this.prop("scrollHeight")) {
			return true;
		}
	};
})(jQuery);
