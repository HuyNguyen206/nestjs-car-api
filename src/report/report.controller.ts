import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ReportService } from "./report.service";
import { CreateReportDto } from "./dtos/create-report.dto";
import { AuthGuard } from "../guards/auth.guard";
import { CurrentUser } from "../user/decorators/current-user.decorator";
import { User } from "../user/user.entity";
import { Serialize } from "../interceptors/serialize.interceptor";
import { ReportDto } from "./dtos/report.dto";
import { ApproveReportDto } from "./dtos/approve-report.dto";
import { AdminGuard } from "../guards/admin.guard";
import { GetEstimateDto } from "./dtos/get-estimate.dto";

@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {

  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() createReport: CreateReportDto,  @CurrentUser() user: User ) {
    return this.reportService.createReport(createReport, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: number, @Body() body: ApproveReportDto){
    return this.reportService.approveReport(id, body);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getReports(@Query() reportEstimate: GetEstimateDto){
    const price = await this.reportService.getReports(reportEstimate);
    console.log(price);
    return price
  }
}
