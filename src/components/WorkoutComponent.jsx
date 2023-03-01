import React, { Component } from "react";
import "../css/style.css";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faXmark);

async function getXIcon() {
  try {
    const x = await icon(faXmark, {
      classes: ["workout__delete-icon"],
    }).html;

    return x;
  } catch (error) {
    console.error(error);
  }
}

class Workout extends Component {
  #xIcon;

  render() {
    this.#xIcon = getXIcon();
    return (
      <React.Fragment>
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.discription}</h2>
          {this.xIcon}
          <div class="workout__data">
            <div class="workout__details">
              <span class="workout__icon">
                ${workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`}
              </span>
              <span class="workout__value">${workout.distance}</span>
              <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⏱</span>
              <span class="workout__value">${workout.duration}</span>
              <span class="workout__unit">min</span>
            </div>
            {workout.type === `running` && (
              <React.Fragment>
                <div class="workout__details">
                  <span class="workout__icon">⚡️</span>
                  <span class="workout__value">${workout.pace}</span>
                  <span class="workout__unit">min/km</span>
                </div>
                <div class="workout__details">
                  <span class="workout__icon">🦶🏼</span>
                  <span class="workout__value">${workout.cadence}</span>
                  <span class="workout__unit">spm</span>
                </div>
              </React.Fragment>
            )}
            {workout.type === `cycling` && (
              <React.Fragment>
                <div class="workout__details">
                  <span class="workout__icon">⚡️</span>
                  <span class="workout__value">${workout.speed}</span>
                  <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                  <span class="workout__icon">⛰</span>
                  <span class="workout__value">${workout.elevation}</span>
                  <span class="workout__unit">m</span>
                </div>
              </React.Fragment>
            )}
            <div class="btn__container">
              <button class="btn workout__edit">Edit</button>
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  }
}

export default Workout;
