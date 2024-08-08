import { useState } from 'react';
import { Skeleton, Modal, Form, Input } from 'antd';
import { create } from '@api/ticket.api';

const { TextArea } = Input;

const ModalAddTicket = ({ isModalOpen, setIsModalOpen, fetchTickets }) => {
  const [formAddTicket] = Form.useForm();
  const [loadingSkeleton] = useState(false);

  const handleCancel = async () => {
    formAddTicket.resetFields();
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (values) => {
    try {
      await create(values);
      formAddTicket.resetFields();
      setIsModalOpen(!isModalOpen);
      await fetchTickets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title={`Add Ticket`}
        open={isModalOpen}
        onOk={formAddTicket.submit}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Skeleton loading={loadingSkeleton} active>
          <Form layout="vertical" form={formAddTicket} onFinish={handleSubmit}>
            <Form.Item
              name={['title']}
              label="title"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'title!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={['description']} label="description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name={['contactInformation']}
              label="contact"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'contact!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Skeleton>
      </Modal>
    </>
  );
};

export default ModalAddTicket;
