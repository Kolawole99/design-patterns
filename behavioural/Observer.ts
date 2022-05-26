/**
 * This is a change from Poll to Push.
 * This is a One-to-Many relationship, that notifies all the dependents of changes in the subject.
 *
 * It handles the case where e.g customer wastes time checking product availability or the store wastes
 * resources notifying the wrong customers via email.
 *
 * The Observer pattern is used by an Observer(object) to subscribe to changes in the state of an Observable(subject).
 * The Observable is the object that notifies the Observer of changes that the Observer subscribes to.
 *
 * This is the design pattern behind the PubSub system in MicroServices, web-sockets, and RSS feeds.
 *
 * There are variations such as:
 * 1. Observable Push and Send Feed data to Observer
 * 2. Observable Push and then Observer through an Instance of Observable Pull data from Observable
 */

interface WeatherObservable {
    registerObserver(o: WeatherObserver): void;
    removeObserver(o: WeatherObserver): void;
    notifyObservers(): void;
}

interface WeatherObserver {
    update(object: WeatherObservable): void;
}


class WeatherStation implements WeatherObservable {
    public state: {a: number, b: number, c: number};
    private observers: WeatherObserver[] = [];

    public registerObserver(observer: WeatherObserver): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Subject: Observer has been attached already.');
        }

        this.observers.push(observer);
        console.log('Subject: Attached an observer.');
    }

    public removeObserver(observer: WeatherObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Subject: Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
        console.log('Subject: Detached an observer.');
    }

    public notifyObservers(): void {
        console.log('Subject: Notifying observers...');
        this.observers.forEach(o => o.update(this));
    }

    public computeWeather(a = 1, b = 2, c = 3): void {
        this.state = { a, b, c }

        console.log(`Subject: My state has just changed to: ${this.state}`);
        this.notifyObservers();
    }
}

class MobileWeatherDisplay implements WeatherObserver {
    public update(weather: WeatherObservable): void {
        if (weather instanceof WeatherStation && Object.keys(weather.state).length <= 3) {
            const { a, b, c } = weather.state;
            console.log(`MobileWeatherDisplay: ${a}, ${b}, ${c}`);
        }
    }
}

class WebWeatherDisplay implements WeatherObserver {
    public update(weather: WeatherObservable): void {
        if (weather instanceof WeatherStation && Object.keys(weather.state).length <= 3) {
            const { a, b, c } = weather.state;
            console.log(`WebWeatherDisplay: ${a}, ${b}, ${c}`);
        }
    }
}
