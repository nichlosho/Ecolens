import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Bottleneck from 'bottleneck';
import { environment } from 'environments/environment';

@Injectable()
export abstract class BaseService {
    //t
    //----------------------------------------------------------------//
    //                           Properties
    //----------------------------------------------------------------//

    private static _apiService: AxiosInstance | null = null;
    public static get apiService(): AxiosInstance {
        if (BaseService._apiService == null) {
            BaseService._apiService = axios.create({
                baseURL: environment.baseUrl + environment.backendPort,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                },
            });
        }
        return BaseService._apiService;
    }
    private static limiter = new Bottleneck({
        maxConcurrent: 1, // Maximum number of requests to make concurrently
        minTime: 1000, // Minimum time to wait between each request (in milliseconds)
    });

    //----------------------------------------------------------------//
    //                           Protected
    //----------------------------------------------------------------//

    protected static async fetchData<T>(url: string): Promise<T | null> {
        try {
            const response: AxiosResponse = await BaseService.limiter.schedule(
                () => BaseService.apiService.get<T>(url)
            );
            const data = response.data;
            return data;
        } catch (error) {
            if (error instanceof AxiosError && error.response != null) {
                throw new Error(BaseService.getErrorMessage(error));
            } else {
                throw error;
            }
        }
    }

    protected static async postData<T>(
        url: string,
        data: unknown
    ): Promise<T | null> {
        try {
            const response = await BaseService.apiService.post<T>(url, data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response != null) {
                throw new Error(BaseService.getErrorMessage(error));
            } else {
                throw error;
            }
        }
    }

    protected static async putData<T>(
        url: string,
        data: unknown
    ): Promise<T | null> {
        try {
            const response = await BaseService.apiService.put<T>(url, data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response != null) {
                throw new Error(BaseService.getErrorMessage(error));
            } else {
                throw error;
            }
        }
    }

    protected static async deleteData<T>(url: string): Promise<T | null> {
        try {
            const response = await BaseService.apiService.delete<T>(url);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response != null) {
                throw JSON.stringify(error.response.data);
            }
        }
        return null;
    }

    protected static async patchData<T>(
        url: string,
        data: unknown
    ): Promise<T | null> {
        try {
            const response = await BaseService.apiService.patch<T>(url, data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response != null) {
                console.error('Error patching data:', error.response.data);
                throw new Error(BaseService.getErrorMessage(error));
            } else throw error;
        }
    }

    //----------------------------------------------------------------//
    //                           Private
    //----------------------------------------------------------------//

    private static getErrorMessage(error: AxiosError): string {
        return error.code + ': ' + error.message;
    }
}
