var Gear = function(ctx){
    
    this.centerX;
    this.centerY;
    this.allPoints = [];
    this.color = 'white';
    this.ctx = ctx;
    
    //create our center circle
    this.cc = new Circle(ctx);
    this.cc.r = 7.5;
    this.cc.color = 'white';
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "rgba(255,255,255,1)";
    
}


Gear.prototype={
    
    addPoint:function(radius,startingAngle,speed){
        var point = {x:Math.cos(startingAngle)*radius +this.centerX,y:Math.sin(startingAngle)*radius +this.centerY,r:radius,speed:speed, angle:startingAngle};
        this.allPoints.push(point);
    },
    
    setPosition:function(x,y){
        this.centerX = x;
        this.centerY = y;
        this.cc.x = x;
        this.cc.y = y;
    },

    display:function(){
        this.cc.display();
        for(var i=0;i<this.allPoints.length;i++){
             this.ctx.moveTo( this.centerX,  this.centerY);
             this.ctx.lineTo(this.allPoints[i].x,this.allPoints[i].y);
        }
        this.ctx.stroke();
        
    },
    
    update:function(){
         for(var i=0;i<this.allPoints.length;i++){
             this.allPoints[i].angle+=this.allPoints[i].speed;
             this.allPoints[i].x = Math.cos(this.allPoints[i].angle * Math.PI/180)*this.allPoints[i].r +this.centerX;
             this.allPoints[i].y = Math.sin(this.allPoints[i].angle * Math.PI/180)*this.allPoints[i].r +this.centerY;
         }
    },
    checkIntersection:function(target){
        var r = target.r;
        var x = target.x;
        var y = target.y;
        //top, bottom, left, right of cirlce
        var centerRight = { x: x + r,  y: y };
        var centerLeft  = { x: x - r,  y: y };
        var centerUp    = { x: x,      y: y + r };
        var centerDown  = { x: x,      y: y - r };
        var targetCenter = { x: x, y: y };
        
        var gearCenter = {x: this.centerX, y: this.centerY};
        var gearHandEnd;
        var touching = false;
        
        for(var i=0;i < this.allPoints.length; i++){
            gearHandEnd = { x: this.allPoints[i].x, y: this.allPoints[i].y};
            touching =  this.IsPointOnGearLine(gearCenter, gearHandEnd, centerRight) ||
                        this.IsPointOnGearLine(gearCenter, gearHandEnd, centerLeft)  ||
                        this.IsPointOnGearLine(gearCenter, gearHandEnd, centerUp)    ||
                        this.IsPointOnGearLine(gearCenter, gearHandEnd, centerDown)  ||
                        this.IsPointOnGearLine(gearCenter, gearHandEnd, targetCenter);
            if(touching) {
                console.log("you're dead");
                break;
            }
        }
        //debugging for levels ... diasable/delete
//        return false;
        return touching;
    },
    IsInBoundingBox: function(point, x1, y1, x2, y2){
        var tmp;
        if(x1 > x2){
            tmp = x1;
            x1 = x2;
            x2 = tmp;
        }
        if(y1 > y2){
            tmp = y1;
            y1 = y2;
            y2 = tmp;
        }
        return point.x > x1 && point.x < x2 && point.y > y1 && point.y < y2;
    },
    IsPointOnGearLine:function(point1, point2, currPoint) {
        //http://stackoverflow.com/questions/11907947/how-to-check-if-a-point-lies-on-a-line-between-2-other-points/11912171#11912171
        //idea here is that if the point is on the line the distance from start to point and point to end,
        // should be the same as end to end length of the line with some margin of error
        var MARGIN_OF_ERROR = 5; //within 5px;
        
        //function to calculate Euclidean distance between two points
        var distance = function(p1, p2){
            return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
        };
        
        return Math.abs(distance(point1, currPoint) + distance(currPoint, point2) - distance(point1, point2)) < MARGIN_OF_ERROR;
    }
    
}
