## Objects as object properties

An object property can itself be an object. For example, try changing the name member from

```javascript
name: ['Bob', 'Smith'],
Copy to Clipboard
```
to

```javascript
name : {
  first: 'Bob',
  last: 'Smith'
},
```

To access these items you just need to chain the extra step onto the end with another dot. Try these in the JS console:

```javascript
person.name.first
person.name.last
```

---

