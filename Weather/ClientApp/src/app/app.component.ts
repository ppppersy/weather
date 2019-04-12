import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientApp';

  constructor(private weather: WeatherService, private location: LocationService) {}

  getWeather() {
    let geoInfo = this.location.nameToGeo("Toronto, ON, Canada");
    console.log(geoInfo);
    this.weather.getWeather("currently", '43.653226', '-79.38318429999998').subscribe(res => console.log(res));
  }
}
