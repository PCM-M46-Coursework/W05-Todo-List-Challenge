export default class TaskList
{
    constructor (title = '', description = '')
    {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.activeTasks = [];
        this.archivedTasks = [];
    }

    static fromJson(json)
    {
        let taskList = new TaskList();
        Object.assign(taskList, json);
        return taskList;
    }

    static fromJsonDirect(json)
    {
        return TaskList.from(json);
    }
}