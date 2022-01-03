import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ValidationPipe } from 'src/validation.pipe';
import { JobDto } from './dto/job.dto';
import { JobsService } from './job.service';

@Controller('/api/v1/jobs')
@ApiTags('Jobs')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
export class JobsController {
  constructor(readonly jobService: JobsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get All Jobs' })
  @ApiResponse({ status: 200, type: JobDto, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getJobs(@Request() req) {
    return this.jobService.getJobs(req.user.userId);
  }
  @ApiOperation({ summary: 'Add a Job' })
  @Post('/')
  @ApiResponse({ status: 200, type: JobDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async createJob(@Request() req, @Body(new ValidationPipe()) jobdto: JobDto) {
    return this.jobService.postJob(req.user.userId, jobdto);
  }
  @ApiOperation({ summary: 'Update a Job' })
  @ApiParam({ name: 'id', description: 'Id of job to be updated' })
  @Patch('/:id')
  @ApiResponse({ status: 200, type: JobDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, type: JobDto })
  async updateJob(
    @Param('id') id: string,
    @Body(new ValidationPipe()) jobdto: JobDto,
    @Request() req,
  ) {
    const {
      user: { userId },
    } = req;

    return this.jobService.updateJob(id, userId, jobdto);
  }
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a Job' })
  @ApiParam({ name: 'id', description: 'Id of job to be deleted' })
  @ApiResponse({ status: 200, type: JobDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, type: JobDto })
  async deleteJob(@Param('id') id: string, @Request() req) {
    const {
      user: { userId },
    } = req;
    return this.jobService.deleteJob(id, userId);
  }
}
