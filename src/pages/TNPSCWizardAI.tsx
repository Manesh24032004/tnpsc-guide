import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, ArrowLeft, Home, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  attachments?: { name: string; type: string }[];
}

const TNPSCWizardAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'வணக்கம்! நான் TNPSC Wizard AI. உங்கள் TNPSC தேர்வு தயாரிப்புக்கு நான் உதவ தயாராக இருக்கிறேன். எந்த கேள்வியும் கேளுங்கள்!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('syllabus') || lowerQuery.includes('பாடத்திட்டம்')) {
      return 'TNPSC தேர்வுகளுக்கான பாடத்திட்டங்களை நீங்கள் Syllabus பகுதியில் காணலாம். G-1, G-2/IIA, மற்றும் G-IV தேர்வுகளுக்கான முழுமையான பாடத்திட்டங்கள் உள்ளன.';
    }
    if (lowerQuery.includes('book') || lowerQuery.includes('புத்தகம்')) {
      return '6வது முதல் 12வது வகுப்பு வரையிலான அனைத்து பாடப்புத்தகங்களும் Books பகுதியில் கிடைக்கும். Tamil, Maths, Science, Social Science போன்ற பாடங்கள் உள்ளன.';
    }
    if (lowerQuery.includes('question') || lowerQuery.includes('கேள்வி') || lowerQuery.includes('paper')) {
      return 'கடந்த ஆண்டு வினாத்தாள்களை Past Year Questions பகுதியில் ஆண்டு வாரியாக பார்க்கலாம். 2015 முதல் 2025 வரையிலான வினாத்தாள்கள் கிடைக்கும்.';
    }
    if (lowerQuery.includes('tirukural') || lowerQuery.includes('திருக்குறள்')) {
      return 'திருக்குறள் பகுதியில் திருவள்ளுவரின் வரலாறு மற்றும் 20 அதிகாரங்கள் உள்ளன. TNPSC தேர்வுக்கு மிக முக்கியமான பகுதி இது.';
    }
    
    return 'உங்கள் கேள்விக்கு நன்றி! TNPSC தேர்வு தயாரிப்புக்கு Syllabus, Books, Past Year Questions, மற்றும் Tirukural பகுதிகளை பயன்படுத்துங்கள். மேலும் உதவி தேவைப்பட்டால் கேளுங்கள்!';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `📎 ${file.name}`,
      timestamp: new Date(),
      attachments: [{ name: file.name, type: file.type }],
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `நான் உங்கள் ${type === 'image' ? 'படத்தை' : 'கோப்பை'} பெற்றுக்கொண்டேன். இது தொடர்பான கேள்விகளை கேளுங்கள்!`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);

    event.target.value = '';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-4 flex flex-col max-w-4xl">
        {/* Back Navigation */}
        <div className="flex gap-4 mb-4">
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Chat Header */}
        <div className="bg-primary text-primary-foreground rounded-t-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">TNPSC Wizard AI</h1>
            <p className="text-sm opacity-80">உங்கள் தேர்வு உதவியாளர்</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-card border-x border-border">
          <ScrollArea className="h-[calc(100vh-380px)] min-h-[300px]">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === 'bot' && (
                        <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.type === 'user' && (
                        <User className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-xs opacity-60 mt-1 block text-right">
                      {message.timestamp.toLocaleTimeString('ta-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground p-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input Area - WhatsApp Style */}
        <div className="bg-card border border-t-0 border-border rounded-b-xl p-3">
          <div className="flex items-center gap-2">
            {/* File Upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e, 'file')}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            {/* Image Upload */}
            <input
              type="file"
              ref={imageInputRef}
              onChange={(e) => handleFileUpload(e, 'image')}
              className="hidden"
              accept="image/*"
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => imageInputRef.current?.click()}
            >
              <Image className="h-5 w-5" />
            </Button>

            {/* Text Input */}
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 rounded-full bg-muted border-0"
            />

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TNPSCWizardAI;
