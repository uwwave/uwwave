import {
  MessagePayload,
  MessageType,
  RequestName,
  RequestPayload,
  ResultPayload,
} from "src/lib/extension/shared/dataBridge";

export const sendMessageOnLoadAndSetupListenerHook = (
  request: RequestPayload,
  listener?: (result?: ResultPayload) => void
) => {
  let receiveExtensionMessage:
    | ((event: MessageEvent<MessagePayload>) => void)
    | undefined;
  if (listener) {
    receiveExtensionMessage = buildExtensionApiListener(
      MessageType.fromExtension,
      request.id,
      request.reqName,
      listener
    );
  }

  // Race 1: If the website loads first, we must listen for when the extension loads because
  // the initial message sent will miss
  const receiveExtensionLoadedMessage = buildExtensionApiListener(
    MessageType.extensionLoaded,
    null,
    null,
    () => {
      console.info("Extension loaded.");
      sendMessageToExtension(request);
    }
  );

  // Race 2: If the extension loads first, we must send the message here to load because we will miss
  // the extension loaded message
  sendMessageToExtension(request);

  if (receiveExtensionMessage) {
    window.addEventListener("message", receiveExtensionMessage, false);
  }

  window.addEventListener("message", receiveExtensionLoadedMessage, false);

  // Specify how to clean up after this effect:
  return function cleanup() {
    if (receiveExtensionMessage) {
      window.removeEventListener("message", receiveExtensionMessage);
    }
    window.removeEventListener("message", receiveExtensionLoadedMessage);
  };
};

export function sendRequestToExtensionOrTimeout(
  request: RequestPayload,
  timeoutMs = 3000
): Promise<ResultPayload | undefined> {
  return new Promise<ResultPayload | undefined>((resolve, reject) => {
    // In case the extension is still loading
    const receiveExtensionLoadedMessage = buildExtensionApiListener(
      MessageType.extensionLoaded,
      null,
      null,
      () => {
        console.info(
          `[Client] Extension loaded, sending request with ID ${request.id}`
        );
        sendMessageToExtension(request);
      }
    );

    const responseListener = buildExtensionApiListener(
      MessageType.fromExtension,
      request.id,
      request.reqName,
      result => {
        window.removeEventListener("message", responseListener);
        window.removeEventListener("message", receiveExtensionLoadedMessage);
        if (result && result.success === false) {
          reject();
        } else {
          resolve(result);
        }
      }
    );

    window.addEventListener("message", responseListener, false);
    window.addEventListener("message", receiveExtensionLoadedMessage, false);

    sendMessageToExtension(request);

    setTimeout(() => {
      window.removeEventListener("message", responseListener);
      window.removeEventListener("message", receiveExtensionLoadedMessage);
      reject();
    }, timeoutMs);
  });
}

export function sendMessageToExtension(request?: RequestPayload) {
  console.info(
    `[Client] Sending message to extension, reqName: ${request?.reqName}, id: ${
      request?.id
    }, params: ${JSON.stringify(request?.params)}`
  );
  const messagePayload: MessagePayload = { type: MessageType.fromPage };
  if (request) {
    messagePayload.request = request;
  }
  window.postMessage(messagePayload, "*");
}

// null means listen to all
export function buildExtensionApiListener(
  type: MessageType,
  id: string | null,
  reqName: RequestName | null,
  callback: (result?: ResultPayload) => void
) {
  return (event: MessageEvent<MessagePayload>) => {
    // We only accept messages from ourselves
    if (event.source !== window) {
      return;
    }

    // ensure required fields present
    if (!event.data || !event.data.type) {
      return;
    }

    if (event.data.type === type) {
      if (
        id &&
        reqName &&
        event.data.request &&
        (id !== event.data.request.id || reqName !== event.data.request.reqName)
      ) {
        // no match, ignore this message
        return;
      }
      callback(event.data.result);
    }
  };
}
