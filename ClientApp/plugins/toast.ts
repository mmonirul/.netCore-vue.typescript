import Vue from "vue";

var toastr = require("toastr/toastr");

toastr.options.progressBar = true;
toastr.options.preventDuplicates = true;
toastr.options.escapeHtml = true;

/*// This is your plugin object. It can be exported to be used anywhere.
const toastPlugin = {
	// The install method is all that needs to exist on the plugin object.
	// It takes the global Vue object as well as user-defined options.
	install(vue: typeof Vue) {
		// We call Vue.mixin() here to inject functionality into all components.
		vue.mixin({
			// Anything added to a mixin will be injected into all components.
			// In this case, the mounted() method runs when the component is added to the DOM.
			mounted() {
				console.log("Mounted!");
				console.log(this);
			}
		});

		console.log("Toastr prototype");
		console.log(toastr);
		vue.prototype.$toastr = toastr;
	}
};

export default toastPlugin;*/

declare module "vue/types/vue" {
	export interface Vue {
		$toastr: any;
	}
}

export default class ToastPlugin {
	static install(vue: typeof Vue, options = {}) {
		Object.defineProperty(Vue.prototype, "$toastr", { value: toastr } );
	}
}