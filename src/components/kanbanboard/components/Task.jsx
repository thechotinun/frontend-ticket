import { Card, Typography, Tag } from 'antd';

const { Text } = Typography;



const Task = ({ item, provided, snapshot, getStatusColor }) => {
  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      size="small"
      style={{
        marginBottom: 8,
        backgroundColor: snapshot.isDragging ? '#f0f0f0' : 'white',
        ...provided.draggableProps.style,
        textAlign: 'left',
      }}
      title={`${item.content}`}
    >
      {/* <Typography.Title level={5}>{item.content}</Typography.Title> */}
      <Text type="secondary" style={{ fontSize: '0.9em', display: 'block', marginBottom: 4 }}>
        description: {item.description || '-'}
      </Text>
      <div style={{textAlign:'end'}}>
        <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
      </div>
    </Card>
  );
};

export default Task;
