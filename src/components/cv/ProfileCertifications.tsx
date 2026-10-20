'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { ExternalLink, ShieldCheck, Award, Sparkles, BookOpen, Clock, Layers } from 'lucide-react'

type Certification = {
  title: string
  entity: string
  date: string
  details?: string
  key?: string
}

// URL oficial y única de transcripción compartida en Microsoft Learn de Cesar Perez
const MS_LEARN_TRANSCRIPT_URL =
  'https://learn.microsoft.com/es-es/users/cesarperez-6517/transcript/7xo1mhg24og5k5g'

const GROUPS = [
  {
    key: 'sena',
    name: 'SENA — Formación Técnica & Tecnológica (10 Certificaciones)',
    badge: '10 Cursos y Simposios'
  },
  {
    key: 'industria',
    name: 'Industria, Bootcamps & Especialización Tech (IBM, EOS, Sofka)',
    badge: '3 Certificados'
  },
] as const

export function ProfileCertifications() {
  const { t } = useTranslation()

  const certsRaw = t('profile.certifications.certs')

  if (typeof certsRaw !== 'object' || certsRaw === null) {
    return null
  }

  const allCerts: Record<string, Certification> = certsRaw as Record<string, Certification>

  const grouped: Record<'sena' | 'industria', Certification[]> = {
    sena: [],
    industria: [],
  }

  // Clasificación ordenada de todos los títulos no-Microsoft
  Object.entries(allCerts).forEach(([key, cert]) => {
    const entity = (cert.entity || '').toLowerCase()
    if (entity.includes('sena')) {
      grouped.sena.push({ ...cert, key })
    } else if (!entity.includes('microsoft')) {
      grouped.industria.push({ ...cert, key })
    }
  })

  return (
    <motion.section
      className="w-full max-w-3xl mx-auto mb-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <motion.div
        className="bg-card/80 rounded-2xl shadow-lg border border-border px-6 sm:px-8 py-8"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <h2 className="text-2xl text-primary font-efour tracking-wider flex items-center gap-2 group cursor-default">
            {t('profile.certifications.title')}
          </h2>
          <span className="text-xs text-muted-foreground font-medium">
            Historial oficial verificado
          </span>
        </div>

        {/* Card Destacada Oficial: Microsoft Learn Live Verified Transcript */}
        <div className="relative rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-background p-6 sm:p-7 shadow-md mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {/* Logotipo oficial de Microsoft */}
              <div className="w-11 h-11 rounded-xl bg-card border border-border shadow-xs flex items-center justify-center shrink-0">
                <div className="grid grid-cols-2 gap-1 w-6 h-6">
                  <div className="bg-[#f25022] rounded-[1px]" />
                  <div className="bg-[#7fba00] rounded-[1px]" />
                  <div className="bg-[#00a4ef] rounded-[1px]" />
                  <div className="bg-[#ffb900] rounded-[1px]" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-efour text-lg sm:text-xl text-primary tracking-wide">
                    Microsoft Learn
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                    <ShieldCheck className="w-3 h-3" />
                    Perfil Oficial Verificado
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  Cesar Perez (<span className="font-mono text-primary/90">@CesarPerez-6517</span>)
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed mb-5">
            Progreso continuo, rutas de aprendizaje y credenciales en <strong>Microsoft Azure, Inteligencia Artificial, Agentes Autónomos y Microsoft Entra ID</strong> sincronizadas en tiempo real directamente desde la plataforma oficial de Microsoft.
          </p>

          {/* Métricas Reales en Vivo de Cesar Perez */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="p-3 rounded-xl bg-background/80 border border-border/60 flex flex-col items-center text-center">
              <span className="text-xl sm:text-2xl font-efour text-primary tracking-wide font-bold">58</span>
              <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1 mt-0.5">
                <BookOpen className="w-3 h-3 text-primary" />
                Módulos
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background/80 border border-border/60 flex flex-col items-center text-center">
              <span className="text-xl sm:text-2xl font-efour text-primary tracking-wide font-bold">13</span>
              <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1 mt-0.5">
                <Layers className="w-3 h-3 text-primary" />
                Rutas Completas
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background/80 border border-border/60 flex flex-col items-center text-center">
              <span className="text-xl sm:text-2xl font-efour text-primary tracking-wide font-bold">42h+</span>
              <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-primary" />
                Dedicación
              </span>
            </div>
          </div>

          {/* Temas Clave */}
          <div className="flex flex-wrap items-center gap-1.5 mb-5">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-muted text-muted-foreground">
              Agentes de IA en Azure
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-muted text-muted-foreground">
              IA Generativa en AI Studio & Foundry
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-muted text-muted-foreground">
              Microsoft Entra ID (Identidad & Acceso)
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-muted text-muted-foreground">
              Minería de Conocimiento & Azure AI
            </span>
          </div>

          {/* Botón de Enlace Oficial */}
          <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Actualización automática sin registros manuales
            </span>

            <a
              href={MS_LEARN_TRANSCRIPT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-98 transition cursor-pointer"
            >
              <span>Ver Transcripción en Microsoft Learn</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Acordeón para Todos los Títulos y Certificaciones Formales Conservadas */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Títulos, Certificaciones Técnicas & Bootcamps
            </h3>
          </div>

          <Accordion type="multiple" defaultValue={['sena', 'industria']} className="space-y-4">
            {GROUPS.map((group) => (
              grouped[group.key].length > 0 && (
                <AccordionItem key={group.key} value={group.key} className="border-none">
                  <AccordionTrigger
                    className="
                      flex items-center justify-between gap-3 px-5 py-4 rounded-xl font-bold text-sm sm:text-base
                      bg-primary/10 text-primary border border-primary/20
                      hover:bg-primary hover:text-primary-foreground
                      transition shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-primary
                      cursor-pointer
                    "
                  >
                    <span>{group.name}</span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-background/80 text-foreground group-hover:bg-background/20 group-hover:text-primary-foreground">
                      {group.badge}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3.5 mt-3">
                      {grouped[group.key].map((cert, idx) => (
                        <motion.div
                          key={String(cert.key)}
                          className="bg-background rounded-xl border border-border shadow-xs p-5 transition hover:shadow-md hover:border-primary/60 group"
                          initial={{ y: 8, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.03 * idx, duration: 0.3 }}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-1.5">
                            <div>
                              <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition">
                                {cert.title}
                              </span>
                              <span className="block text-xs font-medium text-primary/80 mt-0.5">
                                {cert.entity}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground md:text-right shrink-0">
                              {cert.date}
                            </span>
                          </div>

                          {cert.details && (
                            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                              {cert.details}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            ))}
          </Accordion>
        </div>
      </motion.div>
    </motion.section>
  )
}
