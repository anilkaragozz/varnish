vcl 4.1;

import directors;

backend demo1 {
    .host = "127.0.0.1";
    .port = "3001";
}

backend demo2 {
    .host = "127.0.0.1";
    .port = "3002";
}

acl purge{
    "localhost";
    "127.0.0.1";
}
sub vcl_init {
    new vdir = directors.round_robin();
    vdir.add_backend(demo1);
    vdir.add_backend(demo2);
}

sub vcl_recv {
    set req.backend_hint = vdir.backend();
    set req.http.respTime = now;
}

sub vcl_backend_response {
  set beresp.ttl = 30s;
}