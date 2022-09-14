import { ethers } from 'ethers';
import React from 'react';
import headers from '../constants/headers';
import { MappingType } from './ImportCSVContainer';
import ModalLayout from './ModalLayout';

type props = {
  hide: () => void;
  back: () => void;
  mapping: MappingType;
  csvData: { string: string }[];
};

const UserDataSummaryModal = ({ hide, back, mapping, csvData }: props) => {
  const validateWalletAddress = (rowData: any) => {
    if (!rowData.hasOwnProperty('Wallet Address')) return false;
    const isValidAddress = ethers.utils.isAddress(rowData[mapping['Wallet Address']]);
    return isValidAddress;
  };

  return (
    <ModalLayout title="Import from CSV file" stepCurrent={3} stepTotal={3} onClose={hide}>
      <div className="text-sm text-gray-500 mt-2 text-start">
        Confirm your imported data is mapped correctly. Click <span className="font-bold">'Back'</span> to make changes
        or 'Finish' to complete adding users.
      </div>
      <table className="mt-6 text-left">
        <thead>
          <tr>
            {headers.map((header) => (
              <th className="text-xs leading-[18px] font-medium text-gray-500 px-6 py-[13px]">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="overflow-auto max-h-[80%]">
          {csvData.map((rowData) => {
            const isValid = validateWalletAddress(rowData);
            return (
              <tr className={!isValid ? 'border-2 border-rose-500' : ''}>
                {headers.map((header) => (
                  <td className="text-sm font-normal text-gray-900 px-6 py-[26px]">{rowData[mapping[header]]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex gap-3 mt-8">
        <button className="border border-gray-300 shadow-xs rounded-full py-[10px] px-[18px] flex-1" onClick={back}>
          Back
        </button>
        <button
          className="bg-primary border border-primary text-white shadow-xs rounded-full py-[10px] px-[18px] flex-1"
          onClick={hide}
        >
          Finish
        </button>
      </div>
    </ModalLayout>
  );
};

export default UserDataSummaryModal;
