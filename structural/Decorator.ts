/**
 * Decorator pattern is a way of using composition to share behavior, and/or extend functionality of an object
 * without changing its structure rather than using inheritance through sub-classing.
 * This takes care of returning booleans which provokes a lot of conditionals and confusion in the code.
 *
 * Use this when the functionality of each decorator is significantly different from the others.
 * Use Decorator pattern when you need to be able to assign extra behaviors to objects at
 * runtime without breaking the code that uses these objects.
 */

// This is the base abstract component class
abstract class Beverages {
    public abstract getDescription(): string;

    public abstract getSizeCost(): number;
}

// This is the decorator class
abstract class Condiments extends Beverages {
    public abstract getDescription(): string;
}

class Espresso extends Beverages {
    getDescription() {
        return "Espresso";
    }

    getSize() {
        return 1;
    }

    getSizeCost() {
        return 1.99;
    }
}

class HouseBlend extends Beverages {
    getDescription() {
        return "House Blend Coffee";
    }

    getSize() {
        return 1;
    }

    getSizeCost() {
        return 2.50;
    }
}

class Mocha extends Condiments {
    beverage: Beverages;

    constructor(beverage: Beverages) {
        super();
        this.beverage = beverage;
    }

    getDescription() {
        return this.beverage.getDescription() + ", Mocha";
    }

    getSizeCost() {
        return this.beverage.getSizeCost() + 0.20;
    }
}

class Soy extends Condiments {
    beverage: Beverages;

    constructor(beverage: Beverages) {
        super();
        this.beverage = beverage;
    }

    getDescription() {
        return this.beverage.getDescription() + ", Soy";
    }

    getSizeCost() {
        return this.beverage.getSizeCost() + 0.15;
    }
}

const espresso = new Espresso();
console.log('Client: I\'ve got a Espresso component:');
console.log(`Description: ${espresso.getDescription()}`);
console.log(`Size: ${espresso.getSize()}`);
console.log(`Cost: ${espresso.getSizeCost()}`);
console.log('');

const houseBlend = new HouseBlend();
const mochaHouseBlend = new Mocha(houseBlend);
const mochaHouseBlendSoy = new Soy(mochaHouseBlend);
console.log('Client: Now I\'ve got a decorated component:');
console.log(`Description: ${mochaHouseBlendSoy.getDescription()}`);
console.log(`Cost: ${mochaHouseBlendSoy.getSizeCost()}`);
