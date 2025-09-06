import { Moment } from "moment";
import { Task } from '../schemas/task';
import { Change, MomentProps } from "../types/utility-types";
import { Duration } from "./duration.class";

export class Tasks extends Array<Task> {

    constructor(tasks: Array<Task>) {
        super(...(Array.isArray(tasks) ? tasks : []));
    }

    /**
     * Creates a new Tasks instance from an array of Task objects
     * @param tasks - Array of Task objects to create Tasks instance from
     * @returns A new Tasks instance containing the provided tasks
     */
    public static from(tasks: Task[]): Tasks {
        return new Tasks(tasks);
    }

    /**
     * Retrieves a task from the collection by its task ID.
     * @param taskId - The unique identifier of the task to find.
     * @returns The matching Task object if found, undefined otherwise.
     */
    public getTaskById(taskId: number): Task | undefined {
        return this.find(task => task.taskId === taskId);
    }

    /**
     * Retrieves a task from the collection by its task code.
     * @param taskCode - The unique identifier code of the task to find.
     * @returns The matching Task object if found, undefined otherwise.
     */
    public getTaskByCode(taskCode: string): Task | undefined {
        return this.find(task => task.taskCode === taskCode);
    }

    /**
     * Gets the minimum date value from a collection of tasks based on the specified date property.
     * 
     * @param {MomentProps<Task>} key - The key representing the date property to compare (e.g., 'startDate', 'endDate')
     * @returns {Moment | undefined} The minimum date found in the collection, or undefined if the collection is empty
     * 
     * @example
     * const tasks = new Tasks([...]);
     * const minStartDate = tasks.getMinDate('startDate');
     */
    public getMinDate(key: MomentProps<Task>): Moment | undefined {
        return this.reduce((minDate: Moment | undefined, task: Task) => {
            const value = task[key as keyof Task] as unknown as Moment | undefined;
            if (!value) return minDate;
            if (!minDate || value.isBefore(minDate)) return value;
            return minDate;
        }, undefined);
    }

    /**
     * Finds the earliest date among all tasks for a specified date property.
     * @param key - The moment-based property of Task to compare (e.g., 'startDate', 'endDate')
     * @returns The earliest Moment date found among all tasks for the specified property, or undefined if no tasks exist
     */
    public getMaxDate(key: MomentProps<Task>): Moment | undefined {
        return this.reduce((maxDate: Moment | undefined, task: Task) => {
            const value = task[key as keyof Task] as unknown as Moment | undefined;
            if (!value) return maxDate;
            if (!maxDate || value.isAfter(maxDate)) return value;
            return maxDate;
        }, undefined);
    }

    
    /**
     * Gets all milestone tasks from the Tasks collection.
     * Filters tasks based on task types 'TT_FinMile' and 'TT_Mile'.
     * @returns {Tasks} A new Tasks collection containing only milestone tasks
     */
    public get milestoneTasks(): Tasks {
        return new Tasks(this.filter(task => task.taskType === 'TT_FinMile' || task.taskType === 'TT_Mile'));
    }

    /**
     * Gets a new Tasks instance containing only normal tasks.
     * Normal tasks are those with task types 'TT_Task' or 'TT_Rsrc'.
     * @returns {Tasks} A new Tasks collection containing only the filtered normal tasks
     */
    public get normalTasks(): Tasks {
        return new Tasks(this.filter(task => task.taskType === 'TT_Task' || task.taskType === 'TT_Rsrc'));
    }

    /**
     * Gets all Level of Effort (LOE) tasks from the current task collection.
     * Level of Effort tasks represent ongoing work that cannot be measured in terms of discrete physical elements.
     * @returns {Tasks} A new Tasks collection containing only Level of Effort tasks
     */
    public get levelOfEffortTasks(): Tasks {
        return new Tasks(this.filter(task => task.taskType === 'TT_LOE'));
    }

    /**
     * Gets all completed tasks from the current task collection.
     * @returns {Tasks} A new Tasks instance containing only completed tasks (where statusCode is 'TK_Complete').
     */
    public get completed(): Tasks {
        return new Tasks(this.filter(task => task.statusCode === 'TK_Complete'));
    }

    /**
     * Gets a new Tasks instance containing only the tasks that are currently in progress.
     * Filters tasks based on the 'TK_Active' status code.
     * @returns {Tasks} A new Tasks collection containing only active tasks
     */
    public get inProgress(): Tasks {
        return new Tasks(this.filter(task => task.statusCode === 'TK_Active'));
    }

