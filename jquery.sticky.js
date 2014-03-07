(function($) {

var defaults = {
	onAppend: true,
	onChange: true,
};

$.fn.sticky = function(options, callback) {
	var settings = $.extend(
		defaults,
		options
	);
	if (typeof callback === "function") {
		callback();
	}
	return this;
};

})(jQuery);
