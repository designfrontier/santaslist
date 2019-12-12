'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const adder = document.querySelector('#add');
  const people = document.querySelector('#people');
  const getRandomInt = (min, max)  => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  };
  const newInput = () => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    label.textContent = 'Name: ';
    label.appendChild(input);

    input.id = 'person-' + document.querySelectorAll('input').length;

    return label;
  };
  const getOffset = () => {
    return getRandomInt(1, 10);
  };

  adder.addEventListener('click', () => {
    people.append(newInput());
  });

  form.addEventListener('submit', (evnt) => {
    const request = new XMLHttpRequest();
    const inputs = document.querySelectorAll('input');
    const d = [...inputs].reduce((a, i) => {
      if (i.name === 'yearStarted') {
        a['yearStarted'] = i.value;
      } else {
        a.members.push(i.value);
      }

      return a;
    }, { members: [], offset: getOffset() });

    evnt.preventDefault();

    console.log(d);

    request.open('POST', '/g');
    request.send(JSON.stringify(d));

    request.onreadystatechange = function () {
      if (request.readyState == XMLHttpRequest.DONE) {
        window.location = request.responseURL;
      }
    };

    return false;
  });

  document.querySelector('#yearStarted').value = new Date().getFullYear();
});

// {
//   "yearStarted":"2019",
//   "offset":3,
//   "members":["Daniel","Sarah","Gabriel","Rachel","Caleb","Joel","Amy","Steve","Katie"]
// }
