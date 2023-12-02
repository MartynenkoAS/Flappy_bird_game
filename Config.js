export const main = {                               // создаем объект основных констант
    canvas: document.getElementById("canvas"),
    ctx   : canvas.getContext("2d"),
    sprite: new Image(),                            // изображение с ресурсами, которые будем использовать для создания анимаций
    DEGREE: Math.PI/180,
    index : 0,
    SPEED : 2
}
    main.sprite.src = "sprite.png"; 

// export const SCORE_S = new Audio();                     // создаем сонстанты для звуков
// SCORE_S.src = "/audio/sfx_point.wav";
// export const FLAP = new Audio();
// FLAP.src = "/audio/sfx_flap.wav";
// export const HIT = new Audio();
// HIT.src = "/audio/sfx_hit.wav";
// export const SWOOSHING = new Audio();
// SWOOSHING.src = "/audio/sfx_swooshing.wav";
// export const DIE = new Audio();
// DIE.src = "/audio/sfx_die.wav";

export const sound = {                          // кладем их в объект чтобы вызывать по ссылке
    SCORE_S:   new Audio(),
    FLAP:      new Audio(),
    HIT:       new Audio(),
    SWOOSHING: new Audio(),
    DIE:       new Audio(),
}
    sound.SCORE_S.src   = "audio/sfx_point.wav";
    sound.FLAP.src      = "audio/sfx_flap.wav";
    sound.HIT.src       = "audio/sfx_hit.wav";
    sound.SWOOSHING.src = "audio/sfx_swooshing.wav";
    sound.DIE.src       = "audio/sfx_die.wav";

export const gameFase = {
    current : 0,
    start   : 0,
    game    : 1,
    finish  : 2
}

export const startButton = {
    x : 120, y : 263,
    w : 83,  h : 29
}

export const backGr = {                                           // объект для отрисовки статичной картинки
        sX     : 0,            sY      : 0,
        sWidth : 275,          sHeight : 226,
        dX     : 0,            dY      : canvas.height - 226,
        dWidth : canvas.width, dHeight : 226
}

export const foreGr = {                                            // объект для отрисовки динамичной земли
        sX     : 276,              sY      : 0,
        sWidth : 224,              sHeight : 112,
        dX     : 0,                dY      : canvas.height - 112,
        dWidth : canvas.width*1.9, dHeight : 112,
}

export const bird = {                                              // объект для птички
    animation : [
        {sX: 276, sY : 112}, {sX: 276, sY : 139}, {sX: 276, sY : 164}, {sX: 276, sY : 139}          // координаты разных взмахов крыльями
    ],
        sWidth : 34, sHeight : 26,
        dX     : 50, dY      : 150,
        dWidth : 34, dHeight : 26,

    radius   : 12,
    frame    : 0,
    gravity  : 0.25,
    jump     : 4.6,
    speed    : 0,
    rotation : 0,   
}

export const pipes = {                                                      // Объект параметров труб
    position : [],
    
    top   : {sX : 553, sY : 0},
    bottom: {sX : 502, sY : 0},
    
    sWidth : 53,           sHeight : 400,
    dX     :  0,           dY      :   0,
    dWidth : 53,           dHeight : 400,
    
    gap     : 100,                                                          // Свободный промежуток в трубе занимает 25 % высоты трубы.
    maxYPos : -150,
}

export const score= {                                                       // Объект счета
    best  : parseInt(localStorage.getItem("best")) || 0,
    value : 0,
}

export const start = {                                                      // координаты картинки с кнопкой START
    sX     : 0,   sY      : 228,
    sWidth : 173, sHeight : 152,
    dX     : 55,  dY      : 80,
    dWidth : 225, dHeight : 202,   
}

export const finish = {                                                     // координаты картинки GAME OVER
    sX     : 175,                  sY      : 228,
    sWidth : 225,                  sHeight : 202,
    dX     : canvas.width/2-225/2, dY      : 90,
    dWidth : 225,                  dHeight : 202,
}

export const medal = {                                                       // объект для медалей
    white  : {sX: 312, sY : 111},                                            // координаты разных типов медалей
    bronze : {sX: 361, sY : 159},
    silver : {sX: 359, sY : 111},
    gold   : {sX: 312, sY : 159},

    sWidth : 44, sHeight : 44,
    dX     : 72, dY      : 177,
    dWidth : 44, dHeight : 44
}
      