import "./css/site.css";

import Vue from "vue";
import VueRouter from "vue-router";

var toastr = require("toastr/toastr");
toastr.options = {
	closeButton: true,
	debug: false,
	newestOnTop: true,
	progressBar: true,
	positionClass: "toast-top-full-width",
	preventDuplicates: true,
	showDuration: "300",
	hideDuration: "1000",
	timeOut: "5000",
	extendedTimeOut: "1000",
	showEasing: "swing",
	hideEasing: "linear",
	showMethod: "fadeIn",
	hideMethod: "fadeOut"
}

/*var toastrPlugin = require("./plugins/toast");
Vue.use(toastrPlugin);*/

/*var toastr = require("vue-toastr");
require("vue-toastr/dist/vue-toastr.css");
Vue.use(toastr);
Vue.prototype.$toastr = toastr;*/
//console.log(toastr);
//Vue.component('vue-toastr', toastr);

import "bootstrap";

Vue.use((VueRouter) as any);

const routes = [
    { path: "/", component: require("./components/home/home.vue.html").default },
    { path: "/counter", component: require("./components/counter/counter.vue.html").default },
    { path: "/fetchdata", component: require("./components/fetchdata/fetchdata.vue.html").default },
	{ path: "/toast", component: require("./components/toast/toast.vue.html").default },
    { path: "/todos", component: require("./components/todos/todos.vue.html").default },
];

var vm = new Vue({
	el: "#app-root",
	router: new VueRouter({ mode: "history", routes: routes }),
	render: h => h(require("./components/app/app.vue.html").default),
	
});