const Task = ({ item, provided, snapshot }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        userSelect: 'none',
        padding: 16,
        margin: '0 0 8px 0',
        minHeight: '50px',
        backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
        color: 'white',
        ...provided.draggableProps.style,
      }}
    >
      <div>{item.content}</div>
      <div style={{ fontSize: '0.8em', marginTop: '8px' }}>Status: {item.status}</div>
    </div>
  );
};

export default Task;