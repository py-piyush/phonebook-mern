const Notification = ({ message }) => {
  if (message === null) return;
  return <div className={message.type}>{message.msg}</div>;
};
export default Notification;
