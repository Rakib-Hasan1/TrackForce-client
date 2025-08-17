import React from 'react';
import Hero from '../../Components/Hero';
import Services from '../../Components/Services';
import Testimonials from '../../Components/Testimonials';
import WhyChooseUs from '../../Components/WhyChooseUs';
import CompanyStats from '../../Components/CompanyStats';
import HRManagement from '../../Components/HRManagement';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Services></Services>
            <HRManagement/>
            <Testimonials></Testimonials>
            <WhyChooseUs></WhyChooseUs>
            <CompanyStats></CompanyStats>
        </div>
    );
};

export default Home;