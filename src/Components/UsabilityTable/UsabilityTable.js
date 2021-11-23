import React from 'react';
import BTable from 'react-bootstrap/Table';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import {getUsabilityStudies } from '../../Service/APIService'
import { BiArrowBack } from "react-icons/bi";

import {Link, useParams} from "react-router-dom";
import { withRouter } from "react-router";

class UsabilityTable extends React.Component {
    constructor(props){
        super(props);

        console.log(props);
        this.state = {
          usabilityStudyList : [],
          productId: this.props.match.params.productId
        };
    }
    componentDidMount(){
      this.getUsabilityStudiesArray();
    }

    setUsabilityList(data){
      this.setState({usabilityStudyList: data});

    }
    getUsabilityStudiesArray(){
      getUsabilityStudies(this.state.productId).then(data => {
        this.setUsabilityList(data);
      })
    }
    showModal(productId){
      console.log(productId)
    }
    render(){
        return(
          <MDBTable bordered>
      <MDBTableHead color="primary-color" textWhite>
        <tr>
          <th>Name</th>
          <th>Date</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody >
      {this.state.usabilityStudyList.map((us) => {
                return (
                  <tr key = {us._id.$oid} index={us._id.$oid}>
                  <td>{us.name}</td>
                  <td> { new Date(parseInt(us.start_date.$date.$numberLong)).toString().replace(":00 GMT-0400 (Eastern Daylight Time)", '')
                  .replace(":00 GMT-0500 (Eastern Standard Time)", '')}</td>
                   <td>
                   <Link to={{pathname: `/survey/${us._id.$oid}`}}>
                      <BiArrowBack className="arrow-back" onClick ={()  => this.showModal(us._id.$oid)}/>
                     </Link>
                      </td>
                </tr>
                );
              })}
      </MDBTableBody>
    </MDBTable>
        );

    }


}
export default withRouter(UsabilityTable);