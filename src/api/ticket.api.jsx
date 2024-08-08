import { http } from '@api/axios.interceptor';

export async function get() {
  return await http(`/ticket`, {
    method: 'GET',
    params: { perPage: 1000 },
  });
}

export async function create(reqBody) {
  return await http(`/ticket`, {
    method: 'POST',
    data: reqBody,
  });
}

export async function update(id, reqBody) {
  return await http(`/ticket/${id}`, {
    method: 'PATCH',
    data: reqBody,
  });
}
