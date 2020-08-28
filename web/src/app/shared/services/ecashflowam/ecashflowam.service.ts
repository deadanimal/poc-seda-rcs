import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Ecashflowam } from "./ecashflowam.model";

@Injectable({
  providedIn: "root",
})
export class EcashflowamService {
  // URL
  public urlEcashflowam: string = environment.baseUrl + "v1/ecashflowam/";

  // Data
  public Ecashflowam: Ecashflowam;
  public Ecashflowams: Ecashflowam[] = [];
  public EcashflowamsFiltered: Ecashflowam[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Ecashflowam> {
    console.log(this.urlEcashflowam);
    console.log(body);
    return this.http.post<any>(this.urlEcashflowam, body).pipe(
      tap((res) => {
        console.log("Ecashflowams: ", res);
      })
    );
  }

  getAll(): Observable<Ecashflowam[]> {
    return this.http.get<Ecashflowam[]>(this.urlEcashflowam).pipe(
      tap((res) => {
        console.log("Ecashflowams: ", res);
      })
    );
  }

  getOne(id: String): Observable<Ecashflowam> {
    let urlEcashflowamOne = this.urlEcashflowam + id + "/";
    return this.http.get<Ecashflowam>(urlEcashflowamOne).pipe(
      tap((res) => {
        console.log("Ecashflowam: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Ecashflowam> {
    let urlEcashflowamOne = this.urlEcashflowam + id + "/";
    console.log(urlEcashflowamOne);
    console.log(body);
    return this.http.put<Ecashflowam>(urlEcashflowamOne, body).pipe(
      tap((res) => {
        console.log("Ecashflowam", res);
      })
    );
  }

  filter(field: String): Observable<Ecashflowam[]> {
    let urlFilter = this.urlEcashflowam + "?" + field;
    console.log(urlFilter);
    return this.http.get<Ecashflowam[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Ecashflowams", res);
      })
    );
  }
}
