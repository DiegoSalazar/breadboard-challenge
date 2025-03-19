import { Injectable } from '@nestjs/common';

import { TtiService } from '../supplier-services/tti/tti.service';
import { MyArrowService } from '../supplier-services/my-arrow/my-arrow.service';

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

    return parts;
  }
}
