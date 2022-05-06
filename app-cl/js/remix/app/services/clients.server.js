Redis = require("ioredis")
export let redis = new Redis("rediss://:d149ecb977074e10933114d12a720dd6@us1-fluent-turtle-37019.upstash.io:37019");
export let stripe = require("stripe")('sk_test_51Kn7FDFiBXCXFtbsTY6KAGa7y1IOkBvA8MzqSE19i2UY5scrvbgDHEkdpDeVzp9enFN6FXQYdr1r0uoLTXuZiQ8h00zPsSZ3oM');
