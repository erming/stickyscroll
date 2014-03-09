(function($) {

var append = $.fn.append;
$.fn.append = function() {
	return append.apply(this, arguments).trigger("append");
};

$.fn.sticky = function() {
	var target = $(this);
	var sticky = false;

	target.on("scroll", function() {
		sticky = target.isScrollAtBottom();
	});
	target.trigger("scroll");
	target.on("append", function() {
		if (sticky) {
			target.scrollToBottom();
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
