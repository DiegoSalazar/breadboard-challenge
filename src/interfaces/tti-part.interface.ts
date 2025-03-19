import { PriceBreak } from "./aggregated-part.interface";

export type TtiPart = {
  ttiPartNumber: string;
  manufacturerPartNumber: string;
  manufacturerCode: string;
  manufacturer: string;
  salesMinimum: number;
  salesMultiple: number;
  partSearchId: string;
  availableToSell: number;
  buyUrl: string;
  datasheetURL: string;
  description: string;
  pricing: {
    vipPrice: string;
    quantityPriceBreaks: PriceBreak[];
  };
  packaging: string;
  leadTime: string;
  partNCNR: string;
  hts: string;
  category: string;
  imageURL: string;
  exportInformation: {
    eccn: string;
    hts: string;
  };
  environmentalInformation: {
    rohsStatus: string;
    leadInTerminals: string;
    reachSVHC: string;
    reachSubstanceName: string;
  };
  roHsStatus: string;
};
