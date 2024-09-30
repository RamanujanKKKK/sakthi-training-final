import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import SingleOptionInput from "../../form/inputs/SingleOptionInput";
import TextInput from "../../form/inputs/TextInput";
import DataOptionPanel from "./DataOptionPanel";

const DepartmentPanel = (props) => {
  let [currentEdit, setCurrentEdit] = useState(props.data.department[0]);
  console.log(props.data.department);
  return (
    <DataOptionPanel dataLabel="Department">
      <FormContainer
        dataHandler={props.dataHandler}
        action="addDept"
        key={Math.floor(Math.random() * 10000)}
      >
        <TextInput label="Department Name" name="name"></TextInput>
        <TextInput label="Department Head" name="head"></TextInput>
      </FormContainer>
      <FormContainer
        dataHandler={props.dataHandler}
        action="editDept"
        key={Math.floor(Math.random() * 10000)}
        additionalData={[{ name: "id", value: currentEdit.id }]}
      >
        <SingleOptionInput
          label="Department"
          name="dept"
          options={props.data.department}
          selected={currentEdit.id}
          editChange={setCurrentEdit}
        ></SingleOptionInput>
        <TextInput
          label="Department name"
          value={currentEdit.name}
          name="name"
        ></TextInput>
        <TextInput
          label="Department Head"
          value={currentEdit.head}
          name="head"
        ></TextInput>
      </FormContainer>
      <FormContainer
        dataHandler={props.dataHandler}
        action="delDept"
        key={Math.floor(Math.random() * 10000)}
        additionalData={[{ name: "id", value: currentEdit.id }]}
      >
        <SingleOptionInput
          label="Department"
          name="dept"
          options={props.data.department}
          selected={currentEdit.id}
          editChange={setCurrentEdit}
        ></SingleOptionInput>
        <div></div>
      </FormContainer>
    </DataOptionPanel>
  );
};
export default DepartmentPanel;
