import React, { useEffect, useState } from "react";
import axios from "axios";
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import Rating from "@mui/material/Rating";
import { Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import AddIcon from "@mui/icons-material/Add";

import "./players.scss";

const Players = () => {
  const [data, setData] = useState([]);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team3, setTeam3] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("./players.json");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  /// -------- create an input to add players. --------///
  /// -------- create an input to add players. --------///
  /// -------- create an input to add players. --------///

  const addPlayer = (player) => {
    const newPlayer = {
      id: data.length + 1,
      name: player,
      position: "Midfielder",
      level: 1,
    };
    setData([...data, newPlayer]);
    console.log(data);
  };

  const [player, setPlayer] = useState("");

  //create a button to add players.
  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer(player);
    setPlayer("");
  };

  const sumLevel = (team) => {
    const sum = team.reduce((acc, player) => acc + player.level, 0);
    return sum;
  };

  /// -------- create an input to add players. --------///
  /// -------- create an input to add players. --------///
  /// -------- create an input to add players. --------///

  // ---- crear 3 equipos donde la sumatoria por nivel de los jugadores sea igual, que la sumatoria de los equipos menor a 25 y mayor a 20 (20-25) y que no se repitan jugadores. ----//
  // ---- crear 3 equipos donde la sumatoria por nivel de los jugadores sea igual, que la sumatoria de los equipos menor a 25 y mayor a 20 (20-25) y que no se repitan jugadores. ----//
  // ---- crear 3 equipos donde la sumatoria por nivel de los jugadores sea igual, que la sumatoria de los equipos menor a 25 y mayor a 20 (20-25) y que no se repitan jugadores. ----//

  const createTeams = () => {
    const team1 = [];
    const team2 = [];
    const team3 = [];
    const players = [...data];
    while (players.length > 0) {
      const random = Math.floor(Math.random() * players.length);
      const player = players.splice(random, 1)[0];
      if (team1.length < 8) {
        team1.push(player);
      } else if (team2.length < 8) {
        team2.push(player);
      } else {
        team3.push(player);
      }
    }
    if (
      sumLevel(team1) >= 20 &&
      sumLevel(team1) <= 25 &&
      sumLevel(team2) >= 20 &&
      sumLevel(team2) <= 25 &&
      sumLevel(team3) >= 20 &&
      sumLevel(team3) <= 25
    ) {
      setTeam1(team1);
      setTeam2(team2);
      setTeam3(team3);
    } else {
      createTeams();
    }
  };

  // ---- crear 3 equipos donde la sumatoria por nivel de los jugadores sea igual, que la sumatoria de los equipos menor a 25 y mayor a 20 (20-25) y que no se repitan jugadores. ----//
  // ---- crear 3 equipos donde la sumatoria por nivel de los jugadores sea igual, que la sumatoria de los equipos menor a 25 y mayor a 20 (20-25) y que no se repitan jugadores. ----//
  // ---- crear 3 equipos donde la sumatoria por nivel de los jugadores sea igual, que la sumatoria de los equipos menor a 25 y mayor a 20 (20-25) y que no se repitan jugadores. ----//

  //------cronometro para el partido de futbol con formato de tiempo.------//
  //------cronometro para el partido de futbol con formato de tiempo.------//
  //------cronometro para el partido de futbol con formato de tiempo.------//

  const formatDate = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setTime(0);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  //------cronometro para el partido de futbol con formato de tiempo.------//
  //------cronometro para el partido de futbol con formato de tiempo.------//
  //------cronometro para el partido de futbol con formato de tiempo.------//

  return (
    <>
      <div className="container overflow-hidden text-center">
        <div className="row">
          <div className="col-12">
            <h1 className="title display-6 material-symbols-outlined">
              Fut8cho{" "}
              <span role="img" aria-label="soccer">
                ⚽
              </span>
            </h1>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-12">
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setPlayer(e.target.value)} />
            <button type="submit">Add Player</button>
          </form>
        </div> */}
        </div>
        <div className="row">
          <div className="col-6 col-sm-6">
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              onClick={createTeams}
              type="button"
            >
              <AddIcon sx={{ mr: 1 }} />
              Create Teams
            </Fab>
          </div>

          <div className="col-4 col-sm-5">
            <button
              className="btn btn-primary btn-sm"
              onClick={reset}
              type="button"
              style={{ float: "right" }}
            >
              Reset
            </button>

            <button
              className="btn btn-success btn-sm"
              onClick={toggle}
              type="button"
              style={{ float: "right", marginRight: "10px" }}
            >
              {isActive ? "Pause" : "Start"}
            </button>

            <h3
              style={{ float: "right", marginRight: "10px", color: "#EEEEEE" }}
            >
              {formatDate(time)}
            </h3>
          </div>
        </div>
        {team1.length > 0 && (
          //order by level.
          <div className="row justify-content-center">
            <div className="col-md-3 col-sm-8 ">
              <h2 className="team_tittle">Team 1</h2>
              <ul className="list-group">
                {team1
                  .sort((a, b) => b.level - a.level)
                  .map((player) => (
                    <li className="list-group-item" key={player.id}>
                      {player.name}
                      <Rating
                        className="rating"
                        name="size-small"
                        value={player.level}
                        readOnly
                        size="small"
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-3 col-sm-8 ">
              <h2 className="team_tittle">Team 2</h2>
              <ul className="list-group">
                {team2
                  .sort((a, b) => b.level - a.level)
                  .map((player) => (
                    <li className="list-group-item" key={player.id}>
                      {player.name}
                      <Rating
                        className="rating"
                        name="size-small"
                        value={player.level}
                        readOnly
                        size="small"
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-3 col-sm-8">
              <h2 className="team_tittle">Team 3</h2>
              <ul className="list-group">
                {team3
                  .sort((a, b) => b.level - a.level)
                  .map((player) => (
                    <li className="list-group-item" key={player.id}>
                      {player.name}
                      <Rating
                        className="rating"
                        name="size-small"
                        value={player.level}
                        readOnly
                        size="small"
                      />
                    </li>
                  ))}
              </ul>
            </div>

            {team1.length > 0 && (
              <div
                className="col--md-4 col-sm-8"
                style={{ marginBottom: "30px" }}
              >
                <h2 className="team_tittle">Average</h2>
                <ul className="list-group text-center">
                  <li className="list-group-item">
                    Team 1: <tittle>{sumLevel(team1)} Average</tittle>
                  </li>
                  <li className="list-group-item">
                    Team 2: <tittle>{sumLevel(team2)} Average</tittle>
                  </li>
                  <li className="list-group-item">
                    Team 3:
                    <tittle> {sumLevel(team3)} Average</tittle>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Players;
