import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: '會員列表', routerLink: '/members' },
      { label: '新增會員', routerLink: '/members/new' }
    ];
  }
}
