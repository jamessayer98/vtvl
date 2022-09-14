import React, { useState } from 'react';
import ModalLayout from './ModalLayout';
import Image from 'next/image';
import headers from '../constants/headers';
import { MappingType } from './ImportCSVContainer';

type props = {
  hide: () => void;
  csvHeaders: string[];
  next: () => void;
  back: () => void;
  mapping?: MappingType;
  updateMapping: (headerName: string, mappedCSVHeader: string) => void;
};

const MapDataModal = ({ hide, csvHeaders, mapping, updateMapping, next, back }: props) => {
  const handleOnChangeSelection = (e: any, header: string) => {
    updateMapping(header, e.target.value);
  };

  return (
    <ModalLayout title="Import from CSV file" stepCurrent={2} stepTotal={3} onClose={hide}>
      <div className="text-sm text-gray-500 mt-2 text-start">
        Indicate field to map to the <span className="font-bold">VTVL</span> data.
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex items-start">
          <span className="mr-[10px] text-sm">VTVL column header</span>
          <Image src="/icons/help_circle.svg" width={10} height={10} className="" />
        </div>
        <div className="flex items-start">
          <span className="mr-[10px] text-sm">
            Imported column header <span className="text-[#F9623B]">*</span>
          </span>
          <Image src="/icons/help_circle.svg" width={10} height={10} />
        </div>
      </div>
      {headers.map((header) => (
        <div className="mt-3 text-left flex gap-3" key={header}>
          <div className="flex-1 flex gap-3">
            <div className="rounded-full border border-shade-300 text-sm leading-6 text-[#BEC4CE] px-6 py-[14px] shadow-sm w-full">
              {header}
            </div>
            <Image src="/icons/arrow.svg" width={12} height={12} />
          </div>
          <div className="select-wrapper flex-1">
            <select
              className="rounded-full border border-shade-300 text-sm leading-6 text-[#344054] pl-6 py-[14px] pr-[50px] w-full"
              onChange={(e) => handleOnChangeSelection(e, header)}
              defaultValue={mapping && mapping.hasOwnProperty(header) ? mapping[header] : ''}
            >
              <option hidden disabled value="">
                -- select an option --
              </option>
              {csvHeaders.map((csvHeader) => (
                <option value={csvHeader} key={csvHeader}>
                  {csvHeader}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <div className="flex gap-3 mt-8">
        <button className="border border-gray-300 shadow-xs rounded-full py-[10px] px-[18px] flex-1" onClick={back}>
          Back
        </button>
        <button
          className="bg-primary border border-primary text-white shadow-xs rounded-full py-[10px] px-[18px] flex-1"
          disabled={!mapping || Object.keys(mapping).length !== headers.length}
          onClick={next}
        >
          Continue
        </button>
      </div>
    </ModalLayout>
  );
};

export default MapDataModal;
