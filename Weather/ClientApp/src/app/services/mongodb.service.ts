import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, City } from '../user';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  constructor(private http: HttpClient) { }

  dbUrl = 'http://localhost:3000';

  getAllUsers() {
    return this.http.get(this.dbUrl + '/users');
  }

  addUser(user: User) {
    return this.http.post(this.dbUrl + '/user', user);
  }

  updateUserCity(user: User, city: City) {
    return this.http.post(this.dbUrl + '/user/' + user._id, {$addToSet: {"selectedCities": city}})
  }

}
