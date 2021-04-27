import { Component, OnInit } from '@angular/core';
import { PetList } from 'src/app/model/pet.model';
import { PetsService } from 'src/app/services/pets.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  pets: PetList

  params = {
		sort: "",
		filter: {
    category: "",
    sex:""


		}
	}


  constructor(private service:PetsService) { }

  ngOnInit(): void {
    this.getAllPets()
  }
  getAllPets() {
    this.service.getAll(this.params).subscribe(res => this.pets = res);
  }

}
