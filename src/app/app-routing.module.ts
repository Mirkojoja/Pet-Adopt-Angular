import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdoptionListComponent } from './adoptions/adoption-list/adoption-list.component';
import { HomeComponent } from './core/home/home.component';
import { PetDetailsComponent } from './pets/pet-details/pet-details.component';
import { PetListComponent } from './pets/pet-list/pet-list.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "pets", component: PetListComponent },
  { path: "pets/:id", component: PetDetailsComponent },
  { path: "adoptions", component: AdoptionListComponent },
  { path: "", redirectTo: "/home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
