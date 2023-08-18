import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const mockTasks = [{ title: 'Task 1' }, { title: 'Task 2' }] as Task[];
      jest.spyOn(taskRepository, 'find').mockResolvedValue(mockTasks);

      const tasks = await taskService.findAll();

      expect(tasks).toEqual(mockTasks);
    });
  });
});
