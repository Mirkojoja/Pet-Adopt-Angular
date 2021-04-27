import { PetsService } from 'src/app/services/pets.service';
import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/model/pet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Adoption } from 'src/app/model/adoption.model';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {
  formValidator: FormGroup;
  pet: Pet 
  newAdoption: Adoption;
  showErrorMsg: boolean = false;
  showSuccessMsg: boolean = false;

  

  constructor(private service:PetsService, private route:ActivatedRoute, 
    private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pet = new Pet
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.service.getOne(id).subscribe(data => this.pet = data);
    this.generateFormValidator()
    this.newAdoption = new Adoption()
  }
  generateFormValidator():void{
    this.formValidator = this.fb.group({
      'name': ['', Validators.required],
      'contact': ['', Validators.required]
    })
  }
  onSubmit():void{
    if(!this.formValidator.valid){
      this.showErrorMsg = true;
    }
    if(this.formValidator.valid){
      this.newAdoption.petId = this.pet._id;
      this.newAdoption.petName = this.pet.name;
      this.newAdoption.name = this.formValidator.get('name').value;
      this.newAdoption.contact = this.formValidator.get('contact').value;
      
      this.service.addAdoption(this.newAdoption).subscribe(x => {
        this.showSuccessMsg = true;
        this.formValidator.reset()
        this.router.navigate(['/adoptions']);
      }, err => {
        this.showErrorMsg = true;
      })
    }
  }

}
