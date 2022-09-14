import { ReactNode } from 'react';
import Image from 'next/image';

type props = {
  children: ReactNode;
  title: string;
  stepCurrent?: number;
  stepTotal?: number;
  onClose: () => void;
};

const ModalLayout = ({ children, title, stepCurrent, stepTotal, onClose }: props) => {
  return (
    <div className="absolute w-full h-full flex justify-center items-center bg-[#a8a8a8] shadow-xl">
      <div className="rounded-3xl p-6 bg-white w-fit min-w-[480px]">
        <div className="flex justify-between">
          <div className="flex items-center">
            <span className="font-medium text-lg leading-7 mr-3">{title}</span>
            {(stepCurrent != null || stepTotal != null) && (
              <span className="font-bold text-xs leading-6 px-2 rounded-full bg-[#EFF2F5] text-[#58667E]">
                {stepCurrent} of {stepTotal}
              </span>
            )}
          </div>
          <Image
            src="/icons/Close.svg"
            alt="close"
            width={12}
            height={12}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
