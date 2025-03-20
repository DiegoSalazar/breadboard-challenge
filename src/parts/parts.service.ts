import { Injectable } from '@nestjs/common';

import { TtiService } from '../supplier-services/tti/tti.service';
import { MyArrowService } from '../supplier-services/my-arrow/my-arrow.service';
import { AggregatedPart } from '../interfaces/aggregated-part.interface';

type SupplierService = (TtiService | MyArrowService)[] ;

@Injectable()
export class PartsService {
  private readonly suppliers: SupplierService;

  constructor(
    private readonly ttiService: TtiService,
    private readonly myArrowService: MyArrowService,
  ) {
    // quick and dirty registration of supplier services
    // to scale up, should iterate over a directory of services of the same Supplier superclass
    this.suppliers = [ttiService, myArrowService];
  }

  async fetchAndAggregate(partNumber: string) {
    const results = await Promise.allSettled(
      this.suppliers.map((service) => service.findParts(partNumber)),
    );
    const parts = results
      .reduce((agg, r) => [...(r.status === 'fulfilled' ? r.value : []), ...agg], []);

    if (parts.length === 0) {
      throw new Error(`No data found for part number ${partNumber}`);
    }

    const aggregatedPart: AggregatedPart = {
      name: parts[0].name,
      description: parts[0].description,
      totalStock: parts.reduce((agg, p) => agg + p.totalStock, 0),
      manufacturerLeadTime: Math.min(...parts.map((p) => p.manufacturerLeadTime)),
      manufacturerName: parts[0].manufacturerName,
      packaging: parts.reduce((agg, p) => [...agg, ...p.packaging ?? []], []),
      productDoc: parts[0].productDoc,
      productUrl: parts[0].productUrl,
      productImageUrl: parts[0].productImageUrl,
      specifications: parts[0].specifications,
      sourceParts: parts[0].sourceParts,
    }

    return aggregatedPart;
  }
}
