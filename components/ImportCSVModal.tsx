import React, { useRef, useState } from 'react';
import Papa from 'papaparse';
import Image from 'next/image';
import ModalLayout from './ModalLayout';
import { templateObjectURL } from '../utils/templateCSV';

type props = {
  hide: () => void;
  next: () => void;
  setCSV: (
    headers: string[],
    data:
      | {
          string: string;
        }[]
      | undefined
  ) => void;
};

const ImportCSVModal = ({ hide, next, setCSV }: props) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState();

  const triggerUpload = () => {
    if (!inputRef.current) return;
    inputRef.current?.click();
  };

  const handleOnInputChange = (e: any) => {
    if (e.target.files[0].name) {
      setFile(e.target.files[0]);
    }
  };

  const handleOnDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length === 1 && e.dataTransfer.files[0].type === 'text/csv') {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const checkDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const readFile = () => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        if (results.errors.length) {
          console.log(results.errors);
        } else {
          const data = results.data;
          const headers = results.meta.fields;
          setCSV(headers as string[], data as { string: string }[]);
          next();
        }
      },
    });
  };

  return (
    <ModalLayout title="Import from CSV file" stepCurrent={1} stepTotal={3} onClose={hide}>
      <div className="text-sm text-gray-500 mt-2 text-start">Upload and create user to this schedule.</div>
      <div
        className="flex flex-col justify-center rounded-lg border border-gray-200 mt-5 py-4 px-6"
        data-testid="drop-target"
        onDragEnter={checkDrag}
        onDragOver={checkDrag}
        onDragLeave={checkDrag}
        onDrop={handleOnDrop}
      >
        <Image src="/icons/Upload.svg" width={40} height={40} />
        <div className="text-sm mt-3">
          <span className="text-[#F9623B] font-medium cursor-pointer" onClick={triggerUpload}>
            Click to upload
          </span>{' '}
          or drag and drop
        </div>
        <div className="text-xs leading-[18px]">{file ? file.name : 'CSV (max. size 1mb)'}</div>
      </div>
      <div className="my-8 text-start">
        Download:{' '}
        <a className="font-bold text-[#1A73E8] cursor-pointer" href={templateObjectURL} download="template.csv">
          {/*  */}
          VTVL User Template
        </a>
      </div>
      <div className="flex gap-3">
        <button className="border border-gray-300 shadow-xs rounded-full py-[10px] px-[18px] flex-1" onClick={hide}>
          Cancel
        </button>
        <button
          className="bg-primary border border-primary text-white shadow-xs rounded-full py-[10px] px-[18px] flex-1"
          onClick={readFile}
          disabled={!file}
        >
          Upload file
        </button>
        <input
          type="file"
          multiple={false}
          accept="text/csv, .csv"
          hidden
          id="file-upload"
          data-testid="file-upload"
          ref={inputRef}
          onChange={handleOnInputChange}
        />
      </div>
    </ModalLayout>
  );
};

export default ImportCSVModal;
