import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Income } from "./income.model";

@Injectable({
  providedIn: "root",
})
export class IncomeService {
  // URL
  public urlIncome: string = environment.baseUrl + "v1/income/";

  // Data
  public Income: Income;
  public IncomeFiltered: Income[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Income> {
    console.log(this.urlIncome);
    console.log(body);
    return this.http.post<any>(this.urlIncome, body).pipe(
      tap((res) => {
        console.log("Income: ", res);
      })
    );
  }

  getAll(): Observable<Income[]> {
    return this.http.get<Income[]>(this.urlIncome).pipe(
      tap((res) => {
        console.log("Income: ", res);
      })
    );
  }

  getOne(id: String): Observable<Income> {
    let urlIncomeOne = this.urlIncome + id + "/";
    return this.http.get<Income>(urlIncomeOne).pipe(
      tap((res) => {
        console.log("Income: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Income> {
    let urlIncomeOne = this.urlIncome + id + "/";
    console.log(urlIncomeOne);
    console.log(body);
    return this.http.put<Income>(urlIncomeOne, body).pipe(
      tap((res) => {
        console.log("Income", res);
      })
    );
  }

  filter(field: String): Observable<Income[]> {
    let urlFilter = this.urlIncome + "?" + field;
    return this.http.get<Income[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Income", res);
      })
    );
  }
}
