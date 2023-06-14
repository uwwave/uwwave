import {
    getLocalStorage,
    getSyncStorage,
    setSyncStorage,
} from '../common/storage'
import {
    MessagePayload,
    MessageType,
    RequestName,
    RequestPayload,
    ResultPayload,
} from '../shared/dataBridge'

const REQ_NAME_TO_RESPONSE_FUNC: {
    [req_id: string]: (request: RequestPayload) => void
} = {
    [RequestName.getLocal]: getLocal,
    [RequestName.getSync]: getSync,
    [RequestName.setSync]: setSync,
}

async function getLocal(request: RequestPayload) {
    const key = request.params?.getKey || null
    sendMessageToClient(await getLocalStorage(key), request)
}

async function getSync(request: RequestPayload) {
    const key = request.params?.getKey || null
    sendMessageToClient(await getSyncStorage(key), request)
}

async function setSync(request: RequestPayload) {
    const setObject = request.params?.setObject

    const responsePayload = { success: false }

    if (setObject) {
        await setSyncStorage(setObject)
        responsePayload.success = true
    }

    sendMessageToClient(responsePayload, request)
}

function sendMessageToClient(result: ResultPayload, request: RequestPayload) {
    const responseMessage: MessagePayload = {
        type: MessageType.fromExtension,
        request,
        result,
    }
    console.log(
        `[Extension] Sending response to client, reqName: ${responseMessage.request?.reqName}, id: ${responseMessage.request?.id}`,
    )
    window.postMessage(responseMessage, '*')
}

window.addEventListener(
    'message',
    (event: MessageEvent<MessagePayload>) => {
        // We only accept messages from ourselves
        if (event.source != window) {
            return
        }

        // ensure required fields present
        if (!event.data || !event.data.type) {
            return
        }

        if (
            event.data.type &&
            event.data.type === MessageType.fromPage &&
            event.data.request
        ) {
            console.log(
                `[Extension] Received message from client, reqName: ${event.data.request.reqName}, id: ${event.data.request.id}`,
            )
            const responseFunc =
                REQ_NAME_TO_RESPONSE_FUNC[event.data.request.reqName]
            if (responseFunc) {
                responseFunc(event.data.request)
            }
        }
    },
    false,
)

window.postMessage({ type: MessageType.extensionLoaded }, '*')

console.log('[Extension] Loaded.')
