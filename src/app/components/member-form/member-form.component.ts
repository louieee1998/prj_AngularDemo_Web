import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService, Member } from '../../services/member.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  member: Member = { fId: 0, fName: '', fDist: '', fGender: '' };
  isEdit = false;
  dists: SelectItem[] = [];
  genders: SelectItem[] = [];

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.memberService.getMemberById(+id).subscribe(data => {
        this.member = data;
      });
    }

    this.memberService.getGenders().subscribe(data => {
      this.genders = data.map(gender => ({ label: gender, value: gender }));
    });

    this.memberService.getDists().subscribe(data => {
      this.dists = data.map(dist => ({ label: dist, value: dist }));
    });
  }

  saveMember(): void {
    if (this.isEdit) {
      this.memberService.updateMember(this.member.fId, this.member).subscribe(() => {
        this.router.navigate(['/members']);
      });
    } else {
      this.memberService.createMember(this.member).subscribe(() => {
        this.router.navigate(['/members']);
      });
    }
  }
}
