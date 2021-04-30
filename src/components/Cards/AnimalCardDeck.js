import { data } from "jquery";
import React, { Component,useState } from 'react';


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

// Import JS file
import findSpeciesInArea from '../../assets/js/FindingAnimal.js'


import SpeciesCard from "./SpeciesCard.js"
let sample = require('../../db/sample.json')
let occurrence_animal = require('../../db/data2.json')
var cards = []
      
for(var i=0;i<sample.length;i++){
    cards.push(
      <SpeciesCard scientificName={sample[i].scientificName} VNName={sample[i].VNName} status={sample[i].status} key={i} image_src={"https:"+sample[i].Image} />
    )
  }
export default class SpeciesCardDeck extends React.Component {
    state= {
      decks: cards,
    }
    getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
          console.log("SOMETHING WRONG")
        }
      }
    showPosition = (position) => {
        // console.log("Run showPos")
        // x.innerHTML = "Latitude: " + position.coords.latitude +
        // "<br>Longitude: " + position.coords.longitude;
        let occurrence_animal = findSpeciesInArea(position.coords.longitude,position.coords.longitude)
        var re_cards = []

        if(occurrence_animal.length!=0){
            for (let index = 0; index < occurrence_animal.length; index++) {
              // console.log(occurrence2[index].Image)
              var sn = occurrence_animal[index].scientificName;
              var vn = occurrence_animal[index].VNName
              if(occurrence_animal[index].scientificName == null ) {
                // console.log(occurrence_animal[index].scientificName)
                // console.log(index)
                re_cards.push(
                    <SpeciesCard scientificName={occurrence_animal[index].scientificName} VNName={occurrence_animal[index].VNName} status={occurrence_animal[index].status} key={index} image_src={"https:"+occurrence_animal[index].Image} />
                  )
              }else if(occurrence_animal[index].VNName==null){
                re_cards.push(
                    <SpeciesCard scientificName={occurrence_animal[index].scientificName} VNName={occurrence_animal[index].VNName} status={occurrence_animal[index].status} key={index} image_src={"https:"+occurrence_animal[index].Image} />
                )
              }else{
                re_cards.push(
                    <SpeciesCard scientificName={occurrence_animal[index].scientificName} VNName={occurrence_animal[index].VNName} status={occurrence_animal[index].status} key={index} image_src={"https:"+occurrence_animal[index].Image} />
                  )
              }
            }
            // console.log(re_cards)
            this.setState({decks: []})
            this.setState({decks: re_cards})
          }else{
            this.setState({decks: []})
            this.setState({decks: cards})
          }
        // console.log(occurrence_animal)

      }
    handleOnclick= () => {
        // console.log("Hello")
        this.getLocation()
      }
    
    render() {
        return (
        <>
          <Row>
            <Col className="ml-auto mr-auto" md="10">
              <h2 className="title">Find animals species around you<i aria-hidden={true} className="nc-icon nc-zoom-split" /></h2>
              <button onClick={()=>{this.handleOnclick()}}>CLICK TO CHECK </button>
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


