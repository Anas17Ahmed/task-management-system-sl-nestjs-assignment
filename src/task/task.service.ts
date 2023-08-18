import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findOne(id: string): Promise<Task | undefined> {
    return this.tasks.find((task) => task.id === id);
  }

  async create(taskData: Partial<Task>): Promise<Task> {
    const newTask: Task = {
      id: uuid(),
      title: '', // Provide default values for required properties
      description: '',
      status: '',
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...taskData, // Apply any additional properties provided in taskData
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async update(id: string, taskData: Partial<Task>): Promise<Task | undefined> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex >= 0) {
      const updatedTask = { ...this.tasks[taskIndex], ...taskData, updatedAt: new Date() };
      this.tasks[taskIndex] = updatedTask;
      return updatedTask;
    }
    return undefined; // Task with the given ID not found
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  async findTasksByCriteria(
    status?: string,
    dueDate?: Date,
    startDate?: Date,
    endDate?: Date,
  ): Promise<Task[]> {
    let filteredTasks = this.tasks;

    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    if (dueDate) {
      filteredTasks = filteredTasks.filter((task) => task.dueDate === dueDate);
    }

    if (startDate && endDate) {
      filteredTasks = filteredTasks.filter(
        (task) => task.dueDate >= startDate && task.dueDate <= endDate,
      );
    }

    return filteredTasks;
  }
}
