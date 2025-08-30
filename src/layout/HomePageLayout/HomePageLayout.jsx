import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import ProductGrid from '../../components/ProductGrid'

export const HomePageLayout = () => {
  return (
    <>
        <header>
            <Navbar/>
        </header>
        <section>
            <Hero/>
        </section>
        <section>
            <ProductGrid/>
        </section>
    </>
  )
}
