export const TaskLists = [
    {
        "Id": "62b570a1-2e3c-4910-b84f-719b1864da3e",
        "Title": "Sample Kanban Board",
        "Description": "This sample board shows tasks at all stages of completion.",
        "Tasks": [
            "3b94aa3e-345e-4a2c-acb1-460ab60434f4",
            "f76aab5a-5d4f-4f99-8802-21b31268b5a5",
            "00d72c90-c871-4c49-a1f6-1aca5cea4bcd",
            "be9c2cd3-64bd-4a41-8caf-c888f35cb625"
        ]
    },
    {
        "Id": "d8376880-b97b-40bf-a74e-2e8198ae47d4",
        "Title": "New List",
        "Description": "There is currently nothing in this list.",
        "Tasks": [

        ]
    }
];

export const Archive = [
    {
        "Id": "842a3ea3-a1af-49f4-8ff1-318fa6e75bf9",
        "TaskId": "c34161f1-cca0-4eda-8669-2255c3e4c5d9"
    },
    {
        "Id": "864b4410-3ae1-46eb-92f5-b0e21af22993",
        "TaskId": "43d4f489-5d5c-45ab-8877-a7d132067df2"
    }
];

export const Tasks = [
    {
        "Id": "3b94aa3e-345e-4a2c-acb1-460ab60434f4",
        "TaskListId": "62b570a1-2e3c-4910-b84f-719b1864da3e",
        "Title": "Remove Sample Tasks",
        "Details": "I need to clean up the app, so that I can make my own lists.",
        "Priority": "Important",
        "Status": "To Do"
    },
    {
        "Id": "f76aab5a-5d4f-4f99-8802-21b31268b5a5",
        "TaskListId": "62b570a1-2e3c-4910-b84f-719b1864da3e",
        "Title": "Create My Own List",
        "Details": "In the left sidebar, I can create my own lists.",
        "Priority": "Normal",
        "Status": "In Progress"
    },
    {
        "Id": "00d72c90-c871-4c49-a1f6-1aca5cea4bcd",
        "TaskListId": "62b570a1-2e3c-4910-b84f-719b1864da3e",
        "Title": "Create Sample Tasks in Tasks List",
        "Details": "Sample tasks must be made, for each priority, and status type.",
        "Priority": "Critical",
        "Status": "Done"
    },
    {
        "Id": "be9c2cd3-64bd-4a41-8caf-c888f35cb625",
        "TaskListId": "62b570a1-2e3c-4910-b84f-719b1864da3e",
        "Title": "Take a tour of the App",
        "Details": "Have a look around, and see what's available.",
        "Priority": "Low",
        "Status": "In Progress"
    },
    {
        "Id": "c34161f1-cca0-4eda-8669-2255c3e4c5d9",
        "TaskListId": "62b570a1-2e3c-4910-b84f-719b1864da3e",
        "Title": "Add Tasks to Kanban Board",
        "Details": "Show how tasks can be created.",
        "Priority": "Normal",
        "Status": "Archived"
    },
    {
        "Id": "43d4f489-5d5c-45ab-8877-a7d132067df2",
        "TaskListId": "d8376880-b97b-40bf-a74e-2e8198ae47d4",
        "Title": "Create a New List",
        "Details": "This task has now been archived.",
        "Priority": "Low",
        "Status": "Archived"
    }
];