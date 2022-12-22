import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { NewProject } from "./pages/NewProject";
import { Container } from "./components/Container";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { EditProject } from "./pages/EditProject";

function App() {

  return (
    <Router>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<EditProject />} />
        </Routes >
      </Container>
      <Footer />
    </Router>
  )
}

export default App
