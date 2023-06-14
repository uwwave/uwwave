type StorageKeys = string | string[] | Record<string, any> | null

export enum RequestName {
    getLocal = 'getLocal',
    getSync = 'getSync',
    setSync = 'setSync',
}

export enum MessageType {
    extensionLoaded = 'CK_EXT_LOADED',
    fromPage = 'CK_FROM_PAGE',
    fromExtension = 'CK_FROM_EXT',
}

export interface DataRequestParams {
    getKey?: StorageKeys
    setObject?: Record<string, any>
}

export interface RequestPayload {
    id: string
    reqName: RequestName
    params?: DataRequestParams
}

export type ResultPayload = Record<string, any>

export interface MessagePayload {
    type: string
    request?: RequestPayload
    result?: ResultPayload
}
