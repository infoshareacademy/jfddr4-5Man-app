import Chart from "react-google-charts";
import styled from "styled-components";

const PieChartSection = styled.section`
  margin: auto 0;
`;

export function PieChart(props) {
  let colors = props.database
    .filter((element) => {
      if (element.name === "Income" || element.dataPoints.length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .map((element) => {
      return { color: element.color };
    });

  let expenses = props.database
    .filter((element) => {
      if (element.name === "Income" || element.dataPoints.length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .map((element) => {
      return [
        element.name,
        element.dataPoints.reduce((accumulator, element) => {
          accumulator += element.y;
          return accumulator;
        }, 0),
      ];
    });

  expenses = [["Name", "Amount"], ...expenses];

  const pieOptions = {
    backgroundColor: "transparent",
    slices: colors,
    legend: {
      position: "right",
      alignment: "center",
      textStyle: {
        color: `${props.nightmode === "true" ? "white" : "black"}`,
        fontSize: 30,
      },
    },
    tooltip: {
      showColorCode: true,
    },
    pieSliceTextStyle: {
      color: "black",
      fontSize: 20,
    },
    chartArea: {
      left: 0,
      top: 15,
      width: "90%",
      height: "90%",
    },
    fontName: "Roboto",
  };

  return (
    <PieChartSection>
      <Chart
        chartType="PieChart"
        data={expenses}
        graph_id="PieChart"
        width={"800px"}
        height={"400px"}
        options={pieOptions}
        legend_toggle
      />
    </PieChartSection>
  );
}
