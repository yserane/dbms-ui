import { ContainerTypeMap, Grid, Item} from '@mui/material';
import React from 'react';
import MainCard from '../Card/MainCard';
import {getProductList } from '../../Service/APIService'

class Products extends React.Component{
    constructor(){
        super();
        this.state = {
          products : []
        };
    
      }
    
      setProducts(list){
        this.setState({products: list})
      }
      componentDidMount(){
        getProductList().then(data => {
          console.log(data);
          this.setProducts(data);
        })
    
      }
    render(){
return(

    <Grid container
          columnSpacing={2} 
          justifyContent="center"
          alignItems="center"
          rowSpacing={4}
          direction="row"> 
              {this.state.products.map((product) => {
                return (
                  <Grid
                  item xs={3} >
                    <MainCard product = {product}></MainCard>
                  </Grid>
                );
              })}
      </Grid>
);

    }
}
export default Products;