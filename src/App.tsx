import {Route, Routes} from "react-router-dom";
import AddPostForm from "./components/AddPostForm/AddPostForm.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import About from "./containers/About/About.tsx";

const App = () => {

  return (
    <>
        <header>
            <NavBar/>
        </header>
        <Routes>
            <Route path="/about" element={ <About/>}/>
            <Route path="/add-post" element={ <AddPostForm/>}/>
            <Route path="*" element={<h1 className="text-center">Page Not Found</h1>}/>
        </Routes>
    </>
  )
};

export default App
