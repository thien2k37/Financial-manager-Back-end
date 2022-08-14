import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  isLogin = false;
  idUser = localStorage.getItem('ID');
  idWallet = localStorage.getItem("ID_WALLET")
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    // localStorage.clear();
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ROLE');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('PASS');
    localStorage.removeItem('ID');
    localStorage.removeItem('ID_WALLET');
    this.isLogin = false;
    this.router.navigate(['/']).then();
  }
}
