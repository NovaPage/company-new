'use client'

import { useEffect } from 'react'
import { ProfileCertifications } from '@/components/cv/ProfileCertifications'
import { ProfileEducation } from '@/components/cv/ProfileEducation'
import { ProfileExperience } from '@/components/cv/ProfileExperience'
import { ProfileHeader } from '@/components/cv/ProfileHeader'
import { ProfileProjects } from '@/components/cv/ProfileProjects'
import { ProfileSkills } from '@/components/cv/ProfileSkills'
import { ProfileSummary } from '@/components/cv/ProfileSummary'

export default function ProfilePage() {
  useEffect(() => {
    // Pequeño hack para asegurar que el scroll ocurra despues de la hidratación
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [])

  return (
    <main className="bg-muted/40 min-h-screen py-10 px-2">
      <section id="header" className="scroll-mt-24">
        <ProfileHeader />
      </section>
      <section id="summary" className="scroll-mt-24">
        <ProfileSummary />
      </section>
      <section id="skills" className="scroll-mt-24">
        <ProfileSkills />
      </section>
      <section id="experience" className="scroll-mt-24">
        <ProfileExperience />
      </section>
      <section id="projects" className="scroll-mt-24">
        <ProfileProjects />
      </section>
      <section id="education" className="scroll-mt-24">
        <ProfileEducation />
      </section>
      <section id="certifications" className="scroll-mt-24">
        <ProfileCertifications />
      </section>
    </main>
  )
}
