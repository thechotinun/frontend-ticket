import { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { map, groupBy, mapValues } from 'lodash';
import { Button } from 'antd';
import initialData from './data';
import Column from './components/Column';
import ModalAddTicket from './components/ModalAddTicket';
import { get as getTickets } from '@api/ticket.api';

const KanbanBoard = () => {
  const [columns, setColumns] = useState();
  const [isModalAddTicketOpen, setIsModalAddTicketOpen] = useState(false);

  const fetchTickets = async () => {
    try {
      const { data } = await getTickets();
      // Group tasks by status
      const groupedTasks = groupBy(data.data, 'status');

      // Create new columns object with tasks
      const newColumns = mapValues(initialData, (column, key) => ({
        ...column,
        tasks: map(groupedTasks[key] || [], (task) => ({
          id: `task-${task.id}`,
          content: task.title,
          status: task.status,
        })),
      }));
      setColumns(newColumns);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTasks = Array.from(start.tasks);
      const [reorderedItem] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, reorderedItem);

      const newColumn = {
        ...start,
        tasks: newTasks,
      };

      setColumns({
        ...columns,
        [source.droppableId]: newColumn,
      });
    } else {
      const startTasks = Array.from(start.tasks);
      const [movedItem] = startTasks.splice(source.index, 1);
      const newStart = {
        ...start,
        tasks: startTasks,
      };

      const finishTasks = Array.from(finish.tasks);
      // Update the status of the moved task
      const updatedMovedItem = { ...movedItem, status: destination.droppableId };
      finishTasks.splice(destination.index, 0, updatedMovedItem);
      const newFinish = {
        ...finish,
        tasks: finishTasks,
      };

      setColumns({
        ...columns,
        [source.droppableId]: newStart,
        [destination.droppableId]: newFinish,
      });
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'left' }}>
        <Button
          type="primary"
          onClick={() => {
            setIsModalAddTicketOpen(!isModalAddTicketOpen);
          }}
        >
          + Ticket
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <DragDropContext onDragEnd={onDragEnd} withScrollableColumns>
          {columns &&
            map(columns, (column, columnId) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                key={columnId}
              >
                <Column column={column} columnId={columnId} />
              </div>
            ))}
        </DragDropContext>
      </div>
      <ModalAddTicket
        isModalOpen={isModalAddTicketOpen}
        setIsModalOpen={setIsModalAddTicketOpen}
        fetchTickets={fetchTickets}
      />
    </div>
  );
};

export default KanbanBoard;
