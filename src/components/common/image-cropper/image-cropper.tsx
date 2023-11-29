import Cropper from 'react-easy-crop';
import { Ref, useImperativeHandle, useState } from 'react';
import { AtlusSlider } from '@/components/ui/slider/atlus-slider';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiOutlineMinus } from 'react-icons/hi2';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { CropperProps } from 'react-easy-crop/Cropper';
import { cropImage } from '@/components/common/image-cropper/crop-utils';
import { Area } from 'react-easy-crop/types';
import { DataImageURL } from '@/types';

const zoomStep = 0.1;
const minZoom = 1;
const maxZoom = 3;

// const imagSrc =
//   'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';

const styles: Pick<CropperProps, 'style'>['style'] = {
  cropAreaStyle: {
    borderColor: 'var(--color-orange)',
  },
};

export interface ImageCropperExposedRef {
  cropImage: () => ReturnType<typeof cropImage>;
}

interface ImageCropperProps {
  imageCropperRef: Ref<ImageCropperExposedRef | undefined>;
  dataImageURL: DataImageURL;
}

export const ImageCropper = ({ imageCropperRef, dataImageURL }: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const isMinZoom = zoom <= minZoom;
  const isMaxZoom = zoom >= maxZoom;

  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  useImperativeHandle(
    imageCropperRef,
    () => {
      return {
        cropImage: async () => {
          if (croppedArea) {
            return cropImage(dataImageURL, croppedArea);
          }
          return null;
        },
      };
    },
    [croppedArea, dataImageURL]
  );

  return (
    <div>
      <div className="relative w-[300px] md:w-[500px] h-[300px] md:h-[500px]">
        <div className="crop-container h-full">
          <Cropper
            image={dataImageURL}
            crop={crop}
            zoom={zoom}
            cropShape="round"
            cropSize={{
              width: 200,
              height: 200,
            }}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="contain"
            style={styles}
            showGrid={false}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full gap-3 mt-[44px]">
        <AtlusButton
          iconOnlyIcon={<HiOutlineMinus />}
          variant="icon-only"
          color="grey"
          className="atlus-btn-24"
          disabled={isMinZoom}
          onClick={() => {
            if (!isMinZoom) {
              setZoom(zoom - zoomStep);
            }
          }}
        />
        <AtlusSlider min={minZoom} max={maxZoom} value={zoom} step={zoomStep} onChange={setZoom} />
        <AtlusButton
          iconOnlyIcon={<HiOutlinePlusSm />}
          variant="icon-only"
          color="grey"
          className="atlus-btn-24"
          disabled={isMaxZoom}
          onClick={() => {
            if (!isMaxZoom) {
              setZoom(zoom + zoomStep);
            }
          }}
        />
      </div>
    </div>
  );
};
