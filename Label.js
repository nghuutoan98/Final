import { Node } from './Node.js';

export class Label extends Node {
    constructor(id, text, fontSize, color, fontFamily,width,height,x,y) {
        super();
        this._text = '';
        this._fontStyle = '';
        this._id = '';
        this._fontSize = '';
        this._color = '';
        this._fontFamily = '';
        if (id) this.id = id;
        if (text) this.text = text;
        if (fontFamily) this.fontFamily = fontFamily;
        if (fontSize) this.fontSize = fontSize;
        if (color) this.color = color;
        if(width) this.width = width;
        if(height) this.height = height;
        if(x) this.x = x;
        if(y) this.y = y;
    }

    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.elm.innerHTML = this._text;
    }

    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
        this.elm.style.width = this._width==='auto'? this._width: this._width + "px";
    }

    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this.elm.style.left = this._x + "px";
    }

    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this.elm.style.top = this._y + "px";
    }
    
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.elm.style.height = this._height + "px";
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
        this.elm.id = this._id;
    }

    _initElement() {
        this.elm = document.createElement('p');
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
        this.elm.style.fontSize = this._fontSize + 'px';
    }

}