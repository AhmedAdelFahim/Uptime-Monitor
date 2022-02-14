import {initializeDatabase, teardown} from "./index";

before(function (done) {
  initializeDatabase().then(() => {
    done()
  }).catch((err) => {
    done(err)
  })
});

after(function (done) {
  teardown().then(() => {
    done()
  }).catch((err) => {
    done(err)
  })
})
