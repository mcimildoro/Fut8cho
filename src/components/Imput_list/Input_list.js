import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./players.scss";
import Input_list from "../Imput_list/Input_list";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Rating } from "@mui/material";

//input to add players to the list of players.
const Input = () => {
    const [player, setPlayer] = useState("");
    
    const handleChange = (e) => {
        setPlayer(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addPlayer(player);
        setPlayer("");
    };
    
    return (
        <div className="input">
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Add player"
            value={player}
            onChange={handleChange}
            />
            <button type="submit">Add</button>
        </form>
        </div>
    );
    }

//list of players
const Players = () => {
    