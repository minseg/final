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

    applyRepeller(repeller) {
        for (let p of this.particles) {
            let force = repeller.repel(p);
            p.applyForce(force);
        }
    }

    applyAttractor(attractor) {
        for (let p of this.particles) {
            let force = attractor.attract(p);
            p.applyForce(force);
        }
    }

    run() {
        for (let p of this.particles) {
            p.update();
            p.show();
        }
    }

    allParticlesSettled() {
        // 모든 입자가 바닥에 가라앉았는지 확인
        return this.particles.every(p => p.settled);
    }

    resetParticles() {
        // 기존 입자 제거 후 새로운 입자 생성
        this.particles = [];
        for (let i = 0; i < 100; i++) {
            this.addParticle();
        }
    }
}

