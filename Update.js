import {main, foreGr, bird, pipes, score, gameFase, sound} from "./Config.js";

class Update {
    constructor() {
    }

    updateParams(drawType, frames) {                                                       // функция обновления параметров
        switch (drawType) {
            case "foreGr":
                if(gameFase.current == gameFase.game){
                    foreGr.dX = (foreGr.dX - main.SPEED) % (foreGr.sWidth/2);
                }
            break;

            case "pipes":
                if (gameFase.current !== gameFase.game) return;                             // если мы не в Игре, сразу выходим

                if (frames % 100*main.SPEED/2 == 0) {                                       // тут пытался решить задачу, чтобы расстояние между трубами было 3 трубы.
                    pipes.position.push ({                                                  // В начале +/- так и есть, но с увеличением скорости, надо чтобы 
                        x : canvas.width,                                                   // новая труба появлялась каждую секунду
                        y : pipes.maxYPos * (Math.random() + 1)
                    });
                }

                for(let i = 0; i < pipes.position.length; i++) {                          // проверяем столкновение с трубами
                    let p = pipes.position[i];
                    
                    if (   bird.dX + bird.radius > p.x                                    // если птичка столкнулась с верхней трубой
                        && bird.dX - bird.radius < p.x + pipes.dWidth
                        && bird.dY + bird.radius > p.y 
                        && bird.dY - bird.radius < p.y + pipes.dHeight) {
                        
                        gameFase.current = gameFase.finish;
                        sound.HIT.play();
                    }
                    
                    let bottomPipeYPos = p.y + pipes.sHeight + pipes.gap;                   // вычисляем dY нижней трубы
                     
                    if(    bird.dX + bird.radius > p.x                                      // если птичка столкнулась с нижней трубой
                        && bird.dX - bird.radius < p.x + pipes.dWidth
                        && bird.dY + bird.radius > bottomPipeYPos 
                        && bird.dY - bird.radius < bottomPipeYPos + pipes.dHeight) {

                        gameFase.current = gameFase.finish;
                        sound.HIT.play();
                    }
                }

                for (let i = 0; i < pipes.position.length; i++) {
                    let p = pipes.position[i];
                    
                    p.x -= main.SPEED;                                              // двигаем трубы влево

                    if (p.x + pipes.sWidth / 2 <= bird.dX) {                        // если птица пролетела половину трубы, убиваем первую трубу в массиве и увеличиваем счет
                        pipes.position.shift();
                        score.value += 1;
                        sound.SCORE_S.play();
                        score.best = Math.max(score.value, score.best);             // записываем лучший счет в хранилище
                        localStorage.setItem("best", score.best);
                        main.SPEED += 0.5;                                          // увеличиваем скорость движения после каждого очка
                    }
                }
            break;

            case "bird":

                if (gameFase.current == gameFase.start) {
                    bird.dY = 150;                                                   // Возвращаем птичку на начальную позицию
                    bird.rotation = 0 * main.DEGREE;
                } else {
                    bird.speed += bird.gravity;
                    bird.dY += bird.speed;
                    
                    if (bird.dY + bird.dHeight / 2 >= canvas.height - foreGr.dHeight) {     // если птица упала на пол - конец игры
                        bird.dY = canvas.height - foreGr.dHeight - bird.dHeight / 2;
                        
                        if (gameFase.current == gameFase.game) {
                            gameFase.current = gameFase.finish;
                            sound.DIE.play();
                        }
                    }

                    if (bird.speed >= bird.jump) {                                 //   Если скорость птички больше прыжка, она поворачивается вниз
                        bird.rotation = 90 * main.DEGREE;
                    } else {
                        bird.rotation = -25 * main.DEGREE;
                    }
                }
            break;
        }
        

    };

}
export default Update;
