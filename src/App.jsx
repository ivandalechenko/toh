import { useState } from 'react'
import Faq from './Faq'
import Community from './Community'
import Header from './Header'
import Stats from './Stats'
import Roadmap from './Roadmap'
import Tokenomics from './Tokenomics'
import About from './About'
import Hero from './Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Header />
      <Hero />
      {/* <Stats /> */}

      <About />
      <Tokenomics />
      {/* <Community /> */}
      <Roadmap />
      <Faq />
    </div>
  )
}

export default App
