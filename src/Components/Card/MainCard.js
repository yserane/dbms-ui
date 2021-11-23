import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Link} from "react-router-dom";



class  MainCard extends React.Component {
  constructor(props) {
    super(props);
  }

  naviagteTo(){

  }

  render(){
    return (
      <Link to={{pathname: `/UsabilityStudy/${this.props.product._id.$oid}`}}>
      <Card  className= "card-style" sx={{ maxWidth: 345 }} onClick = {this.naviagteTo}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image= {this.props.product.img}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {this.props.product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {this.props.product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Link>
    );
}
}
export default MainCard;