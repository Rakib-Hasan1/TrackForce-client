import React from 'react';
import Hero from '../../Components/Hero';
import Services from '../../Components/Services';
import Testimonials from '../../Components/Testimonials';
import WhyChooseUs from '../../Components/WhyChooseUs';
import CompanyStats from '../../Components/CompanyStats';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Services></Services>
            <Testimonials></Testimonials>
            <WhyChooseUs></WhyChooseUs>
            <CompanyStats></CompanyStats>
        </div>
    );
};

export default Home;