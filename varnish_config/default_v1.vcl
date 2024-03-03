vcl 4.1;

import directors;

backend backend1 {
    .host = "127.0.0.1";
    .port = "3001";
}

backend backend2 {
    .host = "127.0.0.1";
    .port = "3002";
}

sub vcl_init {
    new vdir = directors.round_robin();
    vdir.add_backend(backend1);
    vdir.add_backend(backend2);
}

sub vcl_recv {
    set req.backend_hint = vdir.backend();
    set req.http.respTime = now;
}

sub vcl_backend_response {
  set beresp.ttl = 10s;
}