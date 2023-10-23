import { ColumnsModel } from "@/domain/contracts";
import { AirTableConfig } from "@/infra/services/airtable-config";
require('dotenv').config();

const config = new AirTableConfig();
export const techConectaInstance = config.configure({
  baseUrl: process.env.AIRTABLE_BASE_URL || '',
  apiKey: process.env.AIRTABLE_API_KEY || ''
});

export class AirtableService {
  getRepository(tableName: string, columns: ColumnsModel) {
    return techConectaInstance.getRepository({
        tableName: tableName,
        columns: columns,
    });
  }
}

export class LeadService extends AirtableService {
  async create(lead: ILeadDto) {
    const resultCreated = await this.getRepository('Lead', {
      name: 'singleText',
      email: 'singleText',
      cellphone: 'singleText',
      area: 'singleText'
    }).create(lead);

    return resultCreated.id;
  }
}

export interface ILeadDto {
  name: string;
  email: string;
  cellphone: string;
  area: string;
}
