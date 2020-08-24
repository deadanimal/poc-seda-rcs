import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Expenses } from "./expenses.model";

@Injectable({
  providedIn: "root",
})
export class ExpensesService {
  // URL
  public urlExpenses: string = environment.baseUrl + "v1/expenses/";

  // Data
  public Expenses: Expenses;
  public ExpensesFiltered: Expenses[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Expenses> {
    console.log(this.urlExpenses);
    console.log(body);
    return this.http.post<any>(this.urlExpenses, body).pipe(
      tap((res) => {
        console.log("Expenses: ", res);
      })
    );
  }

  getAll(): Observable<Expenses[]> {
    return this.http.get<Expenses[]>(this.urlExpenses).pipe(
      tap((res) => {
        console.log("Expenses: ", res);
      })
    );
  }

  getOne(id: String): Observable<Expenses> {
    let urlExpensesOne = this.urlExpenses + id + "/";
    return this.http.get<Expenses>(urlExpensesOne).pipe(
      tap((res) => {
        console.log("Expenses: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Expenses> {
    let urlExpensesOne = this.urlExpenses + id + "/";
    console.log(urlExpensesOne);
    console.log(body);
    return this.http.put<Expenses>(urlExpensesOne, body).pipe(
      tap((res) => {
        console.log("Expenses", res);
      })
    );
  }

  filter(field: String): Observable<Expenses[]> {
    let urlFilter = this.urlExpenses + "?" + field;
    return this.http.get<Expenses[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Expenses", res);
      })
    );
  }
}
