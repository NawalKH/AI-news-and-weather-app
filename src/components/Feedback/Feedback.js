import React from 'react';
import {Card, CardContent, Grid, Grow, Typography } from '@material-ui/core';

import NewsCard from '../NewsCards/NewsCard.js';
import Home from '../Home/Home.js';
import "./Feedback.css";
import FadeInSection from '../../FadeInSection.js';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

const texts = [
  'Hello', 'This is an AI application', 'Click on the mic Button to speak', 'You can Ask about the weather', 'Or the latests News of your interests']

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  
const Feedback = ({ weatherinfo, articles, activeArticle }) => {
 

  if (!weatherinfo.hasOwnProperty("weather") && !articles.length && activeArticle==0) {
    return (
      <div className="intro">
        
      <div className="titles">
      {texts.map((text, i) => (
        <p  style={{animation: `fade-animation 15s linear ${i * 3}s`}}>{text}</p>
      ))}

        </div>  
      <Home wait={15000}></Home>
        </div>
     
    );
  } else if(!weatherinfo.hasOwnProperty("weather") && !articles.length && activeArticle==-1){
    return (
      <div className="intro"> 
      <Home></Home>
        </div>
    );
  } else if(weatherinfo.hasOwnProperty("weather")){
    return (
      <Grid container direction="column" alignItems="center" justify="center">
  <Grid item xs={6}  style={{ width: '100%', margin: '40px'}}>
<FadeInSection> 
<Card className="weatherCard">
      <CardContent>
       <Typography variant="h3" component="div">
       <LocationOnIcon style={{ fontSize: 35}} /> {weatherinfo.name}
        </Typography>
        <br />
        <Typography variant="h5" >
        {kelvinToFarenheit(weatherinfo.main.temp)}&deg; C
        </Typography>
        <br />
        <div style={{ display: 'flex', alignItems:'center', float:'right'}} >
        <img
              src={`http://openweathermap.org/img/w/${weatherinfo.weather[0].icon}.png`}
              alt="weather status icon"
            />
             <Typography variant="h6"  style={{ verticalalign: 'middle'}}>{weatherinfo.weather[0].main}</Typography>
           </div>
           
        <Typography variant="h6"  style={{ float:'left' }}>
            <WbSunnyIcon  style={{ fontSize: 30 ,fill: "yellow", marginRight:'10px'}} />
                    {kelvinToFarenheit(weatherinfo.main.temp_max)}&deg; C
                    <br />
                    <AcUnitIcon  style={{ fontSize: 30 ,fill: "lightblue", marginRight:'10px'}} />       
                    {kelvinToFarenheit(weatherinfo.main.temp_min)}&deg; C
        </Typography>
      </CardContent>    
    </Card>
    </FadeInSection>
    </Grid>
    </Grid>
    );
  } else if(articles.length){
  return (
    <div>

    <Grow in>
      <Grid className="container" container alignItems="stretch" spacing={3}>
        {articles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <NewsCard activeArticle={activeArticle} i={i} article={article} />
          </Grid>
        ))}
      </Grid>
    </Grow>

    </div>
  );
}
}

export default Feedback;
