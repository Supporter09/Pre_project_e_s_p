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
var cards = []
      
// console.log(datas);
for(var i=0;i<datas.length;i++){
  cards.push(
    <SpeciesCard scientificName={datas[i].scientificName} VNName={datas[i].VNName} status={datas[i].status} key={i} />
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
      
      // // console.log(datas);
      // datas.forEach(data=>{
      //   cards.push(
      //     <SpeciesCard scientificName={data.scientificName} VNName={data.VNName} status={data.status}/>
      //   )
      // })
      // console.log(cards)
      // this.setState({decks:cards})
      
      // this.setState({
      //   decks: cards
      // })
      if(search_data!=""){
        
        for (let index = 0; index < datas.length; index++) {
          // console.log(typeof(datas[index].scientificName))
          var sn = datas[index].scientificName;
          var vn = datas[index].VNName
          if(datas[index].scientificName == null ) {
            // console.log(datas[index].scientificName)
            // console.log(index)
            if(vn.toLowerCase().includes(search_data.toLowerCase())){
              re_cards.push(
                <SpeciesCard scientificName={datas[index].scientificName} VNName={datas[index].VNName} status={datas[index].status} key={index} />
              )
            }
          }else if(datas[index].VNName==null){
            if(sn.toLowerCase().includes(search_data.toLowerCase())){
              re_cards.push(
                <SpeciesCard scientificName={datas[index].scientificName} VNName={datas[index].VNName} status={datas[index].status} key={index} />
              )
            }
          }else{
            if(vn.toLowerCase().includes(search_data.toLowerCase())||sn.toLowerCase().includes(search_data.toLowerCase())){
              re_cards.push(
                <SpeciesCard scientificName={datas[index].scientificName} VNName={datas[index].VNName} status={datas[index].status} key={index} />
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
            <Col md="4"  >
            <Card>
              <CardImg top width="100%" src="https://images.unsplash.com/photo-1544640808-32ca72ac7f37?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" alt="Card image cap" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            </Col>
            <Col md="4" > 
            <Card>
              <CardImg top width="100%" src="https://images.unsplash.com/photo-1568667256549-094345857637?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=658&q=80" alt="Card image cap" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            </Col>
            <Col md="4" >
            <Card>
              <CardImg top width="100%" src="https://images.unsplash.com/photo-1555116505-38ab61800975?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" alt="Card image cap" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            </Col>
            {this.state.decks}
            </Row>
            
            
          </CardDeck>
          </Row>
        </>
  );
    }
  
}


