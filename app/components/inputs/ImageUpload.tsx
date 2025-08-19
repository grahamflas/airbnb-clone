"use client";

import Image from "next/image";

import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var cloudinary: any;
}

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <>
      <CldUploadWidget
        onSuccess={handleUpload}
        uploadPreset="Airbnb Clone"
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <button
              className="relative hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 cursor-pointer"
              onClick={() => open?.()}
            >
              <TbPhotoPlus size={50} />

              <div className="font-semibold text-lg">Click to upload</div>

              {value && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    alt="Upload"
                    fill
                    style={{ objectFit: "cover" }}
                    src={value}
                  />
                </div>
              )}
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
