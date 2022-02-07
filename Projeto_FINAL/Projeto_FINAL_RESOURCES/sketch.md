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

```javascript
const player = {
    name: '',
    hoursWorked: 0,
    moneyOwned: 0,
    needs: {
        nutrition: 5,
        energy: 5,
        hygiene: 5,
        toilet: 5,
        fun: 5,
        social: 5
    },
    jobTitle: '',
    jobDays: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
        sun: true
    },
    jobPeriod: {
        morning: true,
        afternoon: true,
        night: true
    }
    jobMinHours: 0,
    jobPay: 0
}
```

---

## **OBJECT** | activity

```json
{
  "index": 0,
  "title": "eat",
  "cost": 15,
  "needs": {
    "nutrition": 3,
    "energy": 0,
    "hygiene": 0,
    "toilet": -2,
    "fun": 0,
    "social": 0
  }
}
```
