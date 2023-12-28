import "./App.css";
import Data from "./data";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdate, setisUpdate] = useState(false);

  useEffect(() => {
    setData(Data);
  }, []);

  const handleEdit = (Editid) => {
    const dt = data.filter((e) => e.id === Editid);
    setisUpdate(true);
    setId(Editid);
    setfirstName(dt[0].firstName);
    setlastName(dt[0].lastName);
    setAge(dt[0].age);
  };

  const handleClear = () => {
    setId(0);
    setfirstName("");
    setlastName("");
    setAge(0);
    setisUpdate(false);
  };

  const handleDelete = (Deleteid) => {
    if (window.confirm("Are you sure to delete this data")) {
      const dt = data.filter((e) => e.id !== Deleteid);
      setData(dt);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const dt = [...data];
    const newObj = {
      id: Data.length + 1,
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    dt.push(newObj);
    setData(dt);
  };

  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear();
  };

  return (
    <div className="App">
      {/* ----- */}

      <div className="userinput">
        <div>
          <label>First Name : </label>
          <input
            type="text"
            placeholder="Enter first name"
            onChange={(e) => setfirstName(e.target.value)}
            value={firstName}
          />
        </div>

        <div>
          <label>Last Name : </label>
          <input
            type="text"
            placeholder="Enter lase name"
            onChange={(e) => setlastName(e.target.value)}
            value={lastName}
          />
        </div>

        <div>
          <label>Age : </label>
          <input
            type="number"
            placeholder="Enter Age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </div>

        {isUpdate ? (
          <button onClick={() => handleUpdate()}>Update</button>
        ) : (
          <button onClick={(e) => handleSave(e)}>Save</button>
        )}

        <button onClick={() => handleClear()}>Clear</button>
      </div>

      {/* ---- */}
      <table>
        <thead>
          <tr>
            <td>I.D</td>
            <td>First-Name</td>
            <td>Last-Name</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.id}</td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.age}</td>
                <td>
                  <button onClick={() => handleEdit(e.id)}>Edit</button>
                  <button onClick={() => handleDelete(e.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
