$('.api-access-btn').click(() => submitApiAccessInfo(event));

const submitApiAccessInfo = async (event) => {
  event.preventDefault();
  const email = $('#user-email').val();
  const appName = $('#user-app-name').val();
  const infoContainer = $('.info-container');

  infoContainer.empty();

  if(email === '' || appName === '') {
    const errorMsg = `<h3>You must provide an email and an app name.</h3>`;
    infoContainer.append(errorMsg);
    return;
  }

  const userInfo = Object.assign({ user_email: email, app_name: appName });
  const userToken = await getUserToken(userInfo);
  const userTokenInfo = `<h3>Your token info is as follows: ${userToken} </h3>`

  infoContainer.append(userTokenInfo);
};

const getUserToken = async (user) => {
  const url = '/api/v1/authenticate';

  return await postAndParse(url, user);
};

const postAndParse = async (url, data) => {
  try {
    const initialFetch = await fetch(url, {
      body: JSON.stringify(data),
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    });

    return await initialFetch.json();
  } catch (error) {
    const errorMsg = `<h3>${error}</h3>`;

    $('.info-container').append(errorMsg);
  }
};