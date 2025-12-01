import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Send, User } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ChatMessage } from "@shared/schema";
import gelatoIcon from "@assets/14E66A51-6306-4DBD-B316-9765CD873462_1764565746408.png";

import pizzaAvatar from "@assets/generated_images/kawaii_pizza_slice_avatar.png";
import espressoAvatar from "@assets/generated_images/kawaii_espresso_cup_avatar.png";
import pastaAvatar from "@assets/generated_images/kawaii_pasta_bowl_avatar.png";
import cannoliAvatar from "@assets/generated_images/kawaii_cannoli_avatar.png";
import tiramisuAvatar from "@assets/generated_images/kawaii_tiramisu_avatar.png";
import meatballAvatar from "@assets/generated_images/kawaii_meatball_avatar.png";
import bruschettaAvatar from "@assets/generated_images/kawaii_bruschetta_avatar.png";
import oliveAvatar from "@assets/generated_images/kawaii_olive_avatar.png";
import tomatoAvatar from "@assets/generated_images/kawaii_tomato_avatar.png";
import mozzarellaAvatar from "@assets/generated_images/kawaii_mozzarella_avatar.png";

const avatarImages = [
  pizzaAvatar,
  espressoAvatar,
  pastaAvatar,
  cannoliAvatar,
  tiramisuAvatar,
  meatballAvatar,
  bruschettaAvatar,
  oliveAvatar,
  tomatoAvatar,
  mozzarellaAvatar,
];

function formatTime(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getInitials(nickname: string) {
  return nickname.slice(0, 2).toUpperCase();
}

function getAvatarImage(nickname: string) {
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarImages[Math.abs(hash) % avatarImages.length];
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
        <button
          onClick={() => setIsExpanded(true)}
          className="cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ 
            background: 'transparent', 
            border: 'none', 
            padding: 0, 
            margin: 0,
            outline: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none'
          }}
          data-testid="button-open-chat"
        >
          <img 
            src={gelatoIcon} 
            alt="Open chat" 
            className="h-16 w-16 object-contain drop-shadow-lg" 
          />
        </button>
        {(() => {
          const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
          const recentMessages = messages.filter(msg => new Date(msg.createdAt).getTime() > oneDayAgo);
          if (recentMessages.length === 0) return null;
          return (
            <span 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-italy-red text-white text-xs flex items-center justify-center font-medium"
              data-testid="badge-message-count"
            >
              {recentMessages.length > 9 ? "9+" : recentMessages.length}
            </span>
          );
        })()}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50" data-testid="chat-box-expanded">
      <Card className="w-80 sm:w-96 flex flex-col shadow-xl border-border">
        <div className="flex items-center justify-between gap-2 p-4 border-b border-border bg-italy-green/5">
          <div className="flex items-center gap-2">
            <img src={gelatoIcon} alt="" className="h-6 w-6 object-contain" />
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
                <img src={gelatoIcon} alt="" className="h-12 w-12 object-contain opacity-50" />
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
                    <AvatarImage 
                      src={getAvatarImage(msg.nickname)} 
                      alt={msg.nickname}
                      className="object-cover"
                    />
                    <AvatarFallback>
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
          {nickname && !showNicknamePrompt && (
            <button
              onClick={() => {
                setNicknameInput(nickname);
                setShowNicknamePrompt(true);
              }}
              className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"
              data-testid="button-change-nickname"
            >
              Chatting as <span className="font-medium underline decoration-dotted underline-offset-2">{nickname}</span>
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
