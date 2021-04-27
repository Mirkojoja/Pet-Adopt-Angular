import { Adoption, AdoptionList } from './../model/adoption.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Pet, PetList } from '../model/pet.model';
import { map } from 'rxjs/operators';

const url = "http://localhost:3000/api/pets"
const adoptUrl = "http://localhost:3000/api/adoptions"

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private http:HttpClient) { }

  getAll(params? :any) :Observable<PetList>{
    let queryParams = {};
    if(params){
      queryParams = {params : new HttpParams()
        .set('sort', params.sort || "")
        .set('filter', params.filter && JSON.stringify(params.filter) || "")
      }
    }
    return this.http.get(url, queryParams).pipe(map( 
      response => { return new PetList(response); }
    ));
  }
  getOne(id: number): Observable<Pet> {
    return this.http.get(url + "/" + id).pipe(map(res => {
      return new Pet(res);
    }));
  }
  addAdoption(newAdoption: Adoption): Observable<Adoption>{
    return this.http.post(`${adoptUrl}`, newAdoption).pipe(map(x => new Adoption(x)))
  }
  
  getAllAdoptions(): Observable<AdoptionList> {
    return this.http.get(adoptUrl).pipe(map(res => {
      return new AdoptionList(res);
    }));
  }
  remove(id :number) :Observable<Adoption>{
    return this.http.delete(adoptUrl + "/" + id).pipe(map(
      response => { return new Adoption(response); }
    ));
  }
}
