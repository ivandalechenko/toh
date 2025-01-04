import { useEffect, useState } from 'react'
import Faq from './Faq'
import Community from './Community'
import Header from './Header'
import Stats from './Stats'
import Roadmap from './Roadmap'
import Tokenomics from './Tokenomics'
import About from './About'
import Hero from './Hero'

import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { walletStore } from './walletStore'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
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
      <About />
      <Tokenomics />
      <Community />
      <Roadmap />
      <Faq />
    </div>
  )
}

export default App