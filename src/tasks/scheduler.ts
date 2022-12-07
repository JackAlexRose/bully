import { CronJob } from "cron";

const tasks: {
  [key: string]: CronJob;
} = {};

export function addTask(id: string, cronTime: string, onTick: () => void) {
  if (tasks[id]) {
    throw new Error(`Task with id ${id} already exists`);
  }

  const task = new CronJob(cronTime, onTick);
  tasks[id] = task;
  task.start();
}
