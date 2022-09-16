import {createPortal} from "react-dom";
import {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";

let notify: (message: NotificationMessage) => void;
let removeAll: () => void;
const root = ReactDOM.createRoot(createContainer())
root.render(<Notifications
  setNotify={(notifyFn): void => {
    notify = notifyFn;
  }}
  removeAll={(removeAllFn) => {
    return removeAll = removeAllFn;
  }}/>)

const notifications = {
  success: (message: string) => {
    notify({
      message: message,
      type: 'success',
      id: Date.now()
    } as NotificationMessage);
  },
  closeAll() {
    removeAll();
  },
  error(message: string) {
    notify({
      message: message,
      type: 'warning',
      id: Date.now()
    })
  }
}
export default notifications

interface NotificationMessage {
  message: string,
  type?: string,
  id: number
}

function createContainer() {
  const id = "notification_id";
  let element: HTMLElement | null = document.getElementById(id);
  if (element == null) {
    element = document.createElement("div");
  }
  element.setAttribute("id", id)
  document.body.append(element);
  return element;
}

interface NotificationsProps {
  setNotify: (message: (message: NotificationMessage) => void) => void
  removeAll: (call: () => void) => void;
}

export function Notifications(props: NotificationsProps) {
  const {setNotify, removeAll} = props
  const [notifications, setNotifications] = useState([] as NotificationMessage[])

  function removeNotification(index: number) {
    setNotifications(it => {
      return it.slice(index + 1);
    })
  }

  useEffect(() => {
    setNotify((message: NotificationMessage) => {
      setTimeout(() => {
        setNotifications((it) => it.filter(i => i.id !== message.id))
      }, 3000)
      setNotifications(it => {
        return [...it, message];
      })
    });
    removeAll(() => {
      setNotifications(() => [])
    })
  }, [setNotify, removeAll])

  return createPortal(<div>
      <div className="w-full absolute top-0 z-50 flex justify-center items-center my-8">
        <div>
          {
            notifications.map((notification, index) =>
              <Notification key={notification.id}
                            notification={notification}
                            onClose={() => removeNotification(index)}/>
            )
          }
        </div>
      </div>
    </div>,
    createContainer())
}

const successIcon =
  <div
    className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
         xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"/>
    </svg>
    <span className="sr-only">Check icon</span>
  </div>
const warningIcon = <div
  className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
       xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="event"/>
  </svg>
  <span className="sr-only">Warning icon</span>
</div>

interface NotificationProps {
  onClose: () => void;
  notification: NotificationMessage;
}

export function Notification(props: NotificationProps) {

  function handleClose() {
    props.onClose()
  }

  function icon() {
    if (props.notification.type == 'success') {
      return successIcon;
    }
    return warningIcon;
  }

  return <div
    className="right-0 top-0 flex flex-right items-center p-4 mb-4 w-full max-w-sm text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
    role="alert">
    {icon()}
    <div className="ml-3 text-sm font-normal">{props.notification.message}</div>
    <button type="button"
            role="notification:close"
            onClick={handleClose}
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success" aria-label="Close">
      <span className="sr-only">Close Tip</span>
      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"/>
      </svg>
    </button>
  </div>
}