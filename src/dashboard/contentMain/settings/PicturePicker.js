import { Button } from "@mui/material";
import { useContext } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { updatePicture } from "../../../firebase";
import { UserContext } from "../../../UserContext";

const PicturePickerInsideWrapper = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.formsBackground};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PicturesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: content-box;
  width: 360px;
  height: 270px;
  margin-bottom: 20px;
`;
const ButtonsWrapper = styled.div`
  display: flex;
`;
const OnePicture = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  box-sizing: content-box;
  padding: 15px;
  margin: 5px;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
`;
const buttonStyles = {
  backgroundColor: "#5350E9",
  borderRadius: "25px",
  color: "#FFFFFF",
  fontWeight: "bold",
  letterSpacing: "1px",
  fontSize: "20px",
  "&:first-of-type": { marginRight: "20px" },
  "&:hover": { backgroundColor: "#333193" },
};

export const picturesToDisplay = [
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNSIgdmlld0JveD0iMCAwIDI0IDI1Ij48cGF0aCBkPSJNMTYuNSAxMy41YzAgLjgyOC0uNTYgMS41LTEuMjUgMS41cy0xLjI1LS42NzItMS4yNS0xLjUuNTYtMS41IDEuMjUtMS41IDEuMjUuNjcyIDEuMjUgMS41em0tNy43NS0xLjVjLS42OSAwLTEuMjUuNjcyLTEuMjUgMS41cy41NiAxLjUgMS4yNSAxLjUgMS4yNS0uNjcyIDEuMjUtMS41LS41Ni0xLjUtMS4yNS0xLjV6bTE1LjI1IDIuMzEzYzAgMS43NjUtLjk4NSAzLjk5MS0zLjEzOSA0LjkwNi0yLjA2MyAzLjI5NS00Ljk4NyA1Ljc4MS04Ljg2MSA1Ljc4MS0zLjc0MSAwLTYuODQ2LTIuNTYyLTguODYxLTUuNzgxLTIuMTU0LS45MTYtMy4xMzktMy4xNDItMy4xMzktNC45MDYgMC0yLjA1My43NTQtMy4wMjYgMS40MTctMy40ODktLjM5LTEuNTI0LTEuMDMtNS4xNDYuOTYzLTcuNDA5LjkzOC0xLjA2NSAyLjQ2NC0xLjU0IDQuMTItMS4yNzQuNzE5LTEuNTMyIDMuNjEyLTIuMTQxIDUuNS0yLjE0MSAzIDAgNi42MDkuNjQxIDkuMTQxIDMuNTE2IDEuOTY5IDIuMjM2IDEuNjQ4IDUuNzQxIDEuMzg4IDcuMjY5LjY3Ni40NDYgMS40NzEgMS40MTkgMS40NzEgMy41Mjh6bS05LjYgNC42ODdoLTQuOHMuNjc4IDEuODgzIDIuNCAxLjg4M2MxLjc4OCAwIDIuNC0xLjg4MyAyLjQtMS44ODN6bTcuMDYzLTYuNTA4Yy00LjExLjM5My03Ljc3OC0zLjA1OC05LjA3My01LjI3NC0uMDgxLjgwOS4xODYgMi41NTcuOTY5IDMuMzU1LTMuMTc1LjA2NC01LjgzNS0xLjU5Mi03LjQ2LTMuODY4LS44MzcgMS4zOTktMS4yNDIgMy4wODgtMS4yNDIgNC43NzUgMCAuNzIyLS43NDYgMS4yMDgtMS40MDYuOTE0LS4xNC0uMDYzLS40MzYtLjEwMS0uNjcxLjA1My0xIC42NDgtLjg5NSA0LjE4MyAxLjU1MyA1LjAxMi4yMjQuMDc2LjQxMy4yMjguNTM2LjQzLjY1NSAxLjA4NiAxLjM1NCAxLjk4IDIuMDg2IDIuNzIyLjkyMi42MzMgMS4wNTYtMS44NzUgMS42NjctMi43Mi42ODYtLjk0OSAyLjQ1NS0xLjEyNiAzLjU3OC0uMzIyIDEuMTI0LS44MDQgMi44OTItLjYyNyAzLjU3OC4zMjIuNjExLjg0Ni43NDUgMy4zNTQgMS42NjcgMi43Mi43MzEtLjc0MSAxLjQzLTEuNjM2IDIuMDg2LTIuNzIyLjEyMy0uMjAyLjMxMy0uMzU0LjUzNi0uNDMgMi4zNjMtLjggMi41OTYtNC4xODUgMS41OTYtNC45Njd6Ii8+PC9zdmc+"
  ></img>,
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI2IDI0Ij48cGF0aCBkPSJNMTcuNSAxMi41YzAgLjgyOC0uNTYgMS41LTEuMjUgMS41cy0xLjI1LS42NzItMS4yNS0xLjUuNTYtMS41IDEuMjUtMS41IDEuMjUuNjcyIDEuMjUgMS41em0tNy43NS0xLjVjLS42OSAwLTEuMjUuNjcyLTEuMjUgMS41cy41NiAxLjUgMS4yNSAxLjUgMS4yNS0uNjcyIDEuMjUtMS41LS41Ni0xLjUtMS4yNS0xLjV6bTMuMjUgOC4zNTRjMi4yMzUgMCAzLTIuMzU0IDMtMi4zNTRoLTZzLjg0NyAyLjM1NCAzIDIuMzU0em0xMyAzLjYzOWMtMi42NTMgMS43MTQtNS40MTggMS4yNTQtNi44NDItMS40ODgtMS42NzIgMS41MDUtMy43MDYgMi40ODctNi4xNTggMi40ODctMi41MyAwLTQuNTE3LS45MS02LjE4NC0yLjQ0NS0xLjQzMSAyLjcwMi00LjE3OCAzLjE1LTYuODE2IDEuNDQ2IDQuMzc1LTEuNzUtMi43MjktMTEuODEzIDQuMTA0LTE5LjM3NSAyLjI4Mi0yLjUyNSA1LjQ3Mi0zLjYxOCA4Ljg5Ni0zLjYxOHM2LjYxNCAxLjA5MyA4Ljg5NiAzLjYxOGM2LjgzMyA3LjU2Mi0uMjcxIDE3LjYyNSA0LjEwNCAxOS4zNzV6bS01LjY2OC02LjExMWMuMTIyLS4yMDIuMzEyLS4zNTQuNTM1LS40MyAyLjQ0Ny0uODI4IDIuNTU0LTQuMzYxIDEuNTU0LTUuMDEyLS4yMzUtLjE1Mi0uNTMxLS4xMTUtLjY3Mi0uMDUzLS42NjQuMjk1LTEuNDA2LS4xOTQtMS40MDYtLjkxNCAwLS40NzEtLjAzNC0xLjAwMS0uMDk2LTEuNDczaC0xMC4xMDFjLS44MTMtMS4wMjEtLjc3MS0yLjk0NS0uMzk2LTQuNTctLjkwMy45ODItMS42OTMgMy4yNDktMS44NzUgNC41N2gtMi4xMjFjLS4wNjIuNDcyLS4wOTYgMS4wMDItLjA5NiAxLjQ3MyAwIC43Mi0uNzQyIDEuMjA5LTEuNDA2LjkxNC0uMTQxLS4wNjItLjQzNi0uMS0uNjcyLjA1My0xIC42NTEtLjg5MyA0LjE4NCAxLjU1NCA1LjAxMi4yMjQuMDc2LjQxMy4yMjguNTM1LjQzIDEuNzA5IDIuODI5IDQuMDE1IDUuMTExIDcuMzMyIDUuMTExIDMuMzE2IDAgNS42MjMtMi4yODMgNy4zMzEtNS4xMTF6Ii8+PC9zdmc+"
  ></img>,
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTYuNSAxMi41YzAgLjgyOC0uNTYgMS41LTEuMjUgMS41cy0xLjI1LS42NzItMS4yNS0xLjUuNTYtMS41IDEuMjUtMS41IDEuMjUuNjcyIDEuMjUgMS41em0tNy43NS0xLjVjLS42OSAwLTEuMjUuNjcyLTEuMjUgMS41cy41NiAxLjUgMS4yNSAxLjUgMS4yNS0uNjcyIDEuMjUtMS41LS41Ni0xLjUtMS4yNS0xLjV6bTMuMjUgNS4zNTdjLTIuMzc1LTEuNDU0LTEuNjg5IDIuMDk1LTUgLjYzOS41IDIuMDEyIDMuNTA2IDIuMzUzIDUgMS4xNDEgMS40OTQgMS4yMTIgNC41Ljg3MSA1LTEuMTQxLTMuMzExIDEuNDU3LTIuNjI1LTIuMDkyLTUtLjYzOXptMTItMy4wNDRjMCAxLjc2NS0uOTg1IDMuOTkxLTMuMTM5IDQuOTA2LTIuMDUgMy4yNzQtNC45NzUgNS43ODEtOC44NjEgNS43ODEtMy43NDkgMC02Ljg1OC0yLjU4Mi04Ljg2Mi01Ljc4MS0yLjE1My0uOTE2LTMuMTM4LTMuMTQyLTMuMTM4LTQuOTA2IDAtMS45OTUuODExLTMuNzc0IDIuNjgzLTMuOTU5bC4wMy0uMDI4LjAwMy0uMDJjLS4yNS0xLjk0NS0uMzM4LTQuOTIuNzE5LTYuMDQ3LjU2OC0uNjA1IDEuMjE3LS44MzkgMi4wNDctLjU2NSAxLjI5NC0xLjc2NSAzLjQ1NC0yLjY5NCA2LjM3Mi0yLjY5NCA0LjY0NiAwIDYuNTUyIDIuNDE3IDguMTc3IDQuNDYuODkzIDEuMTIzIDEuOTY5IDIuMjQ4IDMuOTY5IDIuMTg2LS44MDkuNzU4LTEuNzc5IDEuMzU0LTIuODMyIDEuNzk1LjA1MS4zMDEuMDkzLjYwNC4xMjIuOTA3IDEuODUuMTY1IDIuNzEgMS45MDUgMi43MSAzLjk2NXptLTIuNTgtMS44NjZjLS4yMzUtLjE1My0uNTMtLjExNi0uNjcxLS4wNTMtLjY2LjI5My0xLjQwNi0uMTkyLTEuNDA2LS45MTQgMC0uNDc5LS4wMzUtLjk1Ny0uMS0xLjQzLTQuMDk5LjkyOC04Ljc0My0uMjMxLTEwLjM2OC0zLjQ2Ny0yLjM3NS4zNzUtMy44NSAyLjM1Ni00LjIyOSA1LjAyMWgtLjAwNGMtLjA4Ny42ODMtLjc4NSAxLjA1OS0xLjM5Ljc5LS4xNDEtLjA2Mi0uNDM2LS4xLS42NzIuMDUzLTEgLjY1MS0uODkzIDQuMTg0IDEuNTU0IDUuMDEyLjIyNC4wNzYuNDEzLjIyOC41MzUuNDMgMS43MDggMi44MjkgNC4wMTUgNS4xMTEgNy4zMzEgNS4xMTEgMy4zMTggMCA1LjYyNC0yLjI4NCA3LjMzMS01LjExMS4xMjMtLjIwMi4zMTMtLjM1NC41MzYtLjQzIDIuNDQ4LS44MjkgMi41NTMtNC4zNjQgMS41NTMtNS4wMTJ6Ii8+PC9zdmc+"
  ></img>,
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjQgMTMuMzEzYzAtMi4wNTMtLjc1NC0zLjAyNi0xLjQxNy0zLjQ4OS4zOTEtMS41MjQgMS4wMy01LjE0Ni0uOTYzLTcuNDA5LS45MzgtMS4wNjUtMi40NjQtMS41NC00LjEyLTEuMjc0LTEuMzAxLS41NTctMy4yNjYtMS4xNDEtNS41LTEuMTQxcy00LjE5OS41ODQtNS41IDEuMTQxYy0xLjY1Ni0uMjY2LTMuMTgyLjIwOC00LjEyIDEuMjc0LTEuOTkzIDIuMjYzLTEuMzUzIDUuODg1LS45NjMgNy40MDktLjY2My40NjMtMS40MTcgMS40MzUtMS40MTcgMy40ODkgMCAuOTk2LjMyNiAyLjEzMS45ODYgMy4xMDItLjQ4NSAxLjQyMS41MjMgMy4wNDkgMi4yODMgMi44NTQtLjMxOCAxLjYyMiAxLjM2NSAyLjkyOCAzLjA4MiAyLjEyOC0uMjAxIDEuMTYzIDEuNDIxIDIuNTggMy40NDMgMS41NjkuNjcxLjU3MiAxLjE4OCAxLjAzNCAyLjIwNCAxLjAzNCAxLjE1NSAwIDEuODQ2LS42NDMgMi4yNzctMS4wMzUgMi4wMjIgMS4wMTIgMy41NzQtLjQwNiAzLjM3NC0xLjU2OSAxLjcxOC44IDMuNC0uNTA2IDMuMDgyLTIuMTI4IDEuNzYuMTk1IDIuNzY4LTEuNDMzIDIuMjgzLTIuODU0LjY1OS0uOTcuOTg2LTIuMTA2Ljk4Ni0zLjEwMXptLTEyIDYuNTdjLTEuNzIyIDAtMi40LTEuODgzLTIuNC0xLjg4M2g0LjhzLS42MTIgMS44ODMtMi40IDEuODgzem0zLjU3OC0yLjk5MmMtMS4wNTItLjUxNS0yLjQ1NS0xLjEyNi0zLjU3OC0uMzIyLTEuMTI0LS44MDQtMi41MjYtLjE5My0zLjU3OC4zMjItNC4yNTEgMi4wOC04LjAyNC00LjAyMy01Ljg0Mi01LjQ0NC4yMDQtLjEzMi40ODgtLjEzNS42NzItLjA1My42NjEuMjkyIDEuNDA2LS4xOTEgMS40MDYtLjkxNCAwLTIuMjE0LjY5Mi00LjQzNCAyLjE1NC01Ljk4OGwuMDE1LS4wMWMyLjYwNC0yLjU5NiA3Ljc0MS0yLjU5NiAxMC4zNDUgMGwuMDE2LjAxMWMxLjQ2MiAxLjU1NCAyLjE1NCAzLjc3NCAyLjE1NCA1Ljk4NyAwIC43MjYuNzQ4IDEuMjA1IDEuNDA2LjkxNC4xNDEtLjA2My40MzYtLjEuNjcxLjA1MyAyLjE1IDEuMzkyLTEuNTE0IDcuNTYxLTUuODQxIDUuNDQ0em0uMTcyLTcuMzkxYy0xLjEyNCAwLTIuMDk0LjYyOS0yLjYwNyAxLjU0Ni0uMzczLS4xMTYtLjc0NC0uMTc0LTEuMTQzLS4xNzRzLS43Ny4wNTgtMS4xNDMuMTc0Yy0uNTEzLS45MTctMS40ODMtMS41NDYtMi42MDctMS41NDYtMS42NTQgMC0zIDEuMzQ2LTMgM3MxLjM0NiAzIDMgM2MxLjIzMSAwIDIuMjg1LS43NDggMi43NDctMS44MTEuMjQ2LS41NjYuMzk0LTEuMzAxIDEuMDAzLTEuMzAxcy43NTguNzM1IDEuMDAzIDEuMzAxYy40NjIgMS4wNjMgMS41MTYgMS44MTEgMi43NDcgMS44MTEgMS42NTQgMCAzLTEuMzQ2IDMtM3MtMS4zNDYtMy0zLTN6bS03LjUgNC41Yy0uODI4IDAtMS41LS42NzItMS41LTEuNXMuNjcyLTEuNSAxLjUtMS41IDEuNS42NzIgMS41IDEuNS0uNjcyIDEuNS0xLjUgMS41em03LjUgMGMtLjgyOCAwLTEuNS0uNjcyLTEuNS0xLjVzLjY3Mi0xLjUgMS41LTEuNSAxLjUuNjcyIDEuNSAxLjUtLjY3MiAxLjUtMS41IDEuNXoiLz48L3N2Zz4="
  ></img>,
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNSIgdmlld0JveD0iMCAwIDI0IDI1Ij48cGF0aCBkPSJNMjEuMjkyIDEwLjM0OWMtLjM2LTMuOTA4LTIuNjk4LTYuNTgtNi4yLTcuNTYyLS44NzQtLjI0Ni0yLjYxNy0uNjIyLTEuMDkyLTIuNzg3LTQuODcgMC0xMC43MjkgNC4yMzUtMTEuMjkyIDEwLjM0OS0xLjg1OS4xNjUtMi43MDggMS45MjEtMi43MDggMy45NjQgMCAxLjc1NS45NzUgMy45NjcgMy4xMDQgNC44OTEgMi45MzUgNS4zNzEgNy41MzQgNS43OTYgOC44OTYgNS43OTZzNS45NjEtLjQyNSA4Ljg5Ni01Ljc5NmMyLjEyOS0uOTI1IDMuMTA0LTMuMTM2IDMuMTA0LTQuODkxIDAtMi4wMTktLjg0MS0zLjc5OC0yLjcwOC0zLjk2NHptLTEuNDI1IDcuMTFjLS4yNDYuMDgzLS40NS4yNTktLjU2OS40OTEtMi40MDYgNC42ODYtNi4xOTQgNS4wNS03LjI5OCA1LjA1cy00Ljg5Mi0uMzY0LTcuMjk4LTUuMDVjLS4xMTktLjIzMS0uMzIzLS40MDctLjU2OS0uNDkxLTIuNDQ4LS44MjktMi41NTMtNC4zNjQtMS41NTMtNS4wMTIuMjM1LS4xNTIuNTMxLS4xMTYuNjcxLS4wNTMuNjYxLjI5MyAxLjQwNi0uMTkxIDEuNDA2LS45MTQgMC0xLjAxOS4xNTEtMS45MzguNDMtMi43NTcgMS4wOTItMi41NiAzLjEyMSAxLjM2NCA2LjkxMyAxLjM2NCAzLjc5MyAwIDUuODIyLTMuOTI1IDYuOTEzLTEuMzYzLjI3OC44MTkuNDMgMS43MzguNDMgMi43NTYgMCAuNzI1Ljc0NiAxLjIwNyAxLjQwNi45MTQuMTQtLjA2My40MzYtLjEuNjcxLjA1MyAxIC42NDguODk1IDQuMTgzLTEuNTUzIDUuMDEyem0tMy4zNjctMy45NTljMCAuODI4LS41NiAxLjUtMS4yNSAxLjVzLTEuMjUtLjY3Mi0xLjI1LTEuNS41Ni0xLjUgMS4yNS0xLjUgMS4yNS42NzIgMS4yNSAxLjV6bS03Ljc1IDEuNWMtLjY5IDAtMS4yNS0uNjcyLTEuMjUtMS41cy41Ni0xLjUgMS4yNS0xLjUgMS4yNS42NzIgMS4yNSAxLjUtLjU2IDEuNS0xLjI1IDEuNXptLjI1IDNoNnMtLjc2NSAyLjM1NC0zIDIuMzU0Yy0yLjE1MyAwLTMtMi4zNTQtMy0yLjM1NHoiLz48L3N2Zz4="
  ></img>,
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjEuMTc0IDguMjA1Yy0uNDI3LTQuOTQzLTQuMDgyLTcuMjA1LTkuMTc0LTcuMjA1LTUuMTQzIDAtOC43NTEgMi4zMTEtOS4xNzQgNy4yMDUtMi4wMjYuMTQyLTIuODI2IDIuMDc5LTIuODI2IDQuMjIxIDAgMS44ODguODYxIDQuNjI3IDMuMTc2IDUuMTU5IDEuMTkzIDMuNTQ2IDQuMjI5IDUuNDE1IDguODI0IDUuNDE1czcuNjMxLTEuODY5IDguODI0LTUuNDE1YzIuMzE1LS41MzIgMy4xNzYtMy4yNzEgMy4xNzYtNS4xNTkgMC0yLjEyOC0uNzk0LTQuMDc5LTIuODI2LTQuMjIxem0tMS4xNDEgNy40NzFjLS40NDkuMDA5LS44MzYuMzE1LS45NDkuNzQ5LS43ODcgMy4wMzYtMy4xNyA0LjU3NS03LjA4NCA0LjU3NXMtNi4yOTctMS41MzktNy4wODMtNC41NzVjLS4xMTMtLjQzNC0uNS0uNzQtLjk0OS0uNzQ5LTIuMTM1LS4wNDEtMi40MzgtNC42NS0xLjMzNi01LjM2Ny4yNzItLjE3Ny42MTQtLjEwNC43NTYtLjA0MS42NzEuMyAxLjQyNy0uMjA3IDEuNDA2LS45NDEtLjA3MS0yLjUyNi45MzEtNC42NDcgMy4yMy01LjcwNi0uNjYzIDIuODIzIDIuMjA1IDUuNjM4IDYuNjcyIDQuNTk4LTQuMDEyLTEuMDk4LTEuMDU2LTYuMjIxIDIuMzUyLTMuOTU0IDEuNjA4IDEuMjE3IDIuMjE0IDMuMDcyIDIuMTYgNS4wNjMtLjAyMS43MzkuNzQzIDEuMjM5IDEuNDA2Ljk0MS4xNDItLjA2NC40ODMtLjEzNy43NTYuMDQxIDEuMTAxLjcxNi43OTggNS4zMjUtMS4zMzcgNS4zNjZ6bS0zLjUzMy00LjE3NmMwIC44MjgtLjU2IDEuNS0xLjI1IDEuNXMtMS4yNS0uNjcyLTEuMjUtMS41LjU2LTEuNSAxLjI1LTEuNSAxLjI1LjY3MiAxLjI1IDEuNXptLTcuNzUgMS41Yy0uNjkgMC0xLjI1LS42NzItMS4yNS0xLjVzLjU2LTEuNSAxLjI1LTEuNSAxLjI1LjY3MiAxLjI1IDEuNS0uNTYgMS41LTEuMjUgMS41em0tLjc1IDNoOHMtLjg0NCAyLjg3NS00IDIuODc1Yy0zLjI1IDAtNC0yLjg3NS00LTIuODc1eiIvPjwvc3ZnPg=="
  ></img>,
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI2IDI0Ij48cGF0aCBkPSJNMTcuNSAxMi41YzAgLjgyOC0uNTYgMS41LTEuMjUgMS41cy0xLjI1LS42NzItMS4yNS0xLjUuNTYtMS41IDEuMjUtMS41IDEuMjUuNjcyIDEuMjUgMS41em0tNy43NS0xLjVjLS42OSAwLTEuMjUuNjcyLTEuMjUgMS41cy41NiAxLjUgMS4yNSAxLjUgMS4yNS0uNjcyIDEuMjUtMS41LS41Ni0xLjUtMS4yNS0xLjV6bTMuMjUgOC4zNTRjMi4yMzUgMCAzLTIuMzU0IDMtMi4zNTRoLTZzLjg0NyAyLjM1NCAzIDIuMzU0em0xMy02Ljc1YzAgMi44NjUtLjc5MSA1Ljc3OC0xLjkzMyA4LjI0My0uNTQyIDEuMTY5LTEuMTYzIDIuMjM4LTEuODE3IDMuMTUzbC0zLjc5Ni0xLjkxN2MtMS41NTYgMS4xODctMy4zNyAxLjkxNy01LjQ1NCAxLjkxNy0xLjk5MyAwLTMuODI1LS43NDktNS40MDgtMS45NDFsLTMuODQyIDEuOTQxYy0uNjU0LS45MTUtMS4yNzUtMS45ODQtMS44MTctMy4xNTMtMS4xNDItMi40NjUtMS45MzMtNS4zNzgtMS45MzMtOC4yNDMgMC03LjU5IDUuMjgxLTEyLjYwNCAxMy0xMi42MDRzMTMgNS4wMTQgMTMgMTIuNjA0em0tNS42NjkgNC4yODVjLjEyMy0uMjAyLjMxMy0uMzU0LjUzNi0uNDMgMi4xMDYtLjcxMyAyLjU3LTMuNTI5IDEuODAyLTQuNzQ2LTYuNTc2LS4zOS0xMC44OS0zLjM2My0xMi42NjktNi4zMjItMi4yNTcgNS4wNjMtNS4wNzggNi42MjgtNi44NjMgNi43OTUtLjQ4MiAxLjcxNC4zMjIgMy43MDYgMS45OTYgNC4yNzMuMjI0LjA3Ni40MTMuMjI4LjUzNi40MyAxLjcwOCAyLjgzIDQuMDE1IDUuMTExIDcuMzMxIDUuMTExIDMuMzE4IDAgNS42MjQtMi4yODQgNy4zMzEtNS4xMTF6Ii8+PC9zdmc+"
  ></img>,
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOSIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI5IDI0Ij48cGF0aCBkPSJNMjEuMjkyIDkuMzQ5Yy0uNDMtNC44MTMtMy42MDQtOS4zNDktOS4yOTItOS4zNDlzLTguODYyIDQuNTM2LTkuMjkyIDkuMzQ5Yy0xLjg1OS4xNjUtMi43MDggMS45MjEtMi43MDggMy45NjQgMCAxLjc1NS45NzUgMy45NjcgMy4xMDQgNC44OTEgMi45MzUgNS4zNzEgNy41MzQgNS43OTYgOC44OTYgNS43OTZzNS45NjEtLjQyNSA4Ljg5Ni01Ljc5NmMyLjEyOS0uOTI1IDMuMTA0LTMuMTM2IDMuMTA0LTQuODkxIDAtMi4wMTktLjg0MS0zLjc5OC0yLjcwOC0zLjk2NHptLTEuNDI1IDcuMTFjLS4yNDYuMDgzLS40NS4yNTktLjU2OS40OTEtMi40MDYgNC42ODYtNi4xOTQgNS4wNS03LjI5OCA1LjA1cy00Ljg5Mi0uMzY0LTcuMjk4LTUuMDVjLS4xMTktLjIzMS0uMzIzLS40MDctLjU2OS0uNDkxLTIuNDQ4LS44MjktMi41NTMtNC4zNjQtMS41NTMtNS4wMTIuMjA2LS4xMzMuNDktLjEzNC42NzEtLjA1My42Ni4yOTIgMS40MDYtLjE4OSAxLjQwNi0uOTE0bC4wMi0uNTY2YzEuODAzLS40MDYgNC4zMzEtMi43NzQgNC45NjQtNC4wMzktLjA2OS44NTItLjg5MSAzLjI1NC0yLjA3NiA0LjA2MyAyLjc0OCAwIDYuMjUtMi41MDcgNy42ODUtNC44MjguMDg4IDIuMDgxIDIuMTE0IDQuMDE2IDQuMDM1IDQuMzExLjAzNC4zNTQuMDU4LjcwNy4wNTggMS4wNTkgMCAuNzIzLjc0NSAxLjIwNyAxLjQwNi45MTQuMTQxLS4wNjMuNDM1LS4xLjY3MS4wNTMgMSAuNjQ4Ljg5NSA0LjE4My0xLjU1MyA1LjAxMnptLTMuMzY3LTMuOTU5YzAgLjgyOC0uNTYgMS41LTEuMjUgMS41cy0xLjI1LS42NzItMS4yNS0xLjUuNTYtMS41IDEuMjUtMS41IDEuMjUuNjcyIDEuMjUgMS41em0tNy43NSAxLjVjLS42OSAwLTEuMjUtLjY3Mi0xLjI1LTEuNXMuNTYtMS41IDEuMjUtMS41IDEuMjUuNjcyIDEuMjUgMS41LS41NiAxLjUtMS4yNSAxLjV6bS4yNSAzaDZzLS43NjUgMi4zNTQtMyAyLjM1NGMtMi4xNTMgMC0zLTIuMzU0LTMtMi4zNTR6bTIwIDBjLTIuNzgxLjc5Ny0zLjcxNy0xLjA2LTQtNC0uNDk2LTUuMTUyLS45NzMtOC45MjYtNC4wNTEtOC4yNTUtLjM3OC0uODQ0LS44NC0xLjY4My0xLjU4OC0yLjQ3Ny44NzMtMS4xMjcgMi41MzMtMi4yNjggNC40MzEtMi4yNjggNy4zMTYgMCAzLjc3IDExLjQ5MSAzLjc3IDE0IDAgMS41LjI5NCAyLjMyMyAxLjQzOCAzeiIvPjwvc3ZnPg=="
  ></img>,
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDI2IDI2Ij48cGF0aCBkPSJNMTAgMTguOTkzaDZzLS43NjUgMi4zNTQtMyAyLjM1NGMtMi4xNTMgMC0zLTIuMzU0LTMtMi4zNTR6bTguOTI3LTMuOTk1YzAgMS4yNjItMS4xNzEgMi4yNS0yLjY2NyAyLjI1LTEuMTM4IDAtMS45NTQtLjU3Ny0yLjM5NC0xLjQwNC0uMjI5LS40MzItLjQxMi0uOTMyLS44NjctLjkzMnMtLjYzOC41LS44NjcuOTMyYy0uNDM5LjgyOC0xLjI1NSAxLjQwNC0yLjM5NCAxLjQwNC0xLjQ5NSAwLTIuNjY3LS45ODgtMi42NjctMi4yNXMxLjE3MS0yLjI1IDIuNjY3LTIuMjVjMS4wMSAwIDEuODYyLjQ1NiAyLjMxNSAxLjEzOC4zMDctLjEwMi42MTUtLjE1My45NDUtLjE1M3MuNjM4LjA1MS45NDUuMTUzYy40NTMtLjY4MSAxLjMwNS0xLjEzOCAyLjMxNS0xLjEzOCAxLjQ5OCAwIDIuNjY5Ljk4OCAyLjY2OSAyLjI1em0tOC4wMjEgMGMwLS40MTQtLjUyMi0uNzUtMS4xNjctLjc1cy0xLjE2Ny4zMzYtMS4xNjcuNzUuNTIyLjc1IDEuMTY3Ljc1IDEuMTY3LS4zMzYgMS4xNjctLjc1em02LjUyMSAwYzAtLjQxNC0uNTIyLS43NS0xLjE2Ny0uNzVzLTEuMTY3LjMzNi0xLjE2Ny43NS41MjIuNzUgMS4xNjcuNzUgMS4xNjctLjMzNiAxLjE2Ny0uNzV6bTguNTczLTIuMjk1YzAgMi4xOTYtLjk1IDQuMzItMiA1LjcyOGgtLjAwMmMtLjUwOS43NDEtMS4yMDggMS4zODYtMi4xMzcgMS43ODEtMi4zNDkgMy43MzEtNS40ODQgNS43ODEtOC44NjEgNS43ODFzLTYuNTE0LTIuMDUtOC44NjEtNS43ODFjLS45MjktLjM5NS0xLjYyOC0xLjA0LTIuMTM3LTEuNzgxaC0uMDAyYy0xLjA1LTEuNDA3LTItMy41MzEtMi01LjcyOCAwLTUuNjEzIDMuMDk5LTkuNDgyIDkuMzA2LTguMDc1LS43ODEtLjY3OS0xLjkyNC0xLjE0OC0zLjA4LTEuMzUxIDIuMTY4LTIuOTk1IDUuNDMtMy4yODQgNi43NzQtMy4yODRzNC42MDYuMjg5IDYuNzc0IDMuMjg0Yy0xLjE1Ni4yMDMtMi4zLjY3Mi0zLjA4IDEuMzUxIDYuMTIxLTEuMzg4IDkuMzA2IDIuMzU2IDkuMzA2IDguMDc1em0tNS45ODUtLjk4MWMtNC43NTcuMjgtNy4wMTUtMi4xMzUtNy4wMTUtMy40NTggMCAxLjMyNC0yLjI1NyAzLjczOC03LjAxNSAzLjQ1OC0yLjU1NyA3LjgxOSAyLjkxNCAxMi4yNzEgNy4wMTUgMTIuMjcxIDMuODk0IDAgOS42NDItNC4yMzcgNy4wMTUtMTIuMjcxeiIvPjwvc3ZnPg=="
  ></img>,
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjE3OCAxMWgtMS4xNzh2LTIuMjA5Yy40NjggMCAuNzc0LS40NzQuOTQ0LS45OTcuNTg3LTEuODAzIDEuNTktNC41MTMgNC4wNTYtNi4yMTJ2My40MThjMCAuNTUyLjQ0OCAxIDEgMXMxLS40NDggMS0xdi00LjQzN2MuODY4LS4zMDkgMS44NjEtLjUxNiAzLS41ODV2My4wMjJjMCAuNTUyLjQ0OCAxIDEgMXMxLS40NDggMS0xdi0zYzEuMTM0LjA5NCAyLjEyOC4zMjcgMyAuNjYxdjQuMzM5YzAgLjU1Mi40NDggMSAxIDFzMS0uNDQ4IDEtMXYtMy4yNjljMi4zOTEgMS43IDMuNDYzIDQuMzA0IDQuMDU3IDYuMDYzLjE3NS41Mi40NzUuOTk3Ljk0My45OTd2Mi4yMDloLTEuMTc5Yy41NzUuNDU5IDEuMTc5IDEuMzYgMS4xNzkgMy4xMzEgMCAxLjYzLS45MDQgMy42ODYtMi44NzcgNC41MzEtMi4xNTMgMy40NDUtNS4wMjcgNS4zMzgtOC4xMjMgNS4zMzgtMy4wOTYgMC01Ljk3LTEuODkzLTguMTI0LTUuMzM4LTEuOTczLS44NDUtMi44NzYtMi45MDEtMi44NzYtNC41MzEgMC0xLjc3MS42MDMtMi42NzIgMS4xNzgtMy4xMzF6bTEyLjAyMiA3LjQ1OWgtNC40Yy4wMDQuMDEyLjYyNiAxLjc0IDIuMiAxLjc0IDEuNjM0IDAgMi4xOTYtMS43MjggMi4yLTEuNzR6bTQuNTE3LTcuNDU5aC0xMy40MzVsLS4wMTMuNTE1YzAgLjY2OC0uNjgyIDEuMTE0LTEuMjg4Ljg0NC0uMTY5LS4wNzUtLjQzLS4wNzMtLjYxNy4wNDktLjkxNy42MDEtLjgxOSAzLjg2NCAxLjQyNSA0LjYyOS45MTYuMzEzIDIuMzY0IDMuMTAzIDMuOTMuMzk4LjU0Mi0uOTM0IDIuMjUxLTEuMDM5IDMuMjgxLS4yOTcgMS4wMjktLjc0MiAyLjczOS0uNjM3IDMuMjguMjk3IDEuNTY2IDIuNzA1IDMuMDE0LS4wODUgMy45My0uMzk4IDIuMjQ0LS43NjUgMi4zNDItNC4wMjggMS40MjUtNC42MjktLjIxNS0uMTQtLjQ4Ny0uMTA2LS42MTYtLjA0OS0uNjA2LjI3MS0xLjI4OS0uMTc2LTEuMjg5LS44NDRsLS4wMTMtLjUxNXptLTkuNjk2Ljk5NmMtLjYzNCAwLTEuMTQ2LjYyLTEuMTQ2IDEuMzg1cy41MTIgMS4zODUgMS4xNDYgMS4zODVjLjYzMiAwIDEuMTQ2LS42MiAxLjE0Ni0xLjM4NXMtLjUxNC0xLjM4NS0xLjE0Ni0xLjM4NXptNy4xMDQgMS4zODVjMCAuNzY1LS41MTMgMS4zODUtMS4xNDYgMS4zODUtLjYzMyAwLTEuMTQ2LS42Mi0xLjE0Ni0xLjM4NXMuNTEzLTEuMzg1IDEuMTQ2LTEuMzg1Yy42MzMgMCAxLjE0Ni42MiAxLjE0NiAxLjM4NXoiLz48L3N2Zz4="
  ></img>,
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDEzYy4wMDItMS4zNjYuNjE5LTIuOTMgMi4wNzUtMy41MjEtLjcyNi0xLjQzNS0xLjc1Mi0yLjU4Ny0uMzI3LTMuODggMi40NTQtMi4yMjYgNi43OTItNS41OTkgMTAuMjUyLTUuNTk5IDMuNDYgMCA3LjkgMy40MzEgMTAuMjExIDUuNTcgMS41OTcgMS40NzguNjA3IDIuMjc1LS4yODYgMy45MDkgMS41MjUuNTk2IDIuMDc1IDIuMTA1IDIuMDc1IDMuNTIxIDAgMi4yMzItMS4wOTQgNC4zNDktMy4xMzkgNS4yMTgtMi4wNjMgMy4yOTUtNC45ODcgNS43ODItOC44NjEgNS43ODItMy43NDIgMC02Ljg0Ni0yLjU2My04Ljg2Mi01Ljc4Mi0yLjAzNC0uODY0LTMuMTQxLTIuOTE1LTMuMTM4LTUuMjE4em0xNC40IDVoLTQuOGMuMDA1LjAxNS42ODQgMS44ODMgMi40IDEuODgzIDEuNzgxIDAgMi4zOTUtMS44NjggMi40LTEuODgzem03LjU5My01LjM1NmMtLjAyLjAwNS0uNy41NC0xLjc3Ny4yMjktMS41NC0uNDQ0LTMuNTItMS41MTEtOC4yMTYtMS40OTgtNC42OTUtLjAxMy02LjY3OCAxLjA0OC04LjIxNiAxLjQ5OC0uNjg3LjE4Ni0xLjMwNS4xMTktMS43NzQtLjE5OS0uMTUyIDEuMzEzLjQxNiAzLjIwNyAyLjEyMyAzLjc4NS4yMjMuMDc1LjQxMy4yMjguNTM2LjQzLjY1NSAxLjA4NSAxLjM1NCAxLjk4IDIuMDg1IDIuNzIyLjkyMy42MzMgMS4wNTYtMS44NzUgMS42NjgtMi43MjEuNjg2LS45NDkgMi40NTQtMS4xMjYgMy41NzgtLjMyMiAxLjEyMy0uODA0IDIuODkyLS42MjcgMy41NzguMzIyLjYxMS44NDYuNzQ1IDMuMzU0IDEuNjY3IDIuNzIuNzMyLS43NDEgMS40My0xLjYzNiAyLjA4Ni0yLjcyMS4xMjMtLjIwMi4zMTItLjM1NS41MzYtLjQzIDEuNzAyLS41NzcgMi4yOTktMi40OTYgMi4xMjYtMy44MTV6bS0xMy4yNDMtLjY0NGMtLjY5IDAtMS4yNS42NzEtMS4yNSAxLjUgMCAuODI4LjU2IDEuNSAxLjI1IDEuNXMxLjI1LS42NzIgMS4yNS0xLjVjMC0uODI5LS41Ni0xLjUtMS4yNS0xLjV6bTcuNzUgMS41YzAgLjgyOC0uNTYgMS41LTEuMjUgMS41cy0xLjI1LS42NzItMS4yNS0xLjVjMC0uODI5LjU2LTEuNSAxLjI1LTEuNXMxLjI1LjY3MSAxLjI1IDEuNXptMy45OTMtNS4wMzdjLTUuNDE1LTEuOTQzLTExLjU0LTIuMDI4LTE2LjkxOSAwbC43NTggMS41MzdjNC42MS0xLjQ2OSAxMC42NS0xLjUwNCAxNS4yOTUgMGwuODY2LTEuNTM3em0tNy4wNTctNS40NjNjLS4zMTYtLjQ1My0uODQyLS43NS0xLjQzNi0uNzVzLTEuMTIuMjk3LTEuNDM2Ljc1aC0zLjA3OWwxLjUxNSAyaDEuNTY0Yy4zMTYuNDUzLjg0Mi43NSAxLjQzNi43NXMxLjEyLS4yOTcgMS40MzYtLjc1aDEuNTdsMS40OTktMmgtMy4wNjl6Ii8+PC9zdmc+"
  ></img>,
  <img
    alt=""
    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xLjkxNiA2LjcyM2MxLjUzMiAxLjUzOCAzLjgxMyAzLjIyMSA1Ljc5MSA0LjE0Ny0xLjU5NyAxLjE1OC0zLjE5IDEuOTA4LTQuNzA3IDIuMTMtLjQ0NSAxLjU4MS4xOTMgMy41MTYgMS43MzggNC4wMzkuNjQ0LjIxOCAxLjExNS40MDIgMS40ODIuOTYxIDEuNDE4IDIuMTYyIDMuMzQgNCA1Ljc4IDQgMi40NCAwIDQuMTk5LTEuMzkgNS43NzUtNCAuMjMzLS4zODYuNjAyLS42NjUgMS40ODctLjk2MSAxLjk0Ni0uNjUxIDIuNDQ3LTIuOTE2IDEuNzM4LTQuMDM5LTEuNTIyLS4xODgtMy4wOTctLjk2NS00LjY4MS0yLjEzNyAxLjkzNC0uOTE2IDQuMjEtMi40OCA1Ljc2OS00LjEzNCAxLjIyOSAxLjgzOCAxLjkxMiA0LjEyOCAxLjkxMiA2Ljc1MiAwIDIuNjQ0LS43MyA1LjMzMi0xLjc4NCA3LjYwOS0uNTAxIDEuMDc5LTEuMDc0IDIuMDY1LTEuNjc4IDIuOTFsLTMuNTA0LTJjLTEuNDM2IDEuMDk3LTMuMTEgMi01LjAzNCAyLTEuODQgMC0zLjUzMS0uOS00Ljk5Mi0ybC0zLjU0NiAyYy0uNjA0LS44NDUtMS4xNzctMS44MzEtMS42NzgtMi45MS0xLjA1NC0yLjI3Ny0xLjc4NC00Ljk2NS0xLjc4NC03LjYwOSAwLTIuNjI2LjY4NS00LjkxOCAxLjkxNi02Ljc1OHptMTIuODUzIDEwLjgxNWMtLjAwMi4wMDktLjcxIDIuMTczLTIuNzY5IDIuMTczLTEuOTg0IDAtMi43NjYtMi4xNjQtMi43NjktMi4xNzNoNS41Mzh6bS01Ljc2OS01LjUzOGMtLjYzNyAwLTEuMTU0LjYxOS0xLjE1NCAxLjM4NSAwIC43NjQuNTE3IDEuMzg0IDEuMTU0IDEuMzg0LjYzNyAwIDEuMTU0LS42MiAxLjE1NC0xLjM4NCAwLS43NjYtLjUxNy0xLjM4NS0xLjE1NC0xLjM4NXptNy4xNTQgMS4zODVjMCAuNzY0LS41MTcgMS4zODQtMS4xNTQgMS4zODQtLjYzNyAwLTEuMTU0LS42Mi0xLjE1NC0xLjM4NCAwLS43NjYuNTE3LTEuMzg1IDEuMTU0LTEuMzg1LjYzNyAwIDEuMTU0LjYxOSAxLjE1NCAxLjM4NXptLTEuMTU0LTEzLjM4NWMyLjEwMiAxLjIzOCA0LjY5MSAzLjMzMSA2IDUtMi4yNjcgMi4yMjItNi4wMDIgNC45OTUtOSA1LTIuOTk4LjAwNS02LjYwMy0yLjc0Ni05LTUgMS40MzQtMS42OTkgMy45NDYtMy43NzkgNi01bDMgMiAzLTJ6Ii8+PC9zdmc+"
  ></img>,
];

