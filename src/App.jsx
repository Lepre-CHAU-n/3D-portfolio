import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas,ComputersCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0'>
        <Navbar />
        <Hero />
        <StarsCanvas />
        <About />
        <Experience />
        <Tech />
        <Works />
        {/* <Feedbacks /> */}
        <div className='relative z-0'>
          <Contact />

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
