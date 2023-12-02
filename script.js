import {main, bird, gameFase, score, startButton, sound, pipes, medal} from "./Config.js";
import Draw   from "./Draw.js";
import Update from "./Update.js";
                   
let frames = 0;

const drawClass   = new Draw();
const updateClass = new Update();

canvas.addEventListener("click", goFunc);                           // срабатывает на клик мыши в зону canvas
document.addEventListener("keydown", goFunc);                       // срабатывает на нажатие любой кнопки

    function goFunc(event) {
        switch(gameFase.current) {
            case gameFase.start:                                       // начинаем игру
                gameFase.current = gameFase.game;
                sound.SWOOSHING.play();
                break;
            case gameFase.game:
                if(bird.dY - bird.radius <= 0) return;                  // если птица не улетела за верх экрана, 
                
                bird.speed = - bird.jump;                               // увеличиваем скорость
                sound.FLAP.play();
                break;
            case gameFase.finish:
                let rect = canvas.getBoundingClientRect();              // получаем координаты canvas зоны на экране
                let clickX = event.clientX - rect.left;                 // вычисляем координаты курсора при клике мыши (clientX и clientY)
                let clickY = event.clientY - rect.top;
                
                if (   clickX >= startButton.x                          // вычисляем, попал ли клик мыши на кнопку Start 
                    && clickX <= startButton.x + startButton.w 
                    && clickY >= startButton.y 
                    && clickY <= startButton.y + startButton.h) {

                    restartFunc();                                      // функция перезапуска
                }

                document.addEventListener("keydown", function(event) {   // перезапускаем по нажатию Enter
                    if (event.code == "Enter") restartFunc();
                });

                if (   clickX >= medal.dX                               // ФИЧА !  если нажата медаль, сбрасываем лучший результат
                    && clickX <= medal.dX + medal.dWidth 
                    && clickY >= medal.dY 
                    && clickY <= medal.dY + medal.dHeight) {

                    score.best = 0;
                }
                break;
        }
    }

function restartFunc() {                                    // функция перезапуска
    pipes.position   = [];                                  // если нажата Start или Enter, перезапускаем трубы
    bird.speed       = 0;                                   // сбрасываем счетчик скорости птицы
    score.value      = 0;                                   // сбрасываем счет
    gameFase.current = gameFase.start;                      // сбрасываем фазу игры на Start
    main.SPEED       = 2;                                   // сбрасываем скорость поля
}

function draw() {                                                // все рисуем
    main.ctx.fillStyle = "#70c5ce";                              // отрисовываем небо, чтобы оно не затиралось
    main.ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawClass.drawCanvas("backGr", frames);
    drawClass.drawCanvas("foreGr", frames);
    drawClass.drawCanvas("pipes",  frames);
    drawClass.drawCanvas("bird",   frames);
    drawClass.drawCanvas("start",  frames);
    drawClass.drawCanvas("finish", frames);
    drawClass.drawCanvas("score",  frames);
    drawClass.drawCanvas("medal",  frames);
}

function update() {                                                // все обновляем
    updateClass.updateParams("foreGr", frames);
    updateClass.updateParams("pipes",  frames);
    updateClass.updateParams("bird",   frames);
}

function render() {
    update();
    draw();
    frames++;
    
    requestAnimationFrame(render);
}
render();

