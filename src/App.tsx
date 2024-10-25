import { Route, Routes } from "react-router-dom";
import AddPostForm from "./components/AddPostForm/AddPostForm.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import About from "./containers/About/About.tsx";
import Contacts from "./containers/Contacts/Contacts.tsx";
import ShowAllPosts from "./components/ShowAllPosts/ShowAllPosts.tsx";
import PostDetails from "./components/PostDetails/PostDetails.tsx";
import Footer from "./components/Footer/Footer.tsx";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<ShowAllPosts />} />
        <Route path="/add-post" element={<AddPostForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/edit/:id" element={<AddPostForm />} />
        <Route
          path="*"
          element={<h1 className="text-center">Page Not Found</h1>}
        />
      </Routes>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
