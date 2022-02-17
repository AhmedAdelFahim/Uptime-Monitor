import {initialize, teardown} from './index';

before(function(done) {
  initialize().then(() => {
    done();
  }).catch((err) => {
    done(err);
  });
});

after(function(done) {
  teardown().then(() => {
    done();
  }).catch((err) => {
    done(err);
  });
});
