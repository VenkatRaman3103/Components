const dummyData = {
  [new Date().toISOString().split("T")[0]]: [
    {
      id: 1,
      title: "Personal Task",
      color: "#FFCC00", // Yellow
      task: {
        type: "toDo",
        tasks: [
          {
            content: "lorem ipsum",
            isChecked: false,
          },
          {
            content: "lorem ipsum",
            isChecked: false,
          },
          {
            content: "lorem ipsum",
            isChecked: false,
          },
          {
            content: "lorem ipsum",
            isChecked: false,
          },
          {
            content: "lorem ipsum",
            isChecked: false,
          },
          {
            content: "lorem ipsum",
            isChecked: false,
          },
        ],
      },
    },
    {
      id: 2,
      title: "Team Meeting",
      color: "#00CCFF", // Blue
      task: {
        type: "meeting",
        tasks: [
          {
            members: [
              { name: "name1", img: "url" },
              { name: "name1", img: "url" },
              { name: "name1", img: "url" },
              { name: "name1", img: "url" },
              { name: "name1", img: "url" },
            ],
            notes: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            ],
          },
        ],
      },
    },
    {
      id: 3,
      title: "Project Report",
      color: "#FF6600", // Orange
      task: {
        type: "toDo",
        tasks: [
          {
            content: "Finish project report",
            isChecked: true,
          },
        ],
      },
    },
    {
      id: 4,
      title: "Grocery Shopping",
      color: "#66FF66", // Green
      task: {
        type: "toDo",
        tasks: [
          {
            content: "Buy groceries",
            isChecked: false,
          },
        ],
      },
    },
    {
      id: 5,
      title: "Project Milestones Discussion",
      color: "#FF0099", // Pink
      task: {
        type: "meeting",
        tasks: [
          {
            members: [
              { name: "name2", img: "url2" },
              { name: "name3", img: "url3" },
            ],
            notes: ["Discuss project milestones", "Allocate tasks"],
          },
        ],
      },
    },
    {
      id: 6,
      title: "Weekly Sync-Up",
      color: "#6600FF", // Purple
      task: {
        type: "meeting",
        tasks: [
          {
            members: [{ name: "name4", img: "url4" }],
            notes: ["Weekly sync-up", "Review previous actions"],
          },
        ],
      },
    },
    {
      id: 7,
      title: "Client Feedback Call",
      color: "#FF3333", // Red
      task: {
        type: "toDo",
        tasks: [
          {
            content: "Call the client for feedback",
            isChecked: false,
          },
        ],
      },
    },
  ],
};
