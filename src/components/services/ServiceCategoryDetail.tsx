'use client'

import Image from 'next/image'

type Item = { title: string; desc: string }
type Section = {
  title: string
  items: Array<Item | string>
}

type Props = {
  img: string
  title: string
  intro: string
  sections: Section[]
  cta?: string
}

export default function ServiceCategoryDetail({ img, title, intro, sections, cta }: Props) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Imagen de la categoría */}
      <div className="w-full flex justify-center mb-7">
        <Image
          src={img}
          alt={title}
          width={100}
          height={100}
          className="object-contain"
          priority
        />
      </div>

      {/* Título */}
      <h2 className="font-efour text-2xl md:text-3xl text-primary mb-5 tracking-wide text-center">
        {title}
      </h2>

      {/* Intro */}
      <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-8 text-center">
        {intro}
      </p>

      {/* Secciones */}
      {sections?.map((section, idx) => (
        <div key={idx} className="w-full max-w-2xl mb-8">
          <h3 className="text-primary text-lg mb-3 text-left">{section.title}</h3>
          <ul className="space-y-3 pl-2">
            {section.items.map((item, i) =>
              typeof item === 'string' ? (
                <li key={i} className="text-muted-foreground text-base">{item}</li>
              ) : (
                <li key={i} className="text-muted-foreground text-base">
                  <span className="text-primary">{item.title}:</span> {item.desc}
                </li>
              )
            )}
          </ul>
        </div>
      ))}

      {/* CTA */}
      {cta && (
        <div className="w-full max-w-2xl mt-8 text-center text-lg text-primary">
          {cta}
        </div>
      )}
    </div>
  )
}
