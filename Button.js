import {Node} from './Node.js';

export class Button extends Node{
    constructor(id,text,fontSize,color,background,width,height,x,y){
        super();
        this._text = '';
        this._fontSize = '';
        this._color = '';
        this._backgroundColor = '';
        this._id = '';
        if(id) this.id = id;
        if(text) this.text = text;
        if(fontSize) this.fontSize = fontSize;
        if(width) this.width = width;
        if(height) this.height = height;
        if(x) this.x = x;
        if(y) this.y = y;
        if(color) this.color = color;
        if(background) this.backgroundColor = background;
    }

    get text(){
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.elm.innerHTML = this._text;
    }

    get id() {return this._id;}
    set id(value) {this._id = value; this.elm.id = this._id;}

    _initElement() {
        this.elm = document.createElement('button');
        this.elm.style.position = "absolute";
    }

    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this.elm.style.color = this._color;
    }

    get fontSize() {
        return this._fontSize;
    }
    set fontSize(value) {
        this._fontSize = value;
        this.elm.style.fontSize = this._fontSize;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
        this.elm.style.background = this.backgroundColor;
    }

}