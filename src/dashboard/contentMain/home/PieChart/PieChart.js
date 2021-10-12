import Chart from "react-google-charts";
import {
    compileGraphDatabase,
    compileHistoryDatabase,
    filterCategoryColors,
    getTotalBudget,
  } from "../../utils"

export function PieChart(props) {
    const pieOptions = {
        backgroundColor: 'transparent',
        slices: [
            {
                color: "#2BB673"
            },
            {
                color: "#d91e48"
            },
            {
                color: "#007fad"
            },
            {
                color: "#e9a227"
            }
        ],
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
            width: "100%",
            height: "80%"
        },
        fontName: "Roboto"
    };

    console.log(props.database);

    return (
        <section className="pieChartSection">
            <Chart
                chartType="PieChart"
                data={[["Age", "Weight"], ["b", 12], ["b", 5.5]]}
                options={pieOptions}
                graph_id="PieChart"
                width={"700px"}
                height={"700px"}
                legend_toggle
            />
        </section>

    )
}