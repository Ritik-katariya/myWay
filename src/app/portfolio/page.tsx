import About from '@/components/about/About'
import { Hero } from '@/components/hero/Hero'
import Project from '@/components/Project/Project'
import { HoverBox } from '@/components/shared/HoverBox'
import { SocialLinks } from '@/components/shared/SocialLink'
import { TimeLine } from '@/components/timeline/TimeLine'
import React from 'react'

export default function page() {
  return (
    <>
    <Hero />
    <SocialLinks />
    <About />
    <TimeLine />
    <Project />
    {/* <HoverBox /> */}
    </>
  )
}