    /**
     * Gets tasks that have not started yet.
     * Returns a new Tasks collection containing only tasks with status code 'TK_NotStart'.
     * @returns {Tasks} A new Tasks collection containing only tasks that haven't started
     */
    public get notStarted(): Tasks {
        return new Tasks(this.filter(task => task.statusCode === 'TK_NotStart'));
    }

    /**
     * Returns a new Tasks collection containing only tasks with total float less than the specified threshold
     * @param criticalThreshold - The duration threshold below which tasks are considered critical
     * @returns A new Tasks collection containing only the critical tasks
     */
    public getCriticalTasks(criticalThreshold: Duration): Tasks {
        return new Tasks(this.filter(task => task.totalFloat && task.totalFloat.isLessThan(criticalThreshold)));
    }

    /**
     * Returns a new Tasks instance containing tasks that are present in the current Tasks instance
     * but not in the provided otherTasks parameter.
     * 
     * @param otherTasks - Optional parameter that can be an array of Task objects, a Tasks instance, or null
     * @returns A new Tasks instance containing only the tasks that don't exist in otherTasks
     * 
     * @example
     * const tasks1 = new Tasks([task1, task2, task3]);
     * const tasks2 = new Tasks([task2, task3]);
     * const result = tasks1.addedTasks(tasks2); // Contains only task1
     */
    public addedTasks(otherTasks?: Task[] | Tasks | null): Tasks {
        if (otherTasks == null) {
            return new Tasks([]);
        }
        const otherTaskCodes = otherTasks.map((task) => task.taskCode);
		return new Tasks(this.filter((task) => !otherTaskCodes.includes(task.taskCode)));
    }

    /**
     * Creates a new Tasks instance containing tasks that were removed when comparing to another Tasks collection
     * @param otherTasks - Optional parameter that can be an array of Task objects, a Tasks instance, or null
     * @returns A new Tasks instance containing tasks that exist in the current instance but not in otherTasks
     */
    public removedTasks(otherTasks?: Task[] | Tasks | null): Tasks {
        if (otherTasks == null) {
            return new Tasks([]);
        }
        const thisTaskCodes = this.map((task) => task.taskCode);
        return new Tasks(otherTasks.filter((task) => !thisTaskCodes.includes(task.taskCode)));
    }

    /**
     * Checks for overlapping tasks based on task codes and returns matching tasks.
     * @param otherTasks - Optional array of Task objects or Tasks collection to compare against
     * @returns A new Tasks collection containing only the tasks that exist in both collections
     * @example
     * const tasks1 = new Tasks([task1, task2, task3]);
     * const tasks2 = new Tasks([task2, task3, task4]);
     * const overlap = tasks1.overlaps(tasks2); // Returns Tasks containing task2 and task3
     */
    public overlaps(otherTasks?: Task[] | Tasks | null): Tasks {
        if (otherTasks == null) {
            return new Tasks([]);
        }
        const otherTaskCodes = otherTasks.map((task) => task.taskCode);
        return new Tasks(this.filter((task) => otherTaskCodes.includes(task.taskCode)));
    }


    /**
     * Compares two sets of tasks and returns an array of changes between them.
     * 
     * @param otherTasks - The tasks to compare against this collection. Can be either an array of Task objects or a Tasks instance.
     * @returns An array of Change objects, where each object contains the task code as key and an object with 'old' and 'new' properties representing the task states.
     * Each Change object follows the pattern: { [taskCode]: { old: Task|undefined, new: Task|undefined } }
     * - If a task exists in this collection but not in otherTasks, 'new' will be undefined
     * - If a task exists in otherTasks but not in this collection, 'old' will be undefined
     * - If a task exists in both collections, both 'old' and 'new' will contain the respective Task objects
     * @throws None
     */
    public compareTasks(otherTasks: Task[] | Tasks): Change<Task>[] {
        if (!otherTasks) {
            return [];
        }
    const taskCodes = this.map((task) => task.taskCode);
    const otherTaskCodes = otherTasks.map((task) => task.taskCode);
    const allTaskCodes = Array.from(new Set<string>([...taskCodes, ...otherTaskCodes]));

    return allTaskCodes.map((taskCode) => {
            const task = this.getTaskByCode(taskCode);
            const otherTask = otherTasks.find((t) => t.taskCode === taskCode);
            return { [taskCode]: { old: task, new: otherTask } };
        });
    }

}