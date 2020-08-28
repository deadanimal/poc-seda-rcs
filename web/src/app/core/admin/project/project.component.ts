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

import { Ecashflowam } from "src/app/shared/services/ecashflowam/ecashflowam.model";
import { EcashflowamService } from "src/app/shared/services/ecashflowam/ecashflowam.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit, OnDestroy {
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
  tableRows: Ecashflowam[] = [];
  SelectionType = SelectionType;
  listProject: any;

  calcRom = 0;

  // Form
  searchForm: FormGroup;
  searchField: FormGroup;
  calculateForm: FormGroup;
  addProjectDetailsForm: FormGroup;
  editProjectDetailsForm: FormGroup;

  constructor(
    private ecashflowamData: EcashflowamService,
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

    this.ecashflowamData.getAll().subscribe((res) => {
      this.listProject = res;
      this.tableRows = [...res];

      // console.log("data = ", this.listProject);
      // this.listLicense = this.tableRows.map((proßp, key) => {
      //   // console.log("test =>", prop, key);
      //   return {
      //     ...prop,
      //     // id: key,
      //   };
      // });
      // console.log("Svc: ", this.tableRows);
    });
  }

  ngOnInit() {
    this.getCharts();

    this.calculateForm = this.formBuilder.group({
      tariff: new FormControl(""),
      dc: new FormControl(""),
      aydaaa: new FormControl(""),
    });

    this.editProjectDetailsForm = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      start_date: new FormControl(""),
      expected_completion_date: new FormControl(""),
      project_timeframe: new FormControl(""),
      department: new FormControl(""),
      owner_project: new FormControl(""),
      source_of_fund: new FormControl(""),
      project_cost: new FormControl(""),
      pic: new FormControl(""),
      created_date: new FormControl(""),
      modified_date: new FormControl(""),
    });
  }
  calculateROM() {
    console.log(this.calculateForm.value);
    this.calcRom =
      (parseFloat(this.calculateForm.value.tariff) - 0.238) *
      parseFloat(this.calculateForm.value.aydaaa);

    // console.log(this.calculateForm.value.tariff);
    // console.log(parseFloat(this.calculateForm.value.tariff));

    // console.log(this.calcRom);
  }

  addProjectDetails() {
    // console.log("qqqq");
    this.loadingBar.start();
    this.ecashflowamData.create(this.addProjectDetailsForm.value).subscribe(
      () => {
        // Success
        // this.isLoading = false
        // this.successMessage();
        this.loadingBar.complete();
        this.successAlert("create project");
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

  editProjectDetails() {
    // console.log("qqqq");
    this.loadingBar.start();
    this.ecashflowamData
      .update(
        this.editProjectDetailsForm.value.id,
        this.editProjectDetailsForm.value
      )
      .subscribe(
        () => {
          // Success
          // this.isLoading = false
          // this.successMessage();
          this.loadingBar.complete();
          this.successAlert("edit project");
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
      this.editProjectDetailsForm.patchValue(row);
    }
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: "gray modal-lg" })
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.editProjectDetailsForm.reset();
  }

  navigatePage(path: String, id) {
    // let qq = "db17a36a-1da6-4919-9746-dfed8802ec9d";
    console.log(id);
    console.log(path + "/" + id);
    if (path == "/admin//utility/Actions") {
      return this.router.navigate([path]);
    } else if (path == "/admin/project-details") {
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
      // this.getChart3();
      // this.getChart4();
      // this.getChart5();
      this.getChart6();
    });
  }

  getChart3() {
    // chatt petak warna warni
    let chart = am4core.create("chartdivBillDelivery3", am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        country: "Jan",
        visits: 300000,
      },
      {
        country: "Feb",
        visits: 400000,
      },
      {
        country: "Mar",
        visits: 500000,
      },
      {
        country: "Apr",
        visits: 600000,
      },
      {
        country: "May",
        visits: 300000,
      },
      {
        country: "Jun",
        visits: 200000,
      },
      {
        country: "July",
        visits: 500000,
      },
      {
        country: "Aug",
        visits: 600000,
      },
      {
        country: "Sep",
        visits: 900000,
      },
      {
        country: "Oct",
        visits: 500000,
      },
      {
        country: "Nov",
        visits: 400000,
      },
      {
        country: "Dec",
        visits: 700000,
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

  getChart6() {
    // Create chart instance
    let chart = am4core.create("chartdivBillDelivery6", am4charts.PieChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

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
    pieSeries.innerRadius = am4core.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    let rgm = new am4core.RadialGradientModifier();
    rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, -0.5);
    pieSeries.slices.template.fillModifier = rgm;
    pieSeries.slices.template.strokeModifier = rgm;
    pieSeries.slices.template.strokeOpacity = 0.4;
    pieSeries.slices.template.strokeWidth = 0;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
  }
}
