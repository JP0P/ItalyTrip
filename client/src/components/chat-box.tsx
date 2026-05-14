import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Send, User, Images, MessageCircle, MapPin } from "lucide-react";
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

function isTripCheckIn(message: ChatMessage) {
  return message.message.includes("📍 Trip check-in ·");
}

function getCheckInPreview(message: string) {
  return message
    .split("\n")
    .filter((line) => !line.startsWith("📍 Trip check-in ·"))
    .join("\n");
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
  const [viewMode, setViewMode] = useState<"chat" | "gallery">("chat");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: messages = [], isLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/messages"],
    refetchInterval: 3000,
  });

  const chatMessages = messages.filter((msg) => !isTripCheckIn(msg));
  const checkInMessages = messages.filter(isTripCheckIn).reverse();

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
        {checkInMessages.length > 0 && (
          <button
            onClick={() => {
              setViewMode("gallery");
              setIsExpanded(true);
            }}
            className="absolute bottom-1 right-16 whitespace-nowrap rounded-full bg-white/95 border border-italy-green/20 px-3 py-1.5 text-xs font-semibold text-italy-green shadow-lg hover:bg-italy-green/10 transition-colors flex items-center gap-1.5"
            data-testid="button-open-check-in-gallery"
          >
            <Images className="h-3.5 w-3.5" />
            Gallery
          </button>
        )}
        <button
          onClick={() => {
            setViewMode("chat");
            setIsExpanded(true);
          }}
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
          const recentMessages = chatMessages.filter(msg => new Date(msg.createdAt).getTime() > oneDayAgo);
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
            <h3 className="font-semibold text-foreground">
              {viewMode === "gallery" ? "Check-in Gallery" : "Trip Chat"}
            </h3>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Button
              size="sm"
              variant={viewMode === "gallery" ? "default" : "outline"}
              onClick={() => setViewMode(viewMode === "gallery" ? "chat" : "gallery")}
              className="h-8 rounded-full px-3 text-xs"
              data-testid="button-toggle-gallery"
            >
              {viewMode === "gallery" ? (
                <>
                  <MessageCircle className="h-3.5 w-3.5 mr-1" /> Chat
                </>
              ) : (
                <>
                  <Images className="h-3.5 w-3.5 mr-1" /> Gallery
                </>
              )}
            </Button>
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
            ) : viewMode === "gallery" ? (
              checkInMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
                  <Images className="h-12 w-12 text-italy-green/40" />
                  <p className="text-muted-foreground text-sm">
                    No check-ins yet. Drop a breadcrumb to start the gallery.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {checkInMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="overflow-hidden rounded-2xl border border-italy-green/15 bg-gradient-to-br from-white to-italy-cream/60 shadow-sm"
                      data-testid={`gallery-check-in-${msg.id}`}
                    >
                      {msg.photo ? (
                        <img
                          src={msg.photo}
                          alt="Check-in photo"
                          className="w-full max-h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(msg.photo!, "_blank")}
                        />
                      ) : (
                        <div className="flex h-24 items-center justify-center bg-italy-green/10 text-italy-green">
                          <MapPin className="h-8 w-8" />
                        </div>
                      )}
                      <div className="p-3">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-semibold text-italy-green">{msg.nickname}</span>
                          <span className="text-[11px] text-muted-foreground">{formatTime(msg.createdAt)}</span>
                        </div>
                        <p className="text-sm text-foreground/90 whitespace-pre-line break-words">
                          {getCheckInPreview(msg.message)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
                <img src={gelatoIcon} alt="" className="h-12 w-12 object-contain opacity-50" />
                <p className="text-muted-foreground text-sm">
                  No chat messages yet. Check-ins live in the gallery now.
                </p>
              </div>
            ) : (
              chatMessages.map((msg) => (
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
                    <p className="text-sm text-foreground/90 break-words whitespace-pre-line">
                      {msg.message}
                    </p>
                    {msg.photo && (
                      <img
                        src={msg.photo}
                        alt="Check-in photo"
                        className="mt-1.5 rounded-xl max-w-full max-h-40 object-cover border border-border/40 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(msg.photo!, "_blank")}
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          {viewMode === "gallery" ? (
            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>{checkInMessages.length} saved breadcrumb{checkInMessages.length === 1 ? "" : "s"}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setViewMode("chat")}
                className="h-8 rounded-full px-3"
                data-testid="button-gallery-back-to-chat"
              >
                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                Back to chat
              </Button>
            </div>
          ) : showNicknamePrompt ? (
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
          {viewMode === "chat" && nickname && !showNicknamePrompt && (
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
