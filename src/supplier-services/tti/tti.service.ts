import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { TtiPart } from '../../interfaces/tti-part.interface';
import { AggregatedPart } from '../../interfaces/aggregated-part.interface';

type TtiResponse = { parts: TtiPart[] };

@Injectable()
export class TtiService {
  private readonly url =
    'https://backend-takehome.s3.us-east-1.amazonaws.com/tti.json';

  constructor(private readonly httpService: HttpService) {}

  async findParts(partNumber: string): Promise<AggregatedPart[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<TtiResponse>(this.url),
    );
    const parts = data.parts.filter((p) =>
      [p.ttiPartNumber, p.manufacturerPartNumber].includes(partNumber),
    );

    return parts.map((p) => {
      const aggregatedPart: AggregatedPart = {
        name: p.manufacturerPartNumber,
        description: p.description,
        totalStock: p.availableToSell,
        manufacturerLeadTime: Number(p.leadTime),
        manufacturerName: p.manufacturer,
        packaging: [
          {
            supplier: 'TTI',
            type: p.packaging,
            minimumOrderQuantity: p.salesMinimum,
            quantityAvailable: p.availableToSell,
            unitPrice: Number(p.pricing.vipPrice),
            priceBreaks: p.pricing.quantityPriceBreaks,
          },
        ],
        productDoc: p.datasheetURL,
        productUrl: p.buyUrl,
        productImageUrl: p.imageURL,
        // @ts-ignore TODO: which fields are the specs?
        specifications: p.datasheetURL,
        sourceParts: [],
      };
      return aggregatedPart;
    });
  }
}
