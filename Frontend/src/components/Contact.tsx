import { useState, useRef, useEffect, useCallback } from 'react';
import './Contact.css';

interface TerminalLine {
  text: string;
  type: 'system' | 'prompt' | 'input' | 'success' | 'error' | 'info';
}

const STEPS = ['NAME', 'EMAIL', 'SUBJECT', 'MESSAGE'];
const PROMPTS: Record<string, string> = {
  NAME: 'Enter your full name',
  EMAIL: 'Enter your email address',
  SUBJECT: 'Enter message subject',
  MESSAGE: 'Type your message',
};

function validate(step: string, value: string): string | null {
  const v = value.trim();
  if (step === 'NAME' && v.length < 2) return 'Error: Name must be at least 2 characters';
  if (step === 'EMAIL' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return 'Error: Please enter a valid email address';
  if (step === 'SUBJECT' && v.length < 2) return 'Error: Subject must be at least 2 characters';
  if (step === 'MESSAGE' && v.length < 10)
    return 'Error: Message must be at least 10 characters';
  return null;
}

function getCurrentDateTime(): string {
  const now = new Date();
  return now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
}

export default function Contact() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Initialize terminal
  useEffect(() => {
    setLines([
      { text: 'CONTACT TERMINAL v2.3.1 INITIALIZED...', type: 'system' },
      { text: 'READY FOR INPUT', type: 'system' },
      { text: '', type: 'system' },
      { text: '> Please provide the following information:', type: 'info' },
      { text: `> ${STEPS[0]}: [${PROMPTS[STEPS[0]]}]`, type: 'prompt' },
    ]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = useCallback(() => {
    const step = STEPS[currentStep];
    const value = inputValue.trim();

    if (!value) return;

    const error = validate(step, value);

    // Add user input to terminal
    const newLines: TerminalLine[] = [
      ...lines,
      { text: `[${step}]$ ${value}`, type: 'input' },
    ];

    if (error) {
      newLines.push({ text: error, type: 'error' });
      newLines.push({ text: `> ${step}: [${PROMPTS[step]}]`, type: 'prompt' });
      setLines(newLines);
      setInputValue('');
      return;
    }

    // Save data
    const updatedData = { ...formData, [step]: value };
    setFormData(updatedData);

    const nextStep = currentStep + 1;

    if (nextStep < STEPS.length) {
      // Show next prompt
      newLines.push({
        text: `✓ ${step} saved successfully`,
        type: 'success',
      });
      newLines.push({
        text: `> ${STEPS[nextStep]}: [${PROMPTS[STEPS[nextStep]]}]`,
        type: 'prompt',
      });
      setCurrentStep(nextStep);
    } else {
      // Complete
      newLines.push({ text: '', type: 'system' });
      newLines.push({ text: '═══════════════════════════════════════════', type: 'system' });
      newLines.push({ text: '✓ ALL FIELDS VALIDATED', type: 'success' });
      newLines.push({ text: '> Compiling message payload...', type: 'info' });
      newLines.push({ text: '> Establishing secure connection...', type: 'info' });
      newLines.push({ text: '> Message transmitted successfully! ✓', type: 'success' });
      newLines.push({ text: '═══════════════════════════════════════════', type: 'system' });
      newLines.push({ text: '', type: 'system' });
      newLines.push({
        text: `Thank you, ${updatedData.NAME}! I'll respond to ${updatedData.EMAIL} soon.`,
        type: 'success',
      });
      newLines.push({ text: 'Type "RESET" to send another message.', type: 'info' });
      setIsComplete(true);
    }

    setLines(newLines);
    setInputValue('');
  }, [inputValue, currentStep, lines, formData]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setInputValue('');
    setFormData({});
    setIsComplete(false);
    setLines([
      { text: 'CONTACT TERMINAL v2.3.1 INITIALIZED...', type: 'system' },
      { text: 'SESSION RESET - READY FOR INPUT', type: 'system' },
      { text: '', type: 'system' },
      { text: '> Please provide the following information:', type: 'info' },
      { text: `> ${STEPS[0]}: [${PROMPTS[STEPS[0]]}]`, type: 'prompt' },
    ]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (inputValue.trim().toUpperCase() === 'RESET') {
        handleReset();
        return;
      }
      if (!isComplete) {
        handleSubmit();
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="contact" id="contact">
      {/* Header */}
      <div className="contact__header">
        <h2 className="contact__title">CONTACT.SH</h2>
        <p className="contact__subtitle">
          <span className="contact__cmd-prefix">&gt; </span>
          Initialize secure communication protocol
        </p>
        <div className="contact__title-underline"></div>
      </div>

      {/* Terminal */}
      <div className="contact__terminal" onClick={focusInput} id="contact-terminal">
        {/* Title Bar */}
        <div className="contact__terminal-titlebar">
          <div className="contact__terminal-dots">
            <span className="contact__dot contact__dot--red"></span>
            <span className="contact__dot contact__dot--yellow"></span>
            <span className="contact__dot contact__dot--green"></span>
          </div>
          <span className="contact__terminal-user">contact@pawara-sasmina.dev</span>
          <span className="contact__terminal-time">{getCurrentDateTime()}</span>
        </div>

        {/* Terminal Body */}
        <div className="contact__terminal-body" ref={terminalBodyRef}>
          {lines.map((line, i) => (
            <div key={i} className={`contact__line contact__line--${line.type}`}>
              {line.text}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="contact__input-line">
            <span className="contact__input-prompt">
              [{isComplete ? 'DONE' : STEPS[currentStep]}]$
            </span>
            <input
              ref={inputRef}
              type="text"
              className="contact__input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isComplete && inputValue.toUpperCase() !== 'RESET'}
              autoComplete="off"
              spellCheck={false}
              id="contact-input"
            />
            <span className="contact__cursor"></span>
          </div>
        </div>

        {/* Status Bar */}
        <div className="contact__terminal-statusbar">
          <span className="contact__status-hint">
            Press ENTER to submit · Type "RESET" to restart
          </span>
          <span className="contact__status-step">
            Step: {isComplete ? '4' : currentStep + 1}/4
            <span className="contact__status-dot"></span>
          </span>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="contact__instructions">
        <h3 className="contact__instructions-title">TERMINAL INSTRUCTIONS</h3>
        <div className="contact__instructions-grid">
          <div className="contact__instructions-col">
            <h4 className="contact__instructions-label contact__instructions-label--cyan">
              COMMANDS:
            </h4>
            <ul className="contact__instructions-list">
              <li>ENTER – Submit current input</li>
              <li>RESET – Restart terminal session</li>
              <li>Click terminal area to focus</li>
            </ul>
          </div>
          <div className="contact__instructions-col">
            <h4 className="contact__instructions-label contact__instructions-label--magenta">
              VALIDATION:
            </h4>
            <ul className="contact__instructions-list">
              <li>Name: Min 2 characters</li>
              <li>Email: Valid format required</li>
              <li>Message: Min 10 characters</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
