/* eslint-disable prettier/prettier */
abstract class Vehicle {
    name:string;
    constructor(name:string) {
       this.name=name; 
    }

    display():void {
        console.log(`car name is: ${this.name}`);
    }

   // abstract stop();
}

class Car extends Vehicle{
    speed:number;
    constructor(name:string, speed:number)
    {
        super(name);
        this.speed=speed;
    }
/*     stop()
    {
        console.log("this is parked");
    }

    start()
    {
        console.log("this is starting");
    } */
}

const car1 = new Car("Tesla",900);
car1.display();
