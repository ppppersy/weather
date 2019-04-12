import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { MongodbService } from '../services/mongodb.service';
import { LocationService } from '../services/location.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { } from 'googlemaps';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit, AfterViewInit {

  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;

  constructor(
    private mongo: MongodbService,
    private location: LocationService) { }

  ngOnInit() {
    window.navigator.geolocation.getCurrentPosition(position => console.log(position));
    this.location.nameToGeo('toronto, on, canada');
    this.mongo.getAllUsers().subscribe(res => console.log(res));
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        // componentRestrictions: { country: 'US' },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }

}
