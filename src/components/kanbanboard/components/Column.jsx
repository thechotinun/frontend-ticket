import { useState, useEffect } from 'react';
import { Droppable as ReactBeautifulDndDroppable, Draggable } from '@hello-pangea/dnd';
import { map } from 'lodash';
import Task from './Task';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'orange';
    case 'accepted':
      return 'cyan';
    case 'resolved':
      return 'green';
    case 'rejected':
      return 'red';
    default:
      return 'default';
  }
};

const Droppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <ReactBeautifulDndDroppable {...props}>{children}</ReactBeautifulDndDroppable>;
};

const Column = ({ column, columnId }) => {
  if (!column || !column.tasks) {
    console.error('Invalid column data:', column);
    return null;
  }

  return (
    <>
      <h2 style={{color: `${getStatusColor(column.title)}`}}>{column.title}</h2>
      <div style={{ margin: 8, overflowX: 'auto', height: '500px' }}>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? '#ff0077e3' : 'lightgrey',
                padding: 4,
                width: 250,
                minHeight: 500,
              }}
            >
              {map(column.tasks, (item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Task item={item} provided={provided} snapshot={snapshot} getStatusColor={getStatusColor} />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};

export default Column;
