import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <article className="prose prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    img: (props) => (
                        <div className="flex justify-center my-8">
                            <img
                                {...props}
                                className="rounded-lg shadow-2xl max-w-full h-auto object-cover max-h-[80vh]"
                                style={{ margin: 0 }}
                            />
                        </div>
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
