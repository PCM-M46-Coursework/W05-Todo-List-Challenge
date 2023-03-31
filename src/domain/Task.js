import Priority from "./Priority";
import Status from "./Status";

export default class Task
{
    constructor(
        title, 
        details = '', 
        priority = Priority.Normal, 
        status = Status.Backlog, 
        archiveIdFactory = crypto.randomUUID)
    {
        this.id = archiveIdFactory();
        this.title = title;
        this.details = details;
        this.priority = priority;
        this.status = status;
        this.highlighted = false;
    }

    static fromJson(json)
    {
        let task = new Task();
        Object.assign(task, json);
        return task;
    }

    static fromJsonDirect(json)
    {
        return Task.from(json);
    }
}