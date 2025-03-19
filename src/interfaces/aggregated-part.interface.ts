export type SupplierName = 'Arrow' | 'TTI';

export class PriceBreak {
  breakQuantity: number;
  unitPrice: number;
  totalPrice: number;
}

export class Packaging {
  type: string;
  minimumOrderQuantity: number;
  quantityAvailable: number;
  unitPrice: number;
  supplier: SupplierName;
  priceBreaks: PriceBreak[];
  manufacturerLeadTime?: string;
}

export class AggregatedPart {
  name: string;
  description: string;
  totalStock: number;
  manufacturerLeadTime: number;
  manufacturerName: string;
  packaging: Packaging[];
  productDoc: string;
  productUrl: string;
  productImageUrl: string;
  specifications: JSON;
  sourceParts: SupplierName[];
}
