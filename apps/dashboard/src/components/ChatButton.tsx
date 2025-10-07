interface ChatButtonProps {
  onClick: () => void;
  hasUnread?: boolean;
}

export function ChatButton({ onClick, hasUnread }: ChatButtonProps) {
  return (
    <button onClick={onClick} className="chat-fab">
      💬
      {hasUnread && (
        <div className="chat-fab-unread" />
      )}
    </button>
  );
}
