class ParticleSystem {
    constructor(origin) {
        this.origin = origin.copy();
        this.particles = [];
        for (let i = 0; i < 100; i++) {
            this.addParticle();
        }
    }

    addParticle() {
        this.particles.push(new Particle(this.origin));
    }

    run() {
        for (let p of this.particles) {
            p.update();
            p.show();
        }
    }
}
