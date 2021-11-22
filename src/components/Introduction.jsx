import React from "react";
import PropTypes from "prop-types";
import "../style/Intro.css";
import {useSelector, useDispatch} from "react-redux";
import {changeAppStatus} from "../redux/actions";

const Introduction = () => {
  const newAppStatus = useSelector(state => state.newAppStatus);
  const dispatch = useDispatch();


  return (
    <div className="fade">
      <section className="star-wars-intro">
        <div className="crawl">
          <div className="title">
            <h1>Battleships</h1>
            <h2>Rules</h2>
          </div>
          <h3>Game Objective</h3>
          <p>
            The object of Battleship is to try and sink all of the other
            player's before they sink all of your ships. All of the other
            player's ships are somewhere on his/her board.  You try and hit them
            by calling out the coordinates of one of the squares on the board. 
            The other player also tries to hit your ships by calling out
            coordinates.  Neither you nor the other player can see the other's
            board so you must try to guess where they are.  Each board in the
            physical game has two grids:  the lower (horizontal) section for the
            player's ships and the upper part (vertical during play) for
            recording the player's guesses.
          </p>

          <h3>Starting a New Game</h3>
          <p>
            Each player places the 5 ships somewhere on their board. The ships
            can only be placed vertically or horizontally. Diagonal placement is
            not allowed. No part of a ship may hang off the edge of the board.
            Ships may not overlap each other. No ships may be placed on another
            ship. Once the guessing begins, the players may not move the ships.
          </p>

          <h3>Playing the Game</h3>
          <p>
            Player's take turns guessing by calling out the coordinates. The
            opponent responds with "hit" or "miss" as appropriate. Both players
            should mark their board with pegs: red for hit, white for miss. When
            all of the squares that one your ships occupies have been hit, the
            ship will be sunk. You should announce "hit and sunk". In the
            physical game, a red peg is placed on the top edge of the vertical
            board to indicate a sunk ship. As soon as all of one player's ships
            have been sunk, the game ends.
          </p>
          <br></br>
          <br></br>
          <button className="click-start-game-btn" onClick={() => dispatch(changeAppStatus("newGame"))}>
            Click Here to Start Game
          </button>
        </div>
      </section>
    </div>
  );
};

export default Introduction;

// Introduction.propTypes = {
//   setAppStatus: PropTypes.func.isRequired,
// };
