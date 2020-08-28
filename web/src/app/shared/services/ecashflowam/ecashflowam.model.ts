export class Ecashflowam {
  public id: string;
  public am_id: string;
  public re_type: string;
  public re_type_text: string;
  public am_ref_number: string;
  public am_tariff: string;
  public am_date_fitcd: string;
  public am_application_status: string;
  public es_description: string;
  public district: string;
  public state: string;
  public am_state: string;
  public am_district: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    am_id: string,
    re_type: string,
    re_type_text: string,
    am_ref_number: string,
    am_tariff: string,
    am_date_fitcd: string,
    am_application_status: string,
    es_description: string,
    district: string,
    state: string,
    am_state: string,
    am_district: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.am_id = am_id;
    this.re_type = re_type;
    this.re_type_text = re_type_text;
    this.am_ref_number = am_ref_number;
    this.am_tariff = am_tariff;
    this.am_date_fitcd = am_date_fitcd;
    this.am_application_status = am_application_status;
    this.es_description = es_description;
    this.district = district;
    this.state = state;
    this.am_state = am_state;
    this.am_district = am_district;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
