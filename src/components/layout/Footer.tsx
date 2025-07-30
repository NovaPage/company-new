'use client'

import { useTranslation } from '@/hooks/useTranslation'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="w-full border-t border-border py-6 px-4 bg-background/80">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <span className="text-xs text-muted-foreground text-center">
          {t('footer.copyright')}
        </span>
      </div>
    </footer>
  )
}
