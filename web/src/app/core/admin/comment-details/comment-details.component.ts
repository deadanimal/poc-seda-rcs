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
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
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

import { Comment } from "src/app/shared/services/comment/comment.model";
import { CommentService } from "src/app/shared/services/comment/comment.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-comment-details",
  templateUrl: "./comment-details.component.html",
  styleUrls: ["./comment-details.component.scss"],
})
export class CommentDetailsComponent implements OnInit, OnDestroy {
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
  tableRows: Comment[] = [];
  SelectionType = SelectionType;
  listComment: any;

  // get id
  id: string;
  proid: any;
  private sub: any;

  // Form
  searchForm: FormGroup;
  searchField: FormGroup;
  addCommentDetailsForm: FormGroup;
  editCommentDetailsForm: FormGroup;

  constructor(
    private CommentData: CommentService,
    private notifyService: NotifyService,
    private zone: NgZone,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loadingBar: LoadingBarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.getData();

    this.sub = this.route.params.subscribe((params) => {
      // this.id = params; // (+) converts string 'id' to a number
      this.proid = params["id"];
      console.log("id - ", params["id"]);
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnInit() {
    console.log(this.proid);
    let field = "project_id=" + this.proid;
    this.CommentData.filter(field).subscribe((res) => {
      this.listComment = res;
      // this.tableRows = [...res];

      // console.log("data = ", this.listComment);
      // console.log("Svc: ", this.tableRows);
    });
    this.getCharts();
  }

  addCommentDetails() {
    // console.log("qqqq");
    this.loadingBar.start();
    this.CommentData.create(this.addCommentDetailsForm.value).subscribe(
      () => {
        // Success
        // this.isLoading = false
        // this.successMessage();
        this.loadingBar.complete();
        this.successAlert("create Comment");
        window.location.reload();
      },
      () => {
        // Commented
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

  editCommentDetails() {
    // console.log("qqqq");
    this.loadingBar.start();
    this.CommentData.update(
      this.editCommentDetailsForm.value.id,
      this.editCommentDetailsForm.value
    ).subscribe(
      () => {
        // Success
        // this.isLoading = false
        // this.successMessage();
        this.loadingBar.complete();
        this.successAlert("edit Comment");
        console.log("asdasdasdsad");
        window.location.reload();
      },
      () => {
        // Commented
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

    this.sub.unsubscribe();
  }

  openModal(modalRef: TemplateRef<any>, row) {
    if (row) {
      console.log(row);
      this.editCommentDetailsForm.patchValue(row);
    }
    this.modal = this.modalService.show(
      modalRef,
      Object.assign({}, { class: "gray modal-lg" })
    );
    // this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
    this.editCommentDetailsForm.reset();
  }

  navigatePage(path: String, id) {
    // let qq = "db17a36a-1da6-4919-9746-dfed8802ec9d";
    console.log(id);
    console.log(path + "/" + id);
    if (path == "/admin//utility/Actions") {
      return this.router.navigate([path]);
    } else if (path == "/admin/Comment-details") {
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
      this.getChart5();
      this.getChart6();
      this.getTimeline();
    });
  }

  getChart() {
    //chart nate susoh
    let container = am4core.create("chartdivProDetails", am4core.Container);
    container.layout = "grid";
    container.fixedWidthGrid = false;
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    // Color set
    let colors = new am4core.ColorSet();

    // Functions that create various sparklines
    function createLine(title, data, color) {
      let chart = container.createChild(am4charts.XYChart);
      chart.width = am4core.percent(45);
      chart.height = 70;

      chart.data = data;

      chart.titles.template.fontSize = 10;
      chart.titles.template.textAlign = "start";
      chart.titles.template.isMeasured = false;
      chart.titles.create().text = title;

      chart.padding(20, 5, 2, 5);

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.labels.template.disabled = true;
      dateAxis.startLocation = 0.5;
      dateAxis.endLocation = 0.7;
      dateAxis.cursorTooltipEnabled = false;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.cursorTooltipEnabled = false;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true;
      chart.cursor.behavior = "none";

      let series = chart.series.push(new am4charts.LineSeries());
      series.tooltipText = "{date}: [bold]{value}";
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tensionX = 0.8;
      series.strokeWidth = 2;
      series.stroke = color;

      // render data points as bullets
      let bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.opacity = 0;
      bullet.circle.fill = color;
      bullet.circle.propertyFields.opacity = "opacity";
      bullet.circle.radius = 3;

      return chart;
    }

    function createColumn(title, data, color) {
      let chart = container.createChild(am4charts.XYChart);
      chart.width = am4core.percent(45);
      chart.height = 70;

      chart.data = data;

      chart.titles.template.fontSize = 10;
      chart.titles.template.textAlign = "start";
      chart.titles.template.isMeasured = false;
      chart.titles.create().text = title;

      chart.padding(20, 5, 2, 5);

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.disabled = true;
      dateAxis.renderer.labels.template.disabled = true;
      dateAxis.cursorTooltipEnabled = false;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.cursorTooltipEnabled = false;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true;

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.tooltipText = "{date}: [bold]{value}";
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.strokeWidth = 0;
      series.fillOpacity = 0.5;
      series.columns.template.propertyFields.fillOpacity = "opacity";
      series.columns.template.fill = color;

      return chart;
    }

    function createPie(data, color) {
      let chart = container.createChild(am4charts.PieChart);
      chart.width = am4core.percent(10);
      chart.height = 70;
      chart.padding(20, 0, 2, 0);

      chart.data = data;

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "category";
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
      pieSeries.slices.template.fill = color;
      pieSeries.slices.template.adapter.add("fill", function (
        fill: any,
        target
      ) {
        return fill.lighten(0.1 * target.dataItem.index);
      });
      pieSeries.slices.template.stroke = am4core.color("#fff");

      // chart.chartContainer.minHeight = 40;
      // chart.chartContainer.minWidth = 40;

      return chart;
    }

    createLine(
      "(Price)",
      [
        { date: new Date(2018, 0, 1, 8, 0, 0), value: 57 },
        { date: new Date(2018, 0, 1, 9, 0, 0), value: 27 },
        { date: new Date(2018, 0, 1, 10, 0, 0), value: 24 },
        { date: new Date(2018, 0, 1, 11, 0, 0), value: 59 },
        { date: new Date(2018, 0, 1, 12, 0, 0), value: 33 },
        { date: new Date(2018, 0, 1, 13, 0, 0), value: 46 },
        { date: new Date(2018, 0, 1, 14, 0, 0), value: 20 },
        { date: new Date(2018, 0, 1, 15, 0, 0), value: 42 },
        { date: new Date(2018, 0, 1, 16, 0, 0), value: 59, opacity: 1 },
      ],
      colors.getIndex(0)
    );

    createColumn(
      "(Turnover)",
      [
        { date: new Date(2018, 0, 1, 8, 0, 0), value: 22 },
        { date: new Date(2018, 0, 1, 9, 0, 0), value: 25 },
        { date: new Date(2018, 0, 1, 10, 0, 0), value: 40 },
        { date: new Date(2018, 0, 1, 11, 0, 0), value: 35 },
        { date: new Date(2018, 0, 1, 12, 0, 0), value: 29 },
        { date: new Date(2018, 0, 1, 13, 0, 0), value: 1 },
        { date: new Date(2018, 0, 1, 14, 0, 0), value: 15 },
        { date: new Date(2018, 0, 1, 15, 0, 0), value: 29 },
        { date: new Date(2018, 0, 1, 16, 0, 0), value: 33, opacity: 1 },
      ],
      colors.getIndex(0)
    );

    createPie(
      [
        { category: "Marketing", value: 501 },
        { category: "Research", value: 301 },
        { category: "Sales", value: 201 },
        { category: "HR", value: 165 },
      ],
      colors.getIndex(0)
    );

    createLine(
      "(Price)",
      [
        { date: new Date(2018, 0, 1, 8, 0, 0), value: 22 },
        { date: new Date(2018, 0, 1, 9, 0, 0), value: 25 },
        { date: new Date(2018, 0, 1, 10, 0, 0), value: 40 },
        { date: new Date(2018, 0, 1, 11, 0, 0), value: 35 },
        { date: new Date(2018, 0, 1, 12, 0, 0), value: 29 },
        { date: new Date(2018, 0, 1, 13, 0, 0), value: 1 },
        { date: new Date(2018, 0, 1, 14, 0, 0), value: 15 },
        { date: new Date(2018, 0, 1, 15, 0, 0), value: 29 },
        { date: new Date(2018, 0, 1, 16, 0, 0), value: 33, opacity: 1 },
      ],
      colors.getIndex(1)
    );

    createColumn(
      "(Turnover)",
      [
        { date: new Date(2018, 0, 1, 8, 0, 0), value: 57 },
        { date: new Date(2018, 0, 1, 9, 0, 0), value: 27 },
        { date: new Date(2018, 0, 1, 10, 0, 0), value: 24 },
        { date: new Date(2018, 0, 1, 11, 0, 0), value: 59 },
        { date: new Date(2018, 0, 1, 12, 0, 0), value: 33 },
        { date: new Date(2018, 0, 1, 13, 0, 0), value: 46 },
        { date: new Date(2018, 0, 1, 14, 0, 0), value: 20 },
        { date: new Date(2018, 0, 1, 15, 0, 0), value: 42 },
        { date: new Date(2018, 0, 1, 16, 0, 0), value: 59, opacity: 1 },
      ],
      colors.getIndex(1)
    );

    createPie(
      [
        { category: "Data 1", value: 130 },
        { category: "Data 2", value: 450 },
        { category: "Data 3", value: 400 },
        { category: "Data 4", value: 200 },
      ],
      colors.getIndex(1)
    );

    createLine(
      "(Price)",
      [
        { date: new Date(2018, 0, 1, 8, 0, 0), value: 16 },
        { date: new Date(2018, 0, 1, 9, 0, 0), value: 62 },
        { date: new Date(2018, 0, 1, 10, 0, 0), value: 55 },
        { date: new Date(2018, 0, 1, 11, 0, 0), value: 34 },
        { date: new Date(2018, 0, 1, 12, 0, 0), value: 29 },
        { date: new Date(2018, 0, 1, 13, 0, 0), value: 29 },
        { date: new Date(2018, 0, 1, 14, 0, 0), value: 28 },
        { date: new Date(2018, 0, 1, 15, 0, 0), value: 32 },
        { date: new Date(2018, 0, 1, 16, 0, 0), value: 30, opacity: 1 },
      ],
      colors.getIndex(2)
    );

    createColumn(
      "(Turnover)",
      [
        { date: new Date(2018, 0, 1, 8, 0, 0), value: 50 },
        { date: new Date(2018, 0, 1, 9, 0, 0), value: 51 },
        { date: new Date(2018, 0, 1, 10, 0, 0), value: 62 },
        { date: new Date(2018, 0, 1, 11, 0, 0), value: 60 },
        { date: new Date(2018, 0, 1, 12, 0, 0), value: 25 },
        { date: new Date(2018, 0, 1, 13, 0, 0), value: 20 },
        { date: new Date(2018, 0, 1, 14, 0, 0), value: 70 },
        { date: new Date(2018, 0, 1, 15, 0, 0), value: 42 },
        { date: new Date(2018, 0, 1, 16, 0, 0), value: 33, opacity: 1 },
      ],
      colors.getIndex(2)
    );

    createPie(
      [
        { category: "Data 1", value: 220 },
        { category: "Data 2", value: 200 },
        { category: "Data 3", value: 150 },
        { category: "Data 4", value: 125 },
      ],
      colors.getIndex(2)
    );

    // FB

    createLine(
      "(Price)",
      [
        { date: new Date(2018, 0, 1, 8, 0, 0), value: 52 },
        { date: new Date(2018, 0, 1, 9, 0, 0), value: 55 },
        { date: new Date(2018, 0, 1, 10, 0, 0), value: 35 },
        { date: new Date(2018, 0, 1, 11, 0, 0), value: 34 },
        { date: new Date(2018, 0, 1, 12, 0, 0), value: 39 },
        { date: new Date(2018, 0, 1, 13, 0, 0), value: 42 },
        { date: new Date(2018, 0, 1, 14, 0, 0), value: 29 },
        { date: new Date(2018, 0, 1, 15, 0, 0), value: 22 },
        { date: new Date(2018, 0, 1, 16, 0, 0), value: 15, opacity: 1 },
      ],
      colors.getIndex(3)
    );

    createColumn(
      "(Turnover)",
      [
        { date: new Date(2018, 0, 1, 8, 0, 0), value: 20 },
        { date: new Date(2018, 0, 1, 9, 0, 0), value: 20 },
        { date: new Date(2018, 0, 1, 10, 0, 0), value: 25 },
        { date: new Date(2018, 0, 1, 11, 0, 0), value: 26 },
        { date: new Date(2018, 0, 1, 12, 0, 0), value: 29 },
        { date: new Date(2018, 0, 1, 13, 0, 0), value: 27 },
        { date: new Date(2018, 0, 1, 14, 0, 0), value: 25 },
        { date: new Date(2018, 0, 1, 15, 0, 0), value: 32 },
        { date: new Date(2018, 0, 1, 16, 0, 0), value: 30, opacity: 1 },
      ],
      colors.getIndex(3)
    );

    createPie(
      [
        { category: "Data 1", value: 120 },
        { category: "Data 2", value: 150 },
        { category: "Data 3", value: 125 },
        { category: "Data 4", value: 250 },
      ],
      colors.getIndex(3)
    );

    this.chart = container;
  }

  getChart1() {
    // chart half circle
    let chart = am4core.create("chartdivProDetails1", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        item: "Lights",
        value: 40,
      },
      {
        item: "Fridge",
        value: 30,
      },
      {
        item: "TV",
        value: 20,
      },
      {
        item: "Washing Machine",
        value: 16,
      },
    ];
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "item";
    series.ticks.template.disabled = true;
    series.labels.template.disabled = true;

    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    //chart.legend = new am4charts.Legend();
  }

  getChart2() {
    // chart ada gambo org
    let chart = am4core.create("chartdivProDetails2", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        name: "John",
        points: 35654,
        color: chart.colors.next(),
        bullet: "https://www.amcharts.com/lib/images/faces/A04.png",
      },
      {
        name: "Damon",
        points: 65456,
        color: chart.colors.next(),
        bullet: "https://www.amcharts.com/lib/images/faces/C02.png",
      },
      {
        name: "Patrick",
        points: 45724,
        color: chart.colors.next(),
        bullet: "https://www.amcharts.com/lib/images/faces/D02.png",
      },
      {
        name: "Mark",
        points: 13654,
        color: chart.colors.next(),
        bullet: "https://www.amcharts.com/lib/images/faces/E01.png",
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.labels.template.fill = am4core.color("#fff");
    categoryAxis.renderer.labels.template.fontSize = 20;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeDasharray = "4,4";
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    // Do not crop bullets
    chart.maskBullets = false;

    // Remove padding
    chart.paddingBottom = 0;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "points";
    series.dataFields.categoryX = "name";
    series.columns.template.propertyFields.fill = "color";
    series.columns.template.propertyFields.stroke = "color";
    series.columns.template.column.cornerRadiusTopLeft = 15;
    series.columns.template.column.cornerRadiusTopRight = 15;
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/b]";

    // Add bullets
    let bullet = series.bullets.push(new am4charts.Bullet());
    let image = bullet.createChild(am4core.Image);
    image.horizontalCenter = "middle";
    image.verticalCenter = "bottom";
    image.dy = 20;
    image.y = am4core.percent(100);
    image.propertyFields.href = "bullet";
    image.tooltipText = series.columns.template.tooltipText;
    image.propertyFields.fill = "color";
    image.filters.push(new am4core.DropShadowFilter());
  }

  getChart3() {
    // chatt petak warna warni
    let chart = am4core.create("chartdivProDetails3", am4charts.XYChart);
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
    let chart = am4core.create("chartdivProDetails4", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        month: "Jan",
        active: 1,
        inactive: 5,
      },
      {
        month: "Feb",
        active: 3,
        inactive: 2,
      },
      {
        month: "Mar",
        active: 5,
        inactive: 4,
      },
      {
        month: "Apr",
        active: 3,
        inactive: 3,
      },
      {
        month: "May",
        active: 6,
        inactive: 5,
      },
      {
        month: "Jun",
        active: 2,
        inactive: 4,
      },
      {
        month: "Jul",
        active: 4,
        inactive: 3,
      },
      {
        month: "Aug",
        active: 6,
        inactive: 5,
      },
      {
        month: "Sep",
        active: 5,
        inactive: 4,
      },
      {
        month: "Oct",
        active: 5,
        inactive: 5,
      },
      {
        month: "Nov",
        active: 4,
        inactive: 5,
      },
      {
        month: "Dec",
        active: 5,
        inactive: 6,
      },
    ];
    // Create category axis
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";

    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    // categoryAxis.renderer.opposite = true;

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.renderer.inversed = true;
    // valueAxis.title.text = "File";
    valueAxis.renderer.minLabelPosition = 0.01;

    // Create series
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "active";
    series1.dataFields.categoryX = "month";
    series1.name = "Downloaded ";
    series1.strokeWidth = 3;
    series1.bullets.push(new am4charts.CircleBullet());
    series1.tooltipText = "Amount {name} in {categoryX}: {valueY}";
    series1.legendSettings.valueText = "{valueY}";
    series1.visible = false;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.valueY = "inactive";
    series2.dataFields.categoryX = "month";
    series2.name = "Generated";
    series2.strokeWidth = 3;
    series2.bullets.push(new am4charts.CircleBullet());
    series2.tooltipText = "Amount {name} in {categoryX}: {valueY}";
    series2.legendSettings.valueText = "{valueY}";

    // Add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    // Add legend
    chart.legend = new am4charts.Legend();
  }

  getChart5() {
    // chart bar 2 line
    // let chart = am4core.create("chartReceipt", am4charts.XYChart);
    let chart = am4core.create("chartdivProDetails5", am4charts.XYChart);
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

    createSeries("first", "Bugdet");
    createSeries("second", "Spend");

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
    let chart = am4core.create("chartdivProDetails6", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        label: "Budget",
        amount: 501.9,
      },
      {
        label: "Spend",
        amount: 301.9,
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

  getTimeline() {
    let chart = am4core.create(
      "chartdivCommentDetails7",
      am4plugins_timeline.SerpentineChart
    );
    chart.curveContainer.padding(20, 20, 20, 20);
    chart.levelCount = 8;
    chart.orientation = "horizontal";
    chart.fontSize = 11;

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.6;

    chart.data = [
      {
        category: "Operation #1",
        start: "2016-01-10",
        end: "2016-01-13",
        color: colorSet.getIndex(0),
        task: "Gathering requirements",
      },
      {
        category: "Operation #1",
        start: "2016-02-05",
        end: "2016-04-18",
        color: colorSet.getIndex(0),
        task: "Development",
      },
      {
        category: "Operation #2",
        start: "2016-01-08",
        end: "2016-01-10",
        color: colorSet.getIndex(5),
        task: "Gathering requirements",
      },
      {
        category: "Operation #2",
        start: "2016-01-12",
        end: "2016-01-15",
        color: colorSet.getIndex(5),
        task: "Producing specifications",
      },
      {
        category: "Operation #2",
        start: "2016-01-16",
        end: "2016-02-05",
        color: colorSet.getIndex(5),
        task: "Development",
      },
      {
        category: "Operation #2",
        start: "2016-02-10",
        end: "2016-02-18",
        color: colorSet.getIndex(5),
        task: "Testing and QA",
      },
      {
        category: "",
        task: "",
      },
      {
        category: "Operation #3",
        start: "2016-01-01",
        end: "2016-01-19",
        color: colorSet.getIndex(9),
        task: "Gathering requirements",
      },
      {
        category: "Operation #3",
        start: "2016-02-01",
        end: "2016-02-10",
        color: colorSet.getIndex(9),
        task: "Producing specifications",
      },
      {
        category: "Operation #3",
        start: "2016-03-10",
        end: "2016-04-15",
        color: colorSet.getIndex(9),
        task: "Development",
      },
      {
        category: "Operation #3",
        start: "2016-04-20",
        end: "2016-04-30",
        color: colorSet.getIndex(9),
        task: "Testing and QA",
      },
      {
        category: "Operation #4",
        start: "2016-01-15",
        end: "2016-02-12",
        color: colorSet.getIndex(15),
        task: "Gathering requirements",
      },
      {
        category: "Operation #4",
        start: "2016-02-25",
        end: "2016-03-10",
        color: colorSet.getIndex(15),
        task: "Development",
      },
      {
        category: "Operation #4",
        start: "2016-03-23",
        end: "2016-04-29",
        color: colorSet.getIndex(15),
        task: "Testing and QA",
      },
    ];

    chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.paddingRight = 25;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.innerRadius = -60;
    categoryAxis.renderer.radius = 60;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis() as any);
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: "day" };

    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.startLocation = -0.5;
    dateAxis.renderer.line.strokeDasharray = "1,4";
    dateAxis.renderer.line.strokeOpacity = 0.7;
    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    dateAxis.tooltip.label.paddingTop = 7;

    let labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fillOpacity = 0.7;
    labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor(
      "background"
    );
    labelTemplate.background.fillOpacity = 1;
    labelTemplate.padding(7, 7, 7, 7);

    let categoryAxisLabelTemplate = categoryAxis.renderer.labels.template;
    categoryAxisLabelTemplate.horizontalCenter = "left";
    categoryAxisLabelTemplate.adapter.add("rotation", function (
      rotation,
      target
    ) {
      let position = dateAxis.valueToPosition(dateAxis.min);
      return dateAxis.renderer.positionToAngle(position) + 90;
    });

    let series1 = chart.series.push(
      new am4plugins_timeline.CurveColumnSeries()
    );
    series1.columns.template.height = am4core.percent(20);
    series1.columns.template.tooltipText =
      "{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

    series1.dataFields.openDateX = "start";
    series1.dataFields.dateX = "end";
    series1.dataFields.categoryY = "category";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
    series1.columns.template.strokeOpacity = 0;

    let bullet = new am4charts.CircleBullet();
    series1.bullets.push(bullet);
    bullet.circle.radius = 3;
    bullet.circle.strokeOpacity = 0;
    bullet.propertyFields.fill = "color";
    bullet.locationX = 0;

    let bullet2 = new am4charts.CircleBullet();
    series1.bullets.push(bullet2);
    bullet2.circle.radius = 3;
    bullet2.circle.strokeOpacity = 0;
    bullet2.propertyFields.fill = "color";
    bullet2.locationX = 1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = "center";
    chart.scrollbarX.width = am4core.percent(90);

    let cursor = new am4plugins_timeline.CurveCursor();
    chart.cursor = cursor;
    cursor.xAxis = dateAxis;
    cursor.yAxis = categoryAxis;
    cursor.lineY.disabled = true;
    cursor.lineX.strokeDasharray = "1,4";
    cursor.lineX.strokeOpacity = 1;

    dateAxis.renderer.tooltipLocation2 = 0;
    categoryAxis.cursorTooltipEnabled = false;

    // this.chart = chart
  }
}
