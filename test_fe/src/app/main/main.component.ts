import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  name:String='';
  age:any;


  get_id(){
    let param={
      name:this.name,
      age:this.age
    }

    console.log(param);
    
  }
}
