import { Adoption, AdoptionList } from './../../model/adoption.model';
import { PetsService } from 'src/app/services/pets.service';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrls: ['./adoption-list.component.css']
})
export class AdoptionListComponent implements OnInit {
  @Input()
  adoption: Adoption[]
  adoptions: AdoptionList = new AdoptionList() 

  constructor(private service: PetsService) { }


  ngOnInit(): void {
    this.getAll()
  
  }
  
  getAll() {
    this.service.getAllAdoptions().subscribe(data => {
      this.adoptions = data;
  })
  }
  
  removeAdoption(id: number) {
      this.service.remove(id).subscribe(x => {
        this.getAll();
      })
    }
  }
  
