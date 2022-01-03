import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobDto } from './dto/job.dto';
import { Job } from './schemas/jobs.schema';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}
  async getJobs(id): Promise<Job[]> {
    return await this.jobModel.find({ createdBy: id });
  }
  async postJob(id: string, jobdto: JobDto): Promise<Job> {
    const newJob = new this.jobModel({ ...jobdto, createdBy: id });
    return await newJob.save();
  }
  async updateJob(id: string, userId: string, jobdto: JobDto): Promise<Job> {
    return await this.jobModel.findOneAndUpdate(
      { _id: id, createdBy: userId },
      { ...jobdto },
      { new: true },
    );
  }
  async deleteJob(id: string, userId: string): Promise<Job> {
    return await this.jobModel.findOneAndRemove({ _id: id, createdBy: userId });
  }
}
