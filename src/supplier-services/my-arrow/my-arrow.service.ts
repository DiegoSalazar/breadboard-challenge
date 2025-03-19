import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

import { AggregatedPart } from '../../interfaces/aggregated-part.interface'
import { MyArrowProduct } from '../../interfaces/my-arrow-part.interface'

type MyArrowResponse = {
  status: string
  pricingResponse: MyArrowProduct[]
}

@Injectable()
export class MyArrowService {
  private readonly url =
    'https://backend-takehome.s3.us-east-1.amazonaws.com/myarrow.json'

  constructor(private readonly httpService: HttpService) {}

  async findParts(partNumber: string): Promise<AggregatedPart[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<MyArrowResponse>(this.url),
    );

    if (data.status !== 'SUCCESS') {
      throw Error('Failed to fetch parts data from MyArrow');
    }

    const parts = data.pricingResponse.filter(
      (p) => p.partNumber === partNumber,
    );

    return parts.map(p => {
      const aggregatedPart: AggregatedPart = {
        name: p.partNumber,
        description: p.description,
        totalStock: Number(p.fohQuantity),
        manufacturerLeadTime: p.leadTime?.supplierLeadTime,
        manufacturerName: p.manufacturer,
        packaging: p.pricingTier?.map((tier) => ({
          supplier: 'Arrow',
          type: p.pkg,
          minimumOrderQuantity: tier.minQuantity,
          quantityAvailable: tier.maxQuantity,
          unitPrice: tier.resalePrice,
          priceBreaks: [],
        })),
        productDoc:
          p.urlData.find((d) => d.type.toLowerCase() === 'datasheet')?.value ??
          '',
        productUrl:
          p.urlData.find((d) => d.type.toLowerCase() === 'part details')
            ?.value ?? '',
        productImageUrl: '',
        // @ts-ignore TODO: which fields are the specs?
        specifications: [],
        sourceParts: [],
      };
      return aggregatedPart;
    })
  }
}
