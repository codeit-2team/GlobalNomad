import { privateInstance } from '@/apis/privateInstance';

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const res = await privateInstance.post(`/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data.replace(/^"+|"+$/g, '');
}
