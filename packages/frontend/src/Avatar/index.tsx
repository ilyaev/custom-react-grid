import React, { useMemo } from "react";

interface AvatarProps {
  imageUrl: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, alt = "Avatar" }) => {
  const cachedImage = useMemo(() => {
    const img = new Image();
    img.src = imageUrl;
    return img.src;
  }, [imageUrl]);

  return <img src={cachedImage} alt={alt} width={25} key={imageUrl} />;
};

export default Avatar;
