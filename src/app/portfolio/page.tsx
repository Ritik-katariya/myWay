import About from '@/components/about/About'
import { Achivements } from '@/components/achivements/Achivements'
import ContactComponent from '@/components/ContactMe/ContackMe'
import { Hero } from '@/components/hero/Hero'
import Project from '@/components/Project/Project'
import { HoverBox } from '@/components/shared/HoverBox'
import { SocialLinks } from '@/components/shared/SocialLink'
import { Testimonials } from '@/components/testimonial/Testimonials'
import { TimeLine } from '@/components/timeline/TimeLine'
import React from 'react'

export default function page() {
  return (
    <>
    <Hero />
    {/* <SocialLinks /> */}
    <About />
    <TimeLine />
    <Achivements />
    <Project />
    <Testimonials />
    <ContactComponent />
    {/* <HoverBox /> */}
    </>
  )
}
