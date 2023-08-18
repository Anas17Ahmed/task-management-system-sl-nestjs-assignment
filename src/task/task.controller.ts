import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task | undefined> {
    return this.taskService.findOne(id);
  }

  @Post()
  async create(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.taskService.create(taskData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() taskData: Partial<Task>): Promise<Task | undefined> {
    return this.taskService.update(id, taskData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.taskService.delete(id);
  }

  /**
   * GET /tasks/filter?status=In%20Progress
   * GET /tasks/filter?dueDate=2023-08-15
   * GET /tasks/filter?startDate=2023-08-10&endDate=2023-08-20
   * 
   * @param status 
   * @param dueDate 
   * @param startDate 
   * @param endDate 
   * @returns {Promise<Task[]>} tasks
   */
  @Get('/filter')
  async findTasksByCriteria(
    @Query('status') status?: string,
    @Query('dueDate') dueDate?: Date,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ): Promise<Task[]> {
    return this.taskService.findTasksByCriteria(status, dueDate, startDate, endDate);
  }
}
