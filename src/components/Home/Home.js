import React from 'react';
import './Home.css';

import { Grid, Grow } from '@material-ui/core';
import FadeInSection from '../../FadeInSection';
import CloudIcon from '@material-ui/icons/Cloud';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';


  const sections = [
    { image: <CloudIcon style={{ fontSize: 150 ,fill: "lightblue"}} /> ,  title: 'Forecast for Today', text: 'What\'s the weather in London?' },
    { image: <LibraryBooksIcon style={{ fontSize: 150, fill: "lightblue"}}/> , title: 'News and Interests', text: 'Give me the latest news? OR What\'s up with Bitcoin?' },
  ];
 
export default class Home extends React.Component {

      constructor(props) {
        super(props);
        this.state = {hidden : "hidden", bkg: ""};
      }
      
      componentWillMount(){
            var that = this;
        setTimeout(function() {
          that.show();
        }, that.props.wait);
      }
      show() {
        this.setState({hidden : "", bkg: "bkg"});
      }


    render(){
  
       return(  
         
        <div className={this.state.hidden +" "+ this.state.bkg} style={{ padding: 20 }}>
       
            <Grow in >
        <Grid container alignItems="stretch" spacing={3} alignItems="center" justify="center" style={{ minHeight: '100%' }}>
          {sections.map((section) => ( 
            <Grid item xs={16} sm={12} md={7} lg={6} >
               <FadeInSection>
              <div className="section">
                {section.image}
                <h1>{section.title}</h1>
                <p>Try saying: <br />{section.text}</p>
              </div>
              </FadeInSection>
            </Grid>
          ))}
        </Grid>
      </Grow>
      
              </div>
         
        )
     }
}

