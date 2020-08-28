import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from "@angular/core";
import * as moment from "moment";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

//
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import swal from "sweetalert2";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { NotifyService } from "src/app/shared/handler/notify/notify.service";
import { Router, ActivatedRoute } from "@angular/router";

import { Income } from "src/app/shared/services/income/income.model";
import { IncomeService } from "src/app/shared/services/income/income.service";

import { Project } from "src/app/shared/services/project/project.model";
import { ProjectService } from "src/app/shared/services/project/project.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-fail",
  templateUrl: "./fail.component.html",
  styleUrls: ["./fail.component.scss"],
})
export class FailComponent implements OnInit, OnDestroy {
  // Chart
  chart: any;

  // Datepicker
  bsDPConfig = {
    isAnimated: true,
    containerClass: "theme-default",
  };

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // Data
  public datas: any = [];

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: Income[] = [];
  SelectionType = SelectionType;
  listIncome: any;
  listProject: any;
  modaldata: any;

  // Form
  searchForm: FormGroup;
  searchField: FormGroup;
  createIncomeDetailsForm: FormGroup;
  editIncomeDetailsForm: FormGroup;

  constructor(
    private incomeData: IncomeService,
    private projectData: ProjectService,
    private notifyService: NotifyService,
    private zone: NgZone,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loadingBar: LoadingBarService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    // this.getData();

    this.incomeData.getAll().subscribe((res) => {
      this.listIncome = res;
      this.tableRows = [...res];

      console.log("fail = ", this.listIncome);
      // this.listLicense = this.tableRows.map((proßp, key) => {
      //   // console.log("test =>", prop, key);
      //   return {
      //     ...prop,
      //     // id: key,
      //   };
      // });
    });

    this.projectData.getAll().subscribe((res) => {
      this.listProject = res;
      console.log("project = ", this.listProject);
    });
  }

  ngOnInit() {
    this.getCharts();

    this.createIncomeDetailsForm = this.formBuilder.group({
      ay_id: new FormControl(""),
      ay_id_app: new FormControl(""),
      ay_year_number: new FormControl(""),
      ay_year: new FormControl(""),
      ay_generate: new FormControl(""),
      ay_export: new FormControl(""),
      ay_daa: new FormControl(""),
      ay_total_days: new FormControl(""),
      ay_actual_year: new FormControl(""),
      ay_actual_generate: new FormControl(""),
      ay_actual_export: new FormControl(""),
      ay_prorate: new FormControl(""),
      ay_date: new FormControl(""),
      inf_cre_dt: new FormControl(""),
      inf_cre_usr: new FormControl(""),
      inf_mod_dt: new FormControl(""),
      inf_mod_usr: new FormControl(""),
    });

    this.editIncomeDetailsForm = this.formBuilder.group({
      id: new FormControl(""),
      ay_id: new FormControl(""),
      ay_id_app: new FormControl(""),
      ay_year_number: new FormControl(""),
      ay_year: new FormControl(""),
      ay_generate: new FormControl(""),
      ay_export: new FormControl(""),
      ay_daa: new FormControl(""),
      ay_total_days: new FormControl(""),
      ay_actual_year: new FormControl(""),
      ay_actual_generate: new FormControl(""),
      ay_actual_export: new FormControl(""),
      ay_prorate: new FormControl(""),
      ay_date: new FormControl(""),
      inf_cre_dt: new FormControl(""),
      inf_cre_usr: new FormControl(""),
      inf_mod_dt: new FormControl(""),
      inf_mod_usr: new FormControl(""),
    });
  }

  onImageChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createIncomeDetailsForm.get("image").setValue(file);
    }
  }

  onDocumentChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createIncomeDetailsForm.get("document").setValue(file);
    }
  }

  // onImageChange2(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.createIncomeDetailsForm.get("image").setValue(file);
  //   }
  // }

  // onDocumentChange2(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.createIncomeDetailsForm.get("document").setValue(file);
  //   }
  // }

  createDetailsFail() {
    console.log(this.createIncomeDetailsForm);
    this.loadingBar.start();

    // const formData = new FormData();
    // formData.append("name", this.createIncomeDetailsForm.get("name").value);
    // formData.append("image", this.createIncomeDetailsForm.get("image").value);
    // formData.append(
    //   "document",
    //   this.createIncomeDetailsForm.get("document").value
    // );

    this.incomeData.create(this.createIncomeDetailsForm.value).subscribe(
      () => {
        // Success
        // this.isLoading = false
        // this.successMessage();
        this.loadingBar.complete();
        this.successAlert("create Fail");
        window.location.reload();
      },
      () => {
        // Failed
        // this.isLoading = false
        // this.successMessage();
        this.errorAlert("edit");
      },
      () => {
        // After
        // this.notifyService.openToastr("Success", "Welcome back");
        // this.navigateHomePage();
      }
    );
  }

  editDetailsFail() {
    // console.log("qqqq");
    this.loadingBar.start();
    this.incomeData
      .update(
        this.editIncomeDetailsForm.value.id,
        this.editIncomeDetailsForm.value
      )
      .subscribe(
        () => {
          // Success
          // this.isLoading = false
          // this.successMessage();
          this.loadingBar.complete();
          this.successAlert("edit Fail");
          console.log("asdasdasdsad");
          window.location.reload();
        },
        () => {
          // Failed
          // this.isLoading = false
          // this.successMessage();
          this.errorAlert("edit");
        },
        () => {
          // After
          // this.notifyService.openToastr("Success", "Welcome back");
          // this.navigateHomePage();
        }
      );
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  openModal(modalRef: TemplateRef<any>, row) {
    if (row) {
      console.log(row);
      this.editIncomeDetailsForm.patchValue(row);
      console.log(this.editIncomeDetailsForm.value);
    }
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: "gray modal-lg" })
    );
    this.modaldata = row;
    // console.log(this.modaldata);
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.editIncomeDetailsForm.reset();
  }

  navigatePage(path: String, id) {
    // let qq = "db17a36a-1da6-4919-9746-dfed8802ec9d";
    console.log(id);
    console.log(path + "/" + id);
    if (path == "/admin/fail-details") {
      return this.router.navigate([path, id]);
    }
  }

  errorAlert(task) {
    swal.fire({
      title: "Error",
      text: "Cannot " + task + " Action, Please Try Again!",
      type: "error",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-danger",
      confirmButtonText: "Close",
    });
  }

  successAlert(task) {
    swal.fire({
      title: "Success",
      text: "Successfully " + task,
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success",
      confirmButtonText: "Close",
    });
  }

  confirm() {
    swal
      .fire({
        title: "Confirmation",
        text: "Are you sure to delete data?",
        type: "info",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Cancel",
      })
      .then((task) => {
        // if (result.value) {
        this.successAlert("delete data");
        // }
      });
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  getCharts() {
    this.zone.runOutsideAngular(() => {
      // this.getChart();
      // this.getChart1();
      // this.getChart2();
      this.getChart3();
      this.getChart4();
      // this.getChart5();
      // this.getChart6();
    });
  }

  getChart3() {
    // chatt petak warna warni
    let chart = am4core.create("chartfail3", am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        country: "Jan",
        visits: 3025,
      },
      {
        country: "Feb",
        visits: 1882,
      },
      {
        country: "Mar",
        visits: 1809,
      },
      {
        country: "Apr",
        visits: 1322,
      },
      {
        country: "May",
        visits: 1122,
      },
      {
        country: "Jun",
        visits: 1114,
      },
      {
        country: "July",
        visits: 984,
      },
      {
        country: "Aug",
        visits: 711,
      },
      {
        country: "Sep",
        visits: 665,
      },
      {
        country: "Oct",
        visits: 580,
      },
      {
        country: "Nov",
        visits: 443,
      },
      {
        country: "Dec",
        visits: 441,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    // categoryAxis.renderer.minHeight = 110;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

    // this.chart2 = chart;
  }

  getChart4() {
    // chart 2 line
    // let chart = am4core.create("chartReceipt", am4charts.XYChart);
    // Create chart instance
    let chart = am4core.create("chartfail4", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        country: "PAHANG",
        litres: 501.9,
      },
      {
        country: "JOHOR",
        litres: 301.9,
      },
      {
        country: "NEGERI SEMBILAN",
        litres: 201.1,
      },
      {
        country: "SELANGOR",
        litres: 165.8,
      },
      {
        country: "PERAK",
        litres: 139.9,
      },
      {
        country: "SABAH",
        litres: 128.3,
      },
      {
        country: "KELANTAN",
        litres: 99,
      },
      {
        country: "MELAKA",
        litres: 60,
      },
      {
        country: "PULAU PINANG",
        litres: 50,
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    /// change pie size
    pieSeries.radius = 85;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
  }

  getChart5() {
    // chart bar 2 line
    // let chart = am4core.create("chartReceipt", am4charts.XYChart);
    let chart = am4core.create("chartfail5", am4charts.XYChart);
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "category";
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = "category";
      series.name = name;

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = "{valueY}";
      bullet.label.fill = am4core.color("#ffffff");

      return series;
    }

    chart.data = [
      {
        category: "Jan",
        first: 40,
        second: 55,
        third: 35,
      },
      {
        category: "Feb",
        first: 30,
        second: 78,
        third: 54,
      },
      {
        category: "Mar",
        first: 27,
        second: 40,
        third: 43,
      },
      {
        category: "Apr",
        first: 50,
        second: 33,
        third: 43,
      },
      {
        category: "May",
        first: 55,
        second: 43,
        third: 37,
      },
      {
        category: "Jun",
        first: 60,
        second: 53,
        third: 43,
      },
      {
        category: "Jul",
        first: 70,
        second: 57,
        third: 50,
      },
    ];

    createSeries("first", "Motorcycle");
    createSeries("second", "Car");
    createSeries("third", "Bicycle");

    function arrangeColumns() {
      let series = chart.series.getIndex(0);

      let w =
        1 -
        xAxis.renderer.cellStartLocation -
        (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            } else {
              series.dummyData = chart.series.indexOf(series);
            }
          });
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
            series.bulletsContainer.animate(
              { property: "dx", to: dx },
              series.interpolationDuration,
              series.interpolationEasing
            );
          });
        }
      }
    }
  }

  getChart6() {
    // pie chart
    // let chart = am4core.create("chartReceipt", am4charts.XYChart);
    let chart = am4core.create("chartfail6", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        label: "SMS",
        amount: 501.9,
      },
      {
        label: "Email",
        amount: 301.9,
      },
      {
        label: "Printed",
        amount: 201.1,
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
    pieSeries.dataFields.category = "label";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }
}
