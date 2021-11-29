import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import {getSurveys , getSurveyTasks, getResearcher, getParticipants} from '../../Service/APIService'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { withRouter } from "react-router";
import React from 'react';
import { Grid} from '@mui/material';
import ProgressBar from '../ProgressBar/ProgressBar'
import ApexChart from '../Chart/ApexChart'
import { FcCheckmark } from "react-icons/fc";
import {HiXCircle} from  "react-icons/hi";
import BarChart from "../Chart/BarChart"
class Survey extends React.Component{
    constructor(props){
      
        super(props);
        console.log(props);
        this.state = {
          infoList : {},
          taskList:[],
          researchers:[],
          participants:[],
          isLoaded: false,
          isLoadedTask: false,
          isLoadResearcher: false,
          isLoadedPar: false,
          uId: this.props.match.params.uId,
          ages: [],
          values:[]  
        };
    }


    componentDidMount(){
        this.getInfoList();
        this.getTasksList();
        this.getResearcherList();
        this.getParticipantsList();
      }

      getParticipantsList(){
        getParticipants(this.state.uId).then(data => {
          this.prepareChart(data);
        });
      }

      prepareChart(data){
        var vals = {};
        data.map((par)=>{
          if (vals[parseInt(par.result[0].age.$numberInt)]) {
            vals[parseInt(par.result[0].age.$numberInt)] = vals[parseInt(par.result[0].age.$numberInt)]+1;
          } else {
            vals[parseInt(par.result[0].age.$numberInt)] = 1;
          }
        });
        this.setState({ages : Object.keys(vals)});
        console.log("ages = "+ this.state.ages);
        this.setState({values : Object.values(vals)});
        console.log("values = "+ this.state.values);

        this.setState({participants:data, isLoadedPar: true});

      }

      setInfoList(data){
        this.setState({infoList: data, isLoaded:true});  
      }
      getResearcherList(){
        getResearcher(this.state.uId).then(data => {
          this.setState({researchers: data, isLoadResearcher:true});
        })
      }

      getTasksList(){
        getSurveyTasks(this.state.uId).then(data => {
          this.setState({taskList: data, isLoadedTask:true});
        })
      }
      getInfoList(){
        getSurveys(this.state.uId).then(data => {
          this.setInfoList(data[0]);
        })
      }
      updateName(name) {
        var i=1;
        for(i; i< name.length; i++) {
          if (this.isUpperCase(name.charAt(i))) {
            return name.substring(0, i) + " " +
             name.substring(i, name.length);
          }
        }

      }
      isUpperCase = (string) => /^[A-Z]*$/.test(string)
      
      render(){
        return (
          this.state.isLoaded && this.state.isLoadedTask && this.state.isLoadResearcher && this.state.isLoadedPar?  
               <div> 
                  { !this.state.infoList.res || this.state.infoList.questionObj.length ==0 ? null:
                  <div>
                                    <h1 className="App-header">Survey 
                                    <ProgressBar 
                                      progress={parseInt(this.state.infoList.res.score.$numberInt)}
                                      size={100}
                                      strokeWidth={15}
                                      circleOneStroke='#d9edfe'
                                      circleTwoStroke='#F07847'
                                  /></h1>
                              <MDBTable bordered>
                              <MDBTableHead color="primary-color" textWhite>
                                <tr>
                                  <th>Question</th>
                                  <th>score</th>
                                </tr>
                              </MDBTableHead>
                                <MDBTableBody >
                                    {this.state.infoList.questionObj.map((question) => {
                                      return (
                                        <tr key = {question._id.$oid} index={question._id.$oid}>
                                          <td>
                                            {question.description}
                                          </td>
                                          <td>
                                            {question.question_score? question.question_score.$numberInt: Math.floor(Math.random() * 10).toString()}
                                          </td>
                                        </tr>
                                      )})}                                 
                                </MDBTableBody>
                                </MDBTable>
                                </div>
                  
                  } 
                  { this.state.taskList.length > 0 ? 
                  <div>
              <h1 className="App-header">Tasks</h1>
        <MDBTable bordered>
        <MDBTableHead color="primary-color" textWhite>
          <tr>
            <th>Task Description</th>
            <th>Success</th>
            <th>Performance time</th>
          </tr>
        </MDBTableHead>
          <MDBTableBody >
                      {this.state.taskList.map((task) => {
                        return (
                          <tr key = {task._id.$oid} index={task._id.$oid}>
                            <td>
                              {task.description}
                            </td>
                            <td>
                              {task.is_success? <FcCheckmark/>: <HiXCircle color = "red"/>}
                            </td>
                            <td>
                              {task['performance time ']}
                            </td>
                            <td>
                            <ApexChart width= {200} names= {['Click', 'Error']} numList = {[parseInt(task['Click No.'].$numberInt), parseInt(task['Error No.'].$numberInt)]}/>
                            </td>
                            <td>
                            </td>
                          </tr>
                        )})}
                                    
          </MDBTableBody>
          </MDBTable>
          </div>
          : null }
              <h1 className="App-header">Researchers</h1>
              <Grid  container
              container spacing={2}
              justifyContent="center"
              alignItems="center"
              direction="row"> 
              {this.state.researchers.map((res) => {
                    return (
                      <Grid key = {res[0]._id.$oid} item xs={4}>
                    <Card   className= "card-style-res">
                        <CardActionArea>
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                             {this.updateName(res[0].r_name)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Gender: {res[0].gender}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Observer
                            {res[0].is_observer? <FcCheckmark/>: <HiXCircle color = "red"/>}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            DOB: {new Date(parseInt(res[0]['DOB'].$date.$numberLong)).toString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Years of Experience: {res[0]['Years Experience'].$numberInt}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card> 
                     </Grid>

                    );
                  })}
          </Grid>

          <h1 className="App-header">Participants
          <span className= "p-text">({this.state.participants.length})</span>
          </h1>
          <Grid container 
              spacing={2}
              justifyContent="center"
              alignItems="center"
              direction="row"> 
                <Grid item key = "12345333" xs={4}>
                <ApexChart width= {400} names= {['Female', 'Male']} numList = {[1,2]}/>
              </Grid>
              <Grid item key = "1234533" xs={4}>
              <BarChart categories = {this.state.ages} data = {this.state.values}/>
              </Grid>
              </Grid> 

              <Grid container 
              spacing={2}
              justifyContent="center"
              alignItems="center"
              direction="row"> 
              {this.state.participants.map((res) => {
                    return (
                    <Grid  key = {res.result[0]._id.$oid} item xs={4}>
                    <Card  className= "card-style-res">
                        <CardActionArea>
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                             {res.result[0].name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Gender: {res.result[0].gender}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Age: {res.result[0].age.$numberInt}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Age: {res.result[0].race}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Location: {res.result[0].street +" "+ res.result[0].city +" "+ res.result[0].zipCode }
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card> 
                     </Grid>

                    );
                  })}
          </Grid>
            </div>
              :<div><h2>waiting for the data</h2></div>
              );

            
      }
}

export default withRouter(Survey);