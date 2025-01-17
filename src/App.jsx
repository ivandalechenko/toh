import { useEffect, useState } from 'react'
import Faq from './Faq'
import Community from './Community'
import Header from './Header'
import Stats from './Stats'
import Roadmap from './Roadmap'
import Tokenomics from './Tokenomics'
import About from './About'
import Hero from './Hero'
import Footer from './Footer'
import Chart from './Chart'
import ReactGA from "react-ga4";


import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { walletStore } from './walletStore'

function App() {

  useEffect(() => {
    //
    // ReactGA.initialize("GTM-KWRVH52D");
    walletStore.getCurr()
  }, [])


  return (
    <div className='App'>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide} />
      <Header />
      <Hero />
      <Stats />
      <Chart />
      <About />
      <Tokenomics />
      <Community />
      <Roadmap />
      <Faq />
      <Footer />
    </div>
  )
}

export default App