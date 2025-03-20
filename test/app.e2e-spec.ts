import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/parts/aggregate (GET)', () => {
    return request(app.getHttpServer())
      .get('/parts/aggregate?partNumber=0510210200')
      .expect(200)
      .expect(
        '{"name":"0510210200","description":"Conn Housing RCP 2 POS 1.25mm Crimp ST Cable Mount Natural PicoBlade™ Bag","totalStock":838435,"manufacturerLeadTime":null,"manufacturerName":"Molex","packaging":[{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"1","quantityAvailable":"856","unitPrice":"0.0773","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"857","quantityAvailable":"4467","unitPrice":"0.0725","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"4468","quantityAvailable":"15220","unitPrice":"0.0651","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"15221","quantityAvailable":"24488659620","unitPrice":"0.0545","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"1","quantityAvailable":"856","unitPrice":"0.0773","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"857","quantityAvailable":"4467","unitPrice":"0.0725","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"4468","quantityAvailable":"15220","unitPrice":"0.0651","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"15221","quantityAvailable":"24488659620","unitPrice":"0.0545","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"1","quantityAvailable":"579","unitPrice":"0.114","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"580","quantityAvailable":"3026","unitPrice":"0.107","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"3027","quantityAvailable":"4999","unitPrice":"0.0961","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"5000","quantityAvailable":"10999","unitPrice":"0.0828","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"11000","quantityAvailable":"12457","unitPrice":"0.0795","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"12458","quantityAvailable":"21999","unitPrice":"0.0666","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"22000","quantityAvailable":"199999","unitPrice":"0.0638","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"200000","quantityAvailable":"999999999","unitPrice":"0.061","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"1","quantityAvailable":"856","unitPrice":"0.0773","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"857","quantityAvailable":"4467","unitPrice":"0.0725","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"4468","quantityAvailable":"15220","unitPrice":"0.0651","priceBreaks":[]},{"supplier":"Arrow","type":"EACH","minimumOrderQuantity":"15221","quantityAvailable":"24488659620","unitPrice":"0.0545","priceBreaks":[]},{"supplier":"TTI","type":"Bulk","minimumOrderQuantity":42,"quantityAvailable":226274,"unitPrice":0.12,"priceBreaks":[{"quantity":100,"price":"0.065"},{"quantity":250,"price":"0.064"}]},{"supplier":"TTI","type":"Bulk","minimumOrderQuantity":42,"quantityAvailable":226274,"unitPrice":0.12,"priceBreaks":[{"quantity":100,"price":"0.065"},{"quantity":250,"price":"0.064"}]}],"productDoc":"https://download.siliconexpert.com/pdfs2/2023/3/7/6/25/48/761619/mol_/manual/0510210200_crimp_housings.pdf","productUrl":"https://my.arrow.com/products/2384_06516206","productImageUrl":"","specifications":[],"sourceParts":[]}',
      );
  });
});
