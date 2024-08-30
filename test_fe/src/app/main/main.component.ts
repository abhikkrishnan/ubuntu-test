import { Component } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { error, log } from 'console';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private service:ApiCallService,private http:HttpClient){}

  name:String='';
  age:any;
  obj:any;
  user_id:Number=0;

  ngOnInit(){
  }


  get_id(){
    let param={
      name:this.name,
      age:this.age
    }
    this.service.postservice('create_user',param).subscribe((res:any)=>{
      console.log(res);
      this.user_id=res.id;
    }
    ,error=>{
      Swal.fire({
        'icon':'error',
        'text':'Error posting new user'
      });
    });

  }
}
