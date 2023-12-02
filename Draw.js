import {main, backGr, foreGr, bird, pipes, score, start, finish, gameFase, medal} from "./Config.js";

class Draw {
    constructor() {
        this.drawParams = {};
        this.birdFlapPhase = 0;
        this.birdFlapPhaseSlow = 0;
        this.position = [];
    }

    drawCanvas(drawType, frames) {
        
        switch (drawType) {
            case "backGr":
                this.drawParams = backGr;                             // объект для отрисовки статичной картинки
                break;

            case "foreGr":
                this.drawParams = foreGr;                             // объект для отрисовки картинки движения земли
                break;
            
            case "bird":
                let birdFlap = bird.animation[this.birdFlapPhase];      // выбираем нужную фазу птички для взмахов крыльями
                if (this.birdFlapPhaseSlow < 5) {                       // тормозим взмахи. делаем на каждый 5й кадр
                    this.birdFlapPhaseSlow++;
                } else {
                    this.birdFlapPhaseSlow = 0;
                    if (this.birdFlapPhase < 3) {
                        gameFase.current == gameFase.finish ? this.birdFlapPhase = 1 : this.birdFlapPhase++;     // чтобы птица не махала крыльями после падения
                    } else {
                        this.birdFlapPhase = 0;
                    }
                }
                
                main.ctx.save();
                main.ctx.translate(bird.dX, bird.dY);
                main.ctx.rotate(bird.rotation);
                main.ctx.drawImage(main.sprite, birdFlap.sX,             birdFlap.sY, 
                                                bird.sWidth,             bird.sHeight, 
                                              - bird.dWidth/2,         - bird.dHeight/2,
                                                bird.dWidth,             bird.dHeight);
                main.ctx.restore();

                break;

            case "pipes":                                                   // отрисовываем трубы

                for(let i = 0; i < pipes.position.length; i++){             // на экране 1 или 2 трубы
                    let p = pipes.position[i];
                    
                    let topYPos = p.y;
                    let bottomYPos = p.y + pipes.sHeight + pipes.gap;
                    
                    main.ctx.drawImage(main.sprite, pipes.top.sX,    pipes.top.sY,    pipes.sWidth, pipes.sHeight, p.x, topYPos,    pipes.dWidth, pipes.dHeight);
                    main.ctx.drawImage(main.sprite, pipes.bottom.sX, pipes.bottom.sY, pipes.sWidth, pipes.sHeight, p.x, bottomYPos, pipes.dWidth, pipes.dHeight);  
                }
                break;

            case "score":
                
                if (gameFase.current == gameFase.game) {                        // в ходе игры рисуем текущий счет вверху
                    main.ctx.lineWidth = 2;
                    main.ctx.font = "35px Teko";
                    main.ctx.fillStyle   = "#FFD700";

                    main.ctx.fillText(score.value, canvas.width/2, 50);
                    
                }else if (gameFase.current == gameFase.finish) {                  // после финиша, рисуем текущий и лучший счет на табло
                    main.ctx.font = "25px Teko";
                    main.ctx.fillStyle   = "#006400";
                    
                    main.ctx.fillText(score.value, 225, 186);
                    main.ctx.fillText(score.best, 225, 228);
                    
                    main.ctx.font = "20px Teko";
                    main.ctx.fillText("tap on the medal to reset best score", 20, 420);
                    
                    if (window.screen.width <= 375) {                                       // чтобы на мобилке не писать
                        main.ctx.fillText("Enter to restart", 109, 445);
                    }
                }
                break;

            case "start":
                if(gameFase.current == gameFase.start) {    
                    this.drawParams = start;                                        // рисуем стартовую картинку
                }
                break;

            case "finish":
                if(gameFase.current == gameFase.finish) {
                    this.drawParams = finish;                                       // рисуем GAME OVER картинку
                }
                break;
                
            case "medal":
                if (gameFase.current == gameFase.finish) {
                    this.drawParams = medal;                                        // рисуем медаль нужного типа
                    if (score.value >= 10 && score.value < 20) {
                        this.drawParams.sX = medal.white.sX;
                        this.drawParams.sY = medal.white.sY;                        
                    } else {
                        if (score.value >= 20 && score.value < 50) {
                            this.drawParams.sX = medal.bronze.sX;
                            this.drawParams.sY = medal.bronze.sY;
                        } else {
                            if (score.value >= 50 && score.value < 100) {
                                this.drawParams.sX = medal.silver.sX;
                                this.drawParams.sY = medal.silver.sY;
                            } else {
                                if (score.value >= 100) {
                                    this.drawParams.sX = medal.gold.sX;
                                    this.drawParams.sY = medal.gold.sY;
                                }
                            }
                        }
                    }
                }
                break;
                
        }

        if (drawType != "score" && drawType != "bird") {
            main.ctx.drawImage(main.sprite, 
                this.drawParams.sX,     this.drawParams.sY,
                this.drawParams.sWidth, this.drawParams.sHeight,
                this.drawParams.dX,     this.drawParams.dY,
                this.drawParams.dWidth, this.drawParams.dHeight
                );
        }
    }
}
export default Draw;


