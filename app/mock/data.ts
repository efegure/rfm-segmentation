import { faker } from '@faker-js/faker';
import { RFMData } from '../types/api';

const mockData:RFMData[] = [];
// Generates random 100 new data each time
for(let i = 0; i < 100; i++) {
    mockData.push({
        id: i,
        recency: faker.number.int({ min: 1, max: 365 }),
        frequency: faker.number.int({ min: 1, max: 100 }),
        monetary: faker.number.int({ min: 1, max: 10000 }),
    })
}

export default mockData;