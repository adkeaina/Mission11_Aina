import './App.css'
import BookList from './BookList'
import  CookieConsent from "react-cookie-consent";
import FingerPrint from './FingerPrint';


function App() {

  return (
    <>
      <BookList />
      <CookieConsent>This site uses cookies</CookieConsent>
      <FingerPrint />
    </>
  )
}

export default App
