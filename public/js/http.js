(function () {
  var GET = 'get';
  window.Ajax = {
    /**
     * Basic Ajax
     * @param url {String}
     * @param [opt] {Object}
     * @param [opt.onSuccess] {Function}
     * @param [opt.onFailure] {Function}
     * @param [opt.cached] {Boolean}
     */
    get: function (url, opt) {
      opt = opt || {};
      if (opt.cached) {
        url += (url.indexOf('?') > -1 ? '&' : '?') + new Date().getTime() + 'r';
      }
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status >= 200 && request.status < 400) {
            var ret = request.responseText;
            var contentType = request.getResponseHeader('content-type');
            try {
              ret = JSON.parse(ret);
            } catch (e) {
              console.error(e);
              if (opt.onFailure) opt.onFailure(e);
            }
            if (opt.onSuccess) opt.onSuccess(ret);
          } else {
            if (opt.onFailure) opt.onFailure();
          }
        }
      };

      request.open(GET, url, true);
      if (opt.token) {
        request.setRequestHeader("authorization", 'Bearer ' + opt.token)
      }
      request.send(null);
    },
    post: function (url, opt) {
      opt = opt || {};
      if (opt.cached) {
        url += (url.indexOf('?') > -1 ? '&' : '?') + new Date().getTime() + 'r';
      }
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status >= 200 && request.status < 400) {
            var ret = request.responseText;
            var contentType = request.getResponseHeader('content-type');
            try {
              ret = JSON.parse(ret);
            } catch (e) {
              console.error(e);
              if (opt.onFailure) opt.onFailure(e);
            }
            if (opt.onSuccess) opt.onSuccess(ret);
          } else {
            if (opt.onFailure) opt.onFailure();
          }
        }
      };

      request.open('POST', url, true);
      request.setRequestHeader("Content-Type", "application/json");
      if (opt.token) {
        request.setRequestHeader("authorization", 'Bearer ' + opt.token)
      }
      console.log(opt.data);
      request.send(JSON.stringify(opt.data));
    }
  }


})();