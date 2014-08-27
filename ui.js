module.exports = function (config) {
    var self = this;

    // adding homescreen icon and meta
    var link = document.createElement('link');
	link.href = config.icon;
	link.rel = 'shortcut icon';
	$(link).attr('sizes', '196x196');

	var linkApple = document.createElement('link');
	linkApple.href = config.icon;
	linkApple.rel = 'apple-touch-icon';

	var meta = document.createElement('meta');
	for (var prop in config.meta) {
		meta[prop] = config.meta[prop];
	}

    $("head").append(link).append(linkApple).append(meta);

    var device;

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)) {
        device = "ios";
    } else {
    	device = "other";
    }

    if (config.selectors[device] && window.localStorage.getItem("notification") === null) {
    	$(config.selectors[device]).show();
    	$(self.dom).parent().show();
    	$(self.dom).parent().on('click', function () {
        	$(this).hide();
        	window.localStorage.setItem("notification", false);
    	});
    }
}

