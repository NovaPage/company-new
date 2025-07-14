'use client'

import { ProfileCertifications } from '@/components/cv/ProfileCertifications'
import { ProfileEducation } from '@/components/cv/ProfileEducation'
import { ProfileExperience } from '@/components/cv/ProfileExperience'
import { ProfileHeader } from '@/components/cv/ProfileHeader'
import { ProfileProjects } from '@/components/cv/ProfileProjects'
import { ProfileSkills } from '@/components/cv/ProfileSkills'
import { ProfileSummary } from '@/components/cv/ProfileSummary'

export default function ProfilePage() {
  return (
    <main className="bg-muted/40 min-h-screen py-10 px-2">
      <section>
        <ProfileHeader />
      </section>
      <section>
        <ProfileSummary />
      </section>
      <section>
        <ProfileSkills />
      </section>
      <section>
        <ProfileExperience />
      </section>
      <section>
        <ProfileProjects />
      </section>
      <section>
        <ProfileEducation />
      </section>
      <section>
        <ProfileCertifications / >
      </section>
    </main>
  )
}
