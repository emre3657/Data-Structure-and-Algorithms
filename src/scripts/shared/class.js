// references tpye - non primitive type: not defined by language
const object1 = { value: 10 };
const object2 = object1;
const object3 = { value: 10 };
console.log(object1 === object2); // same address
console.log(object1 === object3); // different adresses
object1.value = 15;
console.log(object2.value);
console.log(object3.value);

// context vs scope
const object4 = {
  fun() {
    console.log(this);
  },
};
object4.fun();

// instantiation
class Player {
  name;
  type;
  constructor(name, type) {
    console.log("player", this);
    this.name = name;
    this.type = type;
  }
  introduce() {
    console.log(`Hi. I am ${this.name}, I'm a ${this.type}`);
  }
}

class Wizard extends Player {
  constructor(name, type) {
    super(name, type);
    console.log("wizard", this);
  }
  play() {
    console.log(`WEEEEEEEEEEE I'm a ${this.type}`);
  }
}

const wizard1 = new Wizard("Shelly", "Healer");
// const wizard2 = new Wizard("Shawn", "Dark Magic");

// wwizard1.play();
// wizard1.introduce();
