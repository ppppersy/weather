import { Injectable } from '@angular/core';
import {} from 'googlemaps';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const APIKEY =  '49a18ee5b89e4d82de0a9e79acab00a1'
const URL = 'https://api.darksky.net/forecast/';
const BLOCKS = ['currently', 'minutely', 'hourly', 'daily', 'alerts', 'flags'];

@Injectable({
  providedIn: 'root'
})



export class WeatherService {

  constructor(private http: HttpClient) { }


  getWeather(option: string, latitude: string, longitude: string): Observable<any> {
    let options = new HttpParams();
    let excludeList = BLOCKS.filter(block => block !== option);
    options.append("exclude", excludeList.toString());
    return this.http.get(URL + APIKEY + '/' + latitude + ',' + longitude, {params: options});
  }



  
}