export const PicturePicker = (props) => {
  const goBackHandler = () => {
    document.querySelector(".opaquePanel").classList.remove("displayed");
    document.querySelector(".coverPanel").classList.remove("displayed");
    document.querySelector(".picturePicker").classList.remove("displayed");
  };

  const currentUser = useContext(UserContext);

  return (
    <PicturePickerInsideWrapper>
      <PicturesWrapper>
        {picturesToDisplay.map((picture) => {
          return (
            <OnePicture
              style={
                picturesToDisplay.indexOf(picture) === props.picture
                  ? { backgroundColor: "#D2D2D2" }
                  : { backgroundColor: "white" }
              }
              key={uuidv4()}
              onClick={() => {
                props.changePicture(picturesToDisplay.indexOf(picture));
              }}
            >
              {picture}
            </OnePicture>
          );
        })}
      </PicturesWrapper>
      <ButtonsWrapper>
        <Button
          variant="contained"
          sx={buttonStyles}
          onClick={() => {
            updatePicture(currentUser, props.picture);
            goBackHandler();
          }}
        >
          CHANGE
        </Button>
        <Button
          variant="contained"
          sx={buttonStyles}
          onClick={() => {
            goBackHandler();
          }}
        >
          GO BACK
        </Button>
      </ButtonsWrapper>
    </PicturePickerInsideWrapper>
  );
};
