import React from 'react'
import CalendlyComponent from './dashboard/candaly'
import Clients from './middel/clients'
import Feature_post from './middel/feature_post'
import Home_product from './middel/home_product'
import Slider_home from './middel/slider'
import Testmonial from './middel/testmonial'

function Home() {
    return (
        <>
            <Slider_home />
            <Home_product />
            <Feature_post />
            <Testmonial />
            <Clients />
            {/* <CalendlyComponent /> */}
        </>
    )
}

export default Home
