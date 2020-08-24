export class Expenses {
  public id: string;
  public name: string;
  public amount: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    amount: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
