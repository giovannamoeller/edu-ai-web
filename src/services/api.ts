import Essay  from '../types/Essay';
import { APIError } from '@/types/APIError';
import { config } from '../lib/config';

class APIService {
  private readonly baseURL: string | undefined = config.apiUrl;

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Try to get error message from response
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      } catch {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch {
      throw new Error(APIError.DECODING_ERROR);
    }
  }

  async uploadEssay(file: File, subject: string): Promise<Essay> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subject', subject);

    const response = await fetch(`${this.baseURL}/essays/upload`, {
      method: 'POST',
      body: formData
    });

    return this.handleResponse<Essay>(response);
  }

  async fetchEssays(): Promise<Essay[]> {
    const response = await fetch(`${this.baseURL}/essays`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
    console.log(response)

    return this.handleResponse<Essay[]>(response);
  }
}

export const api = new APIService();