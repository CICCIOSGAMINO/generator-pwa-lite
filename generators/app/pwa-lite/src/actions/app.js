export const UPDATE_PAGE = 'UPDATE_PAGE';
export const WEB_APP_READY = 'WEB_APP_READY';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path 
  const page = path === '/' ? 'home' : path.slice(1);
  // Here extract all info you need from path 
  dispatch(loadPage(page));
  // Close drawer - in case path change came from a link in the drawer 
  dispatch(updateDrawerState(false));
};

const loadPage = (page) => (dispatch) => {
  switch (page) {
    case 'home':
      import('../components/page-home.js').then((module) => {
        // code to run when navigating to home after home.js is loaded 
      });
      break;
    case 'view1':
      import('../components/page-view1.js');
      break;
    case 'view2':
      import('../components/page-view2.js');
      break;
    case 'view3':
      import('../components/page-view3.js');
      break;
    default:
      page = 'view404';
      import('../components/page-view404.js');
  }
  dispatch(updatePage(page));
};

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

let snackbarTimer;

export const showSnackbar = () => (dispatch) => {
  dispatch({
    type: OPEN_SNACKBAR
  });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() => {
    dispatch({
      type: CLOSE_SNACKBAR
    })
  }, 3000);
};

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if(getState().app.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch ({
    type: UPDATE_OFFLINE,
    offline
  })
};

export const updateDrawerState = (opened) => (dispatch, getState) => {
  if(getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened
    });
  }
};