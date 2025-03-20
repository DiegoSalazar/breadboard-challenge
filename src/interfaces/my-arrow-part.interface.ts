type UrlDatum = {
  type: string;
  value: string;
}
type PriceTier = {
  minQuantity: number;
  maxQuantity: number;
  resalePrice: number;
}

export type MyArrowProduct = {
  itemId: number;
  warehouseId: string;
  warehouseCode: string;
  arrowReel: false;
  responseState: string;
  currency: string;
  documentId: string;
  resalePrice: string;
  fohQuantity: string;
  description: string;
  partNumber: string;
  tariffValue: string;
  tariffApplicable: string;
  minOrderQuantity: number;
  multOrderQuantity: number;
  manufacturer: string;
  mfrCode: string;
  supplier: string;
  htsCode: string;
  pkg: string;
  spq: number;
  pricingTier: PriceTier[];
  urlData: UrlDatum[];
  leadTime: {
    supplierLeadTime: number;
    supplierLeadTimeDate: string;
    arrowLeadTime: number;
  };
  arwPartNum: {
    isExactMatch: boolean;
    name: string;
  };
  suppPartNum: {
    isExactMatch: boolean;
    name: string;
  };
  bufferQuantity: number;
  euRohs: string;
  chinaRohs: string;
  quotable: boolean;
  purchasable: boolean;
  arrowInitiated: boolean;
  nonCancelableNonReturnable: boolean;
  taxonomy: string;
  partClassification: string;
  partBuyCurrency: string;
  exportControlClassificationNumberUS: string;
  exportControlClassificationNumberWAS: string;
  lifeCycleStatus: string;
  franchised: string;
  SVHC: { svhcOverThreshold: string };
};
