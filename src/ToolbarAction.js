L.ToolbarAction = L.Class.extend({
	
	options: {
		className: '',
		html: ''
	},

	initialize: function(action, options) {
		L.setOptions(this, options);

		this._action = action;
	},

	onAdd: function() {

	},

	onRemove: function() {

	},

	trigger: function() {
		this._action();
	}

});