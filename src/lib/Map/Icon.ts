import p5Types from "p5";
import { Vector2 } from "./Types";

class Icon{
    pos: Vector2;
    icon: p5Types.Image;

    constructor(icon: p5Types.Image, pos: Vector2){
        this.pos = pos;
        this.icon = icon;
    }
}

export default Icon;