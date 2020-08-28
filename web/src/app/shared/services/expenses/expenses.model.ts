export class Expenses {
  public id: string;
  public ay_id: string;
  public ay_id_app: string;
  public ay_year_number: string;
  public ay_year: string;
  public ay_generate: string;
  public ay_export: string;
  public ay_daa: string;
  public ay_total_days: string;
  public ay_prorate: string;
  public inf_cre_dt: string;
  public inf_cre_usr: string;
  public inf_mod_dt: string;
  public inf_mod_usr: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    ay_id: string,
    ay_id_app: string,
    ay_year_number: string,
    ay_year: string,
    ay_generate: string,
    ay_export: string,
    ay_daa: string,
    ay_total_days: string,
    ay_prorate: string,
    inf_cre_dt: string,
    inf_cre_usr: string,
    inf_mod_dt: string,
    inf_mod_usr: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.ay_id = ay_id;
    this.ay_id_app = ay_id_app;
    this.ay_year_number = ay_year_number;
    this.ay_year = ay_year;
    this.ay_generate = ay_generate;
    this.ay_export = ay_export;
    this.ay_daa = ay_daa;
    this.ay_total_days = ay_total_days;
    this.ay_prorate = ay_prorate;
    this.inf_cre_dt = inf_cre_dt;
    this.inf_cre_usr = inf_cre_usr;
    this.inf_mod_dt = inf_mod_dt;
    this.inf_mod_usr = inf_mod_usr;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
