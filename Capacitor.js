export class Capacitor{
    constructor(e, plate_1, plate_2){
        this.e = e;
        this.plate_1 = plate_1;
        this.plate_2 = plate_2;
    }

    draw(){
        this.plate_1.draw();
        this.plate_2.draw();
    }
}