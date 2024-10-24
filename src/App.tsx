import {Route, Routes} from "react-router-dom";

const App = () => {

  return (
    <>
        <Routes>
            <Route path="*" element={<h1 className="text-center">Page Not Found</h1>}/>
        </Routes>
    </>
  )
};

export default App
