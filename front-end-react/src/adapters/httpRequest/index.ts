import AxiosObservableAdapter from './Axios.adapter';
import IHttpRequest from './IHttpRequest.adapter';

export function makeHttpRequest(baseURL: string): IHttpRequest {
    return new AxiosObservableAdapter(baseURL)
}
