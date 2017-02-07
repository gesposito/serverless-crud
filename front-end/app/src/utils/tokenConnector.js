import { connect } from 'react-refetch';

export default connect.defaults({
  buildRequest(mapping) {
    const options = {
      'method'  : mapping.method,
      'headers' : Object.assign(
        {}, mapping.headers, {
          'Content-Type'  : 'application/json',
          'Authorization' : localStorage.getItem('authorization_token'),
        }
      ),
      'body'    : mapping.body,
      // 'mode'    : 'cors',
    }

    return new Request(
      mapping.url,
      options
    );
  },
  fetch(request, options) {
    const retry = request.clone();

    return fetch(request)
      .then((response) => response)
      .catch((error) => {
        // Try to recover from a 401 Unauthorized
        const refreshUrl = `${AUTH}/authentication/refresh/${localStorage.getItem('refresh_token')}`;
        const refreshOptions = Object.assign({}, options, {
          'method': 'GET'
        });
        const refresh = new Request(refreshUrl, refreshOptions);

        return fetch(refresh)
          .then((response) => {
            return response.json()
              .then((json) => {
                const { authorization_token, refresh_token } = json;
                if (authorization_token) {
                  localStorage.setItem('authorization_token', authorization_token);
                }
                if (refresh_token) {
                  localStorage.setItem('refresh_token', refresh_token);
                }

                // Retry the original Request with the new authorization_token
                return fetch(retry, {
                  'headers': {
                    'Authorization': authorization_token,
                  }
                });
              });
          })
          .catch((error) => {
            return {
              'status': 401,
              error
            };
          });
      });
  },
  // handleResponse(response) {
  //   if (response.headers.get('content-length') === '0' || response.status === 204) {
  //     return;
  //   }
  //
  //   if (response.status >= 200 && response.status < 300) {
  //     return new Promise(
  //       (resolve, reject) => {
  //         return response.json()
  //           .then((json) => {
  //             resolve(json);
  //           })
  //           .catch((ex) => {
  //             reject(ex);
  //           });
  //       }
  //     );
  //   } else {
  //     return Promise.reject(
  //       new Error(`${response.status} ${response.statusText}`)
  //     );
  //   }
  // },
});
