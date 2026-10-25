import Image from "next/image";

type FigureProps = {
  /** Path under /public. Without it, a placeholder describing the missing image is shown. */
  src?: string;
  alt: string;
  caption?: string;
  aspect?: string;
};

/** Large full-width image. */
export function Figure({ src, alt, caption, aspect = "aspect-[16/10]" }: FigureProps) {
  return (
    <figure className="my-24">
      <div className={`relative ${aspect} w-full overflow-hidden bg-[#EEF1F5]`}>
        {src ? (
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 75vw, 100vw" className="object-cover" />
        ) : (
          <span className="absolute inset-0 grid place-items-center type-small p-6 text-center text-ink/35">
            {alt}
          </span>
        )}
      </div>
      {caption && <figcaption className="type-small mt-4 text-ink-soft">{caption}</figcaption>}
    </figure>
  );
}
