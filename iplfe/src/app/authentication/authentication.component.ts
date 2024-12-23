import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit{
  signUp = false; 

  signUpSuccessfull = false; 
  signUpError = false; 
  signUpErrorMessage = ''; 

  signInSuccessfull = false; 
  signInError = false; 
  signInErrorMessage = '';

  signUpFormGroup: FormGroup; 
  signInFormGroup: FormGroup; 

  teamName: string = ''; 
  isLoggedIn = false; 
  isVerified = false; 

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService){
    this.signInFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.signUpFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], 
      teamname: ['', [Validators.required, Validators.minLength(5)]], 
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authenticationService.authData$.subscribe(authData => {
      this.signInSuccessfull = authData !== null; 
      this.teamName = this.authenticationService.getTeamNameFromToken(authData);
      this.isLoggedIn = true; 
      this.isVerified = this.authenticationService.getIsVerifiedFromToken(authData);
      console.log(this.isVerified);
    });
  }

  onSignIn(){
    this.signInError = false; 
    this.signInErrorMessage = ''; 

    this.authenticationService.signIn(this.signInFormGroup.value).subscribe(
      result => {
        if(result.status){
          console.log(result.message); 
          this.signInFormGroup.reset(); 
        }
        else{
          this.signInError = true; 
          this.signInErrorMessage = result.message; 
        }
      }
    );
  }

  onSignUp(){
    this.signUpSuccessfull = false; 
    this.signUpError = false; 
    this.signUpErrorMessage = ''; 

    //Check if passwords match
    if(this.signUpFormGroup.get('password')?.value !== this.signUpFormGroup.get('confirmpassword')?.value){
      this.signUpError = true; 
      this.signUpErrorMessage = 'Password does not match!'; 
      return; 
    }

    this.authenticationService.singUp(this.signUpFormGroup.value).subscribe(
      result => {
        if(result.status){
          this.signUpSuccessfull = true; 
          this.signUpFormGroup.reset(); 
        }else{
          this.signUpError = true; 
          this.signUpErrorMessage = result.message; 
        }
      }
    );
  }

  logOut(){
    this.authenticationService.logout(); 
  }

  switchSign(signUp: boolean){
    this.signUpFormGroup.reset(); 
    this.signInFormGroup.reset();
    this.signUpSuccessfull = false; 
    this.signUpError = false; 
    this.signUpErrorMessage = ''; 
    this.signInError = false; 
    this.signInErrorMessage = ''; 
    this.signUp = signUp; 
  }
}
