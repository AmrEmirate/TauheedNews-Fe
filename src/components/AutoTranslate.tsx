'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface AutoTranslateProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export default function AutoTranslate({ text, className, as: Component = 'span' }: AutoTranslateProps) {
  const { language, translateDynamic } = useLanguage();
  const [translatedText, setTranslatedText] = useState<string>(text);

  useEffect(() => {
    let isMounted = true;
    if (!text || language === 'id') {
      setTranslatedText(text);
      return;
    }

    translateDynamic(text)
      .then((res) => {
        if (isMounted) setTranslatedText(res);
      })
      .catch(() => {
        if (isMounted) setTranslatedText(text);
      });

    return () => {
      isMounted = false;
    };
  }, [text, language, translateDynamic]);

  return <Component className={className}>{translatedText || text}</Component>;
}

export function useAutoTranslate(text: string): string {
  const { language, translateDynamic } = useLanguage();
  const [translatedText, setTranslatedText] = useState<string>(text);

  useEffect(() => {
    let isMounted = true;
    if (!text || language === 'id') {
      setTranslatedText(text);
      return;
    }

    translateDynamic(text)
      .then((res) => {
        if (isMounted) setTranslatedText(res);
      })
      .catch(() => {
        if (isMounted) setTranslatedText(text);
      });

    return () => {
      isMounted = false;
    };
  }, [text, language, translateDynamic]);

  return translatedText || text;
}
