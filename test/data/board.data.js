const boardId = 1;
const userId = 1;

const newBoard = { userId, title: 'Test Board', contents: 'Test Contents' };

const updatedBoard = { title: 'Updated Board', contents: 'Updated Contents' };

const boardList = [
  {
    boardId: 1,
    userId,
    title: 'Test Board 1',
    contents: 'Test Contents 1',
  },
  {
    boardId: 2,
    userId,
    title: 'Test Board 2',
    contents: 'Test Contents 2',
  },
  {
    boardId: 3,
    userId,
    title: 'Test Board 3',
    contents: 'Test Contents 3',
  },
];

export { userId, boardId, newBoard, updatedBoard, boardList };
