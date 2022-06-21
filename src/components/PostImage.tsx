import * as React from "react";
import Image from "next/image";

const PostImage = ({ children, slug, src, alt, ...props }: any) => {
  return (
    <div className="aspect-w-1 aspect-h-1 sm:aspect-w-3 sm:aspect-h-3 md:aspect-w-16 md:aspect-h-9 rounded-lg mt-3 -mb-2 overflow-hidden">
      <Image
        {...props}
        alt={alt}
        src={`/blog/${slug}/${src.substring(2, src.length)}`}
        className="w-full rounded-lg object-cover object-center transition"
        layout={"fill"}
      />
    </div>
  );
};

export default PostImage;
