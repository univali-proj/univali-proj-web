import { environment } from '../../../env/environment.local';

export function buildApiUrl(endpoint: string): string {
  return [
    environment.apiBaseUrl.replace(/\/+$/, ''),
    environment.apiPrefix.replace(/^\/+|\/+$/g, ''),
    endpoint.replace(/^\/+|\/+$/g, '')
  ].filter(Boolean).join('/');
}
