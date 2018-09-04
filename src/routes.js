import { StackNavigator, TabNavigator } from 'react-navigation';

import Organization from './pages/Organization';
import Repositories from './pages/Repositories';
import Welcome from './pages/Welcome';

const createNavigator = (isLogged = false) => StackNavigator({
  Welcome: { screen: Welcome },
  User: {
    screen: TabNavigator({
      Organization: { screen: Organization },
      Repositories: { screen: Repositories },
    }),
  },
}, {
  initialRouteName: isLogged ? 'User' : 'Welcome',
});

export default createNavigator;
