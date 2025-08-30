import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'

export const HomePageLayout = () => {
  return (
    <>
        <header>
            <Navbar/>
        </header>
        <section>
            <Hero/>
        </section>
    </>
  )
}
