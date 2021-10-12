import Chart from "react-google-charts";
import {
    compileGraphDatabase,
    compileHistoryDatabase,
    filterCategoryColors,
    getTotalBudget,
  } from "../../utils"

function mapColors(element){
    return {color: element.color};
}

function reduceExpenses(element){

}

function mapExpenses(element){
    return [element.name, element.dataPoints.reduce(reduceExpenses)];
}

export function PieChart(props) {

    const colors = props.database.map(mapColors);
    let expenses = props.database.map(mapExpenses)

    expenses = [["Name", "Amount"], ...expenses];

    console.log(props.databse);
    console.log(expenses);

    const pieOptions = {
        backgroundColor: 'transparent',
        slices: colors,
        legend: {
            position: "right",
            alignment: "center",
            textStyle: {
                color: "233238",
                fontSize: 14
            }
        },
        tooltip: {
            showColorCode: true
        },
        chartArea: {
            left: 0,
            top: 0,
            width: "80%",
            height: "80%"
        },
        fontName: "Roboto"
    };

    console.log(props.database);

    return (
        <section className="pieChartSection">
            <Chart
                chartType="PieChart"
                data={expenses}
                graph_id="PieChart"
                width={"800px"}
                height={"700px"}
                options={pieOptions}
                legend_toggle
            />
        </section>

    )
}