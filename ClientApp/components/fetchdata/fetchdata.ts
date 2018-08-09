import Vue from "vue";
import { Component } from "vue-property-decorator";

interface IWeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

@Component
export default class FetchDataComponent extends Vue {
    forecasts: IWeatherForecast[] = [];

	mounted() {
        fetch("api/SampleData/WeatherForecasts")
            .then(response => response.json() as Promise<IWeatherForecast[]>)
            .then(data => {
                this.forecasts = data;
            });
    }
}
