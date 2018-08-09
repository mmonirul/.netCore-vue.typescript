import Vue from "vue";
import $ from "jquery";
import { Component, Prop } from "vue-property-decorator";

var toastr = require("toastr/toastr");

interface IToastrSettings {
	title: string;
	message: string;

	closeButton: boolean;
	debug: boolean;
	progressBar: boolean;
	preventDuplicates: boolean;
	newestOnTop: boolean;

	toastType: string;
	positionClass: string;

	showEasing: string;
	hideEasing: string;
	showMethod: string;
	hideMethod: string;

	showDuration: number;
	hideDuration: number;
	timeOut: number;
	extendedTimeOut: number;
}

@Component
export default class ToastComponent extends Vue {
	options: IToastrSettings;
	messages: string[];
	test: string;

	components: {
	}

	data() {
		return {
			options: {}
		};
	}

	created() {
		//console.log(toastr);
	}

	mounted() {
		//console.log("toast mounted");
		this.testToastr();

		this.initialize();
	}

	initialize() {
		this.messages = [
			"My name is Inigo Montoya. You killed my father. Prepare to die!",
			"Are you the six fingered man?",
			"Inconceivable!",
			"I do not think that means what you think it means.",
			"Have fun storming the castle!"
		];

		const defaultOptions = toastr.options;
		//console.log(defaultOptions);

		this.options = (({
			title: "",
			message: "",

			closeButton: defaultOptions.closeButton,
			debug: defaultOptions.debug,
			progressBar: defaultOptions.progressBar,
			preventDuplicates: defaultOptions.preventDuplicates,
			newestOnTop: defaultOptions.newestOnTop,

			toastType: "success",
			positionClass: defaultOptions.positionClass,

			showEasing: defaultOptions.showEasing,
			hideEasing: defaultOptions.hideEasing,
			showMethod: defaultOptions.showMethod,
			hideMethod: defaultOptions.hideMethod,

			showDuration: defaultOptions.showDuration,
			hideDuration: defaultOptions.hideDuration,
			timeOut: defaultOptions.timeOut,
			extendedTimeOut: defaultOptions.extendedTimeOut,
		}) as IToastrSettings);

		//console.log(this.options);
	}

	private testToastr() {
		//console.log("toastr triggered");
		toastr.info("Test message");
	}

	private getMessage() {
		//console.log(Math.random());
		return this.messages[Math.floor(Math.random() * this.messages.length)];
	}

	showToast() {
		toastr.options = {
			closeButton: this.options.closeButton,
			debug: this.options.debug,
			progressBar: this.options.progressBar,
			preventDuplicates: this.options.preventDuplicates,
			newestOnTop: this.options.newestOnTop,

			positionClass: this.options.positionClass,

			showEasing: this.options.showEasing,
			hideEasing: this.options.hideEasing,
			showMethod: this.options.showMethod,
			hideMethod: this.options.hideMethod,

			showDuration: this.options.showDuration,
			hideDuration: this.options.hideDuration,
			extendedTimeOut: this.options.extendedTimeOut,
		};
		//console.log(toastr.options);

		if (this.options.message === "") {
			this.options.message = this.getMessage();
		}

		switch (this.options.toastType) {
			case "success":
				toastr.success(this.options.message, this.options.title);
				break;
			case "info":
				toastr.info(this.options.message, this.options.title);
				break;
			case "warning":
				toastr.warning(this.options.message, this.options.title);
				break;
			case "error":
				toastr.error(this.options.message, this.options.title);
				break;
			default:
				console.log("unknown type: " + this.options.toastType);
		}
	}

	clearToasts() {
		toastr.clear();

		this.options.title = "";
		this.options.message = "";
	}

	clearLastToast() {
		$(".close-toastr").closest(".toast").remove();
	}
}