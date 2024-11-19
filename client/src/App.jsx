import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import PropertyListing from './pages/PropertyListing';
import AddProperty from './pages/AddProperty';
import UpdateProperty from './pages/UpdateProperty';
import PropertyDetails from './pages/PropertyDetails';

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/property-details/:listingId' element={<PropertyDetails />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/property-listing' element={<PropertyListing />} />
          <Route path='/add-property' element={<AddProperty />} />
          <Route path='/add-property' element={<AddProperty />} />
          <Route path='/update-property/:listingId' element={<UpdateProperty />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
