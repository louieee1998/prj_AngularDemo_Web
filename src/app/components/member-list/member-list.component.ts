import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService, Member } from '../../services/member.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  totalRecords: number = 0;
  pageSize: number = 5;
  pageNumber: number = 1;
  searchName: string = '';
  first: number = 0;

  constructor(private memberService: MemberService, public router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadMembers();
  }

  loadMembers(event?: any): void {
    if (event) {
      this.pageNumber = event.first / event.rows + 1;
      this.pageSize = event.rows;
    }

    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(data => {
      this.members = data;
      this.totalRecords = 100;  // 假設總記錄數是100，你可以根據需要進行調整
    });
  }

  search(): void {
    this.memberService.searchMembers(this.searchName, this.pageNumber, this.pageSize).subscribe(data => {
      this.members = data;
      this.totalRecords = data.length;  // 確保總記錄數正確獲取
    });
  }

  deleteMember(id: number): void {
    this.memberService.deleteMember(id).subscribe(() => {
      this.loadMembers();
    });
  }

  editMember(id: number): void {
    this.router.navigate([`/members/edit/${id}`]);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.pageSize = event.rows;
    this.loadMembers(event);
  }
}
