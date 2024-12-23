import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit{
  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params["email"];
      const token = params["token"];
      const verifyData = {
        "email": email, 
        "token": token
      };
      console.log(token);
      if(token){
        this.authenticationService.verifyEmail(verifyData).subscribe({
          next: response => {
            if(response.status === 200){
              console.log('ok'); 
            } else {
              console.log(response); 
            }
          },
          error: error => {
            console.log(error); 
          }
        });
      }
    });
  }
}
