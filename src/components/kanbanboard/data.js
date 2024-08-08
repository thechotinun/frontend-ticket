export default {
  pending: {
    id: '1',
    title: 'Pending',
    tasks: [
      { id: 'task-1', content: 'Learn React', status: 'pending' },
      { id: 'task-2', content: 'Build a Kanban board', status: 'pending' },
    ],
  },
  accepted: {
    id: '2',
    title: 'Accepted',
    tasks: [{ id: 'task-3', content: 'Learn react-beautiful-dnd', status: 'accepted' }],
  },
  resolved: {
    id: '3',
    title: 'Resolved',
    tasks: [{ id: 'task-4', content: 'Set up Vite project', status: 'resolved' }],
  },
  rejected: {
    id: '4',
    title: 'Rejected',
    tasks: [{ id: 'task-5', content: 'Implement deprecated feature', status: 'rejected' }],
  },
};