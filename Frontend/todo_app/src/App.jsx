import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Home } from "./Components/Home";
import { Navbar } from "./Components/Navbar";
import { AddTodoPage } from "./Components/AddTodoPage";
import { EditTodoPage } from "./Components/EditTodoPage";
import { ActivityLogsPage } from "./Components/ActivityLogsPage";

function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/add-todo" element={<AddTodoPage />}></Route>
          <Route path="/edit-todo/:id" element={<EditTodoPage />}></Route>
          <Route path="/activity-logs" element={<ActivityLogsPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
