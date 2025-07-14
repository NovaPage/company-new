'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

type Certification = {
  title: string
  entity: string
  date: string
  details?: string
  key?: string
}

// Definición de los grupos con estilos consistentes y adaptativos
const GROUPS = [
  {
    name: 'Microsoft Learn',
    color: 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground cursor-pointer font-efour tracking-wider',
    key: 'microsoft'
  },
  {
    name: 'SENA',
    color: 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground cursor-pointer font-efour tracking-wider',
    key: 'sena'
  },
  {
    name: 'Otros',
    color: 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground cursor-pointer font-efour tracking-wider',
    key: 'otros'
  },
] as const

export function ProfileCertifications() {
  const { t } = useTranslation()

  // Type guard para asegurar que t() retorna un objeto, no string
  const certsRaw = t('profile.certifications.certs')

  // Si no es un objeto (i18n mal configurado), retorna nulo seguro
  if (typeof certsRaw !== 'object' || certsRaw === null) {
    return null
  }

  // Map y tipado de certificaciones
  const allCerts: Record<string, Certification> = certsRaw as Record<string, Certification>

  // Agrupación
  const grouped: Record<'microsoft' | 'sena' | 'otros', Certification[]> = {
    microsoft: [],
    sena: [],
    otros: [],
  }

  Object.entries(allCerts).forEach(([key, cert]) => {
    const entity = (cert.entity || '').toLowerCase()
    if (entity.includes('microsoft')) {
      grouped.microsoft.push({ ...cert, key })
    } else if (entity.includes('sena')) {
      grouped.sena.push({ ...cert, key })
    } else {
      grouped.otros.push({ ...cert, key })
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
        className="bg-card/80 rounded-2xl shadow-lg border border-border px-8 py-8"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <h2 className="text-2xl text-primary font-efour mb-6 tracking-wider flex items-center gap-2 group cursor-default">
          {t('profile.certifications.title')}
        </h2>
        <Accordion type="multiple" className="space-y-5">
          {GROUPS.map((group) => (
            grouped[group.key].length > 0 && (
              <AccordionItem key={group.key} value={group.key} className="border-none">
                <AccordionTrigger
                className={`
                    flex items-center justify-center gap-3 px-4 py-4 rounded-xl font-bold text-lg
                    transition ${group.color}
                    shadow-md hover:brightness-105 hover:shadow-lg mb-2
                    outline-none ring-2 ring-transparent focus-visible:ring-primary
                    text-center
                `}
                >
                <span className="w-full text-center">{group.name}</span>
                {/* Selector más específico, busca el svg directo y sobreescribe su color */}
                <style jsx>{`
                    .accordion-trigger svg {
                    color: var(--tw-prose-invert, var(--tw-primary-foreground));
                    }
                `}</style>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-5 mt-2">
                    {grouped[group.key].map((cert, idx) => (
                      <motion.div
                        key={String(cert.key)}
                        className={`
                          bg-background rounded-xl border border-border shadow-md p-5
                          transition
                          hover:shadow-xl
                          hover:border-primary/60
                          group
                        `}
                        initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.03 * idx, duration: 0.4 }}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-1">
                          <div>
                            <span className="font-semibold text-base text-foreground group-hover:text-primary transition">
                              {cert.title}
                            </span>
                            <span className="block text-sm text-muted-foreground">{cert.entity}</span>
                          </div>
                          <span className="text-xs text-muted-foreground md:text-right">{cert.date}</span>
                        </div>
                        {cert.details && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {cert.details}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          ))}
        </Accordion>
      </motion.div>
    </motion.section>
  )
}
