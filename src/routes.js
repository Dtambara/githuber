import { StackNavigator, TabNavigator } from 'react-navigation';

import Organization from './pages/Organization';
import Repositories from './pages/Repositories';
import Welcome from './pages/Welcome';

const Routes = StackNavigator({
  Welcome: { screen: Welcome },
  User: {
    screen: TabNavigator({
      Organization: { screen: Organization },
      Repositories: { screen: Repositories },
    }),
  },
}, {
  initialRouteName: 'Welcome',
});

export default Routes;
