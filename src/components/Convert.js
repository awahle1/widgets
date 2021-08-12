import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('');
  const [deboundcedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return(() => {
      clearTimeout(timeoutId);
    })
  }, [text]);

  useEffect(() =>{
    const doTranslation = async () => {
      const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
        params: {
          q: deboundcedText,
          target: language.value,
          key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
        }
      });
      setTranslated(data.data.translations[0].translatedText);
    }
    doTranslation();
  }, [deboundcedText, language]);


  return(
    <div>
      {translated}
    </div>
  );
}

export default Convert;
