let increment3 = (obj) => {
    let response = {
        ...obj,
        count: obj.count + 1
    };

    return response;
}

let info = { count:0, nome: "fulano", idade: 50 };


console.log(info);

let info = increment3(info);

console.log(info);
console.log(info2);
