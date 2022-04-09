food_image=new Image();
food_image.src="sudip/apple.png";
trophy=new Image();
trophy.src="sudip/trophy_snake_game.png";
score=0;


left_b=document.getElementById("left_img");



function init()
{
  canvas=document.getElementById("canvas1");
  w=canvas.width=1000;
  h=canvas.height=600;
  obj=canvas.getContext('2d');
  cs=67;
  //store rand location
  food=randfood();

  snake={
    init_len: 5,
    color:"blue",
    cells:[],
    direction:"right",
    game_over:false,

    createSnake:function()
    {
      for(var i=this.init_len;i>0;i--)
      {
        this.cells.push({x:i,y:0});
      }
    },
    drawSnake:function()
    {
      for(var i=0;i<this.cells.length;i++)
      {
      if(i==0)
      {
      obj.fillStyle="blue";
      obj.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
      }
      else
      {
      obj.fillStyle="red";
      obj.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
        }
        }
    },
    updateSnake:function()
    {
       var X=this.cells[0].x;
       var Y=this.cells[0].y;
       if(X==food.x && Y==food.y)
        {food=randfood();score++;}
       else
       {this.cells.pop();}

       if(this.direction=="right") 
       {X++;}
       else if(this.direction=="left")
       {X--;}
       else if(this.direction=="up")
       {Y--;}
       else if(this.direction=="down")
       {Y++;}
       if((X*cs)>w || (Y*cs)>h || X<0 || Y<0)
       {
        this.game_over=true;
       }
       this.cells.unshift({x:X,y:Y});
    },
  };
  snake.createSnake();
  function f1(sss)
  {
    if(sss.target.src=="https://sudip2209.github.io/JavaScript-Projects/Snake_Game/sudip/down.png")
    {
      snake.direction="down";
    }
    else if(sss.target.src=="https://sudip2209.github.io/JavaScript-Projects/Snake_Game/sudip/left.png")
    {
      snake.direction="left";
    }
    else if(sss.target.src=="https://sudip2209.github.io/JavaScript-Projects/Snake_Game/sudip/up.png")
    {
      snake.direction="up";
    }
    else if(sss.target.src=="https://sudip2209.github.io/JavaScript-Projects/Snake_Game/sudip/right.png")
    {
      snake.direction="right";
    }
   
  }
  document.addEventListener('click',f1);
  function keyPressed(pressed_key)
  {
  if(pressed_key.key=="ArrowRight")
    {snake.direction="right";}
  else if(pressed_key.key=="ArrowLeft")
    {snake.direction="left";}
  else if(pressed_key.key=="ArrowUp")
    {snake.direction="up";}
  else if(pressed_key.key=="ArrowDown")
    {snake.direction="down";}
  }
  document.addEventListener('keydown',keyPressed);
}
function draw()
{  obj.clearRect(0,0,w,h);
   snake.drawSnake();
   //obj.fillRect(food.x*cs,food.y*cs,cs,cs);
   obj.drawImage(food_image,food.x*cs,food.y*cs,cs,cs);
   obj.font="20px Roboto";
   obj.drawImage(trophy,18,20,cs,cs);
   obj.fillStyle="blue";
   obj.fillText(score,50,50);
}
function update()
{
  snake.updateSnake();
}
function game_loop()
{   if(snake.game_over==true)
  {
    clearInterval(f);
    alert("game over");
  }
    draw();
    update();
}
function randfood()
{
  var foodx=Math.round((Math.random()*(w-cs))/cs);
  var foody=Math.round((Math.random()*(h-cs))/cs);

  var food={
    x:foodx,
    y:foody,
  }
  return food;
}
init();
var f=setInterval(game_loop,280);
