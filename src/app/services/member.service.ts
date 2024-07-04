import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Member {
  fId: number;
  fName: string;
  fDist: string;
  fGender: string;
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'https://localhost:7127/api/Members'; // 替換為您的 API URL

  constructor(private http: HttpClient) {}

  getMembers(pageNumber: number, pageSize: number): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  searchMembers(name: string, pageNumber: number, pageSize: number): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/search?name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  createMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, member);
  }

  updateMember(id: number, member: Member): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, member);
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getGenders(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/gender`);
  }

  getDists(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/dist`);
  }
}
