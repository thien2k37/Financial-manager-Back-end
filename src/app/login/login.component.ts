import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";
import {first} from "rxjs";
import {NgToastService} from "ng-angular-popup";
import {UserService} from "../service/user.service";
import {WalletService} from "../service/wallet.service";
import {Wallet} from "../model/wallet";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  wallets: Wallet[] = [];

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private activatedRoute : ActivatedRoute, private router : Router,
              private authenticationService : AuthenticationService,
              private toast : NgToastService,
              private userService: UserService,
              private walletService: WalletService) { }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(first()).subscribe(data => {
      localStorage.setItem('ACCESS_TOKEN', data.accessToken);
      localStorage.setItem('ROLE', data.roles[0].authority);
      localStorage.setItem('USERNAME', data.username);
      localStorage.setItem('PASS', this.loginForm.value.password);
      localStorage.setItem('ID', data.id);
      if (data.roles[0].authority == "ROLE_USER") {
        this.userService.findById(localStorage.getItem('ID')).subscribe( (data)=>{
          localStorage.setItem('AVATAR', data.avatar);
          this.toast.success({detail:"Thông báo", summary: "Đăng nhập thành công!",duration: 3000,position:'br'});
          this.router.navigateByUrl('/home').then();
          this.walletService.findAll().subscribe((wallets) => {
            this.wallets = wallets;
            for (let i = 0; i < this.wallets.length; i++) {
              if (this.wallets[i].status == 2) {
                localStorage.setItem('ID_WALLET',String(this.wallets[i].id));
              }
            }
            location.reload();
          })
        })
      }
    }, error => {
      this.toast.error({detail:"Thông báo", summary: "Sai tài khoản hoặc mật khẩu!",duration: 3000,position:'br'})
      this.router.navigate(['/']).then();
    })
  }
}
