# **PROJETO FINAL** | Jogo de Ficção Interativa
 BASIC STRUCTURE sketch

## TIME

### days

```javascript
let days = 0;
let endGame = false;

if (days > 7) {
    endGame = true;
}
```

### hours

```javascript
let hours = 0;

if (hours >= 24) {
    hours -= 24;
    days++;
}
```

### minutes

```javascript
let minutes = 0;

if (minutes >= 60) {
    minutes -= 60;
    hours++;
}
```

### periods

```javascript
let period = '';

if (hours >= 5 && < 12) {
    period = 'morning';
} else if (hours >= 12 && hours < 18) {
    period = 'afternoon';
} else {
    period = 'night';
}
```

---

## **OBJECT** | player

TODO: create methods for activities / events

```javascript
const player = {
    name: '',
    hoursWorked: 0,
    moneyOwned: 0,
    needNutrition: 5,
    needEnergy: 5,
    needHygiene: 5,
    needToilet: 5,
    needFun: 5,
    needSocial: 5
    jobTitle: '',
    jobDays: [0, 1, 2, 3, 4, 5, 6],
    jobPeriod: ['morning', 'afternoon', 'night'],
    jobMinHours: 0,
    jobPay: 0,
}
```

---

## **OBJECT** | activity

```javascript
const activity = {
    title: '',
    timeToCompleteMinutes: 0,
    timeToCompleteHours: 0,
    cost: 0,
    buffNeed: player.needHygiene, // FIXME: doable?
    buffAmount: 0,
    debuffNeed: player.NeedToilet,
    debuffAmount: 0,
}
```

---

## **OBJECT** | event triggered by low need

```javascript
const eventLowNeed = {
    lowNeed: player.needToilet,
    timeToCompleteMinutes: 0,
    timeToCompleteHours: 0,
    cost: 0,
    buffNeed: player.needToilet, // FIXME: doable?
    buffAmount: 0,
    debuffNeed: player.NeedHygiene,
    debuffAmount: 0,
}
```