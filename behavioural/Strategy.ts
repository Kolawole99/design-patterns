/**
 * This design pattern takes care of code reuse by dependency injection
 * rather than inheritance.
 *
 * It is interesting to note that the strategy pattern is not a singleton.
 * Also, the strategy pattern is not a template pattern.
 *
 * The strategy pattern is a behavioral design pattern that allows the
 * client to choose the algorithm to be used at runtime.
 *
 * This is a real-world example of the Strategy pattern.
 */

interface FlyStrategy {
    fly(name: string): void;
}

interface QuackStrategy {
    quack(name: string): void;
}

interface SleepStrategy {
    sleep(name: string): void;
}

interface SwimStrategy {
    swim(name: string): void;
}


class ConcreteFly implements FlyStrategy {
    fly(name: string): void {
        console.log(`${name} is flying`);
    }
}
class ConcreteNoFly implements FlyStrategy {
    fly(name: string): void {
        console.log(`${name} can't fly`);
    }
}


class ConcreteQuack implements QuackStrategy {
    quack(name: string): void {
        console.log(`${name}, Quacks`);
    }
}
class ConcreteNoQuack implements QuackStrategy {
    quack(name: string): void {
        console.log(`${name}, No Quack`);
    }
}



class Duck {
    private name: string;
    private fly: FlyStrategy;
    private quack: QuackStrategy;
    private sleep: SleepStrategy;
    private swim: SwimStrategy;

    constructor({
        name,
        Fly,
        Quack,
        Sleep,
        Swim,
    }:{
        name: string,
        Fly?: FlyStrategy,
        Quack?: QuackStrategy,
        Sleep?: SleepStrategy,
        Swim ?: SwimStrategy,
    }) {
        this.name = name;
        this.fly = Fly;
        this.quack = Quack;
        this.sleep = Sleep;
        this.swim = Swim;
    }

    performFly(strategy?: FlyStrategy): void {
        if (strategy) this.fly = strategy;

        this.fly.fly(this.name);
    }

    performQuack(strategy?: QuackStrategy): void {
        if (strategy) this.quack = strategy;

        this.quack.quack(this.name);
    }

    performSleep(strategy?: SleepStrategy): void {
        if (strategy) this.sleep = strategy;

        this.sleep.sleep(this.name);
    }

    performSwim(strategy?: SwimStrategy): void {
        if (strategy) this.swim = strategy;

        this.swim.swim(this.name);
    }
}

const CityDuck = new Duck({
    name: 'City Duck',
    Fly: new ConcreteFly(),
    Quack: new ConcreteQuack(),
    // new ConcreteSleep(),
    // new ConcreteSwim()
});
CityDuck.performFly();
CityDuck.performQuack();
CityDuck.performQuack(new ConcreteNoQuack);

const RubberDuck = new Duck({
    name: 'Rubber Duck',
    Fly: new ConcreteNoFly(),
    Quack: new ConcreteNoQuack(),
    // new ConcreteSleep(),
    // new ConcreteSwim()
});
RubberDuck.performFly();
RubberDuck.performFly(new ConcreteFly);
RubberDuck.performQuack();
