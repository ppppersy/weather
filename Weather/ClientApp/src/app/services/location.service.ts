import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='
const APIKEY = 'AIzaSyCbzxibtnUXM1b8WOfglzdp4QOAeskN8mI'

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  nameToGeo(city: string) {
    var goecoder = new google.maps.Geocoder;
    return goecoder.geocode({"address": city}, function(result) {
      if(result.length !== 1) {
        alert('nameToGeo returned ' + +result.length + 'city info');
      }
      let latlng = result[0].geometry.location.toString();
      console.log(latlng);
      return latlng;
    });
  }

  geoToName(geo: [string, string]) {
    var latlng = new google.maps.LatLng(parseInt(geo[0]), parseInt(geo[1]));
    var goecoder = new  google.maps.Geocoder;
    return goecoder.geocode({"location": latlng}, function(result) {
      if(result.length !== 1) {
        alert('geoToName returned ' + +result.length + 'city info');
      }
      console.log(result[0].formatted_address);
      return result[0].formatted_address;
    })

  }

}
