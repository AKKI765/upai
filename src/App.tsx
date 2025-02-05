import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store/store";
import Home from "../src/pages/Home";
import Counter from "../src/components/Counter";
import UserForm from "../src/components/UserForm";
import RichTextEditor from "../src/components/RichTextEditor";
import DashboardPage from "../src/pages/DashboardPage";
import SignIn from "../src/pages/SignIn";
import SignUp from "../src/pages/SignUp";
import PrivateRoute from "../src/components/PrivateRoute";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/form" element={<UserForm />} />
          <Route path="/editor" element={<RichTextEditor />} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
