# **PROJETO FINAL** | Jogo de Ficção Interativa

BASIC STRUCTURE sketch

## TIME

### days

```javascript
let days = 0;
let endGame = false;

if (daysElapsed >= 7) {
  endGame = true;
}
```

### hours

```javascript
if (hoursElapsed >= 24) {
    daysToAdd = Math.floor(hoursElapsed / 24);
    daysElapsed += daysToAdd;
    hoursElapsed = hoursElapsed % 24;
  }
```

### minutes

```javascript
if (minutesElapsed >= 60) {
    hoursToAdd = Math.floor(minutesElapsed / 60);
    hoursElapsed += hoursToAdd;
    minutesElapsed = minutesElapsed % 60;
  }
```

### periods

```javascript
let period = '';

if (hoursElapsed >= 5 && hoursElapsed < 12) {
    period = "manhã";
  } else if (hoursElapsed >= 12 && hoursElapsed < 18) {
    period = "tarde";
  } else if (hoursElapsed < 5 || hoursElapsed >= 18) {
    period = "noite/madrugada";
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
