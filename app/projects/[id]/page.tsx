'use client'

import { useParams, notFound } from 'next/navigation'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectDetailContent from '../components/ProjectDetailContent'
import MoreProjects from '../components/MoreProjects'
import { getProjectById } from '@/lib/projects'

export default function ProjectDetailPage() {
  const params = useParams()
  const id = typeof params.id === 'string' ? params.id : ''
  const project = getProjectById(id)

  if (!project) notFound()

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Header />
        <main>
          <ProjectDetailContent project={project} />
          <MoreProjects currentProjectId={project.id} />
        </main>
        <Footer />
      </div>
    </div>
  )
}
