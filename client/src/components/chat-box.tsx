import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, X, Send, User } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ChatMessage } from "@shared/schema";

function formatTime(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getInitials(nickname: string) {
  return nickname.slice(0, 2).toUpperCase();
}

function getAvatarColor(nickname: string) {
  const colors = [
    "bg-italy-green/20 text-italy-green",
    "bg-italy-red/20 text-italy-red",
    "bg-primary/20 text-primary",
    "bg-purple-500/20 text-purple-600",
    "bg-amber-500/20 text-amber-600",
    "bg-cyan-500/20 text-cyan-600",
  ];
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function ChatBox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [nickname, setNickname] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("chat-nickname");
    }
    return null;
  });
  const [nicknameInput, setNicknameInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [showNicknamePrompt, setShowNicknamePrompt] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: messages = [], isLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/messages"],
    refetchInterval: 3000,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: { nickname: string; message: string }) => {
      const res = await apiRequest("POST", "/api/chat/messages", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages"] });
      setMessageInput("");
    },
  });

  useEffect(() => {
    if (scrollRef.current && isExpanded) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isExpanded]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    if (!nickname) {
      setShowNicknamePrompt(true);
      return;
    }

    sendMessageMutation.mutate({
      nickname,
      message: messageInput.trim(),
    });
  };

  const handleSetNickname = () => {
    if (!nicknameInput.trim()) return;
    const name = nicknameInput.trim();
    setNickname(name);
    localStorage.setItem("chat-nickname", name);
    setShowNicknamePrompt(false);

    if (messageInput.trim()) {
      sendMessageMutation.mutate({
        nickname: name,
        message: messageInput.trim(),
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (showNicknamePrompt) {
        handleSetNickname();
      } else {
        handleSendMessage();
      }
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          onClick={() => setIsExpanded(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-italy-green hover:bg-italy-green/90"
          data-testid="button-open-chat"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
        {messages.length > 0 && (
          <span 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-italy-red text-white text-xs flex items-center justify-center font-medium"
            data-testid="badge-message-count"
          >
            {messages.length > 9 ? "9+" : messages.length}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50" data-testid="chat-box-expanded">
      <Card className="w-80 sm:w-96 flex flex-col shadow-xl border-border">
        <div className="flex items-center justify-between gap-2 p-4 border-b border-border bg-italy-green/5">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-italy-green" />
            <h3 className="font-semibold text-foreground">Trip Chat</h3>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsExpanded(false)}
            data-testid="button-close-chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-80">
          <div ref={scrollRef} className="p-4 space-y-4 h-80 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-sm">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
                <MessageCircle className="h-10 w-10 text-muted-foreground/50" />
                <p className="text-muted-foreground text-sm">
                  No messages yet. Start the conversation!
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className="flex gap-3"
                  data-testid={`message-${msg.id}`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={getAvatarColor(msg.nickname)}>
                      {getInitials(msg.nickname)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-sm text-foreground">
                        {msg.nickname}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 break-words">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          {showNicknamePrompt ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Choose a nickname to start chatting</span>
              </div>
              <div className="flex gap-2">
                <Input
                  value={nicknameInput}
                  onChange={(e) => setNicknameInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Your nickname..."
                  className="flex-1"
                  maxLength={20}
                  autoFocus
                  data-testid="input-nickname"
                />
                <Button 
                  onClick={handleSetNickname}
                  disabled={!nicknameInput.trim()}
                  data-testid="button-set-nickname"
                >
                  Join
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1"
                disabled={sendMessageMutation.isPending}
                data-testid="input-message"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || sendMessageMutation.isPending}
                data-testid="button-send-message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}
          {nickname && (
            <p className="mt-2 text-xs text-muted-foreground">
              Chatting as <span className="font-medium">{nickname}</span>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
