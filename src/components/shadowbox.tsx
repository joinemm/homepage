import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Art, getAssetUrl } from '../util/content-manager';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { MdChevronLeft, MdChevronRight, MdClose } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';

type Props = { art: Art; unselect: Function };

const Shadowbox = ({ art, unselect }: Props) => {
  const allFiles = [art.file, ...art.extra_files];

  const [carouselIndex, setCarouselIndex] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageWidth, setImageWidth] = useState(window.innerWidth);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => setWindowWidth(window.innerWidth), []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndex((carouselIndex + 1) % allFiles.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndex(Math.abs(carouselIndex - 1) % allFiles.length);
  };

  useEffect(() => {
    if (!imageRef?.current?.clientHeight) {
      return;
    }
    setImageWidth(imageRef?.current?.clientWidth);
  }, [imageRef?.current?.clientWidth]);

  console.log(windowWidth);

  return (
    <div className="fixed top-0 left-0 z-40 w-screen h-screen overflow-y-scroll bg-black bg-opacity-80">
      <button
        className="fixed top-4 right-4 z-50 mt-1 rounded-full border-2 bg-black bg-opacity-30 p-1 text-white"
        type="button"
        onClick={() => unselect()}
      >
        <MdClose size={30} />
      </button>

      <div
        className="flex flex-col items-center justify-center gap-2"
        onClick={() => unselect()}
      >
        <TransformWrapper key={art.id} centerOnInit={true}>
          <figure className="relative flex items-center w-screen min-h-screen">
            <div className="absolute w-screen h-screen mx-auto my-0">
              <TransformComponent>
                <Image
                  ref={imageRef}
                  key={allFiles[carouselIndex].id}
                  src={getAssetUrl(allFiles[carouselIndex].id, 'orig')}
                  alt={allFiles[carouselIndex].title}
                  width={allFiles[carouselIndex].width}
                  height={allFiles[carouselIndex].height}
                  style={{
                    width: 'auto',
                    maxHeight: `min(100dvh, ${allFiles[carouselIndex].height}px)`,
                    maxWidth: `100vw`,
                    objectFit: 'contain',
                    margin: 'auto',
                    top: 0,
                    bottom: 0,
                    pointerEvents: 'auto',
                  }}
                  placeholder={
                    allFiles[carouselIndex].placeholder ? 'blur' : undefined
                  }
                  blurDataURL={allFiles[carouselIndex].placeholder}
                  quality={100}
                  unoptimized={true}
                  priority={true}
                  onClick={(e) => e.stopPropagation()}
                />
              </TransformComponent>
            </div>
            {windowWidth > imageWidth ? (
              <div
                className="mx-auto"
                style={{
                  transform: `translateX(${imageWidth / 2}px) translateX(50%)`,
                  maxWidth: `${(windowWidth - imageWidth) / 2}px`,
                }}
              >
                <div className="ml-4">
                  <div
                    className=" relative border-2 p-3 mono drop-shadow-md drop bg-black bg-opacity-30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="my-0 font-bold italic text-lg">{art.title}</p>
                    <p className="my-0">{art.year}</p>
                    <p className="my-1">{art.medium}</p>
                    <p className="m-0 italic text-sm">{art.description}</p>
                  </div>
                  {allFiles.length > 1 && (
                    <div className="flex items-center justify-center">
                      <button
                        onClick={prevImage}
                        type="button"
                        className="opacity-70 hover:opacity-100"
                      >
                        <MdChevronLeft size={30} />
                      </button>
                      {[...Array(allFiles.length)].map((_, i) => (
                        <GoDotFill
                          key={i}
                          size={18}
                          className={
                            i === carouselIndex ? 'opacity-100' : 'opacity-70'
                          }
                        />
                      ))}
                      <button
                        onClick={nextImage}
                        type="button"
                        className="opacity-70 hover:opacity-100"
                      >
                        <MdChevronRight size={30} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="absolute left-2 top-2 mono">
                  <p className="font-bold m-0">{art.title}</p>
                  <p className='m-0'>{art.year}</p>
                </div>
                {allFiles.length > 1 ? (
                  <>
                    <button
                      onClick={prevImage}
                      type="button"
                      className="absolute text-white opacity-80 hover:opacity-100 drop-shadow-lg"
                    >
                      <MdChevronLeft size={40} />
                    </button>
                    <div className="absolute flex left-1/2 bottom-14 -translate-x-1/2">
                      {[...Array(allFiles.length)].map((_, i) => (
                        <GoDotFill
                          key={i}
                          size={15}
                          className={
                            i === carouselIndex ? 'opacity-100' : 'opacity-70'
                          }
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextImage}
                      type="button"
                      className="absolute text-white opacity-80 hover:opacity-100 right-0 drop-shadow-lg"
                    >
                      <MdChevronRight size={40} />
                    </button>
                  </>
                ) : null}
              </>
            )}
          </figure>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default Shadowbox;
