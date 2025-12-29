import React, { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
    content: string;
    onImageClick?: (src: string, alt?: string) => void;
};

const ClickableImage: React.FC<
    React.ImgHTMLAttributes<HTMLImageElement> & { onImageClick?: (src: string, alt?: string) => void }
> = (props) => {
    const [ratio, setRatio] = useState<number | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [showImage, setShowImage] = useState(false);

  const widthHint = props.width ? Number(props.width) : undefined;
  const heightHint = props.height ? Number(props.height) : undefined;
  const ratioHint = widthHint && heightHint ? widthHint / heightHint : null;
  const fallbackRatio = ratioHint || 4 / 3;

  const wrapperStyle = useMemo(() => {
    const r = ratio || fallbackRatio;
    return {
      aspectRatio: `${r}`,
      minHeight: 280,
      maxHeight: '70vh',
      overflow: 'hidden'
    };
  }, [ratio, fallbackRatio]);

  return (
    <div className="flex justify-center my-8">
      <div
        className="relative w-full max-w-full"
        style={wrapperStyle}
      >
                {!loaded && (
                    <div className="absolute inset-0 rounded-lg bg-white/5 animate-pulse blur-[1px]" />
                )}
                <img
                    {...props}
                    className={`absolute inset-0 rounded-lg shadow-2xl max-w-full h-full w-full object-contain max-h-[80vh] cursor-zoom-in transition-opacity duration-200 ${showImage ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    decoding="async"
                    style={{ margin: 0 }}
                    onLoad={(e) => {
                        if (!loaded) setLoaded(true);
                        setShowImage(true);
                        if (!ratio) {
                            const img = e.currentTarget;
                            if (img.naturalWidth && img.naturalHeight) {
                                setRatio(img.naturalWidth / img.naturalHeight);
                            }
                        }
                    }}
                    onClick={() => props.src && props.onImageClick?.(props.src, props.alt)}
                />
            </div>
        </div>
    );
};

export default function MarkdownRenderer({ content, onImageClick }: Props) {
    return (
        <article className="prose prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    img: (props) => (
                        <ClickableImage {...props} onImageClick={onImageClick} />
                    ),
                    p: (props) => (
                        <p className="mb-6 leading-relaxed text-white/80" {...props} />
                    ),
                    em: (props) => (
                        <div className="text-center text-sm text-white/50 mt-[-1rem] mb-8 font-serif tracking-widest italic block">
                            {props.children}
                        </div>
                    )
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}
