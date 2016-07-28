app.filter('filterDate', function() {
	return function(input, filter) {
		if (input) {
			if (filter) {
				return input.filter(function(item) {
					return new Date(item.date).getFullYear() === new Date(filter).getFullYear() && new Date(item.date).getMonth() === new Date(filter).getMonth() && new Date(item.date).getDate() === new Date(filter).getDate();
				});
			} else {
				return input;
			}
		}
	};
});