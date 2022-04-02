

import "./dona.css";
import Navbar from "../../components/NavBar/Navbar";

import { Container, Button } from "react-bootstrap";
import { BiCalendar } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import "./dona.css";
import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Donacont() {
  const [donations, setdonations] = useState([]);
  useEffect( () => {
    const getDonations = async () => {
      const res = await axios.get('http://localhost:2000/api/event/getevent');
      console.log(res,res.data);
      setdonations(res.data.events);
      return res.data;
    }
    
    getDonations();
    /*if(result) {
      setdonations(result.events);
    }*/
  }, [])
  return (
    <div className="bg">
      <Navbar />
      <Container className="box" fluid flex>
        <div className="headings"> Donations </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {donations && donations.map(donation => {
            const date=new Date(donation.createdAt);
            const month=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
            return (
            <div className="bg" key={donation._id}>
            <Container className="dcard">
              <img
                src={donation.foodPoster[0].url}
                height="150px"
                alt="product"
                style={{
                  borderTopRightRadius: "1rem",
                  borderTopLeftRadius: "1rem",
                  width: "100%"
                }}
              ></img>
              <div className="p-3">
                <h3>{donation.name}</h3>
                <br />
                <p style={{ color: "#3d3d3d" }}>
                  {donation.description}
                </p>
                <div>
                  <BiCalendar /> <span>Date</span>: {date.getDate()} / {month[date.getMonth()]} / {date.getFullYear()}
                  <br />
                  <GoLocation /> <span>Location</span>: {donation.driveSpot.city}
                  <br />
                  <GoPerson />
                  <span> Post by</span>: {donation.DonatedBy.Name}
                  <br />
                </div>
              </div>
              <div class="overlay">
                <Button onClick={()=>{window.location="/chatbox"}} variant="warning">Chat with Donor</Button>
              </div>
            </Container>
          </div>
          )
              })}
        </div>
      </Container>
    </div>
  );
}
