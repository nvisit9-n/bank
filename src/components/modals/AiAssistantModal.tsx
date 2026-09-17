import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, BookOpen, CheckSquare, Copy, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QuizSet } from '../../types';
import { MOCK_QUESTIONS } from '../../data/mockData';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import { safeCopyToClipboard } from '../../utils/safeHelpers';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  suggestedTopic?: string;
}

export const AiAssistantModal: React.FC = () => {
  const { isAiModalOpen, setIsAiModalOpen, startQuiz } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `नमस्ते! म तपाईंको "Banking Tayari Nepal AI साथी" हुँ। 

म तपाईंलाई नेपाल राष्ट्र बैंक, वाणिज्य बैंकहरू (RBB, NBL, ADBL) र लोकसेवा आयोगका प्रथम तथा द्वितीय पत्रका विषयहरूमा तत्काल व्याख्या, कानुनका दफाहरू र परीक्षा उपयोगी बुँदाहरू प्रदान गर्न सक्छु।

कुनै पनि प्रश्न सोध्नुहोस् वा तलका द्रुत विषयहरूमा थिच्नुहोस्!`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isAiModalOpen) return null;

  const samplePrompts = [
    'BAFIA २०७३ अनुसार बैंकहरूको वर्गीकरण के हो?',
    'मौद्रिक नीतिका मुख्य उपकरणहरू के-के हुन्?',
    'बैंक हिसाब मिलान (BRS) बनाउने मुख्य उद्देश्य के हो?',
    'सार्वजनिक व्यवस्थापनमा Re-engineering को महत्व'
  ];

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: promptText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Realistic pedagogical response generation
    setTimeout(() => {
      let aiResponse = '';

      const queryLower = promptText.toLowerCase();

      if (queryLower.includes('bafia') || queryLower.includes('वर्गीकरण')) {
        aiResponse = `**BAFIA २०७३ अनुसार बैंक तथा वित्तीय संस्थाहरूको वर्गीकरण:**

नेपाल राष्ट्र बैंकद्वारा जारी 'बैंक तथा वित्तीय संस्था सम्बन्धी ऐन, २०७३' को दफा ३७ अनुसार बैंक तथा वित्तीय संस्थाहरूलाई ४ वर्गमा वर्गीकरण गरिएको छ:

1. **'क' वर्ग: वाणिज्य बैंक (Commercial Banks)**
   - न्यूनतम चुक्ता पूँजी: रु. ८ अर्ब
   - कार्य: प्रतितपत्र (L/C), विदेशी मुद्रा कारोबार, निक्षेप संकलन, कर्जा प्रवाह।

2. **'ख' वर्ग: विकास बैंक (Development Banks)**
   - न्यूनतम चुक्ता पूँजी: राष्ट्रिय स्तरका लागि रु. २.५ अर्ब
   - कार्य: मध्यम तथा दीर्घकालीन परियोजना कर्जा, निक्षेप संकलन।

3. **'ग' वर्ग: वित्त कम्पनी (Finance Companies)**
   - न्यूनतम चुक्ता पूँजी: राष्ट्रिय स्तरका लागि रु. ८० करोड
   - कार्य: हायर पर्चेज, लिजिङ, आवास कर्जा।

4. **'घ' वर्ग: लघुवित्त वित्तीय संस्था (Microfinance)**
   - न्यूनतम चुक्ता पूँजी: राष्ट्रिय स्तरका लागि रु. १० करोड
   - कार्य: विपन्न वर्गलाई बिना धितो सामूहिक जमानीमा स-साना कर्जा।

📌 **Exam Tip:** परीक्षामा वर्गीकरण लेख्दा न्यूनतम चुक्ता पूँजी र प्रमुख कार्यहरू बुँदागत रूपमा तालिका बनाई प्रस्तुत गर्दा उत्कृष्ट अंक प्राप्त हुन्छ।`;
      } else if (queryLower.includes('मौद्रिक') || queryLower.includes('उपकरण')) {
        aiResponse = `**मौद्रिक नीतिका उपकरणहरू (Monetary Policy Instruments):**

नेपाल राष्ट्र बैंकले अर्थतन्त्रमा मुद्रा प्रदाय (Money Supply), ब्याजदर र मूल्य स्थिरता कायम गर्न मौद्रिक नीति जारी गर्दछ। यसका उपकरणहरूलाई २ भागमा विभाजन गरिन्छ:

**क) परिमाणात्मक वा प्रत्यक्ष उपकरणहरू (Quantitative Instruments):**
1. **अनिवार्य नगद अनुपात (CRR):** बैंकहरूले केन्द्रीय बैंकमा राख्नुपर्ने कुल निक्षेपको अनुपात (हाल ४%)।
2. **वैधानिक तरलता अनुपात (SLR):** बैंकहरूले सरकारी सुरक्षण तथा तरल सम्पत्तिमा राख्नुपर्ने अनुपात (वाणिज्य बैंक: १२%)।
3. **बैंक दर (Bank Rate):** केन्द्रीय बैंकले अन्य बैंकहरूलाई अन्तिम ऋणदाताको रूपमा कर्जा दिँदा लिने दर।
4. **स्थायी तरलता सुविधा (SLF)**।

**ख) गुणात्मक वा छनौटपूर्ण उपकरणहरू (Qualitative Instruments):**
1. सीमान्त आवश्यकता निर्धारण (Margin Requirements)
2. कर्जा-निक्षेप अनुपात (CD Ratio - अधिकतम ९०%)
3. नैतिक दबाब (Moral Suasion)।`;
      } else if (queryLower.includes('brs') || queryLower.includes('हिसाब मिलान')) {
        aiResponse = `**बैंक हिसाब मिलान विवरण (Bank Reconciliation Statement - BRS):**

**परिभाषा:**
कुनै निश्चित मितिमा संस्थाको नगद पुस्तिका (Cash Book) को बैंक महलको मौज्दात र बैंकले उपलब्ध गराएको पासबुक (Pass Book/Bank Statement) को मौज्दातबीच फरक पर्न गएमा सो फरकका कारणहरू पत्ता लगाई दुवै मौज्दात बराबर बनाउन तयार पारिने विवरणलाई BRS भनिन्छ।

**मुख्य उद्देश्यहरू:**
1. Cash Book र Pass Book बीचको मौज्दातको फरकको कारण पत्ता लगाउनु।
2. अभिलेखमा भएका कुनै भूल, त्रुटि वा जालसाजी भए पहिचान गर्नु।
3. व्यवसायको यथार्थ बैंक मौज्दात यकिन गरी वित्तीय विवरण सत्य बनाउनु।
4. आन्तरिक नियन्त्रण प्रणालीलाई सुदृढ तुल्याउनु।`;
      } else {
        aiResponse = `**"${promptText}" सम्बन्धी परीक्षा तयारी टिपोट:**

बैंकिङ तथा लोकसेवा आयोगको पाठ्यक्रम अनुसार यस शीर्षकमा निम्न बुँदाहरू महत्वपूर्ण छन्:

1. **अवधारणा र परिभाषा:** यस विषयको आधारभूत उद्देश्य सार्वजनिक प्रशासन तथा वित्तीय अनुशासनलाई व्यवस्थित र पारदर्शी बनाउनु हो।
2. **नेपालमा विद्यमान कानुनी व्यवस्था:** सम्बन्धित ऐन, नियम तथा राष्ट्र बैंकका एकीकृत निर्देशनहरूद्वारा यसको कार्यान्वयन सुनिश्चित गरिएको छ।
3. **प्रमुख चुनौतीहरू:** नीतिगत निरन्तरता, प्राविधिक दक्ष जनशक्तिको कमी, तथा अनुगमन र सुपरीवेक्षणको प्रभावकारिता।
4. **सुधारका उपायहरू:** सूचना प्रविधिको अधिकतम प्रयोग, संस्थागत सुशासन (Corporate Governance) को पूर्ण पालना र कार्यसम्पादनमा आधारित मूल्यांकन।

📌 **सुझाव:** यस विषयमा थप वस्तुगत प्रश्न हल गर्न तलको 'क्विज अभ्यास' बटन प्रयोग गर्नुहोस्!`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponse
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleCopyText = async (id: string, text: string) => {
    const success = await safeCopyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleStartAiQuiz = () => {
    setIsAiModalOpen(false);
    const quizSet: QuizSet = {
      id: `ai-quiz-${Date.now()}`,
      title: 'AI साथी - विशेष अभ्यास क्विज',
      description: 'भर्खरै छलफल गरिएका विषयहरूमा आधारित १० वटा अभ्यास प्रश्नहरू',
      category: 'Banking',
      difficulty: 'Medium',
      mode: 'practice',
      timeLimitMinutes: 5,
      questions: MOCK_QUESTIONS.slice(0, 10),
      badge: 'AI Quiz'
    };
    startQuiz(quizSet);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full h-[85vh] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-amber-500/10 dark:bg-amber-950/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-slate-900 dark:text-white text-base sm:text-lg">
                  AI साथी (AI Study Assistant)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                  Banking & Loksewa AI
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                नेपाली भाषामा तत्काल परीक्षा सहायता तथा टिपोट
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAiModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Chat Stream View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white font-medium rounded-br-none whitespace-pre-line'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                {msg.sender === 'ai' ? (
                  <MarkdownRenderer content={msg.text} />
                ) : (
                  msg.text
                )}

                {msg.sender === 'ai' && (
                  <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
                    <button
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="flex items-center gap-1 hover:text-emerald-600 transition"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === msg.id ? 'कपी भयो' : 'कपी गर्नुहोस्'}</span>
                    </button>

                    <button
                      onClick={handleStartAiQuiz}
                      className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>यसबाट Quiz खेल्नुहोस्</span>
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                  U
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-500" />
              <span>AI साथीले नेपालीमा उत्तर तयार गर्दैछ...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompt Chips */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-none">
          {samplePrompts.map((p, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSendPrompt(p)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium hover:border-amber-500 transition shrink-0"
            >
              💡 {p}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendPrompt(inputQuery);
            }}
            placeholder="आफ्नो प्रश्न यहाँ सोध्नुहोस्..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleSendPrompt(inputQuery)}
            disabled={!inputQuery.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-600 hover:to-orange-600 transition disabled:opacity-40"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
