## Description

Breadboard code challenge submission. This Typescript/NestJS based backend implementation satisfies the requirements outlined in: https://docs.google.com/document/d/1HS2yNoiGl4SIFQcv5Y1Sr5z8QJft0ESoSvuMpHPOh8E/edit?tab=t.0

- Splits up the fetching and transformation of parts data from disparate suppliers into `service` objects, providing a future proof pattern for scaling up to N services.
- Uses `Promise.allSettled` to ignore failed service calls while still returning data from other services.
- Authentication and config can be specified for each `service` by injecting a different `HttpService` wrapper with the proper config.
- Parts data from all suppliers is aggregated into a single `AggregatedPart` object by the `PartsService`.
- Functionality is proven via the unit and e2e tests and the provided `curl` commands below.

## Project setup

```bash
git clone https://github.com/DiegoSalazar/breadboard-challenge.git
npm install
npm run start
```

## Run tests

```bash
# example successful request returns AggregratedParts of the given part number
curl 'http://localhost:3000/parts/aggregate?partNumber=0510210200'

# or for prettier out if you have jq installed
curl 'http://localhost:3000/parts/aggregate?partNumber=0510210200' | jq

# example request that returns "none found"
curl 'http://localhost:3000/parts/aggregate?partNumber=123'

# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Stay in touch

- Author - [Diego Salazar](https://www.linkedin.com/in/diegoesalazar)
- Website - [github.com/DiegoSalazar](https://github.com/DiegoSalazar)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
