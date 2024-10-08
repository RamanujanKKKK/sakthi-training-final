import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Log from "./Log";

const { default: Submit } = require("./inputs/Submit");

let FormContainer = (props) => {
  let [dataState, setDataState] = useState([]);
  let [logText, setLogText] = useState("");
  let [dangerLog, setDangerLog] = useState(false);
  if (dataState.length == 0) {
    let data = [];
    props.children.map((element) => {
      if (element.type.displayName == "TextInput") {
        if ("value" in element.props) {
          data.push({ value: element.props.value, name: element.props.name });
        } else {
          data.push({ value: "", name: element.props.name });
        }
      } else if (element.type.displayName == "SingleOptionInput") {
        if ("value" in element.props) {
          data.push({
            value: element.props.value,
            name: element.props.name,
            options: element.props.options,
          });
        } else {
          data.push({
            name: element.props.name,
            options: element.props.options,
            value: element.props.options[0].value,
          });
        }
      } else if (element.type.displayName == "MultiOptionInput") {
        if ("value" in element.props) {
          data.push({
            name: element.props.name,
            value: element.props.value,
            options: element.props.options,
          });
        } else {
          data.push({
            name: element.props.name,
            value: [],
            options: element.props.options,
          });
        }
      } else if (element.type.displayName == "MultiFieldSelect") {
        if ("value" in element.props) {
          data.push({
            name: element.props.name,
            options: element.props.options,
            value: element.props.value,
          });
        } else {
          data.push({
            name: element.props.name,
            options: element.props.options,
            value: [],
          });
        }
      } else {
        data.push([]);
      }
    });
    setDataState(data);
  }

  const submit = (e) => {
    let data = {};
    for (let el in dataState) {
      let ele = dataState[el];
      if (!("options" in ele)) {
        if (ele.value == "") {
          setDangerLog(true);
          setLogText("Field cannot be empty");
        } else {
          setLogText("");
        }
      }
      data[ele.name] = ele.value;
    }
    for (let el in props.additionalData) {
      let ele = props.additionalData[el];
      data[ele.name] = ele.value;
    }
    axios
      .post(
        "http://" + window.location.hostname + ":8001/" + props.action,
        data
      )
      .then(async function (response) {
        if (response.status == "success") {
          setDangerLog(false);
        } else setDangerLog(true);
        setLogText(response.result);

        await props.dataHandler.updateData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const action = props.action;
  let indexELement;
  if (props.children[0].type.displayName == "TextInputHint") indexELement = 0;
  else indexELement = 0;
  return (
    <div className="form-container">
      {dataState.length != 0
        ? props.children.map((element) => {
            indexELement += 1;
            return React.cloneElement(element, {
              data: dataState,
              setDataState: setDataState,
              index: indexELement - 1,
            });
          })
        : null}
      <Submit sendData={submit}></Submit>
      <br></br>
      <Log text={logText} danger={dangerLog}></Log>
    </div>
  );
};

export default FormContainer;
