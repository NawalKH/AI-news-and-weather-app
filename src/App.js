import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import { Feedback } from './components';
import useStyles from './styles';

const alanKey = "8d6f867613a2764fe7a402c0818462772e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {

  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [Weather , setWeather] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key:alanKey,
      onCommand: ({ command, articles, number, weatherdetails }) => {
        if (command === 'Weather') {
          setNewsArticles([]);
          setWeather(weatherdetails);
          }
        if (command === 'newHeadlines') {
          setActiveArticle(-1);
          setNewsArticles(articles);
          setWeather([]);

        }else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

 
  return (

    <div>

       <div className={classes.header}>
        {newsArticles.length || Weather.hasOwnProperty("weather") ? (
            <div className={classes.goBack}>
            <Button variant="contained" onClick={() => {
           setNewsArticles([]);
           setWeather([]);
                  }}>
             Click here OR Say "Go back"
              </Button>
              </div>
        ) : null}
      </div>

    <Feedback weatherinfo={Weather} articles={newsArticles} activeArticle={activeArticle} />
    
     </div> 

  );
};


export default App;
