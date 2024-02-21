class ParticleBg {
    constructor(master, canvas_width, canvas_height, speed_multiplier = 1, size_multiplier = 1, color = "#333") {
        this.master = master;
        this.x = Math.random()*canvas_width;
        this.y = {true: Math.random()*canvas_height, real: Math.random()*canvas_height};
        this.width = (Math.floor(Math.random()*40)+20) * size_multiplier;
        this.side = Math.floor(Math.random()*2);
        this.color = color;
        this.speed_multiplier = speed_multiplier;
    }

    render() {
        this.master.fillStyle = this.color;
        this.master.globalAlpha = "0.1";
        this.master.fillRect(this.x, this.y.real, this.width, this.width);
    }
}

function bg_particlesUpdate(ctx, canvas_width, canvas_height, speed_multiplier = 1, size_multiplier = 1, count = 50, color = "#333", g = 1) {
    for (let i = 0; i < count; i++) {
        particles.push({item: new ParticleBg(ctx, canvas_width, canvas_height, speed_multiplier, size_multiplier , color), group: g})
    }
}

const particles = [];
const plot1 = document.getElementsByClassName("background_layer1")[0];
const context1 = plot1.getContext("2d");
const canvas_width = plot1.clientWidth, canvas_height = plot1.clientHeight;
const max_paralax = canvas_height / 2;
plot1.width = canvas_width;
plot1.height = canvas_height;

bg_particlesUpdate(context1, canvas_width, canvas_height, speed_multiplier = 1, size_multiplier = 2, count = 50, color = "#999", g = 1);
bg_particlesUpdate(context1, canvas_width, canvas_height, speed_multiplier = .6, size_multiplier = 3, count = 30, color = "#bbb", g = 2);
bg_particlesUpdate(context1, canvas_width, canvas_height, speed_multiplier = .2, size_multiplier = 5.5, count = 15, color = "#ddd", g = 3);

setInterval(() => {
    context1.clearRect(0, 0, canvas_width, canvas_height);
    for (let i_ of particles) {
        i = i_["item"];
        if (i.side == 0) { 
            i.x -= (i.width/100) * this.speed_multiplier;
            if (i.x < -i.width) {
                i.x = canvas_width + i.width/2;
                i.y.true = Math.random()*canvas_height;
            }
        }
        else {
            i.x += (i.width/100) * this.speed_multiplier;
            if (i.x > canvas_width+i.width/2) {
                i.x = -i.width;
                i.y.true = Math.random()*canvas_height;
            }
        }
        i.render();
    }
}, 1000 / 60);

function mainScrollParalax(e) {
    let percentage = e.scrollY / canvas_height;
    for (let i of particles) {
        if (i.group == 2) {
            i.item.y.real = i.item.y.true + max_paralax * percentage / 2;
        } else if (i.group == 3) {
            i.item.y.real = i.item.y.true + max_paralax * percentage;
        }
    }
}
