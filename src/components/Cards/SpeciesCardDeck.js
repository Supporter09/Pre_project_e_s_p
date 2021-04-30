import { data } from "jquery";
import React, { Component } from 'react';


// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  CardImg, 
  CardText,
  CardSubtitle,
  CardDeck
} from "reactstrap";

import SpeciesCard from "./SpeciesCard.js"
let datas = require('../../db/data.json')
let datas2 = require('../../db/data2.json')
var cards = []
      
// console.log(datas);
for(var i=0;i<datas.length;i++){
  cards.push(
    <SpeciesCard scientificName={datas[i].scientificName} VNName={datas[i].VNName} status={datas[i].status} key={i} image_src={"https:"+datas2[i].Image} />
  )
}

export default class SpeciesCardDeck extends React.Component {
  constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
        // this.state = {
        //     dataComment : ['a', 'b','c']
        // }
    }  
    state= {
      decks: cards,
      re_render_decks: [],
      status:false, 
      input_value: ""
    }
    handleSubmit(event)
    {
        // const {dataComment} = this.state;
        // alert(this.input.current.value);
        event.preventDefault();
        this.renderSpeciesCard(this.input.current.value)
        if(this.input.current.value != ""){
          this.setState({
            status:true,
            input_value: this.input.current.value
          })

        }
        // this.setState({
        //     // dataComment: [...this.state.dataComment, newComment]
        // });
    }
    renderSpeciesCard(search_data){
      var re_cards = []
      if(search_data!=""){
        
        for (let index = 0; index < datas.length; index++) {
          // console.log(datas2[index].Image)
          var sn = datas[index].scientificName;
          var vn = datas[index].VNName
          if(datas[index].scientificName == null ) {
            // console.log(datas[index].scientificName)
            // console.log(index)
            if(vn.toLowerCase().includes(search_data.toLowerCase())){
              re_cards.push(
                <SpeciesCard scientificName={datas[index].scientificName} VNName={datas[index].VNName} status={datas[index].status} key={index} image_src={"https:"+datas2[index].Image} />
              )
            }
          }else if(datas[index].VNName==null){
            if(sn.toLowerCase().includes(search_data.toLowerCase())){
              re_cards.push(
                <SpeciesCard scientificName={datas[index].scientificName} VNName={datas[index].VNName} status={datas[index].status} key={index} image_src={"https:"+datas2[index].Image} />
              )
            }
          }else{
            if(vn.toLowerCase().includes(search_data.toLowerCase())||sn.toLowerCase().includes(search_data.toLowerCase())){
              re_cards.push(
                <SpeciesCard scientificName={datas[index].scientificName} VNName={datas[index].VNName} status={datas[index].status} key={index} image_src={"https:"+datas2[index].Image} />
              )
            }
          }
          // console.log(search_data)
          // console.log(sn.includes(search_data))
          // if(sn.includes(search_data) || vn.includes(search_data)){
          //   re_cards.push(
          //     <SpeciesCard scientificName={datas[index].scientificName} VNName={datas[index].VNName} status={datas[index].status} key={index} />
          //   )
          // }
        }
        this.setState({decks: []})
        this.setState({decks: re_cards})
      }else{
        this.setState({decks: []})
        this.setState({decks: cards})
      }
    }
    render() {
        return (
        <>
          <Row>
            <Col className="ml-auto mr-auto" md="10">
              <h2 className="title">Search your animals data here.<i aria-hidden={true} className="nc-icon nc-zoom-split" /></h2>
              
            </Col>
            <Col sm="6" md={{ size: 6, offset: 3 }}>
              <InputGroup>
                <Input placeholder="Species" className="search_engine" type="text" innerRef={this.input} onChange={this.handleSubmit}/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                   
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Row>
          <CardDeck className="all_species">
            <Row>
            {this.state.decks}
            </Row>
            
            
          </CardDeck>
          </Row>
        </>
  );
    }
  
}


