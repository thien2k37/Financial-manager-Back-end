import {Component, Input, OnInit} from '@angular/core';
import {TransactionService} from "../../service/transaction.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {CategoryService} from "../../service/category.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../model/category";

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  @Input() idEdit: any;

  updateTransactionForm = new FormGroup({
    time: new FormControl(),
    totalSpent: new FormControl(),
    note: new FormControl(),
  })
  transaction: any;
  transactionUpdate: any;
  category: any;
  color: string = '#E9E612';
  nameCategory: string = 'Danh mục giao dich';
  expenseCategoriesUpdate: Category[] = [];
  incomeCategoriesUpdate: Category[] = [];

  constructor(private transactionService: TransactionService,
              private categoryService: CategoryService,
              private router: Router,
              private toast: NgToastService) { }

  ngOnInit(): void {
    this.getTransaction();
    this.showExpenseCategoryUpdate();
    this.showIncomeCategoryUpdate();
  }

  showExpenseCategoryUpdate() {
    this.categoryService.findByStatus(2).subscribe((categories) => {
      this.expenseCategoriesUpdate = categories;
    }, e => {
      console.log(e);
    })
  }

  showIncomeCategoryUpdate() {
    this.categoryService.findByStatus(1).subscribe((categories) => {
      this.incomeCategoriesUpdate = categories;
    }, e => {
      console.log(e);
    })
  }

  getTransaction() {
    console.log(this.idEdit);
    this.transactionService.findById(this.idEdit).subscribe(transaction => {
      this.transaction = transaction;
      this.nameCategory = transaction.category.name;
      this.color = transaction.category.color;
      this.updateTransactionForm = new FormGroup({
        time: new FormControl(transaction.time),
        totalSpent: new FormControl(transaction.totalSpent),
        note: new FormControl(transaction.note),
      })
    })
  }

  getCategory(id: number) {
    this.categoryService.findById(id).subscribe(category => {
      this.category = category;
      this.nameCategory = category.name;
      this.color = category.color;
    })
  }

  updateTransaction() {
    this.transactionUpdate = {
      category: {
        id: this.category.id,
      },
      time: this.updateTransactionForm.value.time,
      totalSpent: this.updateTransactionForm.value.totalSpent,
      note: this.updateTransactionForm.value.note,
      wallet: {
        id: localStorage.getItem('ID_WALLET')
      }
    }
    console.log(this.transactionUpdate);
    this.transactionService.update(this.transaction.id, this.transactionUpdate).subscribe(() => {
      this.toast.success({detail: "Thông Báo", summary: "Sửa giao dịch thành công", duration: 3000, position: "br"});
      this.router.navigate(['/home']);
    }, e => {
      this.toast.error({detail: "Thông Báo", summary: "Sửa giao dịch thất bại", duration: 3000, position: "br"});
    })
  }

}
