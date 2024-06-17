
import axios, { Method } from 'axios';

enum ServiceNames {
  USERS = 'user-service',
  DISCUSSIONS = 'discussion-service',
  COMMENTS = 'comment-service',
}

interface FetchOptions {
  method: Method;
  url: String;
  body?: any;
}

const serviceUrls = {
  [ServiceNames.USERS]: 'http://user-service:5000/api',
  [ServiceNames.DISCUSSIONS]: 'http://discussion-service:5001/api',
  [ServiceNames.COMMENTS]: 'http://comment-service:5002/api',
};

export const fetchFromService = async (service: ServiceNames, options: FetchOptions) => {
  const { method, url, body } = options;
  const serviceUrl = serviceUrls[service];

  try {
    const response = await axios({
      method,
      url: `${serviceUrl}${url}`,
      data: body,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Internal Service Error');
  }
};

export { ServiceNames };
