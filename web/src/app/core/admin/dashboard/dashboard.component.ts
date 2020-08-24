import { Component, OnInit, NgZone, OnDestroy } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Chart
  private chart: any;
  private chart1: any;
  private chart2: any;
  private clicked: any = true;
  private clicked1: any = false;

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
  // tableRows: Project[] = [];
  SelectionType = SelectionType;
  listProject: any = [
    {
      name: "Project 1",
      start_date: "2019-07-27T01:07:14Z",
      expected_completion_date: "2019-07-27T01:07:14Z",
      status: "OG",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Project 2",
      start_date: "2019-07-27T01:07:14Z",
      expected_completion_date: "2019-07-27T01:07:14Z",
      status: "CO",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Project 3",
      start_date: "2019-07-27T01:07:14Z",
      expected_completion_date: "2019-07-27T01:07:14Z",
      status: "PE",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Project 4",
      start_date: "2019-07-27T01:07:14Z",
      expected_completion_date: "2019-07-27T01:07:14Z",
      status: "CO",
      created_at: "2019-07-27T01:07:14Z",
    },
    {
      name: "Project 5",
      start_date: "2019-07-27T01:07:14Z",
      expected_completion_date: "2019-07-27T01:07:14Z",
      status: "OG",
      created_at: "2019-07-27T01:07:14Z",
    },
  ];

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.getCharts();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        console.log("Chart disposed");
        this.chart.dispose();
      }
      if (this.chart1) {
        console.log("Chart disposed");
        this.chart1.dispose();
      }
    });
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    // let val = $event.target.value;
    // this.tableTemp = this.tableRows.filter(function (d) {
    //   for (var key in d) {
    //     if (d[key].toLowerCase().indexOf(val) !== -1) {
    //       return true;
    //     }
    //   }
    //   return false;
    // });
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
      this.getChart();
      // this.getChart1();
      // this.getChart2();
      this.getChart3();
      this.getChart4();
      this.getChart5();
    });
  }

  getChart() {
    let chart = am4core.create("chartdivdashboard1", am4charts.PieChart);

    // Add data
    chart.data = [
      {
        status: "Project 1",
        amount: 2,
      },
      {
        status: "Project 2",
        amount: 5,
      },
      {
        status: "Project 3",
        amount: 3,
      },
      {
        status: "Project 4",
        amount: 4,
      },
    ];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
    pieSeries.dataFields.category = "status";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 1;
    pieSeries.labels.template.padding(0, 0, 0, 0);
    pieSeries.labels.template.bent = true;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }

  getChart2() {
    let chart = am4core.create("chartdivdashboard", am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        country: "Jan",
        visits: 4,
      },
      {
        country: "Feb",
        visits: 5,
      },
      {
        country: "Mar",
        visits: 7,
      },
      {
        country: "Apr",
        visits: 4,
      },
      {
        country: "May",
        visits: 5,
      },
      {
        country: "Jun",
        visits: 3,
      },
      {
        country: "July",
        visits: 8,
      },
      {
        country: "Aug",
        visits: 7,
      },
      {
        country: "Sep",
        visits: 3,
      },
      {
        country: "Oct",
        visits: 8,
      },
      {
        country: "Nov",
        visits: 9,
      },
      {
        country: "Dec",
        visits: 7,
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

  getChart3() {
    let chart = am4core.create("chartdivdashboard3", am4charts.PieChart);

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "country";

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    // change the cursor on hover to make it apparent the object can be interacted with
    pieSeries.slices.template.cursorOverStyle = [
      {
        property: "cursor",
        value: "pointer",
      },
    ];

    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 2;
    pieSeries.labels.template.padding(0, 0, 0, 0);

    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    let shadow = pieSeries.slices.template.filters.push(
      new am4core.DropShadowFilter()
    );
    shadow.opacity = 0;

    // Create hover state
    let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

    // Slightly shift the shadow and make it more prominent on hover
    let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        country: "Compoleted",
        value: 8,
      },
      {
        country: "In-Progress",
        value: 5,
      },
      {
        country: "Not Started",
        value: 2,
      },
    ];
  }

  getChart4() {
    let chart = am4core.create("chartdivdashboard4", am4charts.XYChart);

    // Add data
    chart.data = [
      {
        year: "Marketing",
        completed: 2.5,
        remaining: 2.5,
        overdue: 2.1,
      },
      {
        year: "Sales",
        completed: 2.6,
        remaining: 2.7,
        overdue: 2.2,
      },
      {
        year: "Financial",
        completed: 2.8,
        remaining: 2.9,
        overdue: 2.4,
      },
      {
        year: "Human Resource",
        completed: 2.8,
        remaining: 2.9,
        overdue: 2.4,
      },
    ];

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.opacity = 0;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
    valueAxis.renderer.ticks.template.length = 10;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;

    // Create series
    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "year";
      series.stacked = true;
      series.name = name;

      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.locationX = 0.5;
      labelBullet.label.text = "{valueX}";
      labelBullet.label.fill = am4core.color("#fff");
    }

    createSeries("completed", "Completed");
    createSeries("remaining", "In-Progress");
    createSeries("overdue", "Overdue");
  }

  getChart5() {
    let chart = am4core.create("chartdivdashboard5", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.paddingRight = 30;
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";

    let colorSet = new am4core.ColorSet();
    colorSet.saturation = 0.4;

    chart.data = [
      {
        category: "Project #1",
        start: "2016-01-01",
        end: "2016-01-14",
        color: colorSet.getIndex(0).brighten(0),
        task: "Gathering requirements",
      },
      {
        category: "Project #1",
        start: "2016-01-16",
        end: "2016-01-27",
        color: colorSet.getIndex(0).brighten(0.4),
        task: "Producing specifications",
      },
      {
        category: "Project #1",
        start: "2016-02-05",
        end: "2016-04-18",
        color: colorSet.getIndex(0).brighten(0.8),
        task: "Development",
      },
      {
        category: "Project #1",
        start: "2016-04-18",
        end: "2016-04-30",
        color: colorSet.getIndex(0).brighten(1.2),
        task: "Testing and QA",
      },
      {
        category: "Project #2",
        start: "2016-01-08",
        end: "2016-01-10",
        color: colorSet.getIndex(2).brighten(0),
        task: "Gathering requirements",
      },
      {
        category: "Project #2",
        start: "2016-01-12",
        end: "2016-01-15",
        color: colorSet.getIndex(2).brighten(0.4),
        task: "Producing specifications",
      },
      {
        category: "Project #2",
        start: "2016-01-16",
        end: "2016-02-05",
        color: colorSet.getIndex(2).brighten(0.8),
        task: "Development",
      },
      {
        category: "Project #2",
        start: "2016-02-10",
        end: "2016-02-18",
        color: colorSet.getIndex(2).brighten(1.2),
        task: "Testing and QA",
      },
      {
        category: "Project #3",
        start: "2016-01-02",
        end: "2016-01-08",
        color: colorSet.getIndex(4).brighten(0),
        task: "Gathering requirements",
      },
      {
        category: "Project #3",
        start: "2016-01-08",
        end: "2016-01-16",
        color: colorSet.getIndex(4).brighten(0.4),
        task: "Producing specifications",
      },
      {
        category: "Project #3",
        start: "2016-01-19",
        end: "2016-03-01",
        color: colorSet.getIndex(4).brighten(0.8),
        task: "Development",
      },
      {
        category: "Project #3",
        start: "2016-03-12",
        end: "2016-04-05",
        color: colorSet.getIndex(4).brighten(1.2),
        task: "Testing and QA",
      },
      {
        category: "Project #4",
        start: "2016-01-01",
        end: "2016-01-19",
        color: colorSet.getIndex(6).brighten(0),
        task: "Gathering requirements",
      },
      {
        category: "Project #4",
        start: "2016-01-19",
        end: "2016-02-03",
        color: colorSet.getIndex(6).brighten(0.4),
        task: "Producing specifications",
      },
      {
        category: "Project #4",
        start: "2016-03-20",
        end: "2016-04-25",
        color: colorSet.getIndex(6).brighten(0.8),
        task: "Development",
      },
      {
        category: "Project #4",
        start: "2016-04-27",
        end: "2016-05-15",
        color: colorSet.getIndex(6).brighten(1.2),
        task: "Testing and QA",
      },
      {
        category: "Project #5",
        start: "2016-01-01",
        end: "2016-01-12",
        color: colorSet.getIndex(8).brighten(0),
        task: "Gathering requirements",
      },
      {
        category: "Project #5",
        start: "2016-01-12",
        end: "2016-01-19",
        color: colorSet.getIndex(8).brighten(0.4),
        task: "Producing specifications",
      },
      {
        category: "Project #5",
        start: "2016-01-19",
        end: "2016-03-01",
        color: colorSet.getIndex(8).brighten(0.8),
        task: "Development",
      },
      {
        category: "Project #5",
        start: "2016-03-08",
        end: "2016-03-30",
        color: colorSet.getIndex(8).brighten(1.2),
        task: "Testing and QA",
      },
    ];

    chart.dateFormatter.dateFormat = "yyyy-MM-dd";
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.inversed = true;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 1, timeUnit: "day" };
    // dateAxis.max = new Date(2018, 0, 1, 24, 0, 0, 0).getTime();
    //dateAxis.strictMinMax = true;
    dateAxis.renderer.tooltipLocation = 0;

    let series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.height = am4core.percent(70);
    series1.columns.template.tooltipText =
      "{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

    series1.dataFields.openDateX = "start";
    series1.dataFields.dateX = "end";
    series1.dataFields.categoryY = "category";
    series1.columns.template.propertyFields.fill = "color"; // get color from data
    series1.columns.template.propertyFields.stroke = "color";
    series1.columns.template.strokeOpacity = 1;

    chart.scrollbarX = new am4core.Scrollbar();
  }
}
