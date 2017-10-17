define(["libs/backbone"],
	function(Backbone) {

		return Backbone.Model.extend({
			key: 'strut.settings',

			initialize: function() {
				this.storage = this.registry.getBest('strut.StorageInterface');
				this.loadSettings();

				this.on('imgur:enable', this.enableImgur, this);
				this.on('imgur:disable', this.disableImgur, this);

				this.on('useHint:enable', this.enableHint, this);
				this.on('useHint:disable', this.disableHint, this);
			},

			enableImgur: function() {
				this.store('useImgUr', true);
			},

			disableImgur: function() {
				this.store('useImgUr', false);
			},

			enableHint: function() {
				this.store('useHint', true);
			},

			disableHint: function() {
				this.store('useHint', false);
			},

			load: function(key)
			{
				return this.loadSettings()[key];
			},

			loadSettings: function() {
				var _loadedSettings = {};
				this.storage.load(this.key, function(res) {
					_loadedSettings = res;
				});
				this.loadedSettings = _loadedSettings;
				return this.loadedSettings;
			},

			store: function(key, data) {
				if(key != null)
				{
					this.loadedSettings[key] = data;
				}
				this.storage.store(this.key, this.loadedSettings);
			},
			constructor: function SettingsModel(registry) {
				this.registry = registry;
				Backbone.Model.prototype.constructor.call(this);
			}
		});
	}
);
