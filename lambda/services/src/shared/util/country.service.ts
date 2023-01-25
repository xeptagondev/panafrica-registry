import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataListResponseDto } from '../dto/data.list.response';
import { QueryDto } from '../dto/query.dto';
import { Country } from '../entities/country.entity';

@Injectable()
export class CountryService {
    constructor(@InjectRepository(Country) private countryRepo: Repository<Country>) {
    }

    async insertCountry(country: Country) {
        return this.countryRepo.save(country)
    }

    async isValidCountry(alpha2: string) {
        return (await this.countryRepo.findOneBy({
            alpha2: alpha2
        })) != null;
    }

    async getCountryList(query: QueryDto) {

        const resp = await this.countryRepo
            .createQueryBuilder()
            .select([
                '"alpha2"',
                '"name"'
            ])
            .orderBy(query?.sort?.key && `"${query?.sort?.key}"`, query?.sort?.order)
            .offset(query.size * query.page - query.size)
            .limit(query.size)
            .getRawMany();
            
            console.log(resp)
            return new DataListResponseDto(
            resp,
            undefined
            );
    }
}
