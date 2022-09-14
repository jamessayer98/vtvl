import React, { useEffect, useState } from 'react';
import ImportCSVModal from './ImportCSVModal';
import MapDataModal from './MapDataModal';
import UserDataSummaryModal from './UserDataSummaryModal';

type props = {
  show: boolean;
  hide: () => void;
};

export type MappingType = {
  string: string;
};

const ImportCSVContainer = ({ show, hide }: props) => {
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [csvHeaders, setCsvHeaders] = useState<string[]>();
  const [csvData, setCsvData] = useState<{ string: string }[]>();
  const [mapping, setMapping] = useState<MappingType>();

  const updateMapping = (headerName: string, mappedCSVHeader: string) => {
    setMapping((_mapping: any) => {
      return { ...(_mapping || {}), [headerName]: mappedCSVHeader };
    });
  };

  const navigateForward = () => {
    setCurrentStep((_step) => _step + 1);
  };

  const navigateBackward = () => {
    setCurrentStep((_step) => _step - 1);
  };

  const setCSV = (headers: string[], data: typeof csvData) => {
    setCsvHeaders(headers);
    setCsvData(data);
  };

  useEffect(() => {
    if (!show) {
      // reset to first step if closed
      setCurrentStep(1);
      setMapping();
      setCsvHeaders();
      setCsvData();
    }
  }, [show]);

  return show
    ? (currentStep === 1 && <ImportCSVModal hide={hide} next={navigateForward} setCSV={setCSV} />) ||
        (currentStep === 2 && (
          <MapDataModal
            hide={hide}
            csvHeaders={csvHeaders as string[]}
            mapping={mapping}
            updateMapping={updateMapping}
            next={navigateForward}
            back={navigateBackward}
          />
        )) ||
        (currentStep === 3 && (
          <UserDataSummaryModal
            hide={hide}
            back={navigateBackward}
            mapping={mapping as MappingType}
            csvData={csvData as { string: string }[]}
          />
        ))
    : null;
};

export default ImportCSVContainer;
