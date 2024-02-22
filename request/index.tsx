import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {BASE_URL} from '../constant';

class ApiClient {
  private static instance: ApiClient;
  private API_KEY: string;
  private baseURL: string;
  private axiosInstance: AxiosInstance;

  private constructor(API_KEY: string) {
    this.API_KEY = API_KEY;
    this.baseURL = BASE_URL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        withCredentials: 'true',
        crossorigin: 'true',
        'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
        'X-Api-Key': this.API_KEY,
      },
    });
  }

  static initialize(API_KEY: string) {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(API_KEY);
    }
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      throw new Error(
        'ApiClient has not been initialized. Call initialize() first.',
      );
    }
    return ApiClient.instance;
  }

  private async makeRequest<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getRequest<T>(url: string): Promise<T> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${url}`,
    };
    return this.makeRequest<T>(config);
  }

  public async postRequest<T>(endpoint: string, data: any): Promise<T> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `/${endpoint}`,
      data,
    };
    return this.makeRequest<T>(config);
  }
}

export default ApiClient;
