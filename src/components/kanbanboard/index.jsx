import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { map } from 'lodash';
import initialData from './data';
import Column from './Column';

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialData);

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
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {map(columns, (column, columnId) => (
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
  );
};

export default KanbanBoard;