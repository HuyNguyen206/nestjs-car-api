import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Report } from "./report.entity";
import { CreateReportDto } from "./dtos/create-report.dto";
import { User } from "../user/user.entity";
import { ApproveReportDto } from "./dtos/approve-report.dto";
import { GetEstimateDto } from "./dtos/get-estimate.dto";

@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private reportRepo: Repository<Report>) {

  }

  createReport(createReport: CreateReportDto, user: User) {
    const report = this.reportRepo.create(createReport)
    report.user = user;

    return  this.reportRepo.save(report)
  }

  async approveReport(id: number, body: ApproveReportDto) {
    const report = await this.reportRepo.findOneBy({ id })
    if (!report) {
      throw new HttpException('Report not found', HttpStatus.NOT_FOUND)
    }
    report.is_approve = body.is_approve

    return  this.reportRepo.save(report)
  }

  getReports({ brand, model, lat, lng, year, mileage }: GetEstimateDto){
    return this.reportRepo.createQueryBuilder()
      .select('AVG(price)', 'price')
      // .where('brand = :brand', {brand})
      // .andWhere('model = :model', {model})
      // .andWhere('lng - :lng between -5 and 5', {lng})
      // .andWhere('lat - :lat between -5 and 5', {lat})
      // .andWhere('year - :year between -3 and 3', {year})
      .andWhere('is_approve is true')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({mileage})
      .limit(3)
      .getRawOne()
    // return this.reportRepo.find({
    //   where: {
    //     brand: reportEstimate.brand,
    //     model: reportEstimate.model,
    //     year: reportEstimate.year,
    //     mileage: reportEstimate.mileage,
    //     lat: reportEstimate.lat,
    //   },
    //   orderBy: {
    //     id: 'DESC',
    //   }
    // })
  }
}
