import Cropper from 'react-easy-crop';
import { useState } from 'react';
import { AtlusSlider } from '@/components/ui/slider/atlus-slider';
import { AtlusButton } from '@/components/ui/button/atlus-button';
import { HiOutlineMinus } from 'react-icons/hi2';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { CropperProps } from 'react-easy-crop/Cropper';

const zoomStep = 0.1;
const minZoom = 1;
const maxZoom = 3;

const styles: Pick<CropperProps, 'style'>['style'] = {
  cropAreaStyle: {
    borderColor: 'var(--color-orange)',
  },
};

export const ImageCropper = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const isMinZoom = zoom <= minZoom;
  const isMaxZoom = zoom >= maxZoom;

  return (
    <div>
      <div className="relative w-[300px] h-[300px]">
        <div className="crop-container h-full">
          <Cropper
            image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
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
