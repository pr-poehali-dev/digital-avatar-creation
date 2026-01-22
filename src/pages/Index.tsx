import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AvatarProfile {
  name: string;
  memory: string[];
  habits: string[];
  skills: string[];
  character: string[];
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я твой цифровой аватар. Готов помочь и пообщаться. Чем займёмся?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [profile] = useState<AvatarProfile>({
    name: 'Цифровой Аватар',
    memory: ['Предпочитает активный отдых', 'Интересуется технологиями', 'Любит путешествовать'],
    habits: ['Утренняя пробежка', 'Чтение технических статей', 'Фотография пейзажей'],
    skills: ['Программирование', 'Аналитика данных', 'Машинное обучение', 'Коммуникация'],
    character: ['Дружелюбный', 'Любознательный', 'Ответственный', 'Креативный']
  });

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Это демо-ответ. В полной версии здесь будет AI-обработка вашего сообщения.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Цифровой Аватар
          </h1>
          <p className="text-muted-foreground">Ваш персональный AI-помощник</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full ${isSpeaking ? 'animate-pulse-ring' : ''} bg-primary/30`} />
                  <div className={`w-48 h-48 rounded-full overflow-hidden border-4 ${isSpeaking ? 'border-primary animate-glow' : 'border-primary/50'} shadow-2xl`}>
                    <img 
                      src="https://cdn.poehali.dev/projects/ab21433f-9202-42bc-99a1-d11b5e4e7650/bucket/91e5e61f-ebee-41a9-b272-3d756324338f.jpg"
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={toggleListening}
                    variant={isListening ? "default" : "outline"}
                    size="lg"
                    className="gap-2"
                  >
                    <Icon name={isListening ? "MicOff" : "Mic"} size={20} />
                    {isListening ? 'Остановить' : 'Слушать'}
                  </Button>
                  <Button
                    onClick={toggleSpeaking}
                    variant={isSpeaking ? "default" : "outline"}
                    size="lg"
                    className="gap-2"
                  >
                    <Icon name={isSpeaking ? "Volume2" : "VolumeX"} size={20} />
                    {isSpeaking ? 'Говорю' : 'Озвучить'}
                  </Button>
                </div>

                {isListening && (
                  <div className="mt-4 flex gap-1 items-center">
                    <div className="w-1 h-8 bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-12 bg-primary animate-pulse" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-6 bg-primary animate-pulse" style={{ animationDelay: '300ms' }} />
                    <div className="w-1 h-10 bg-primary animate-pulse" style={{ animationDelay: '450ms' }} />
                    <div className="w-1 h-8 bg-primary animate-pulse" style={{ animationDelay: '600ms' }} />
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Icon name="MessageSquare" size={20} />
                  Чат
                </h3>
                
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-2xl ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs opacity-70 mt-2 block">
                            {message.timestamp.toLocaleTimeString('ru-RU', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex gap-2">
                  <Textarea
                    placeholder="Напишите сообщение..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="min-h-[60px] resize-none"
                  />
                  <Button onClick={sendMessage} size="lg" className="gap-2">
                    <Icon name="Send" size={20} />
                    Отправить
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur border-secondary/20">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile">Профиль</TabsTrigger>
                  <TabsTrigger value="history">История</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Brain" size={16} />
                      Память
                    </h3>
                    <div className="space-y-2">
                      {profile.memory.map((item, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Icon name="Circle" size={8} className="mt-1.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Repeat" size={16} />
                      Привычки
                    </h3>
                    <div className="space-y-2">
                      {profile.habits.map((item, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Icon name="Circle" size={8} className="mt-1.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Zap" size={16} />
                      Навыки
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Icon name="Heart" size={16} />
                      Характер
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.character.map((trait, idx) => (
                        <Badge key={idx} variant="outline">{trait}</Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Сегодня</span>
                          <Icon name="Clock" size={14} className="text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Обсудили планы на выходные и новые AI-технологии
                        </p>
                      </div>

                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Вчера</span>
                          <Icon name="Clock" size={14} className="text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Проработали идею нового проекта и составили план
                        </p>
                      </div>

                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">3 дня назад</span>
                          <Icon name="Clock" size={14} className="text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Обучение аватара на новых данных о предпочтениях
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Settings" size={20} />
                Настройки
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Имя аватара</label>
                  <Input value={profile.name} disabled className="bg-muted/50" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Стиль общения</label>
                  <Input placeholder="Дружелюбный" disabled className="bg-muted/50" />
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Icon name="Upload" size={16} />
                  Загрузить данные для обучения
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
